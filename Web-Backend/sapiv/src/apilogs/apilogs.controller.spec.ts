import { Test, TestingModule } from '@nestjs/testing';
import { ApilogsController } from './apilogs.controller';
import { ApilogsService } from './apilogs.service';

describe('ApilogsController', () => {
  let controller: ApilogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApilogsController],
      providers: [ApilogsService],
    }).compile();

    controller = module.get<ApilogsController>(ApilogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
