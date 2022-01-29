import { Inject } from '@nestjs/common';
import { Args, Subscription } from '@nestjs/graphql';
import { Entity } from '@pl-oss/core';
import { GraphQLConstant } from '../constant/graphql-constant';
import { PlatformContext } from '../context/platform-context';

function getFilter(triggerName: string) {
  return (p: Entity, v: Entity) => p[triggerName].id === v.id;
}

export class PlatformSubscriptionResolver {
  constructor(@Inject('Context') private readonly context: PlatformContext) {}

  @Subscription(GraphQLConstant.RETURN_ORDER_BOOK, { filter: getFilter('OrderBookUpdated') })
  OrderBookUpdated(@Args('id') _id: string) {
    return this.context.graphQLService.asyncIterator('OrderBookUpdated');
  }
}
