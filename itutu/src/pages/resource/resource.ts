import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserObject, ThemeableBrowserOptions } from '@ionic-native/themeable-browser';

/**
 * Generated class for the ResourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-resource',
  templateUrl: 'resource.html',
})
export class ResourcePage {

  constructor(public navCtrl: NavController,
    private themeableBrowser: ThemeableBrowser) {
  }

  openBrowser() {
    const options: ThemeableBrowserOptions = {

      toolbar: {
        height: 44,
        color: '#3573bbff'
      },

      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: '网易云课堂'
      },

      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'right',
        event: "backPressed"
      },

      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'right',
        event: "forwardPressed"
      },

      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: "closePressed"
      }
    }
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://study.163.com', '_blank', options);

    browser.on('closePressed').subscribe(res => {
      browser.close();
    });
  }

}
