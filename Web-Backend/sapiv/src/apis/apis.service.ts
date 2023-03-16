import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig, RawAxiosRequestConfig } from 'axios';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Injectable()
export class ApisService {
  constructor(private readonly httpService: HttpService){}
  create(createApiDto: CreateApiDto) {
    return 'This action adds a new api';
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

  async test(requestConfig: AxiosRequestConfig){
    let result = await axios.request(requestConfig);
    return result['data'];
  }

}
