import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from '../services/bookservice.service';
import { Observable } from 'rxjs';
import { Chart } from './chart';
import { OrderService } from '../services/order/order.service';
import { Order } from '../order/order';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  chart: any;
  ok: boolean;
  quantite = 1;
  orderline: Chart = new Chart();
  order: Order = new Order();
  orderID = 0;
  clicked = false;
  buttonLabel = 'START NEW ORDER FIRST';
  today = new Date();

  constructor(
    public bookservices: BookserviceService,
    private route: Router,
    public orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getChart();
    this.chart.forEach((element) => {
      if (element.etag) {
        element['ok'] = true;
      } else {
        element['ok'] = false;
      }
    });
    if (localStorage.getItem('orderID')) {
      this.clicked = true;
    }
    this.orderline.quantity = 1;
  }

  getChart() {
    this.chart = this.bookservices.getChart();
    console.log('hello', this.chart);
  }

  incrementQte() {
    this.quantite++;
  }

  decrementQte() {
    this.quantite--;
    if (this.quantitey < 1) this.quantite = 1;
  }

  createOrder(object: any) {
    this.orderService.createOrder(object).subscribe((res) => {
      console.log(res);
      localStorage.setItem('orderID', JSON.stringify(res.id));
      this.orderID = parseInt(localStorage.getItem('orderID'));
    });
  }

  deleteOrder(orderid: any) {
    this.orderService.destroyOrder(orderid);
    console.log('Order ' + orderid + ' deleted');
  }

  clickCreateOrder() {
    this.clicked = true;
    this.buttonLabel = 'Order Created';
    this.order.creationDate = this.today;
    this.order.user = 1;
    this.order.windedUp = false;
    this.createOrder(this.order);
  }

  clickCancelOrder() {
    this.clicked = false;
    this.buttonLabel = 'START NEW ORDER FIRST';
    localStorage.removeItem('orderID');
    this.deleteOrder(this.orderID);
  }

  addnewBuyLine(chart: any) {
    chart['quantity'] = this.quantite;
    console.log(chart);
    this.orderService.createNewBuyLine(chart).subscribe((res) => {
      console.log(res);
    });
  }

  submitOrder() {
    this.orderService.activateOrder(this.orderID);
    console.log('order submitted');
    this.clicked = false;
  }
}
