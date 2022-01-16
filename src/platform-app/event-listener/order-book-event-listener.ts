import { EventListener, GraphQLService } from '@pl-oss/core';
import {
  OrderBookArchived,
  OrderBookCreated,
  OrderBookRenamed,
  OrderBookUnarchived,
} from '../../platform-type';
import { PlatformContext } from '../context/platform-context';
import { OrderBookEntity } from '../entity/order-book-entity';
import { OrderBookEntityRepository } from '../entity-repository/order-book-entity-repository';

export class OrderBookEventListener extends EventListener {
  private readonly orderBookRepository: OrderBookEntityRepository;
  private readonly graphQLService: GraphQLService;

  constructor(private readonly context: PlatformContext) {
    super();
    this.orderBookRepository = context.orderBookEntityRepository;
    this.graphQLService = context.graphQLService;
  }

  getStreamNamePrefixes(): string[] {
    return ['TB-OrderBookAggregate'];
  }

  private async onOrderBookArchived(event: OrderBookArchived): Promise<void> {
    const orderBook = await this.orderBookRepository.getById(event.orderBookId);
    orderBook.isArchived = true;
    await this.publishAndSave('OrderBookUpdated', orderBook);
  }

  private async onOrderBookCreated(event: OrderBookCreated): Promise<void> {
    const orderBook = new OrderBookEntity(event.orderBookId, event.orderBookName);
    await this.publishAndSave('OrderBookCreated', orderBook);
  }

  private async onOrderBookRenamed(event: OrderBookRenamed): Promise<void> {
    const orderBook = await this.orderBookRepository.getById(event.orderBookId);
    orderBook.name = event.orderBookName;
    await this.publishAndSave('OrderBookUpdated', orderBook);
  }

  private async onOrderBookUnarchived(event: OrderBookUnarchived): Promise<void> {
    const orderBook = await this.orderBookRepository.getById(event.orderBookId);
    orderBook.isArchived = false;
    await this.publishAndSave('OrderBookUpdated', orderBook);
  }

  private async publishAndSave(triggerName: string, orderBook: OrderBookEntity) {
    this.graphQLService.publish(triggerName, { [triggerName]: orderBook }).then();
    await this.orderBookRepository.save(orderBook);
  }
}
