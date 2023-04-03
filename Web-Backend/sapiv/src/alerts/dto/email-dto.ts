import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class EmailDto {
  @ApiProperty()
  @IsString()
  msg: JSON;

  @ApiProperty()
  @IsDateString()
  time: string;

  @ApiProperty()
  @IsNumber()
  result_id: number;
}
