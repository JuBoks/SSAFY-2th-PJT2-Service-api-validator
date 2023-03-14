import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';



@Injectable()
export class UsersService {
  // 파이어베이스 설정
  firebase = initializeApp({
    credential : applicationDefault()
  })
  
  async create(createUserDto: CreateUserDto) {
    // 파이어베이스 연결
    const auth = getAuth(this.firebase);

    // 회원가입 시도
    let myPromise =
    auth
    .createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      displayName: createUserDto.name,
    })
    .then((userRecord) => {
      return userRecord;
    })
    .catch((error) => {
      return error;
    });

    // 회원가입 결과
    let userInfo = await myPromise;

    // Error가 발생했을 경우
    if(userInfo instanceof Error){
      throw new HttpException(
        userInfo.message,
        HttpStatus.FORBIDDEN
      );
    }
    else{ // Error가 발생하지 않은 경우
      // state 값과 type 값을 firebase에 저장
      myPromise = 
      auth
      .setCustomUserClaims(userInfo.uid, {
state: 0, type: createUserDto.type
      })
      .catch((error) => {
        return error;
      });
    }

    let saveInfo = await myPromise;

    // state 값과 type 값을 저장하던 중 오류 발생 시
    if(saveInfo instanceof Error){
      auth
      .deleteUser(userInfo.uid); // 만들었던 유저 삭제
      throw new HttpException(
        saveInfo.message,
        HttpStatus.FORBIDDEN
      );
    }
    else{
      return userInfo.uid; // 성공 시 uid 반환
    }
  }

  async findAll() {
    const auth = getAuth(this.firebase);
    let userInfo = auth.getUser('YFONccXiUTRaXCAHEziRdfvzO8A3')
    .then((userRecord) => {
      console.log(userRecord);
    })
    return await userInfo;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
