import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateFavoriteDto {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  description: string;
  @ApiPropertyOptional()
  filename: string;
  @ApiPropertyOptional()
  views: number;
  
}
