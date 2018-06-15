import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
/*
  Generated class for the ItutuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItutuProvider {
  public data: any;
  constructor(public http: Http) {
    console.log("Hello ItutuProvider Provider");
  }

  // 获取图书
  private apiUrlBooksInfo = "http://[2001:da8:270:2018:f816:3eff:fe66:11c]/booksinfo/";
  // 图书检索
  private apiUrlSearchBooksInfo = "http://[2001:da8:270:2018:f816:3eff:fe66:11c]/booksinfo/";


  /**
   * 获取图书信息
   *
   * @returns
   * @memberof ItutuProvider
   */
  getBooksInfo() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http
        .get(this.apiUrlBooksInfo)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  /**
   * 图书检索
   *
   * @param {any} search
   * @returns
   * @memberof ItutuProvider
   */
  searchBooksInfo(search) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http
        .get(this.apiUrlSearchBooksInfo + "?search=" + search)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
