import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { User } from './entities/user.entity';
import { CustomRequest } from 'src/common/custromrequest';


@Injectable()
export class UsersService {
  
  // 파이어베이스 설정
  firebase = initializeApp({
    credential : applicationDefault()
  })
  
  async create(createUserDto: CreateUserDto) {
    // 파이어베이스 연결
    const auth = getAuth(this.firebase);
    let userInfo;
    try{
      userInfo = await auth.createUser({
        email: createUserDto.email,
        password: createUserDto.password,
        displayName: createUserDto.name,
      });

      await auth.setCustomUserClaims(userInfo.uid, {
        state: 0,
        type: createUserDto.type
      });
      
    } catch(error){
      throw new HttpException(
        error.message,
        HttpStatus.FORBIDDEN
      );
    }
    return userInfo.uid;
  }

  async findAll(nextPageToken: any){
    const auth = getAuth(this.firebase);
    let listUsersResult;
    const userList = [];
    try{
      if(!nextPageToken){
        listUsersResult = await auth.listUsers(1000);  
      }
      else{
        listUsersResult = await auth.listUsers(1000, nextPageToken);
      }
    }
    catch(error){
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST
      )
    }
    listUsersResult.users.forEach((userRecord) => {
      const {uid, email, displayName, customClaims, disabled} = userRecord.toJSON();
      if(!disabled){
        const user = {
          uid,
          email,
          name: displayName,
          state: customClaims.state,
          type: customClaims.type,
        }
        userList.push(user);
      }
    });
    if (listUsersResult.pageToken) {
      // List next batch of users.
      return userList.concat(this.findAll(listUsersResult.pageToken));
    }
    return userList;
  }

  async findByEmail(email: string) {
    const auth = getAuth(this.firebase);
    let duplicateInfo = await auth.getUserByEmail(email)
    .then((userRecord) => {
      return userRecord;
    })
    .catch((error) => {
      return error.code;
    })
    if(duplicateInfo === 'auth/user-not-found') return true;
    else return false;
  }

  async findOne(uid: string): Promise<User | undefined>{
    const auth = getAuth(this.firebase);
    return auth.getUser(uid)
    .then((UserRecord) => {
      return {
        uid: UserRecord.uid,
        email: UserRecord.email,
        state: UserRecord.customClaims.state,
        type: UserRecord.customClaims.type,
      }
    })
    .catch(() => {
      return null;
    })
  }

  async verify(idToken: string): Promise<string | undefined>{
    const auth = getAuth(this.firebase);
    return auth.verifyIdToken(idToken)
    .then((decodedToken) => {
      return decodedToken.uid;
    })
    .catch(() => {
      return '';
    });
  }



  async update(updateUserDto: UpdateUserDto, request: CustomRequest) {
    if(updateUserDto.state && updateUserDto.state >= request.user.state){
      throw new HttpException(
        "허가되지 않은 행동입니다.",
        HttpStatus.UNAUTHORIZED
      );
    }
    if(updateUserDto.type && updateUserDto.uid !== request.user.uid){
      throw new HttpException(
        "허가되지 않은 행동입니다.",
        HttpStatus.UNAUTHORIZED
      );
    }    
    const auth = getAuth(this.firebase);
    try{
      const user = await auth.getUser(updateUserDto.uid);
      if(user.uid !== request.user.uid && user.customClaims.state >= request.user.state){
        throw new HttpException(
          "허가되지 않은 행동입니다.",
          HttpStatus.UNAUTHORIZED
        );
      }       
      if(!updateUserDto.state){
        updateUserDto.state = user.customClaims.state;
      }
      if(!updateUserDto.type){
        updateUserDto.type = user.customClaims.type;
      }
      await auth.setCustomUserClaims(updateUserDto.uid, {state: updateUserDto.state, type: updateUserDto.type});
    }
    catch(error){
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST
      );
    }
    
    return "success";
  }

  async remove(uid: string): Promise<string | undefined>{
    const auth = getAuth(this.firebase);
    return auth.updateUser(uid, {
      disabled: true,
    })
    .then(() => {
      return "success";
    })
    .catch((error) => {
      throw new HttpException(
        error.message,
        HttpStatus.NOT_MODIFIED
      )
    });
  }
}
