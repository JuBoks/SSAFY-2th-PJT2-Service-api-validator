import { Test, TestingModule } from '@nestjs/testing';
import { MetadatasService } from './metadatas.service';

describe('MetadatasService', () => {
  let service: MetadatasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadatasService],
    }).compile();

    service = module.get<MetadatasService>(MetadatasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
