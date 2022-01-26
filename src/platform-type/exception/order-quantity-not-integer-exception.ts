export class OrderQuantityNotIntegerException extends Error {
  constructor(orderId: string, unitPrice: number) {
    super(JSON.stringify({
      type: 'exception.order-quantity-not-integer',
      orderId,
      unitPrice,
    }));

    this.name = 'OrderQuantityNotIntegerException';
  }
}
