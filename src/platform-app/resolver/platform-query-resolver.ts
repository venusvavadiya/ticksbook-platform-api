import { Query } from '@nestjs/graphql';
import { GraphQLBaseConstant } from '@pl-oss/adapter';

export class PlatformQueryResolver {
  private readonly hello = 'Hello World!';

  @Query(GraphQLBaseConstant.RETURN_STRING)
  getHello(): string {
    return this.hello;
  }
}
