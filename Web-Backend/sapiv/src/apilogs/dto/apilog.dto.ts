import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TimeDto } from './apitime.dto';

export class LogDto extends PartialType(TimeDto){

    @ApiProperty()
    metaId: string;
    
}
