import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateApiDto {
    
    @ApiProperty()
    @IsNumber()
    domain_id: number;
    
    @ApiProperty()
    @IsNumber()
    method: number;
    
    @ApiProperty()
    @IsString()
    resources: string;
    
}
