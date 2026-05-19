import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LiabilityService } from './liability.service';
import { Liability } from './entities/liability.entity';
import { LiabilityType } from './enums/liability-type.enum';
import { LiabilityStatus } from './enums/liability-status.enum';

describe('LiabilityService', () => {
  let service: LiabilityService;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LiabilityService,
        { provide: getRepositoryToken(Liability), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<LiabilityService>(LiabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('ping', () => {
    expect(service.ping()).toBe('[Liability] I am alive.');
  });

  it('create', async () => {
    const dto = { studentId: 1, issuerId: 2, type: LiabilityType.FINE, amount: 150, dueDate: '2025-12-31' };
    mockRepo.create.mockReturnValue(dto);
    mockRepo.save.mockResolvedValue({ id: 1, ...dto, status: LiabilityStatus.UNPAID });

    const result = await service.create(dto as any);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(result).toMatchObject({ id: 1 });
  });

  it('findAll', async () => {
    mockRepo.find.mockResolvedValue([]);
    const result = await service.findAll({});
    expect(mockRepo.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('findOne', async () => {
    mockRepo.findOne.mockResolvedValue({ id: 1 });
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1 });
  });

  it('update', async () => {
    mockRepo.update.mockResolvedValue({ affected: 1 });
    mockRepo.findOne.mockResolvedValue({ id: 1, amount: 200 });
    const result = await service.update(1, { amount: 200 });
    expect(mockRepo.update).toHaveBeenCalledWith(1, { amount: 200 });
    expect(result).toMatchObject({ id: 1 });
  });

  it('remove', async () => {
    mockRepo.findOne.mockResolvedValue({ id: 1 });
    mockRepo.softRemove.mockResolvedValue({ id: 1 });
    const result = await service.remove(1);
    expect(mockRepo.softRemove).toHaveBeenCalled();
    expect(result).toEqual({ id: 1 });
  });
});
