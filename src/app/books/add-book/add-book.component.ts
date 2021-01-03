import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from 'src/app/services/bookservice.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  book: Book = new Book();
  constructor(public bookservices: BookserviceService, private route: Router) {}

  ngOnInit() {
    this.conected();
  }

  // tslint:disable-next-line: typedef
  addBook(): void {
    console.log(this.book);
    this.bookservices.storeBook(this.book).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/']);
    });
  }

  conected() {
    this.bookservices.getConnectedUser().subscribe((res) => {
      console.log(res);
    });
  }
}
