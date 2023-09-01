import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ActionsService } from './actions.service';
import { actionToTest } from './utils/dataset';
import { INestApplication } from '@nestjs/common';
import { ActionsController } from './actions.controller';

describe('ActionsController', () => {
  let app: INestApplication;
  const actionsService = { getAllActions: () => actionToTest };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ActionsController],
      providers: [ActionsService],
    })
      .overrideProvider(ActionsService)
      .useValue(actionsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET actions`, async () => {
    const response = await request(app.getHttpServer())
      .get('/actions')
      .expect(200);
    expect(response.body).toStrictEqual(actionsService.getAllActions());
  });

  afterAll(async () => {
    await app.close();
  });
});
