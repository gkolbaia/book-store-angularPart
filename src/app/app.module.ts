import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BookServiceService } from './services/book-service.service';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from "angular2-flash-messages";
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { AdminComponent } from './components/administrator/admin/admin.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { NavbarAdminComponent } from './components/administrator/navbar-admin/navbar-admin.component';
import { AddBookComponent } from './components/administrator/add-book/add-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/user/main-page/main-page.component';
import { AuthorPageComponent } from './components/user/author-page/author-page.component';
import { BookPageComponent } from './components/user/book-page/book-page.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { BooksCategoryComponent } from './components/user/books-category/books-category.component';
import { SearchedItemsComponent } from './components/user/searched-items/searched-items.component';
import { EditAutorsComponent } from './components/administrator/edit-autors/edit-autors.component';
import { EditBooksComponent } from './components/administrator/edit-books/edit-books.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminComponent,
    UserComponent,
    AdministratorComponent,
    NavbarAdminComponent,
    AddBookComponent,
    NotFoundComponent,
    MainPageComponent,
    AuthorPageComponent,
    BookPageComponent,
    BooksCategoryComponent,
    SearchedItemsComponent,
    EditAutorsComponent,
    EditBooksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFileUploaderModule,
  ],
  providers: [BookServiceService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
