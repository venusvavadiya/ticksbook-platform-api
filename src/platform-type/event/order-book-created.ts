import { Event } from '@pl-oss/core';
import { v4 as uuid } from 'uuid';

export class OrderBookCreated implements Event {
  readonly type = 'OrderBookCreated';

  constructor(
    readonly orderBookId: string,
    readonly orderBookName: string,

    readonly by: string,
    readonly timestamp = new Date().toISOString(),
    readonly id = uuid(),
  ) {}
}
