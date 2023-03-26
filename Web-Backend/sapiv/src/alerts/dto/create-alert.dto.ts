import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class CreateAlertDto {
  @ApiPropertyOptional()
  @IsArray()
  apis: Array<number>;
}
