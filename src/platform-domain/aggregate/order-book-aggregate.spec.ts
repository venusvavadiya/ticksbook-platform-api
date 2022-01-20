import { SYSTEM } from '@pl-oss/core';
import {
  OrderBookArchived,
  OrderBookAlreadyArchivedException,
  OrderBookCreated,
  OrderBookRenamed,
  OrderBookUnarchived,
  OrderBookNotArchivedException,
} from '../../platform-type';
import { OrderBookAggregate } from './order-book-aggregate';

jest.mock('uuid', () => ({ v4: () => 'uuid' }));

describe('aggregate', () => {
  let aggregate: OrderBookAggregate;

  beforeEach(() => {
    aggregate = new OrderBookAggregate('id');

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date());
  });

  afterEach(jest.clearAllMocks);

  describe('streamNamePrefix', () => {
    it('should return prefix', () => {
      expect(aggregate.streamNamePrefix).toStrictEqual('TB-OrderBookAggregate');
    });
  });

  describe('isArchived', () => {
    it('should return isArchived', () => {
      aggregate
        .create('name', SYSTEM)
        .archive(SYSTEM);

      expect(aggregate.isArchived()).toStrictEqual(true);
    });
  });

  describe('archive', () => {
    it('should raise new OrderBookArchived if unarchived', () => {
      const result = aggregate
        .create('name', SYSTEM)
        .archive(SYSTEM);

      expect(aggregate).toStrictEqual(result);
      expect(aggregate.uncommittedEvents)
        .toContainEqual(new OrderBookArchived(aggregate.id, SYSTEM));
    });

    it('should throw new OrderBookAlreadyArchivedException if archived', () => {
      aggregate
        .create('name', SYSTEM)
        .archive(SYSTEM);

      expect(aggregate.archive.bind(aggregate))
        .toThrowError(new OrderBookAlreadyArchivedException(aggregate.id));
    });
  });

  describe('create', () => {
    it('should raise new OrderBookCreated', () => {
      const result = aggregate.create('name', SYSTEM);

      expect(aggregate).toStrictEqual(result);
      expect(aggregate.uncommittedEvents)
        .toContainEqual(new OrderBookCreated(aggregate.id, 'name', SYSTEM));
    });
  });

  describe('rename', () => {
    it('should raise new OrderBookRenamed', () => {
      const result = aggregate
        .create('name', SYSTEM)
        .rename('newName', SYSTEM);

      expect(aggregate).toStrictEqual(result);
      expect(aggregate.uncommittedEvents)
        .toContainEqual(new OrderBookRenamed(aggregate.id, 'newName', SYSTEM));
    });
  });

  describe('unarchive', () => {
    it('should raise new OrderBookUnarchived if archived', () => {
      const result = aggregate
        .create('name', SYSTEM)
        .archive(SYSTEM)
        .unarchive(SYSTEM);

      expect(aggregate).toStrictEqual(result);
      expect(aggregate.uncommittedEvents)
        .toContainEqual(new OrderBookUnarchived(aggregate.id, SYSTEM));
    });

    it('should throw new OrderBookNotArchivedException if unarchived', () => {
      aggregate
        .create('name', SYSTEM)
        .archive(SYSTEM)
        .unarchive(SYSTEM);

      expect(aggregate.unarchive.bind(aggregate))
        .toThrowError(new OrderBookNotArchivedException(aggregate.id));
    });
  });
});
