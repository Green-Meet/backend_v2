import { Test } from '@nestjs/testing';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { actionToTest } from './utils/dataset';

describe('ActionsController', () => {
  let actionsController: ActionsController;
  let actionsService: ActionsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ActionsController],
      providers: [ActionsService],
    }).compile();

    actionsService = moduleRef.get<ActionsService>(ActionsService);
    actionsController = moduleRef.get<ActionsController>(ActionsController);
  });

  describe('findAll', () => {
    it('should return an array of Actions', async () => {
      const result = [actionToTest];
      jest
        .spyOn(actionsService, 'getAllActions')
        .mockImplementation(() => result);
      expect(await actionsController.findAll()).toBe(result);
    });
  });
});
