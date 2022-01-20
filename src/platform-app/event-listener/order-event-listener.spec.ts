import { GraphQLService } from '@pl-oss/core';
import { mock } from 'jest-mock-extended';
import { OrderCreated } from '../../platform-type';
import { OrderEntity } from '../entity/order-entity';
import { OrderEntityRepository } from '../entity-repository/order-entity-repository';
import { OrderEventListener } from './order-event-listener';

describe('OrderEventListener', () => {
  let graphQLService: GraphQLService;
  let orderEntityRepository: OrderEntityRepository;
  let listener: OrderEventListener;

  beforeEach(() => {
    graphQLService = mock<GraphQLService>();
    orderEntityRepository = mock<OrderEntityRepository>();
    listener = new OrderEventListener({ graphQLService, orderEntityRepository });

    jest.spyOn(graphQLService, 'publish').mockResolvedValue();
  });

  afterEach(jest.clearAllMocks);

  describe('getEventTypePrefixes', () => {
    it('should return prefixes', () => {
      expect(listener.getStreamNamePrefixes()).toStrictEqual(['TB-OrderAggregate']);
    });
  });

  describe('onOrderCreated', () => {
    it('should publish and save order', async () => {
      const order = new OrderEntity('orderId', 'orderBookId', 'tickerId', 1, 1);
      await listener.on(new OrderCreated('orderBookId', 'orderId', 'tickerId', 1, 1, 'by'));

      expect(graphQLService.publish).toHaveBeenCalledTimes(1);
      expect(graphQLService.publish).toHaveBeenCalledWith(1, 'OrderCreated', { OrderCreated: order });

      expect(orderEntityRepository.save).toHaveBeenCalledTimes(1);
      expect(orderEntityRepository.save).toHaveBeenCalledWith(1, order);
    });
  });
});
