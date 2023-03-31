import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { DataSource } from 'typeorm';
import { DomainDto } from './dto/domain.dto';
import { Domain } from './entities/domain.entity';

@Injectable()
export class DomainsService {
  constructor(private readonly httpService: HttpService, private dataSource: DataSource) {}

  async create(createDomainDto: DomainDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<Domain>(process.env.VALIDATOR_DOMAIN, createDomainDto, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async findAll(id : number) {
    const { data } = await firstValueFrom(
      this.httpService.get<Domain[]>(process.env.VALIDATOR_DOMAIN, {headers: {chk: process.env.SERVER_KEY}, params: {category_id: id}} ).pipe(
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
      this.httpService.get<Domain>(process.env.VALIDATOR_DOMAIN + `/${id}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async update(id: number, updateDomainDto: DomainDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<Domain>(process.env.VALIDATOR_DOMAIN + `/${id}`, updateDomainDto, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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
      this.httpService.delete<Domain>(process.env.VALIDATOR_DOMAIN + `/${id}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async listAll(): Promise<Domain[]>{
    return await this.dataSource
    .getRepository(Domain)
    .find();
  }
}
