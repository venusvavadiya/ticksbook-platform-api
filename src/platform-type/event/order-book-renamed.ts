import { Event } from '@pl-oss/core';
import { v4 as uuid } from 'uuid';

export class OrderBookRenamed implements Event {
  readonly type = 'OrderBookRenamed';

  constructor(
    readonly orderBookId: string,
    readonly orderBookName: string,

    readonly by: string,
    readonly timestamp = new Date().toISOString(),
    readonly id = uuid(),
  ) {}
}
