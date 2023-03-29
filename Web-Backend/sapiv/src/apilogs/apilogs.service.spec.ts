import { Test, TestingModule } from '@nestjs/testing';
import { ApilogsService } from './apilogs.service';

describe('ApilogsService', () => {
  let service: ApilogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApilogsService],
    }).compile();

    service = module.get<ApilogsService>(ApilogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
