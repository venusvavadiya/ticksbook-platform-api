import { EventListener } from '@pl-oss/core';
import { OrderCreated } from '../../platform-type';
import { PlatformContext } from '../context/platform-context';
import { OrderEntity } from '../entity/order-entity';

export class OrderEventListener extends EventListener {
  constructor(private readonly context: PlatformContext) {
    super();
  }

  getStreamNamePrefixes(): string[] {
    return ['TB-OrderAggregate'];
  }

  private async onOrderCreated(event: OrderCreated): Promise<void> {
    await this.publishAndSave('OrderCreated', new OrderEntity(
      event.orderId,
      event.orderBookId,
      event.tickerId,
      event.orderQuantity,
      event.unitPrice,
    ));
  }

  private async publishAndSave(triggerName: string, order: OrderEntity) {
    this.context.graphQLService.publish(triggerName, { [triggerName]: order }).then();
    await this.context.orderEntityRepository.save(order);
  }
}
