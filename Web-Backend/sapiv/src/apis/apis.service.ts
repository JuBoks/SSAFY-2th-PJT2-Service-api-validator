import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { Api } from './entities/api.entity';

@Injectable()
export class ApisService {
  constructor(private readonly httpService: HttpService) {}

  async create(createApiDto: CreateApiDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<Api>(process.env.VALIDATOR_API, createApiDto, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            error.message,
            error.status
          );
        }),
      ),
    );
    return data;
  }

  async test(requestConfig: AxiosRequestConfig){
    let result;
    try{
      result = await axios.request(requestConfig);
    }
    catch(error){
      throw new HttpException(
        "Fail",
        HttpStatus.FORBIDDEN
      );
    }

    return result['data'];
  }

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get<Api>(process.env.VALIDATOR_API, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            error.message,
            error.status
          );
        }),
      ),
    );
    return data;
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<Api>(process.env.VALIDATOR_API, {headers: {chk: process.env.SERVER_KEY}, params: {metaId: id}} ).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            error.message,
            error.status
          );
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateApiDto: UpdateApiDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<Api>(process.env.VALIDATOR_API, updateApiDto, {headers: {chk: process.env.SERVER_KEY}, params: {metaId: id}} ).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            error.message,
            error.status
          );
        }),
      ),
    );
    return data;
  }

  async remove(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.put<Api>(process.env.VALIDATOR_API, {headers: {chk: process.env.SERVER_KEY}, params: {metaId: id}} ).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(
            error.message,
            error.status
          );
        }),
      ),
    );
    return data;
  }
}
