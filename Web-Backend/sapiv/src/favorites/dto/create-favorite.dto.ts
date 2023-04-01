import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class CreateFavoriteDto {
  @ApiPropertyOptional()
  @IsArray()
  apis: Array<number>;
  
  
}
