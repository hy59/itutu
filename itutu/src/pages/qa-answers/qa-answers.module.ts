import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QaAnswersPage } from './qa-answers';

@NgModule({
  declarations: [
    QaAnswersPage,
  ],
  imports: [
    IonicPageModule.forChild(QaAnswersPage),
  ],
})
export class QaAnswersPageModule {}
