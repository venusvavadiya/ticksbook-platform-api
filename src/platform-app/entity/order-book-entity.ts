import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from '@pl-oss/core';
import { OrderEntity } from './order-entity';

@ObjectType()
export class OrderBookEntity implements Entity {
  @Field()
    id: string;

  @Field()
    isArchived: boolean;

  @Field()
    name: string;

  @Field(() => [OrderEntity], { nullable: 'items' })
    orders: OrderEntity[];

  constructor(
    id: string,
    name: string,
    isArchived = false,
  ) {
    this.id = id;
    this.name = name;
    this.isArchived = isArchived;
    this.orders = [];
  }
}
