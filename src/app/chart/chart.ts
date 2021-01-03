import { Book } from '../books/book.model';
import { Order } from '../order/order';

export class Chart {
  quantity: number = 0;
  book: Book = null;
  order: Order = null;
}
