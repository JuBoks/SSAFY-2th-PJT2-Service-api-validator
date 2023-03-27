import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { firstValueFrom, catchError } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly httpService: HttpService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  async create(createCategoryDto: CreateCategoryDto, request) {
    const { data } = await firstValueFrom(
      this.httpService.post<Category[]>('http://localhost:8070/validator').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
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
      this.httpService.get<Category[]>('http://api-validator/validator/api').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new HttpException(
            error.message,
            error.status
          );
        }),
      ),
    );
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
