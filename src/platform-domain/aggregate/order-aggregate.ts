import { Aggregate } from '@pl-oss/core';
import { OrderCreated } from '../../platform-type';

export class OrderAggregate extends Aggregate {
  readonly streamNamePrefix = 'TB-OrderAggregate';

  create(
    orderBookId: string,
    ticker: string,
    price: number,
    quantity: number,
    by: string,
  ): this {
    this.raiseEvent(new OrderCreated(
      orderBookId,
      this.id,
      ticker,
      price,
      quantity,
      by,
    ));
    return this;
  }
}
