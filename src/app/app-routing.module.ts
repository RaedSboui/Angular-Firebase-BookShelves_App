import { AuthGuardService } from './services/auth-guard.service';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  {path: "auth/signup", pathMatch: "full", component: SignupComponent},
  {path: "auth/signin", pathMatch: "full", component: SigninComponent},
  {path: "books", canActivate: [AuthGuardService], pathMatch: "full", component: BookListComponent},
  {path: "books/new", canActivate: [AuthGuardService], pathMatch: "full", component: BookFormComponent},
  {path: "books/view/:id", canActivate: [AuthGuardService], pathMatch: "full", component: SingleBookComponent},
  {path: "", redirectTo: "books", pathMatch: "full"},
  {path: "**", redirectTo: "books"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
