import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { Review } from 'src/app/model/review.model';
import { BookService } from 'src/app/service/book.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();
  bookId!: number;

  reviews: Review[] = [];

  averageRating: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private service: BookService, private config: NgbRatingConfig) {
    config.max = 5;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id'];
      this.getOneBook();
      this.getBookReviews();
    })

  }

  getOneBook() {
    this.service.getOneBook(this.bookId).subscribe({
      next: (book: Book) => {
        // console.log(book);
        this.book = book;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  getBookReviews() {
    this.service.getBookReviews(this.bookId).subscribe({
      next: (reviews: Review[]) => {
        console.log('Book id: ', this.bookId);
        this.reviews = reviews;
        console.log('Received Reviews:', reviews);
        this.calculateAverageRating();
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  deleteReview(id: number) {
    this.service.deleteReview(id).subscribe({
      next: (review: Review) => {
        this.getBookReviews();
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  calculateAverageRating(): void {

    if (this.reviews && this.reviews.length > 0) {
      const totalScore = this.reviews.reduce((sum, review) => {
        // console.log('Review Score:', review.score);
        return sum + review.score;
      }, 0);

      this.averageRating = totalScore / this.reviews.length;
      console.log('Average Rating:', this.averageRating);
    } else {
      this.averageRating = 0;
    }
  }

}
