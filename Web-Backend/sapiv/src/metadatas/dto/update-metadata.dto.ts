import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateMetadataDto  {
    @ApiProperty()
    @IsNumber()
    response_id: number;
}
