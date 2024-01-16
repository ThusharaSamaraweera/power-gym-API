import { Test, TestingModule } from '@nestjs/testing';
import { AiPlanService } from './ai.service';

describe('AiPlanService', () => {
  let service: AiPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiPlanService],
    }).compile();

    service = module.get<AiPlanService>(AiPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
