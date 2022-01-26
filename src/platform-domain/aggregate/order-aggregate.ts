import { Aggregate } from '@pl-oss/core';
import {
  OrderCreated,
  OrderQuantityNotIntegerException,
  OrderUnitPriceNotIntegerException,
} from '../../platform-type';

export class OrderAggregate extends Aggregate {
  readonly streamNamePrefix = 'TB-OrderAggregate';

  create(orderBookId: string, tickerId: string, quantity: number, unitPrice: number, by: string): this {
    if (!Number.isSafeInteger(quantity)) throw new OrderQuantityNotIntegerException(this.id, quantity);
    if (!Number.isSafeInteger(unitPrice)) throw new OrderUnitPriceNotIntegerException(this.id, unitPrice);

    this.raiseEvent(new OrderCreated(orderBookId, this.id, tickerId, quantity, unitPrice, by));
    return this;
  }
}
