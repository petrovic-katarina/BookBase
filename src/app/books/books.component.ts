import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book, BookSearchResult } from '../model/book.model';
import { BookService } from '../service/book.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

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
      author: '' as string | null | undefined,
      title: '' as string | null | undefined,
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

  searchControl = new FormControl('');
  authorControl = new FormControl('');
  titleControl = new FormControl('');

  filterBooks() {

    // OVO RADI ISPOD
    let author;
    let title;;

    console.log(this.searchControl);

    // Proveri koji radio button je izabran

    if (this.authorControl.value === 'author') {
      author = this.searchControl.value;
      this.queryParams.filter.author = author;
      console.log('Author ovo', author);
      console.log('Title ovo', title);
      this.getAllBooks();

    } else {
      title = this.searchControl.value
      this.queryParams.filter.title = title;
      console.log('Author', author);
      console.log('Title', title);
      this.getAllBooks();
    }


  }

  onPaginationLoading(newPageSize: number) {
    this.queryParams.pageSize = newPageSize;
    this.getAllBooks();
  }


  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
