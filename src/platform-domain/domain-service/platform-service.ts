import { EventStore } from '@pl-oss/core';
import { v4 as uuidv4 } from 'uuid';
import { OrderAggregate } from '../aggregate/order-aggregate';
import { OrderBookAggregate } from '../aggregate/order-book-aggregate';

export class PlatformService {
  constructor(private readonly eventStore: EventStore) {}

  async archiveOrderBook(id: string, by: string): Promise<void> {
    const orderBook = await new OrderBookAggregate(id).load(this.eventStore);
    await orderBook
      .archive(by)
      .commit(this.eventStore);
  }

  async createOrder(
    orderBookId: string,
    tickerId: string,
    orderQuantity: number,
    unitPrice: number,
    by: string,
  ): Promise<string> {
    const id = uuidv4();
    await new OrderAggregate(id)
      .create(orderBookId, tickerId, orderQuantity, unitPrice, by)
      .commit(this.eventStore);
    return id;
  }

  async createOrderBook(name: string, by: string): Promise<string> {
    const id = uuidv4();
    await new OrderBookAggregate(id)
      .create(name, by)
      .commit(this.eventStore);
    return id;
  }

  async renameOrderBook(id: string, name: string, by: string): Promise<void> {
    const orderBook = await new OrderBookAggregate(id).load(this.eventStore);
    await orderBook
      .rename(name, by)
      .commit(this.eventStore);
  }

  async unarchiveOrderBook(id: string, by: string): Promise<void> {
    const orderBook = await new OrderBookAggregate(id).load(this.eventStore);
    await orderBook
      .unarchive(by)
      .commit(this.eventStore);
  }
}
