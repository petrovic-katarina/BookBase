import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() books: Book = new Book();
  bookId!: number;
  book: Book = new Book();

  constructor(private router: Router, private route: ActivatedRoute, private service: BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id']
    })

  }

  onDetailsCliked() {

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
