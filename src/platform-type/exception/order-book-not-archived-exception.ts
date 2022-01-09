export class OrderBookNotArchivedException extends Error {
  constructor(orderBookId: string) {
    super(JSON.stringify({
      type: 'exception.order-book-not-archived',
      orderBookId,
    }));

    this.name = 'OrderBookNotArchivedException';
  }
}
