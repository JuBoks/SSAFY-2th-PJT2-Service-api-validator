import { Test, TestingModule } from '@nestjs/testing';
import { MetadatasController } from './metadatas.controller';
import { MetadatasService } from './metadatas.service';

describe('MetadatasController', () => {
  let controller: MetadatasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadatasController],
      providers: [MetadatasService],
    }).compile();

    controller = module.get<MetadatasController>(MetadatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
