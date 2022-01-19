import { Event } from '@pl-oss/core';
import { v4 as uuid } from 'uuid';

export class OrderCreated implements Event {
  readonly type = 'OrderCreated';

  constructor(
    readonly orderBookId: string,
    readonly orderId: string,
    readonly ticker: string,
    readonly price: number,
    readonly quantity: number,

    readonly by: string,
    readonly timestamp = new Date().toISOString(),
    readonly id = uuid(),
  ) {}
}
