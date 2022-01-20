import {
  Field, Float, Int, ObjectType,
} from '@nestjs/graphql';
import { Entity } from '@pl-oss/core';

@ObjectType()
export class OrderEntity implements Entity {
  @Field()
    id: string;

  @Field()
    orderBookId: string;

  @Field()
    tickerId: string;

  @Field(() => Int)
    orderQuantity: number;

  @Field(() => Float)
    unitPrice: number;

  constructor(
    id: string,
    orderBookId: string,
    tickerId: string,
    orderQuantity: number,
    unitPrice: number,
  ) {
    this.id = id;
    this.orderBookId = orderBookId;
    this.tickerId = tickerId;
    this.orderQuantity = orderQuantity;
    this.unitPrice = unitPrice;
  }
}
