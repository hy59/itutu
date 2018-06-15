import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { HttpModule } from "@angular/http";

//页面加载
import { HomePage } from "../pages/home/home";
import { ChatPage } from "../pages/chat/chat";
import { MorePage } from "../pages/more/more";
import { LoginPage } from "../pages/login/login";
import { UserPage } from "../pages/user/user";
import { CirclePage } from "../pages/circle/circle";
import { ResourcePage } from "../pages/resource/resource";
import { RegisterPage } from "../pages/register/register";
import { HeadfacePage } from "../pages/headface/headface";
import { SearchPage } from "../pages/search/search";
import { QuestionPage } from "../pages/question/question";
import { QaDeatilsPage } from "../pages/qa-deatils/qa-deatils";
import { QaAnswersPage } from "../pages/qa-answers/qa-answers";
import { ChatdetailsPage } from "../pages/chatdetails/chatdetails";
import { DiscoverPage } from "../pages/discover/discover";
import { SearchdetailsPage } from "../pages/searchdetails/searchdetails";
import { TestPage } from "../pages/test/test";
import { TabsPage } from "../pages/tabs/tabs";
import { BooksDistPage } from "../pages/books-dist/books-dist";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { RestProvider } from "../providers/rest/rest";
import { ItutuProvider } from "../providers/itutu/itutu";
import { ChatserviceProvider } from "../providers/chatservice/chatservice";
//导入表情的 Provider
import { EmojiProvider } from "../providers/emoji/emoji";
import { ComponentsModule } from "../components/components.module";

import { IonicStorageModule } from "@ionic/storage";
//导入5个外部加载进来的组件
import { Transfer } from "@ionic-native/transfer";
import { Camera } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { File } from "@ionic-native/file";
import {
  ThemeableBrowser,
  ThemeableBrowserObject
} from "@ionic-native/themeable-browser";

import { RelativetimePipe } from "../pipes/relativetime/relativetime";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CirclePage,
    ResourcePage,
    ChatPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    SearchPage,
    QuestionPage,
    QaDeatilsPage,
    QaAnswersPage,
    ChatdetailsPage,
    DiscoverPage,
    RelativetimePipe,
    SearchdetailsPage,
    TestPage,
    BooksDistPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule, //全局需要导入 HTTP
    IonicModule.forRoot(MyApp, {
      backButtonText: "返回"
    }),
    ComponentsModule,
    IonicStorageModule.forRoot() //全局定义 storage 的模块
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CirclePage,
    ResourcePage,
    ChatPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    SearchPage,
    QuestionPage,
    QaDeatilsPage,
    QaAnswersPage,
    ChatdetailsPage,
    DiscoverPage,
    SearchdetailsPage,
    TestPage,
    BooksDistPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider, //rest 的定义导入
    File,
    Transfer,
    Camera,
    FilePath,
    ChatserviceProvider,
    EmojiProvider,
    ThemeableBrowser,
    ItutuProvider //drf 的定义导入
  ]
})
export class AppModule {}
