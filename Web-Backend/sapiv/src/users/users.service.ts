import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { User } from './entities/user.entity';


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
        state: 0, type: createUserDto.type
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
    return await userInfo;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
