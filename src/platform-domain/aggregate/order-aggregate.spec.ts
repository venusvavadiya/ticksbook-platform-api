import { SYSTEM } from '@pl-oss/core';
import {
  OrderCreated,
  OrderQuantityNotIntegerException,
  OrderUnitPriceNotIntegerException,
} from '../../platform-type';
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
      expect(aggregate.uncommittedEvents)
        .toContainEqual(new OrderCreated('orderBookId', aggregate.id, 'tickerId', 1, 1, SYSTEM));
    });

    it('should throw new OrderQuantityNotIntegerException if quantity is not an integer', () => {
      expect(aggregate.create.bind(aggregate, 'orderBookId', 'tickerId', 1.5, 1, SYSTEM))
        .toThrowError(new OrderQuantityNotIntegerException(aggregate.id, 1.5));
    });

    it('should throw new OrderUnitPriceNotIntegerException if unitPrice is not an integer', () => {
      expect(aggregate.create.bind(aggregate, 'orderBookId', 'tickerId', 1, 1.5, SYSTEM))
        .toThrowError(new OrderUnitPriceNotIntegerException(aggregate.id, 1.5));
    });
  });
});
