import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Injectable()
export class ApisService {
  create(createApiDto: CreateApiDto) {
    return 'This action adds a new api';
  }

  async test(requestConfig: AxiosRequestConfig){
    let result;
    try{
      result = await axios.request(requestConfig);
      console.log(result);
    }
    catch(error){
      throw new HttpException(
        "Fail",
        HttpStatus.FORBIDDEN
      );
    }

    return result['data'];
  }

  findAll() {
    return `This action returns all apis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} api`;
  }

  update(id: number, updateApiDto: UpdateApiDto) {
    return `This action updates a #${id} api`;
  }

  remove(id: number) {
    return `This action removes a #${id} api`;
  }
}
