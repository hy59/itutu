import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooksDistPage } from './books-dist';

@NgModule({
  declarations: [
    BooksDistPage,
  ],
  imports: [
    IonicPageModule.forChild(BooksDistPage),
  ],
})
export class BooksDistPageModule {}
