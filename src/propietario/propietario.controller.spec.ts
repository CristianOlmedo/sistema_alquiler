import { Test, TestingModule } from '@nestjs/testing';
import { PropietarioController } from './propietario.controller';

describe('PropietarioController', () => {
  let controller: PropietarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropietarioController],
    }).compile();

    controller = module.get<PropietarioController>(PropietarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
