import { Aggregate } from '@pl-oss/core';
import { OrderBookArchived } from '../event/order-book-archived';
import { OrderBookCreated } from '../event/order-book-created';
import { OrderBookRenamed } from '../event/order-book-renamed';
import { OrderBookUnarchived } from '../event/order-book-unarchived';
import { OrderBookAlreadyArchivedException } from '../exception/order-book-already-archived-exception';
import { OrderBookNotArchivedException } from '../exception/order-book-not-archived-exception';

export class OrderBookAggregate extends Aggregate {
  readonly streamNamePrefix = 'TB-OrderBookAggregate';

  private archived: boolean;

  isArchived(): boolean {
    return this.archived;
  }

  archive(by: string): this {
    if (this.isArchived()) throw new OrderBookAlreadyArchivedException(this.id);
    this.raiseEvent(new OrderBookArchived(this.id, by));
    return this;
  }

  create(name: string, by: string): this {
    this.raiseEvent(new OrderBookCreated(this.id, name, by));
    return this;
  }

  rename(name: string, by: string): this {
    this.raiseEvent(new OrderBookRenamed(this.id, name, by));
    return this;
  }

  unarchive(by: string): this {
    if (!this.isArchived()) throw new OrderBookNotArchivedException(this.id);
    this.raiseEvent(new OrderBookUnarchived(this.id, by));
    return this;
  }

  private onOrderBookArchived(): void {
    this.archived = true;
  }

  private onOrderBookCreated(): void {
    this.archived = false;
  }

  private onOrderBookUnarchived(): void {
    this.archived = false;
  }
}
