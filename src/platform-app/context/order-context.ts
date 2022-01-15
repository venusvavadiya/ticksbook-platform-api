import { Context } from '@pl-oss/core';
import { OrderBookEntityRepository } from '../entity-repository/order-book-entity-repository';

export interface OrderContext extends Context {
  orderBookEntityRepository?: OrderBookEntityRepository
}
