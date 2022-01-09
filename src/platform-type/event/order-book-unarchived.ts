import { Event } from '@pl-oss/core';
import { v4 as uuid } from 'uuid';

export class OrderBookUnarchived implements Event {
  readonly type = 'OrderBookUnarchived';

  constructor(
    readonly orderBookId: string,
    readonly by: string,
    readonly timestamp = new Date().toISOString(),
    readonly id = uuid(),
  ) {}
}
