import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book, BookSearchResult } from '../model/book.model';
import { Review } from '../model/review.model';

const baseURL = "http://localhost:3000/api";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  // http://localhost:3000/api/books

  getAllBooks(params?: any): Observable<BookSearchResult> {
    let options = {};

    if (params) {
      options = {
        params: new HttpParams()
          .set("filter", params.filter && JSON.stringify(params.filter) || "")
          .set('page', params.page || '')
          .set('pageSize', params.pageSize || '')
      }
    }

    return this.httpClient.get(`${baseURL}/books`, options).pipe(map((data: any) => {
      return new BookSearchResult(data)
    }))
  }

  // POST http://localhost:3000/api/books

  addBook(newBook: Book): Observable<Book> {
    return this.httpClient.post(`${baseURL}/books`, newBook).pipe(map((data: any) => {
      return new Book(data)
    }))
  }

  // http://localhost:3000/api/books/:id
  getOneBook(bookId: number): Observable<Book> {
    return this.httpClient.get(`${baseURL}/books/${bookId}`).pipe(map((data: any) => {
      return new Book(data)
    }))
  }

  // http://localhost:3000/api/books/:id/reviews

  getBookReviews(bookId: number): Observable<Review[]> {
    return this.httpClient.get(`${baseURL}/books/${bookId}/reviews`).pipe(map((data: any) => {
      return data && data.map((elem: any) => new Review(elem)) || []
    }))
  }

  // http://localhost:3000/api/reviews/:id

  deleteReview(reviewId: number): Observable<Review> {
    return this.httpClient.delete(`${baseURL}/reviews/${reviewId}`).pipe(map((data: any) => {
      return new Review(data)
    }))
  }

  // Knjiga se ažurira slanjem PUT zahteva na endpoint: http://localhost:3000/api/books/:id.

  updateBook(bookId: number, book: Book): Observable<Book> {
    return this.httpClient.put(`${baseURL}/books/${bookId}`, book).pipe(map((data: any) => {
      return new Book(data)
    }))
  }

}
