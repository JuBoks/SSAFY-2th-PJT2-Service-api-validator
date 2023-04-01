import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    note: string;
 
}
