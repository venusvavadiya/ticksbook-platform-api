export class OrderBookAlreadyArchivedException extends Error {
  constructor(orderBookId: string) {
    super(JSON.stringify({
      type: 'exception.order-book-already-archived',
      orderBookId,
    }));

    this.name = 'OrderBookAlreadyArchivedException';
  }
}
