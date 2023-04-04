import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { Category } from 'src/categories/entities/category.entity';
import { Domain } from 'src/domains/entities/domain.entity';
import { Metadata } from 'src/metadatas/entities/metadata.entity';
import { DataSource } from 'typeorm';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { Api } from './entities/api.entity';
import { TestCase } from './entities/testcase.entity';

@Injectable()
export class ApisService {
  constructor(private readonly httpService: HttpService, private dataSource: DataSource) {}

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
      return result.data;
    }
    catch(error){
      console.log(error.reseponse);
      if(error.response && error.response.status >= 400){
        return error.response.data;
      }
      throw new HttpException(
        "Fail",
        HttpStatus.FORBIDDEN
      );
    }

    return result['data'];
  }

  async findAll(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<Api>(process.env.VALIDATOR_API, {headers: {chk: process.env.SERVER_KEY}, params: {domain_id: id}} ).pipe(
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

  async listAll(): Promise<Api[]>{
    return await this.dataSource
    .getRepository(Api)
    .find();
  }

  async findOne(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<Api>(process.env.VALIDATOR_API+`/${id}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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
      this.httpService.put<Api>(process.env.VALIDATOR_API+`/${id}`, updateApiDto, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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
      this.httpService.delete<Api>(process.env.VALIDATOR_API+`/${id}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async testCaseAll(): Promise<TestCase[]> {
    return await this.dataSource
    .createQueryBuilder()
    .from(Metadata, "metadata")
    .leftJoinAndSelect(Api, "api", "api.api_id = metadata.api_id")
    .leftJoinAndSelect(Domain, "domain", "domain.domain_id = api.domain_id")
    .leftJoinAndSelect(Category, "category", "category.category_id = domain.category_id")
    .andWhere("metadata.state = 0")
    .andWhere("category.state = 0")
    .andWhere("domain.state = 0")
    .andWhere("api.state = 0")
    .select(["metadata.meta_id",
    "category.name",
    "domain.domain", 
    "api.resources",
    "api.method",
    "metadata.header",
    "metadata.params",
    "metadata.body",
    "metadata.name", 
    "metadata.cycle_time",
    "metadata.last_req_time"])
    .getRawMany();
  }

  async testCaseOne(id : number): Promise<TestCase> {
    return await this.dataSource
    .createQueryBuilder()
    .from(Metadata, "metadata")
    .leftJoinAndSelect(Api, "api", "api.api_id = metadata.api_id")
    .leftJoinAndSelect(Domain, "domain", "domain.domain_id = api.domain_id")
    .leftJoinAndSelect(Category, "category", "category.category_id = domain.category_id")
    .where("metadata.meta_id = :id")
    .setParameter("id", id)
    .select(["metadata.meta_id",
    "category.name",
    "domain.domain", 
    "api.resources",
    "api.method",
    "metadata.header",
    "metadata.params",
    "metadata.body",
    "metadata.name", 
    "metadata.cycle_time",
    "metadata.last_req_time"])
    .getRawOne();
  }
}
