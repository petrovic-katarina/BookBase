import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();
  bookId!: number;



  constructor(private router: Router, private route: ActivatedRoute, private service: BookService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id']
    })

    this.service.getOneBook(this.bookId).subscribe({
      next: (book: Book) => {
        console.log(book);
        this.book = book;
        this.router.navigate(['/book-details']);

      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

}
