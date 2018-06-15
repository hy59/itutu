import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  LoadingController
} from "ionic-angular";
import { ItutuProvider } from "../../providers/itutu/itutu";
import { BaseUI } from "../../common/baseui";

/**
 * Generated class for the BooksDistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-books-dist",
  templateUrl: "books-dist.html"
})
export class BooksDistPage extends BaseUI {
  items: String[];
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public itutu: ItutuProvider,
    public loadingCtrl: LoadingController
  ) {
    super();
  }

  ngOnInit() {
    this.setItems();
  }
  /*
  setItems() {
    this.items = [
      "Orange",
      "Banana",
      "Pear",
      "Tomato",
      "Grape",
      "Apple",
      "Cherries",
      "Cranberries",
      "Raspberries",
      "Strawberries",
      "Watermelon"
    ];
  }*/
  setItems() {
    
    this.itutu.getBooksInfo().then(data => {
      this.items = data["results"];
    }, error => (this.errorMessage = <any>error));
  }

  filterItems(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== "") {
      this.items = this.items.filter(function(item) {
        return item;
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
