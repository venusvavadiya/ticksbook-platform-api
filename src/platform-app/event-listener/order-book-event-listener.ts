import { EventListener } from '@pl-oss/core';
import {
  OrderBookArchived,
  OrderBookCreated,
  OrderBookRenamed,
  OrderBookUnarchived,
} from '../../platform-type';
import { PlatformContext } from '../context/platform-context';
import { OrderBookEntity } from '../entity/order-book-entity';

export class OrderBookEventListener extends EventListener {
  constructor(private readonly context: PlatformContext) {
    super();
  }

  getStreamNamePrefixes(): string[] {
    return ['TB-OrderBookAggregate'];
  }

  private async onOrderBookArchived(event: OrderBookArchived): Promise<void> {
    const orderBook = await this.context.orderBookEntityRepository.getById(event.orderBookId);
    orderBook.isArchived = true;
    await this.publishAndSave('OrderBookUpdated', orderBook);
  }

  private async onOrderBookCreated(event: OrderBookCreated): Promise<void> {
    const orderBook = new OrderBookEntity(event.orderBookId, event.orderBookName);
    await this.publishAndSave('OrderBookCreated', orderBook);
  }

  private async onOrderBookRenamed(event: OrderBookRenamed): Promise<void> {
    const orderBook = await this.context.orderBookEntityRepository.getById(event.orderBookId);
    orderBook.name = event.orderBookName;
    await this.publishAndSave('OrderBookUpdated', orderBook);
  }

  private async onOrderBookUnarchived(event: OrderBookUnarchived): Promise<void> {
    const orderBook = await this.context.orderBookEntityRepository.getById(event.orderBookId);
    orderBook.isArchived = false;
    await this.publishAndSave('OrderBookUpdated', orderBook);
  }

  private async publishAndSave(triggerName: string, orderBook: OrderBookEntity) {
    this.context.graphQLService.publish(triggerName, { [triggerName]: orderBook }).then();
    await this.context.orderBookEntityRepository.save(orderBook);
  }
}
