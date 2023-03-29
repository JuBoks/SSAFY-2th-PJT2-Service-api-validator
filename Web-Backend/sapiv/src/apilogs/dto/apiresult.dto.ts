import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { TimeDto } from "./apitime.dto";

export class ResultDto extends PartialType(TimeDto){
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    month?: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    week?: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    day?: string;

}
