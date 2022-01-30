import { Float } from '@nestjs/graphql';
import { GraphQLBaseConstant } from '@pl-oss/adapter';
import { OrderBookEntity } from '../entity/order-book-entity';
import { OrderEntity } from '../entity/order-entity';

export class GraphQLConstant extends GraphQLBaseConstant {
  static RETURN_FLOAT = () => Float;
  static RETURN_ORDER_BOOK = () => OrderBookEntity;
  static RETURN_ORDER_BOOKS = () => [OrderBookEntity];
  static RETURN_ORDER = () => OrderEntity;
  static RETURN_ORDERS = () => [OrderEntity];
}
