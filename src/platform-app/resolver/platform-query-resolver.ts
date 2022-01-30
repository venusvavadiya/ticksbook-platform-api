import { Inject } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { GraphQLConstant } from '../constant/graphql-constant';
import { PlatformContext } from '../context/platform-context';
import { OrderBookEntity } from '../entity/order-book-entity';
import { OrderEntity } from '../entity/order-entity';

export class PlatformQueryResolver {
  constructor(@Inject('Context') private readonly context: PlatformContext) {}

  @Query(GraphQLConstant.RETURN_ORDER_BOOK)
  async orderBook(@Args('id') id: string): Promise<OrderBookEntity> {
    return this.context.orderBookEntityRepository.getById(id);
  }

  @Query(GraphQLConstant.RETURN_ORDER_BOOKS)
  async orderBooks(): Promise<OrderBookEntity[]> {
    return this.context.orderBookEntityRepository.getAll();
  }

  @Query(GraphQLConstant.RETURN_ORDER)
  async order(@Args('id') id: string): Promise<OrderEntity> {
    return this.context.orderEntityRepository.getById(id);
  }
}
