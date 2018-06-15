import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  LoadingController
} from "ionic-angular";
import { BaseUI } from "../../common/baseui";
import { SearchdetailsPage } from "../searchdetails/searchdetails";
import { ItutuProvider } from "../../providers/itutu/itutu";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage extends BaseUI {
  public notSearch: boolean = true;
  public searched: boolean = false;
  booksinfo: string[];
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public itutu: ItutuProvider,
    public loadingCtrl: LoadingController
  ) {
    super();
  }

  /*
  gotoSearchDetails() {
    var modal = this.modalCtrl.create(SearchdetailsPage, this.search);
    modal.present();
  }*/

  searchBooksInfo(search: any) {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.notSearch = false;
    this.searched = true;
    this.itutu.searchBooksInfo(search).then(data => {
      this.booksinfo = data["results"];
      loading.dismiss();
    }, error => (this.errorMessage = <any>error));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
