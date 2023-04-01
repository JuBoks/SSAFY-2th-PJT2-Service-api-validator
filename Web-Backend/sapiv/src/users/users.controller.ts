import { Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllowUnauthorizedRequest } from 'src/common/guard/allow-unauthorized-request';
import { ApiHeader } from '@nestjs/swagger';
import { CustomRequest } from 'src/common/custromrequest';
import { CheckPolicies } from 'src/common/guard/policies-guard';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/action';
import { User } from './entities/user.entity';

@Controller('users')
@ApiHeader({
  name: 'idtoken',
  description: 'Custom header',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @AllowUnauthorizedRequest()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findOne(@Req() request: CustomRequest) {
    return this.usersService.findOne(request.user.uid);
  }

  @Get('/authorize')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  findAll() {
    return this.usersService.findAll(undefined);
  }

  @Get('/duplicate/:email')
  @AllowUnauthorizedRequest()
  async DuplicationCheck(@Param('email') email: string) {
    if(await this.usersService.findByEmail(email)){
      return "Available";
    }
    else{
      return "Not Available";
    }
  }

  @Patch()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  async updateAdmin(@Body() updateUserDto: UpdateUserDto, @Req() request: CustomRequest){
    
    return this.usersService.update(updateUserDto, request);
  }
    
  @Delete(':uid')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, User))
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }
}
