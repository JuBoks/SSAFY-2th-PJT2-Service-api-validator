import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { USER_STATE, USER_TYPE } from 'src/common/constants';

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    uid: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(USER_STATE)
    state?: USER_STATE;

    @ApiProperty()
    @IsOptional()
    @IsEnum(USER_TYPE)
    type?: USER_TYPE;
}
