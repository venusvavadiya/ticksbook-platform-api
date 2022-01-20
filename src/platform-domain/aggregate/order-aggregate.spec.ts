import { SYSTEM } from '@pl-oss/core';
import { OrderCreated } from '../../platform-type';
import { OrderAggregate } from './order-aggregate';

jest.mock('uuid', () => ({ v4: () => 'uuid' }));

describe('aggregate', () => {
  let aggregate: OrderAggregate;

  beforeEach(() => {
    aggregate = new OrderAggregate('id');

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date());
  });

  afterEach(jest.clearAllMocks);

  describe('streamNamePrefix', () => {
    it('should return prefix', () => {
      expect(aggregate.streamNamePrefix).toStrictEqual('TB-OrderAggregate');
    });
  });

  describe('create', () => {
    it('should raise new OrderCreated', () => {
      const result = aggregate.create('orderBookId', 'tickerId', 1, 1, SYSTEM);

      expect(aggregate).toStrictEqual(result);
      expect(aggregate.uncommittedEvents).toContainEqual(new OrderCreated(
        'orderBookId',
        aggregate.id,
        'tickerId',
        1,
        1,
        SYSTEM,
      ));
    });
  });
});
