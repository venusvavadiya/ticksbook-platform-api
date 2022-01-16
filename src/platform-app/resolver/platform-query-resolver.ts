import { Inject } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { GraphQLConstant } from '../constant/graphql-constant';
import { PlatformContext } from '../context/platform-context';
import { OrderBookEntity } from '../entity/order-book-entity';
import { OrderBookEntityRepository } from '../entity-repository/order-book-entity-repository';

export class PlatformQueryResolver {
  private readonly orderBookEntityRepository: OrderBookEntityRepository;

  constructor(@Inject('Context') context: PlatformContext) {
    this.orderBookEntityRepository = context.orderBookEntityRepository;
  }

  @Query(GraphQLConstant.RETURN_ORDER_BOOK_ENTITY)
  async orderBook(@Args('id') id: string): Promise<OrderBookEntity> {
    return this.orderBookEntityRepository.getById(id);
  }

  @Query(GraphQLConstant.RETURN_ORDER_BOOK_ENTITIES)
  async orderBooks(): Promise<OrderBookEntity[]> {
    return this.orderBookEntityRepository.getAll();
  }
}
