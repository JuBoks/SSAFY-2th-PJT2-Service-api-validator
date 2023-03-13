import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';



@Injectable()
export class UsersService {
  firebase = initializeApp({
    credential : applicationDefault()
  })

  create(createUserDto: CreateUserDto) {
    let userInfo;
    const auth = getAuth(this.firebase);

    auth
    .createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      displayName: createUserDto.name,
    })
    .then((userRecord) => {
      userInfo = userRecord;
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
  
    return userInfo;
  }

  findAll() {
    return `This action returns all users`;
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
