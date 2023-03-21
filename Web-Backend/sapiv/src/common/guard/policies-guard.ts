import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "../../casl/casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../handler/policy-handler";
import { UsersService } from "../../users/users.service";

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
  
@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler());
    if (allowUnauthorizedRequest) return true;
    const request = context.switchToHttp().getRequest();
    const idToken = request.headers.idtoken;
    const uid = await this.usersService.verify(idToken)
    const user = await this.usersService.findOne(uid);
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = user;
    const ability = this.caslAbilityFactory.createForUser(user, request);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}