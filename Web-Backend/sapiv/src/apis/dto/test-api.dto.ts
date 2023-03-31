import { ApiProperty } from '@nestjs/swagger';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { IsString, IsUrl } from 'class-validator';
export class TestApiDto implements AxiosRequestConfig{
    @ApiProperty()
    @IsUrl()
    url: string;

    @ApiProperty()
    headers: AxiosHeaders;
    
    @ApiProperty()
    params: JSON;
    
    @ApiProperty()
    data: JSON;

    @ApiProperty()
    @IsString()
    method: string;
}
