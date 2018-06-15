import { Component } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
  ViewController
} from "ionic-angular";
import { SearchPage } from "../search/search";
import {
  ThemeableBrowser,
  ThemeableBrowserObject,
  ThemeableBrowserOptions
} from "@ionic-native/themeable-browser";
import { SearchdetailsPage } from "../searchdetails/searchdetails";
import { BaseUI } from "../../common/baseui";
import { TestPage } from "../test/test";
import { BooksDistPage } from "../books-dist/books-dist";
import { ItutuProvider } from "../../providers/itutu/itutu";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends BaseUI {
  public notSearch: boolean = true;
  public searched: boolean = false;
  booksinfo: string[];
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private themeableBrowser: ThemeableBrowser,
    public loadingCtrl: LoadingController,
    public itutu: ItutuProvider
  ) {
    super();
  }

  gotoSearch() {
    var modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }

  gotoFULink() {
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: "#3573bbff"
      },

      title: {
        color: "#ffffffff",
        showPageTitle: true,
        staticText: "FULink"
      },

      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },

      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      },

      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      }
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      "http://www.fulink.edu.cn/",
      "_blank",
      options
    );

    browser.on("closePressed").subscribe(res => {
      browser.close();
    });
  }

  gotoReaderNote() {
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: "#3573bbff"
      },

      title: {
        color: "#ffffffff",
        showPageTitle: true,
        staticText: "读者指南"
      },

      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },

      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      },

      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      }
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      "http://www.lib.fzu.edu.cn/reader/pingmian.asp?place=2",
      "_blank",
      options
    );

    browser.on("closePressed").subscribe(res => {
      browser.close();
    });
  }

  gotoBooksDist() {
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: "#3573bbff"
      },

      title: {
        color: "#ffffffff",
        showPageTitle: true,
        staticText: "学科分馆"
      },

      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },

      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      },

      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      }
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      "http://libdc.fzu.edu.cn/",
      "_blank",
      options
    );

    browser.on("closePressed").subscribe(res => {
      browser.close();
    });
  }

  gotoAnother() {
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: "#3573bbff"
      },

      title: {
        color: "#ffffffff",
        showPageTitle: true,
        staticText: "大数据"
      },

      backButton: {
        wwwImage: "assets/img/back.png",
        align: "right",
        event: "backPressed"
      },

      forwardButton: {
        wwwImage: "assets/img/forward.png",
        align: "right",
        event: "forwardPressed"
      },

      closeButton: {
        wwwImage: "assets/img/close.png",
        align: "left",
        event: "closePressed"
      }
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(
      "http://www.lib.fzu.edu.cn/jzxy/",
      "_blank",
      options
    );

    browser.on("closePressed").subscribe(res => {
      browser.close();
    });
  }

  searchBooksInfo(search: any) {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.notSearch = false;
    this.searched = true;
    this.itutu.searchBooksInfo(search).then(data => {
      this.booksinfo = data["results"];
      loading.dismiss();
    }, error => (this.errorMessage = <any>error));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
