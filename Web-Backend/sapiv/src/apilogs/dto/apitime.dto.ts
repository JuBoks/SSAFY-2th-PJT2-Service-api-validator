import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";


export class TimeDto {
    @ApiProperty()
    @IsDateString()
    startTime: Date;
    
    @ApiProperty()
    @IsDateString()
    endTime: Date;
}
