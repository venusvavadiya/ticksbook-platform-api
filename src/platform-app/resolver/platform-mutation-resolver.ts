import { Inject } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { GraphQLBaseConstant } from '@pl-oss/adapter';
import { PlatformService } from '../../platform-domain';

export class PlatformMutationResolver {
  constructor(@Inject('PlatformService') private readonly platformService: PlatformService) {}

  @Mutation(GraphQLBaseConstant.RETURN_STRING)
  async archiveOrderBook(
    @Args('orderBookId') orderBookId: string,
  ): Promise<string> {
    const by = 'BY';
    await this.platformService.archiveOrderBook(orderBookId, by);
    return GraphQLBaseConstant.DONE;
  }

  @Mutation(GraphQLBaseConstant.RETURN_STRING)
  async createOrderBook(
    @Args('orderBookName') orderBookName: string,
  ): Promise<string> {
    const by = 'BY';
    const orderBookId = await this.platformService.createOrderBook(orderBookName, by);
    return orderBookId;
  }

  @Mutation(GraphQLBaseConstant.RETURN_STRING)
  async renameOrderBook(
    @Args('orderBookId') orderBookId: string,
      @Args('orderBookName') orderBookName: string,
  ): Promise<string> {
    const by = 'BY';
    await this.platformService.renameOrderBook(orderBookId, orderBookName, by);
    return GraphQLBaseConstant.DONE;
  }

  @Mutation(GraphQLBaseConstant.RETURN_STRING)
  async unarchiveOrderBook(
    @Args('orderBookId') orderBookId: string,
  ): Promise<string> {
    const by = 'BY';
    await this.platformService.unarchiveOrderBook(orderBookId, by);
    return GraphQLBaseConstant.DONE;
  }
}
