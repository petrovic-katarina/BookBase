import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookSearchResult } from '../model/book.model';

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
          .set('page', params.sort || '')
          .set('pageSize', params.sort || '')
      }
    }

    return this.httpClient.get(`${baseURL}/books`, options).pipe(map((data: any) => {
      return new BookSearchResult(data)
    }))
  }

}
