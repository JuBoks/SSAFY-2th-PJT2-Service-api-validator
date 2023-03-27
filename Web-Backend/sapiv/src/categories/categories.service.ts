import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable} from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError, config } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly httpService: HttpService) {}
  async create(createCategoryDto: CreateCategoryDto, request) {
    const { data } = await firstValueFrom(
      this.httpService.post<Category[]>('http://api-validator:3000/validator/web/categories', createCategoryDto ).pipe(
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
      this.httpService.get<Category[]>('https://j8s002.p.ssafy.io/validator/web/categories', {headers: {chk: '3c9ceb53eaf16cb85638af6e57922347a29e1d11998bfc1db70674f4e7fd6078'}}).pipe(
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
