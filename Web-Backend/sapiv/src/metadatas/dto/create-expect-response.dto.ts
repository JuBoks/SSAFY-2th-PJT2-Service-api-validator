import { ApiProperty } from '@nestjs/swagger';

export class ExpectResponseDto {

    @ApiProperty()
    response: JSON;
    
}