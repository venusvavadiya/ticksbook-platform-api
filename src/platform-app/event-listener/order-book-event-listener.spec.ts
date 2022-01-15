import { GraphQLService } from '@pl-oss/core';
import { mock } from 'jest-mock-extended';
import {
  OrderBookArchived,
  OrderBookCreated,
  OrderBookRenamed,
  OrderBookUnarchived,
} from '../../platform-type';
import { OrderBookEntity } from '../entity/order-book-entity';
import { OrderBookEntityRepository } from '../entity-repository/order-book-entity-repository';
import { OrderBookEventListener } from './order-book-event-listener';

describe('OrderBookEventListener', () => {
  let graphQLService: GraphQLService;
  let orderBookRepository: OrderBookEntityRepository;
  let listener: OrderBookEventListener;

  beforeEach(() => {
    graphQLService = mock<GraphQLService>();
    orderBookRepository = mock<OrderBookEntityRepository>();
    listener = new OrderBookEventListener({
      graphQLService,
      orderBookEntityRepository: orderBookRepository,
    });

    jest.spyOn(graphQLService, 'publish').mockResolvedValue();
  });

  afterEach(jest.clearAllMocks);

  describe('getEventTypePrefixes', () => {
    it('should return prefixes', () => {
      expect(listener.getStreamNamePrefixes()).toStrictEqual(['TB-OrderBookAggregate']);
    });
  });

  describe('onOrderBookArchived', () => {
    it('should handle OrderBookArchived', async () => {
      const orderBook = new OrderBookEntity('id', 'name');
      jest.spyOn(orderBookRepository, 'getById').mockResolvedValue(orderBook);

      await listener.on(new OrderBookArchived('id', 'by'));

      expect(orderBookRepository.getById).toHaveBeenCalledTimes(1);
      expect(orderBookRepository.getById).toHaveBeenNthCalledWith(1, 'id');

      expect(orderBook.isArchived).toStrictEqual(true);

      expect(graphQLService.publish).toHaveBeenCalledTimes(1);
      expect(graphQLService.publish).toHaveBeenNthCalledWith(1, 'OrderBookUpdated', { OrderBookUpdated: orderBook });

      expect(orderBookRepository.save).toHaveBeenCalledTimes(1);
      expect(orderBookRepository.save).toHaveBeenNthCalledWith(1, orderBook);
    });
  });

  describe('onOrderBookCreated', () => {
    it('should handle OrderBookCreated', async () => {
      const orderBook = new OrderBookEntity('id', 'name');
      await listener.on(new OrderBookCreated('id', 'name', 'by'));

      expect(graphQLService.publish).toHaveBeenCalledTimes(1);
      expect(graphQLService.publish).toHaveBeenNthCalledWith(1, 'OrderBookCreated', { OrderBookCreated: orderBook });

      expect(orderBookRepository.save).toHaveBeenCalledTimes(1);
      expect(orderBookRepository.save).toHaveBeenNthCalledWith(1, new OrderBookEntity('id', 'name'));
    });
  });

  describe('onOrderBookRenamed', () => {
    it('should handle OrderBookRenamed', async () => {
      const orderBook = new OrderBookEntity('id', 'name');
      jest.spyOn(orderBookRepository, 'getById').mockResolvedValue(orderBook);

      await listener.on(new OrderBookRenamed('id', 'newName', 'by'));

      expect(orderBookRepository.getById).toHaveBeenCalledTimes(1);
      expect(orderBookRepository.getById).toHaveBeenNthCalledWith(1, 'id');

      expect(orderBook.name).toStrictEqual('newName');

      expect(graphQLService.publish).toHaveBeenCalledTimes(1);
      expect(graphQLService.publish).toHaveBeenNthCalledWith(1, 'OrderBookUpdated', { OrderBookUpdated: orderBook });

      expect(orderBookRepository.save).toHaveBeenCalledTimes(1);
      expect(orderBookRepository.save).toHaveBeenNthCalledWith(1, orderBook);
    });
  });

  describe('onOrderBookUnarchived', () => {
    it('should handle OrderBookUnarchived', async () => {
      const orderBook = new OrderBookEntity('id', 'name', true);
      jest.spyOn(orderBookRepository, 'getById').mockResolvedValue(orderBook);

      await listener.on(new OrderBookUnarchived('id', 'by'));

      expect(orderBookRepository.getById).toHaveBeenCalledTimes(1);
      expect(orderBookRepository.getById).toHaveBeenNthCalledWith(1, 'id');

      expect(orderBook.isArchived).toStrictEqual(false);

      expect(graphQLService.publish).toHaveBeenCalledTimes(1);
      expect(graphQLService.publish).toHaveBeenNthCalledWith(1, 'OrderBookUpdated', { OrderBookUpdated: orderBook });

      expect(orderBookRepository.save).toHaveBeenCalledTimes(1);
      expect(orderBookRepository.save).toHaveBeenNthCalledWith(1, orderBook);
    });
  });
});
