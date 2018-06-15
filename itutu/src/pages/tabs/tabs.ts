import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ResourcePage } from '../resource/resource';
import { ChatPage } from '../chat/chat';
import { CirclePage } from '../circle/circle';
import { MorePage } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabResource = ResourcePage;
  tabChat = ChatPage;
  tabCircle = CirclePage;
  tabMore = MorePage;

  constructor() {

  }
}
