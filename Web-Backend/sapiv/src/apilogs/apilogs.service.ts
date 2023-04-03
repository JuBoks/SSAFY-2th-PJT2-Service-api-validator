import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { LogDto } from 'src/apilogs/dto/apilog.dto';
import { ResultDto } from './dto/apiresult.dto';
import { TimeDto } from './dto/apitime.dto';


@Injectable()
export class ApilogsService {
  constructor(private readonly httpService: HttpService) {}
  
  async getLogsByMetaId(logDto: LogDto) {
    console.log(logDto);
    const { data } = await firstValueFrom(
      this.httpService.get<any>(process.env.VALIDATOR_LOG + `?startTime=${logDto.startTime}&endTime=${logDto.endTime}&metaId=${logDto.metaId}`, {headers: {chk: process.env.SERVER_KEY} } ).pipe(
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
  
  async getLogByResultId(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<any>(process.env.VALIDATOR_LOG+`/${id}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async getResultByMetaId(id: number, resultDto: ResultDto) {
    let query;
    if(resultDto.month){
      query = `month=${resultDto.month}`;
    }
    else if(resultDto.week){
      query = `week=${resultDto.week}`;
    }
    else if(resultDto.day){
      query = `day=${resultDto.day}`;
    }
    else{
      query = `day=1`;
    }
    const { data } = await firstValueFrom(
      this.httpService.get<any>(process.env.VALIDATOR_LOG + `/graph/metadatas/${id}?startTime=${resultDto.startTime}&endTime=${resultDto.endTime}&${query}`, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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

  async getResultByAction(resultDto: ResultDto) {
    let query;
    if(resultDto.month){
      query = `month=${resultDto.month}`;
    }
    else if(resultDto.week){
      query = `week=${resultDto.week}`;
    }
    else if(resultDto.day){
      query = `day=${resultDto.day}`;
    }
    else{
      query = `day=1`;
    }
    const { data } = await firstValueFrom(
      this.httpService.get<any>(process.env.VALIDATOR_LOG + `/graph/action?startTime=${resultDto.startTime}&endTime=${resultDto.endTime}&${query}`, {headers: {chk: process.env.SERVER_KEY} } ).pipe(
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
