import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookserviceService } from './services/bookservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'E-BOOKSTORE';
  chart: any;
  numberofcarts: any;

  constructor(public bookservices: BookserviceService, private route: Router) {}

  ngOnInit(): void {
    this.getChart();
  }

  goChart() {
    this.route.navigate(['/chart']);
  }

  getChart() {
    this.chart = this.bookservices.getChart();
    this.numberofcarts = this.chart.length;
  }
}
