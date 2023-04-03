import { AbilityBuilder, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Alert } from "src/alerts/entities/alert.entity";
import { TestCase } from "src/apis/entities/testcase.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { User } from "src/users/entities/user.entity";
import { Action } from "../action";

type Subjects = InferSubjects<typeof User | typeof Favorite | typeof Alert | typeof TestCase> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User, request: any) {
    const { can, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility);

    
    let uid = "";
    if(request.bodyUsed && request.body.uid){
      uid = request.body.uid;
    }
    else if(request.params && request.params.uid){
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
      can(Action.Manage, TestCase)
    }
    
    if(user.state <= 2 && user.state > 0){
      can(Action.Manage, Favorite);
      can(Action.Manage, Alert);
      can(Action.Read, TestCase);
    }


    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}