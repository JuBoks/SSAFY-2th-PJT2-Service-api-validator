import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNumber } from 'class-validator';

export class ExpectResponseDto {
   
    @ApiProperty()
    @IsNumber()
    data_Id: number;

    @ApiProperty()
    @IsJSON()
    response: JSON;
    
}