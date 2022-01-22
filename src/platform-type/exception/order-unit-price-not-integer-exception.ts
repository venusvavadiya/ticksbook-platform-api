export class OrderUnitPriceNotIntegerException extends Error {
  constructor(orderId: string, unitPrice: number) {
    super(JSON.stringify({
      type: 'exception.order-unit-price-not-integer',
      orderId,
      unitPrice,
    }));

    this.name = 'OrderUnitPriceNotIntegerException';
  }
}
