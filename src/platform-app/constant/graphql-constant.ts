import { Float } from '@nestjs/graphql';
import { GraphQLBaseConstant } from '@pl-oss/adapter';
import { OrderBookEntity } from '../entity/order-book-entity';
import { OrderEntity } from '../entity/order-entity';

export class GraphQLConstant extends GraphQLBaseConstant {
  static RETURN_FLOAT = () => Float;
  static RETURN_ORDER_BOOK_ENTITY = () => OrderBookEntity;
  static RETURN_ORDER_BOOK_ENTITIES = () => [OrderBookEntity];
  static RETURN_ORDER_ENTITY = () => OrderEntity;
  static RETURN_ORDER_ENTITIES = () => [OrderEntity];
}
