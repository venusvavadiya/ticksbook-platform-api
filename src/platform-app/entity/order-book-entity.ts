import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from '@pl-oss/core';

@ObjectType()
export class OrderBookEntity implements Entity {
  @Field()
    id: string;

  @Field()
    isArchived: boolean;

  @Field()
    name: string;

  constructor(
    id: string,
    name: string,
    isArchived = false,
  ) {
    this.id = id;
    this.name = name;
    this.isArchived = isArchived;
  }
}
