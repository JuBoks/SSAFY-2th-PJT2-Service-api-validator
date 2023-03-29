import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { API_METHOD } from 'src/common/constants';

export class CreateApiDto {
    
    @ApiProperty()
    @IsNumber()
    domain_id: number;
    
    @ApiProperty()
    @IsEnum(API_METHOD)
    method: API_METHOD;
    
    @ApiProperty()
    @IsString()
    resources: string;
    
}
