import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { ExpectResponseDto } from './dto/create-expect-response.dto';
import { MetadataDto } from './dto/metadata.dto';
import { ExpectResponse } from './entities/expect-response.entity';
import { Metadata } from './entities/metadata.entity';

@Injectable()
export class MetadatasService {
  constructor(private readonly httpService: HttpService) {}

  async create(createMetadataDto: MetadataDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<Metadata>(process.env.VALIDATOR_METADATA, createMetadataDto, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async findAll(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<Metadata[]>(process.env.VALIDATOR_METADATA, {headers: {chk: process.env.SERVER_KEY}, params: {api_id: id}} ).pipe(
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
      this.httpService.get<Metadata>(process.env.VALIDATOR_METADATA + `/${id}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async update(id: number, updateMetadataDto: MetadataDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<Metadata>(process.env.VALIDATOR_METADATA + `/${id}`, updateMetadataDto, {headers: {chk: process.env.SERVER_KEY}}).pipe(
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
      this.httpService.delete<Metadata>(process.env.VALIDATOR_METADATA + `/${id}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async test(id: number){
    const { data } = await firstValueFrom(
      this.httpService.post<any>(process.env.VALIDATOR_METADATA + `/${id}/test`, '', {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async expect(id: number, expectResponseDto: ExpectResponseDto){
    const { data } = await firstValueFrom(
      this.httpService.post<ExpectResponse>(process.env.VALIDATOR_METADATA + `/${id}/expect`, expectResponseDto, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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
