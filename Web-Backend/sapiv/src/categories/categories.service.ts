import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable} from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { DataSource } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly httpService: HttpService, private dataSource: DataSource) {}
  async create(createCategoryDto: CategoryDto, request) {
    const { data } = await firstValueFrom(
      this.httpService.post<Category[]>(process.env.VALIDATOR_CATEGORY, createCategoryDto, {headers: {chk: process.env.SERVER_KEY}} ).pipe(
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
      this.httpService.get<Category[]>(process.env.VALIDATOR_CATEGORY, {headers: {chk: process.env.SERVER_KEY}}).pipe(
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
      this.httpService.get<Category[]>(process.env.VALIDATOR_CATEGORY + `/${id}`, {headers: {chk: process.env.SERVER_KEY}}).pipe(
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

  async update(id: number, categoryDto: CategoryDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<Category[]>(process.env.VALIDATOR_CATEGORY + `/${id}`, categoryDto, {headers: {chk: process.env.SERVER_KEY}}).pipe(
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
      this.httpService.delete<Category[]>(process.env.VALIDATOR_CATEGORY + `/${id}`, {headers: {chk: process.env.SERVER_KEY}}).pipe(
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

  async listAll(): Promise<Category[]>{
    return await this.dataSource
    .getRepository(Category)
    .find();
  }
}
