import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QaDeatilsPage } from './qa-deatils';

@NgModule({
  declarations: [
    QaDeatilsPage,
  ],
  imports: [
    IonicPageModule.forChild(QaDeatilsPage),
  ],
})
export class QaDeatilsPageModule {}
