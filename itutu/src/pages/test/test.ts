import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { ItutuProvider } from '../../providers/itutu/itutu';
import { BaseUI } from "../../common/baseui";


/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage extends BaseUI {

  booksinfo: string[];
  errorMessage: any;


  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public itutu: ItutuProvider,
    public viewCtrl: ViewController,
  ) {
    super();
  }

  ionViewDidLoad() {
    this.getBooksinfo();

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getBooksinfo() {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.itutu.getBooksInfo()
      .then(
        data => {
          this.booksinfo = data['results']
          loading.dismiss();
        },
        error => this.errorMessage = <any>error);
  }

  doRefresh(refresher) {
    this.getBooksinfo();
    refresher.complete();
  }
}
