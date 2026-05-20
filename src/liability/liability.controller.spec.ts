import { Test, TestingModule } from '@nestjs/testing';
import { LiabilityController } from './liability.controller';
import { LiabilityService } from './liability.service';
import { CreateLiabilityDto } from './dto/create-liability.dto';
import { LiabilityType } from './enums/liability-type.enum';
import { LiabilityStatus } from './enums/liability-status.enum';

describe('LiabilityController', () => {
  let controller: LiabilityController;
  let service: LiabilityService;

  const mockService = {
    ping: jest.fn(() => '[Liability] I am alive.'),
    create: jest.fn((dto) => ({ id: 1, ...dto, status: LiabilityStatus.UNPAID })),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id) => ({ id, type: LiabilityType.FINE, amount: 100 })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiabilityController],
      providers: [{ provide: LiabilityService, useValue: mockService }],
    }).compile();

    controller = module.get<LiabilityController>(LiabilityController);
    service = module.get<LiabilityService>(LiabilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('ping', () => {
    expect(controller.ping()).toBe('[Liability] I am alive.');
  });

  it('create', () => {
    const dto: CreateLiabilityDto = {
      studentId: 1, issuerId: 2, type: LiabilityType.FINE,
      amount: 150, dueDate: '2025-12-31',
    };
    const result = controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toMatchObject({ id: 1, amount: 150 });
  });

  it('findAll', () => {
    const query = { type: LiabilityType.FINE };
    controller.findAll(query);
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('findOne', () => {
    const result = controller.findOne({ id: 1 });
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toMatchObject({ id: 1 });
  });

  it('update', () => {
    const result = controller.update({ id: 1, amount: 200 });
    expect(service.update).toHaveBeenCalledWith(1, { amount: 200 });
  });

  it('remove', () => {
    const result = controller.remove({ id: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
