import { AbilityBuilder, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { Action } from "../action";

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User, request: any) {
    const { can, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility);

    
    let uid = "";
    if(request.bodyUsed && request.body.uid !== undefined){
      uid = request.body.uid;
    }
    else if(request.params !== undefined && request.params.uid !== undefined){
      uid = request.params.uid;
    }

    if (user.state === 3) {
      can(Action.Manage, 'all'); // read-write access to everything
    } 
    else if (user.uid === uid){
      can(Action.Manage, User); 
    }
    else if(user.state === 2){
      can(Action.Update, User);
      can(Action.Delete, User);
      can(Action.Read, User);
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}