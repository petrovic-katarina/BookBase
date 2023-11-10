import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book, BookSearchResult } from '../model/book.model';
import { BookService } from '../service/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  count: number = 0;

  booksSubscription: Subscription = new Subscription();

  constructor(private service: BookService) { }

  queryParams = {
    page: 1,
    pageSize: 0,
    filter: {
      author: '',
      title: '',
    }
  }

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.booksSubscription = this.service.getAllBooks(this.queryParams).subscribe({
      next: (bookSearchResult: BookSearchResult) => {
        console.log(bookSearchResult);
        this.books = bookSearchResult.results;
        this.count = bookSearchResult.count;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
