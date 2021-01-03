import { BookserviceService } from './../../services/bookservice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  googlebooks: any;
  addedBooks: any;
  chart: any;
  numberChart: number;
  constructor(public bookservices: BookserviceService, private route: Router) {
    this.googlebooks = [];
    this.addedBooks = [];
  }

  ngOnInit(): void {
    this.bookservices.getListStudent().subscribe((res) => {
      this.googlebooks = res;
      console.log(this.googlebooks);
    });
    this.bookservices.getBookList().subscribe((res) => {
      this.addedBooks = res;
      console.log(this.addedBooks);
    });
    this.getChart();
  }

  goAddBook() {
    this.route.navigate(['/add']);
  }

  refresh() {
    this.addedBooks = [];
    this.bookservices.getBookList().subscribe((res) => {
      this.addedBooks = res;
    });
    this.route.navigate(['']);
    this.bookservices.getBookList().subscribe((res) => {
      this.addedBooks = res;
    });
  }

  deleteBook(id: BigInteger) {
    this.bookservices.destroyBook(id);
    this.refresh();
  }

  addToChart(book: any) {
    this.bookservices.addtoChart(book);
  }

  getChart() {
    this.chart = this.bookservices.getChart();
    // console.log('hellsssssso', this.chart.length);
    this.numberChart = this.chart.length;
  }
}
