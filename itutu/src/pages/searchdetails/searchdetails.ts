import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { ItutuProvider } from '../../providers/itutu/itutu';

/**
 * Generated class for the SearchdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchdetails',
  templateUrl: 'searchdetails.html',
})
export class SearchdetailsPage {

  booksinfo: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public itutu: ItutuProvider,
    public events: Events, ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchdetailsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getBooksinfo() {

    this.itutu.searchBooksInfo(this.events)
      .then(
        data => {
          this.booksinfo = data['results']
        },
        error => this.errorMessage = <any>error);
  }
}
