import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  book: Book = new Book();

  bookForm: FormGroup = new FormGroup({
    ISBN: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    yearOfPublication: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required])
  })

  get ISBN() {
    return this.bookForm.get('ISBN');
  }
  get title() {
    return this.bookForm.get('title');
  }
  get author() {
    return this.bookForm.get('author');
  }
  get yearOfPublication() {
    return this.bookForm.get('yearOfPublication');
  }
  get publisher() {
    return this.bookForm.get('publisher');
  }

  constructor(private service: BookService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.book = new Book(this.bookForm.value);

    this.service.addBook(this.book).subscribe((book: Book) => {
      this.bookForm.reset();
      this.router.navigate(['/book-details']);
    });
  }

}
