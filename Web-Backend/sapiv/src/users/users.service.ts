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

  async findAll(): Promise<void> {
    const auth = getAuth(this.firebase);
    let userInfo = auth.getUser('YFONccXiUTRaXCAHEziRdfvzO8A3')
    .then((userRecord) => {
      console.log(userRecord);
    })
    return userInfo;
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
    if(updateUserDto.state !== undefined && updateUserDto.state >= request.user.state){
      throw new HttpException(
        "허가되지 않은 행동입니다.",
        HttpStatus.UNAUTHORIZED
      );
    }
    if(updateUserDto.type !== undefined && updateUserDto.uid !== request.user.uid){
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
      if(updateUserDto.state === undefined){
        updateUserDto.state = user.customClaims.state;
      }
      if(updateUserDto.type === undefined){
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
