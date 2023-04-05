import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class EmailDto {
  @ApiProperty()
  msg: JSON;

  @ApiProperty()
  @IsDateString()
  time: string;

  @ApiProperty()
  @IsNumber()
  result_id: number;
}
