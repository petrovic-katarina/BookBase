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

  showDetails: boolean = true;


  constructor(private service: BookService) { }

  queryParams = {
    page: 1,
    pageSize: 10,
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

  filterBooks(filer: any) {
    // console.log(filer.target.value);
    this.queryParams.filter.author = filer.author.target.value;
    this.queryParams.filter.title = filer.title.target.value;
    this.getAllBooks();
  }

  onPaginationLoading(newPageSize: number) {
    this.queryParams.pageSize = newPageSize;
    this.getAllBooks();
  }


  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
