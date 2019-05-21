import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { AdminComponent } from './components/administrator/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AdminGuard } from './guards/admin.guard';
import { AddBookComponent } from './components/administrator/add-book/add-book.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/user/main-page/main-page.component';
import { AuthorPageComponent } from './components/user/author-page/author-page.component';
import { BookPageComponent } from './components/user/book-page/book-page.component';
import { BooksCategoryComponent } from './components/user/books-category/books-category.component';
import { SearchedItemsComponent } from './components/user/searched-items/searched-items.component';
import { EditAutorsComponent } from './components/administrator/edit-autors/edit-autors.component';



const routes: Routes =
  [
    {
      path: '',
      component: UserComponent,
      children: [
        { path: '', component: MainPageComponent },
        { path: 'author/:name', component: AuthorPageComponent },
        { path: 'book/:name', component: BookPageComponent },
        { path: 'categories/:category', component: BooksCategoryComponent },
        { path: 'searcheditems/:term', component: SearchedItemsComponent }
      ]
    },
    {
      path: 'admin',
      component: AdministratorComponent,
      canActivate: [AdminGuard],
      children: [
        { path: '', component: AdminComponent },
        { path: 'addbook', component: AddBookComponent },
        { path: 'editauthor', component: EditAutorsComponent }


      ]
    },
    { path: '**', component: NotFoundComponent }
  ];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ]

})
export class AppRoutingModule { }
