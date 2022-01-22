import { Aggregate } from '@pl-oss/core';
import { OrderCreated } from '../../platform-type';

export class OrderAggregate extends Aggregate {
  readonly streamNamePrefix = 'TB-OrderAggregate';

  create(
    orderBookId: string,
    tickerId: string,
    orderQuantity: number,
    unitPrice: number,
    by: string,
  ): this {
    this.raiseEvent(new OrderCreated(
      orderBookId,
      this.id,
      tickerId,
      orderQuantity,
      unitPrice,
      by,
    ));

    return this;
  }
}
