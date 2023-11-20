import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { BooksComponent } from './books/books.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'books', component: BooksComponent },
  { path: 'add-book', component: BookFormComponent },
  { path: 'add-book/:id', component: BookFormComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'book-details/:id', component: BookDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
