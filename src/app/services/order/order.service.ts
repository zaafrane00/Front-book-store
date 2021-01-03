import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../order/order';
import { Chart } from 'src/app/chart/chart';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  orderline: Chart = new Chart();
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      'http://localhost:9002/command/new',
      JSON.stringify(order),
      this.httpOptions
    );
  }

  destroyOrder(id: BigInteger) {
    return this.http
      .delete('http://localhost:9002/command/delete/' + id, this.httpOptions)
      .subscribe((res) => {
        console.log(res);
      });
  }

  createNewBuyLine(buyline: any): Observable<Chart> {
    console.log('buylinebuyline', buyline);
    return this.http.post<Chart>(
      'http://localhost:9002/command-line/add/user/1/book/' + buyline.id,
      JSON.stringify(buyline),
      this.httpOptions
    );
  }

  activateOrder(id: number) {
    return this.http
      .put('http://localhost:9002/command/activate/' + id, this.httpOptions)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
