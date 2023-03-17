import { ApiProperty } from '@nestjs/swagger';
import { AxiosRequestConfig } from 'axios';
export class TestApiDto implements AxiosRequestConfig{
    @ApiProperty()
    url: string;

    @ApiProperty()
    method: string;
}
