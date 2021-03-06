import { Context, EventSubscription } from '@pl-oss/core';
import { OrderBookEntityRepository } from '../entity-repository/order-book-entity-repository';
import { OrderEntityRepository } from '../entity-repository/order-entity-repository';

export interface PlatformContext extends Context {
  eventSubscription?: EventSubscription;
  orderBookEntityRepository?: OrderBookEntityRepository;
  orderEntityRepository?: OrderEntityRepository;
}
