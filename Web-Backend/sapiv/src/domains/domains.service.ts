import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { DomainDto } from './dto/domain.dto';
import { Domain } from './entities/domain.entity';

@Injectable()
export class DomainsService {
  constructor(private readonly httpService: HttpService) {}

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

  async findAll() {
    const { data } = await firstValueFrom(
      this.httpService.get<Domain[]>(process.env.VALIDATOR_DOMAIN, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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
      this.httpService.get<Domain>(process.env.VALIDATOR_DOMAIN, {headers: {chk: process.env.SERVER_KEY}, params: {domainId: id}} ).pipe(
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
      this.httpService.put<Domain>(process.env.VALIDATOR_DOMAIN, updateDomainDto, {headers: {chk: process.env.SERVER_KEY}, params: {domainId: id}} ).pipe(
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
      this.httpService.delete<Domain>(process.env.VALIDATOR_DOMAIN, {headers: {chk: process.env.SERVER_KEY}, params: {domainId: id}} ).pipe(
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
