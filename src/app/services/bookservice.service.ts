import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './../books/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  googleapiurl = 'https://www.googleapis.com/books/v1/volumes?q=quilting';
  base_url = 'http://localhost:9002/bookstore/';
  hello = 'http://localhost:9002/user/connected';
  bookurl = 'http://localhost:9002/bookstore/';
  user = 'admin';
  password = 'admin';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  headerOptions: any;
  chart: any;

  constructor(private http: HttpClient) {
    this.chart = [];
  }

  // Headers = new HttpHeaders({
  //   Authorization: 'Basic ' + btoa(this.user + ':' + this.password),
  // });

  getListStudent(): Observable<any> {
    return this.http.get<any>(this.googleapiurl);
  }

  getConnectedUser(): Observable<any> {
    return this.http.get<any>(this.hello);
  }

  // storeBook(book: Book): Observable<Book> {
  //   // sessionStorage.setItem('user', this.user);
  //   // let authString = 'Basic ' + btoa(this.user + ':' + this.password);
  //   // console.log(authString);
  //   // sessionStorage.setItem('basicauth', authString);
  //   console.log(this.base_url + 'book/add');
  //   return this.http.post<Book>(
  //     this.base_url + 'book/add',
  //     JSON.stringify(book),
  //     this.headerOptions
  //   );
  //   // return this.http.post<Book>(
  //   //   this.base_url + 'book/add',
  //   //   JSON.stringify(book),

  //   //     sessionStorage.getItem('basicauth'),

  //   // );
  // }

  storeBook(book: Book): Observable<Book> {
    return this.http.post<Book>(
      this.base_url + 'book/add',
      JSON.stringify(book),
      this.httpOptions
    );
  }

  getBookList(): Observable<Book> {
    return this.http.get<Book>(this.bookurl);
  }

  destroyBook(id: number) {
    return this.http
      .delete(
        'http://localhost:9002/bookstore/book/' + id + '/delete',
        this.httpOptions
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  addtoChart(book: any) {
    this.chart.push(book);
    localStorage.setItem('chart', this.chart);
    console.log('chart', this.chart);
  }

  getChart(): Observable<any> {
    return this.chart;
  }
}
