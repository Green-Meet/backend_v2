import { Action } from 'src/types/action.type';

export const actionToTest: Action = {
  action_id: 1,
  title: 'Test dev',
  type: 'ramassage',
  description:
    'test dev test dev test dev test dev test dev test dev test dev test dev test dev test dev test dev test dev test dev test dev ',
  address: '{"strTyp":"rue","strNumb":"1","strNam":"test","zipCode":"01000"}',
  city: 'test',
  begin_date: new Date('2022-10-01T22:00:00.000Z'),
  end_date: new Date('2022-10-02T22:00:00.000Z'),
  begin_time: '09:00',
  end_time: '10:30',
  organiser_id: 6,
  status: 0,
};
