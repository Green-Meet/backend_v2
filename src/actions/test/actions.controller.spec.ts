import { ActionController } from '../actions.controller';
import { ActionService } from '../actions.service';
import { actionToTest } from './dataset';

describe('ActionsController', () => {
  let actionsController: ActionController;
  let actionsService: ActionService;

  beforeEach(() => {
    actionsService = new ActionService();
    actionsController = new ActionController(actionsService);
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
