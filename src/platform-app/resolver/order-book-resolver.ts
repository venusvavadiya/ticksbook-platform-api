import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLConstant } from '../constant/graphql-constant';
import { PlatformContext } from '../context/platform-context';
import { OrderBookEntity } from '../entity/order-book-entity';
import { OrderEntity } from '../entity/order-entity';

@Resolver(GraphQLConstant.RETURN_ORDER_BOOK_ENTITY)
export class OrderBookResolver {
  constructor(@Inject('Context') private readonly context: PlatformContext) {}

  @ResolveField(GraphQLConstant.RETURN_ORDER_ENTITIES)
  async orders(@Parent() orderBook: OrderBookEntity): Promise<OrderEntity[]> {
    const allOrders = await this.context.orderEntityRepository.getAll();
    return allOrders.filter((order) => order.orderBookId === orderBook.id);
  }
}
