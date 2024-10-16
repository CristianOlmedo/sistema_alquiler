import { Test, TestingModule } from '@nestjs/testing';
import { ContratosAlquilerController } from './contratos_alquiler.controller';

describe('ContratosAlquilerController', () => {
  let controller: ContratosAlquilerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosAlquilerController],
    }).compile();

    controller = module.get<ContratosAlquilerController>(ContratosAlquilerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
