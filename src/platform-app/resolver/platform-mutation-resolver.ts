import { Inject } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { PlatformService } from '../../platform-domain';
import { GraphQLConstant } from '../constant/graphql-constant';

export class PlatformMutationResolver {
  constructor(@Inject('PlatformService') private readonly platformService: PlatformService) {}

  @Mutation(GraphQLConstant.RETURN_STRING)
  async archiveOrderBook(
    @Args('orderBookId') orderBookId: string,
  ): Promise<string> {
    const by = 'BY';
    await this.platformService.archiveOrderBook(orderBookId, by);
    return GraphQLConstant.DONE;
  }

  @Mutation(GraphQLConstant.RETURN_STRING)
  async createOrder(
    @Args('orderBookId') orderBookId: string,
      @Args('tickerId') tickerId: string,
      @Args('orderPrice', { type: GraphQLConstant.RETURN_FLOAT }) orderPrice: number,
      @Args('orderQuantity', { type: GraphQLConstant.RETURN_INT }) orderQuantity: number,
  ): Promise<string> {
    const by = 'BY';
    const orderId = await this.platformService.createOrder(
      orderBookId,
      tickerId,
      orderPrice,
      orderQuantity,
      by,
    );
    return orderId;
  }

  @Mutation(GraphQLConstant.RETURN_STRING)
  async createOrderBook(
    @Args('orderBookName') orderBookName: string,
  ): Promise<string> {
    const by = 'BY';
    const orderBookId = await this.platformService.createOrderBook(orderBookName, by);
    return orderBookId;
  }

  @Mutation(GraphQLConstant.RETURN_STRING)
  async renameOrderBook(
    @Args('orderBookId') orderBookId: string,
      @Args('orderBookName') orderBookName: string,
  ): Promise<string> {
    const by = 'BY';
    await this.platformService.renameOrderBook(orderBookId, orderBookName, by);
    return GraphQLConstant.DONE;
  }

  @Mutation(GraphQLConstant.RETURN_STRING)
  async unarchiveOrderBook(
    @Args('orderBookId') orderBookId: string,
  ): Promise<string> {
    const by = 'BY';
    await this.platformService.unarchiveOrderBook(orderBookId, by);
    return GraphQLConstant.DONE;
  }
}
