import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNumber, IsString } from 'class-validator';

export class MetadataDto {
   
    @ApiProperty()
    @IsNumber()
    api_id: number;

    @ApiProperty()
    @IsJSON()
    header: JSON;
    
    @ApiProperty()
    @IsJSON()
    params: JSON;
    
    @ApiProperty()
    @IsJSON()
    body: JSON;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    cycle_time: number;

}
