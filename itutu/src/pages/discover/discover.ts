import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { BaseUI } from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';
import { QaDeatilsPage } from '../qa-deatils/qa-deatils';


/**
 * Generated class for the ResourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage extends BaseUI {

  questions: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions() {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.rest.getQuestions()
      .subscribe(
      q => {
        this.questions = q;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error);
  }

  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }

  gotoQADetails(questionId) {
    this.navCtrl.push(QaDeatilsPage, { id: questionId });
  }

}
