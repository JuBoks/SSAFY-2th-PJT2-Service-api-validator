import { ApiProperty } from "@nestjs/swagger";
import { AxiosRequestConfig, Method } from "axios";

export class TestApiDto implements AxiosRequestConfig{
    @ApiProperty()
    url?: string;
    method?: Method | string;
    baseURL?: string;
}