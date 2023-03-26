import { Injectable } from '@nestjs/common';
import { CreateMetadataDto } from './dto/create-metadata.dto';
import { UpdateMetadataDto } from './dto/update-metadata.dto';

@Injectable()
export class MetadatasService {
  create(createMetadataDto: CreateMetadataDto) {
    return 'This action adds a new metadata';
  }

  findAll() {
    return `This action returns all metadatas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metadata`;
  }

  update(id: number, updateMetadataDto: UpdateMetadataDto) {
    return `This action updates a #${id} metadata`;
  }

  remove(id: number) {
    return `This action removes a #${id} metadata`;
  }
}
