import { GraphQLBaseConstant } from '@pl-oss/adapter';
import { OrderBookEntity } from '../entity/order-book-entity';

export class GraphQLConstant extends GraphQLBaseConstant {
  static RETURN_ORDER_BOOK_ENTITY = () => OrderBookEntity;
  static RETURN_ORDER_BOOK_ENTITIES = () => [OrderBookEntity];
}
