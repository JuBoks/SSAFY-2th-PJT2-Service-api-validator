import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNumber } from 'class-validator';

export class ExpectResponseDto {

    @ApiProperty()
    response: JSON;
    
}