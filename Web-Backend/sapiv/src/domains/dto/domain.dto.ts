import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DomainDto {

    @ApiProperty()
    @IsNumber()
    category_id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    domain: string;
}
