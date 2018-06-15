webpackJsonp([7],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatdetails_chatdetails__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = (function () {
    function ChatPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        //你在这里也可以直接从你的 API 接口或者其他的方法实现用户列表的定义
        this.userinfo = {
            userid: '123321',
            username: '小图'
        };
        this.ChatdetailsPage = __WEBPACK_IMPORTED_MODULE_2__chatdetails_chatdetails__["a" /* ChatdetailsPage */];
    }
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\chat\chat.html"*/`<ion-header>\n    <ion-navbar>\n      <ion-title>群组聊天</ion-title>\n    </ion-navbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <ion-item [navPush]="ChatdetailsPage" [navParams]="userinfo" >\n        <ion-avatar item-left>\n          <img src="http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg">\n        </ion-avatar>\n        <h2>小图</h2>\n        <p>给大家演示聊天组件</p>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n  `/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\chat\chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chatservice_chatservice__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatdetailsPage = (function () {
    function ChatdetailsPage(navCtrl, navParams, rest, storage, event, chatService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rest = rest;
        this.storage = storage;
        this.event = event;
        this.chatService = chatService;
        this.isOpenEmojiPicker = false;
        this.messageList = [];
        this.chatUserName = navParams.get('username');
        this.chatUserId = navParams.get('userid');
    }
    ChatdetailsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val != null) {
                _this.rest.getUserInfo(val)
                    .subscribe(function (userinfo) {
                    _this.userId = '140000198202211138';
                    _this.userName = userinfo["UserNickName"];
                    _this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
                }, function (error) { return _this.errorMessage = error; });
            }
        });
        this.getMessages()
            .then(function () {
            _this.scrollToBottom();
        });
        //听取消息的发布，订阅
        this.event.subscribe('chat.received', function (msg, time) {
            _this.messageList.push(msg);
            _this.scrollToBottom();
        });
    };
    ChatdetailsPage.prototype.sendMessage = function () {
        var _this = this;
        if (!this.editorMessage.trim())
            return;
        var id = Date.now().toString();
        var messageSend = {
            messageId: id,
            userId: this.userId,
            username: this.userName,
            userImgUrl: this.userImgUrl,
            toUserId: this.chatUserId,
            time: Date.now(),
            message: this.editorMessage,
            status: 'pending'
        };
        this.messageList.push(messageSend);
        this.scrollToBottom();
        this.editorMessage = '';
        if (!this.isOpenEmojiPicker) {
            this.messageInput.setFocus();
        }
        //发送消息并改变消息的状态
        this.chatService.sendMessage(messageSend)
            .then(function () {
            var index = _this.getMessageIndex(id);
            if (index !== -1) {
                _this.messageList[index].status = 'success';
            }
        });
    };
    ChatdetailsPage.prototype.ionViewWillLeave = function () {
        //进行事件的取消订阅
        this.event.unsubscribe('chat.received');
    };
    ChatdetailsPage.prototype.focus = function () {
        this.isOpenEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    };
    /**
     * 调用 service 里面的方法进行属性的赋值
     *
     * @returns
     * @memberof ChatdetailsPage
     */
    ChatdetailsPage.prototype.getMessages = function () {
        var _this = this;
        return this.chatService.getMessageList()
            .then(function (res) {
            _this.messageList = res;
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    /**
     * 切换表情组件
     *
     * @memberof ChatdetailsPage
     */
    ChatdetailsPage.prototype.switchEmojiPicker = function () {
        this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
    };
    ChatdetailsPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    ChatdetailsPage.prototype.getMessageIndex = function (id) {
        return this.messageList.findIndex(function (e) { return e.messageId === id; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], ChatdetailsPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('chatInput'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* TextInput */])
    ], ChatdetailsPage.prototype, "messageInput", void 0);
    ChatdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chatdetails',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\chatdetails\chatdetails.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>{{chatUserName}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class="message-wrap">\n\n    <div class="message" *ngFor="let m of messageList" [class.left]="m.userId === chatUserId" [class.right]="m.userId === userId">\n      <img [src]="m.userImgUrl" class="user-img">\n      <ion-spinner name="dots" *ngIf="m.status === \'pending\'"></ion-spinner>\n      <div class="msg-detail">\n        <div class="msg-info">\n          <p>{{m.username}}&nbsp;{{m.time | relativetime}}</p>\n        </div>\n        <div class="msg-content">\n          <p class="line-breaker">{{m.message}}</p>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</ion-content>\n\n<ion-footer no-border [style.height]="isOpenEmojiPicker? \'255px\': \'55px\'">\n  <ion-grid class="input-wrap">\n    <ion-row>\n      <ion-col col-2>\n        <button ion-button clear ion-only item-right (click)="switchEmojiPicker()">\n          <ion-icon name="md-happy"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-8>\n        <ion-textarea #chatInput [(ngModel)]="editorMessage" (keyup.enter)="sendMessage()" (focus)="focus()" placeholder="输入内容"></ion-textarea>\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button clear ion-only item-right (click)="sendMessage()">\n          <ion-icon name="send"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <emojipicker *ngIf="isOpenEmojiPicker" [(ngModel)]="editorMessage"></emojipicker>\n</ion-footer>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\chatdetails\chatdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_chatservice_chatservice__["a" /* ChatserviceProvider */]])
    ], ChatdetailsPage);
    return ChatdetailsPage;
}());

//# sourceMappingURL=chatdetails.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QaAnswersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(24);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the QaAnswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QaAnswersPage = (function (_super) {
    __extends(QaAnswersPage, _super);
    function QaAnswersPage(navCtrl, navParams, viewCtrl, storage, loadingCtrl, rest, toastCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.storage = storage;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        _this.toastCtrl = toastCtrl;
        _this.id = navParams.get('id');
        return _this;
    }
    QaAnswersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnswerPage');
    };
    QaAnswersPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    QaAnswersPage.prototype.submit = function () {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val != null) {
                var loading = _super.prototype.showLoading.call(_this, _this.loadingCtrl, "发表中...");
                _this.rest.answer(val, _this.id, _this.content)
                    .subscribe(function (f) {
                    if (f["Status"] == "OK") {
                        loading.dismissAll();
                        _this.dismiss();
                    }
                    else {
                        loading.dismissAll();
                        _super.prototype.showToast.call(_this, _this.toastCtrl, f["StatusContent"]);
                    }
                }, function (error) { return _this.errorMessage = error; });
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, "请登录后发布回答...");
            }
        });
    };
    QaAnswersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-qa-answers',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\qa-answers\qa-answers.html"*/`<ion-header>\n    <ion-navbar>\n      <ion-title>回答</ion-title>\n      <ion-buttons start>\n        <button ion-button (click)="dismiss()">\n          <span ion-text color="primary" showWhen="ios">取消</span>\n          <ion-icon name="md-close" showWhen="android"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-buttons end>\n        <button ion-button  (click)="submit()">\n          <span ion-text color="primary" showWhen="ios">发布</span>\n          <ion-icon name="md-add-circle" showWhen="android"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>请输入回答内容</ion-label>\n        <ion-textarea type="text" rows="20" style="height:100%;" [(ngModel)]="content"></ion-textarea>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n  `/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\qa-answers\qa-answers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], QaAnswersPage);
    return QaAnswersPage;
}(__WEBPACK_IMPORTED_MODULE_3__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=qa-answers.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/books-dist/books-dist.module": [
		832,
		6
	],
	"../pages/chat/chat.module": [
		833,
		5
	],
	"../pages/chatdetails/chatdetails.module": [
		834,
		4
	],
	"../pages/qa-answers/qa-answers.module": [
		836,
		3
	],
	"../pages/qa-deatils/qa-deatils.module": [
		835,
		2
	],
	"../pages/searchdetails/searchdetails.module": [
		837,
		1
	],
	"../pages/test/test.module": [
		838,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 218;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ChatMessage */
/* unused harmony export UserInfo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatserviceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//聊天信息的属性
var ChatMessage = (function () {
    function ChatMessage() {
    }
    return ChatMessage;
}());

//用户信息的属性
var UserInfo = (function () {
    function UserInfo() {
    }
    return UserInfo;
}());

var ChatserviceProvider = (function () {
    function ChatserviceProvider(http, event) {
        this.http = http;
        this.event = event;
    }
    /**
     * 获取消息列表
     * 从 API 获取或者从模拟的 JSON 获取
     * @returns null
     * @memberof ChatserviceProvider
     */
    ChatserviceProvider.prototype.getMessageList = function () {
        var url = '../assets/mock/msg-list.json';
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().array; })
            .catch(function (error) { return Promise.reject(error || '错误信息'); });
    };
    ChatserviceProvider.prototype.sendMessage = function (message) {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(function () {
            resolve(message);
        }, Math.random() * 1000); })
            .then(function () {
            _this.mockNewMessage(message);
        });
    };
    /**
     * 模拟对方回复了一个消息
     * 这里要思考：前台如何即时地能接受到这个消息？
     * 引入 Events 模块
     *
     * @param {*} message
     * @memberof ChatserviceProvider
     */
    ChatserviceProvider.prototype.mockNewMessage = function (message) {
        var _this = this;
        var id = Date.now().toString();
        var messageSend = {
            messageId: id,
            userId: '123321',
            username: '慕女神',
            userImgUrl: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
            toUserId: message.userId,
            time: Date.now(),
            message: '你是不是刚才给我发送了「' + message.message + '」？',
            status: 'success'
        };
        //进行消息的发布，类似大喇叭进行广播。
        setTimeout(function () {
            _this.event.publish('chat.received', messageSend, Date.now());
        }, Math.random() * 1000);
    };
    ChatserviceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]])
    ], ChatserviceProvider);
    return ChatserviceProvider;
}());

//# sourceMappingURL=chatservice.js.map

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseUI; });
/**
 * UI层的所有公用方法的抽象类
 * @wujiu 18-03-17
 * @export
 * @abstract
 * @class BaseUI
 */
var BaseUI = (function () {
    function BaseUI() {
    }
    /**
     * 通用的展示 loading 的组件
     * @wujiu 18-03-17
     * @protected
     * @param {LoadingController} loadingCtrl
     * @param {string} message
     * @returns {Loading}
     * @memberof BaseUI
     */
    BaseUI.prototype.showLoading = function (loadingCtrl, message) {
        var loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true //页面发生变化的时候自动关闭 loading
        });
        loader.present();
        return loader;
    };
    /**
     * 通用的展示 toast 的组件
     * @wujiu 18-03-17
     * @protected
     * @param {ToastController} toastCtrl
     * @param {string} message
     * @returns {Toast}
     * @memberof BaseUI
     */
    BaseUI.prototype.showToast = function (toastCtrl, message) {
        var toast = toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    };
    return BaseUI;
}());

//# sourceMappingURL=baseui.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RestProvider = (function () {
    function RestProvider(http) {
        this.http = http;
        //feed
        this.apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';
        //account
        this.apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
        this.apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
        this.apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
        this.apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
        //question
        this.apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
        this.apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
        this.apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
        this.apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
        this.apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
        this.apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";
        //console.log('Hello RestProvider Provider');
    }
    /**
     * 根据用户的手机号码和密码进行登录
     * @wujiu 2018-03-17
     * @param {any} moblie
     * @param {any} password
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    RestProvider.prototype.login = function (moblie, password) {
        return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + moblie + "&password=" + password);
    };
    /**
     * 获取用户的信息
     * @wujiu 2018-03-18
     * @param {any} userId
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    RestProvider.prototype.getUserInfo = function (userId) {
        return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId);
    };
    /**
     * 更新用户的昵称
     * @wujiu 2018-03-19
     * @param {any} userId
     * @param {any} nickname
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    RestProvider.prototype.updateNickName = function (userId, nickname) {
        return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname);
    };
    /**
       * 保存提问
       * @wujiu 2018-03-19
       * @param {any} userId
       * @param {any} title
       * @param {any} content
       * @returns {Observable<string[]>}
       * @memberof RestProvider
       */
    RestProvider.prototype.saveQuestion = function (userId, title, content) {
        return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userId + "&title=" + title + "&content=" + content);
    };
    /**
      * 获取问题的详情
      *
      * @param {any} id
      * @returns {Observable<string[]>}
      * @memberof RestProvider
      */
    RestProvider.prototype.getQuestion = function (id) {
        return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" + id);
    };
    /**
     * 获取问题的详情，传递 userid 获取到当前用户有没有关注此问题
     *
     * @param {any} questionId
     * @param {any} userId
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    RestProvider.prototype.getQuestionWithUser = function (questionId, userId) {
        return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId);
    };
    RestProvider.prototype.saveFavourite = function (questionId, userId) {
        return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId);
    };
    RestProvider.prototype.answer = function (userId, questionId, content) {
        return this.getUrlReturn(this.apiUrlAnswer + "?userid=" + userId + "&questionid=" + questionId + "&content=" + content);
    };
    /**
     * 注册请求
     * 注意：没考虑好安全性方面的问题， 密码传递应该在传递之前进行加密， md5, hash
     * 服务器端也应该进行相应的处理
     * @wujiu 2018-03-18
     * @param {any} moblie
     * @param {any} nickname
     * @param {any} password
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    RestProvider.prototype.register = function (moblie, nickname, password) {
        return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + moblie + "&nickname=" + nickname + "&password=" + password);
    };
    /**
       * 请求首页的 feeds 流
       *
       * @returns {Observable<string[]>}
       * @memberof RestProvider
       */
    RestProvider.prototype.getFeeds = function () {
        return this.getUrlReturn(this.apiUrlFeeds);
    };
    RestProvider.prototype.getQuestions = function () {
        return this.getUrlReturn(this.apiUrlQuestionList);
    };
    /**
     * 全局获取 HTTP 请求的方法
     * @wujiu 2018-03-17
     * @private
     * @param {string} url
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    RestProvider.prototype.getUrlReturn = function (url) {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
     * 处理接口返回的数据，json格式
     * @wujiu 2018-03-17
     * @private
     * @param {Response} res
     * @returns
     * @memberof RestProvider
     */
    RestProvider.prototype.extractData = function (res) {
        var body = res.json();
        return JSON.parse(body) || {};
    };
    /**
     * 处理请求中的错误，考虑各种情况的错误并处理则在 console 显示 error
     * @wujiu 2018-03-17
     * @private
     * @param {(Response | any)} error
     * @returns
     * @memberof RestProvider
     */
    RestProvider.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errMsg);
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource_resource__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_chat__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__circle_circle__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__more_more__ = __webpack_require__(360);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = (function () {
    function TabsPage() {
        this.tabHome = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tabResource = __WEBPACK_IMPORTED_MODULE_2__resource_resource__["a" /* ResourcePage */];
        this.tabChat = __WEBPACK_IMPORTED_MODULE_3__chat_chat__["a" /* ChatPage */];
        this.tabCircle = __WEBPACK_IMPORTED_MODULE_4__circle_circle__["a" /* CirclePage */];
        this.tabMore = __WEBPACK_IMPORTED_MODULE_5__more_more__["a" /* MorePage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\tabs\tabs.html"*/`<ion-tabs selectedIndex="0">\n  <ion-tab [root]="tabHome" tabTitle="首页" tabIcon="list-box"></ion-tab>\n  <ion-tab [root]="tabResource" tabTitle="资源" tabIcon="aperture"></ion-tab>\n  <ion-tab [root]="tabChat" tabTitle="群组" tabIcon="chatbubbles"></ion-tab>\n  <ion-tab [root]="tabCircle" tabTitle="社区" tabIcon="people"></ion-tab>\n  <ion-tab [root]="tabMore" tabTitle="更多" tabIcon="menu"></ion-tab>\n</ion-tabs>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_themeable_browser__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_itutu_itutu__ = __webpack_require__(49);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage(navCtrl, modalCtrl, viewCtrl, themeableBrowser, loadingCtrl, itutu) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.viewCtrl = viewCtrl;
        _this.themeableBrowser = themeableBrowser;
        _this.loadingCtrl = loadingCtrl;
        _this.itutu = itutu;
        _this.notSearch = true;
        _this.searched = false;
        return _this;
    }
    HomePage.prototype.gotoSearch = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    HomePage.prototype.gotoFULink = function () {
        var options = {
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
        var browser = this.themeableBrowser.create("http://www.fulink.edu.cn/", "_blank", options);
        browser.on("closePressed").subscribe(function (res) {
            browser.close();
        });
    };
    HomePage.prototype.gotoReaderNote = function () {
        var options = {
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
        var browser = this.themeableBrowser.create("http://www.lib.fzu.edu.cn/reader/pingmian.asp?place=2", "_blank", options);
        browser.on("closePressed").subscribe(function (res) {
            browser.close();
        });
    };
    HomePage.prototype.gotoBooksDist = function () {
        var options = {
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
        var browser = this.themeableBrowser.create("http://libdc.fzu.edu.cn/", "_blank", options);
        browser.on("closePressed").subscribe(function (res) {
            browser.close();
        });
    };
    HomePage.prototype.gotoAnother = function () {
        var options = {
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
        var browser = this.themeableBrowser.create("http://www.lib.fzu.edu.cn/jzxy/", "_blank", options);
        browser.on("closePressed").subscribe(function (res) {
            browser.close();
        });
    };
    HomePage.prototype.searchBooksInfo = function (search) {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中...");
        this.notSearch = false;
        this.searched = true;
        this.itutu.searchBooksInfo(search).then(function (data) {
            _this.booksinfo = data["results"];
            loading.dismiss();
        }, function (error) { return (_this.errorMessage = error); });
    };
    HomePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-home",template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\home\home.html"*/`<ion-header>\n  <ion-toolbar>\n    <ion-searchbar placeholder="图书检索" [(ngModel)]="search"></ion-searchbar>\n    <ion-icon name="arrow-forward" class="top_header_message_icon" (tap)="searchBooksInfo(search)"></ion-icon>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div *ngIf="notSearch">\n    <div class="floatMenu">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4 text-center>\n            <div (tap)="gotoSearch()">\n              <ion-icon name="create"></ion-icon> 图书检索\n            </div>\n          </ion-col>\n          <ion-col col-4 text-center>\n            <div>\n              <span style="float:left;color:#dddddd;">|</span>\n              <div (tap)="gotoFULink()">\n                <ion-icon name="albums"></ion-icon> FULink\n              </div>\n              <span style="float:right;color:#dddddd;">|</span>\n            </div>\n          </ion-col>\n          <ion-col col-4 text-center>\n            <div (tap)="gotoSearch()">\n              <ion-icon name="share-alt"></ion-icon> 数据库检索\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n\n    <div>\n      <ion-slides [pager]="true" [loop]="true" autoplay="3000">\n\n        <ion-slide slide-zoom>\n          <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/loop/images/loop-1.jpg">\n          <img>\n        </ion-slide>\n\n        <ion-slide slide-zoom>\n          <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/loop/images/loop-2.jpg">\n          <img>\n        </ion-slide>\n\n        <ion-slide slide-zoom>\n          <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/loop/images/loop-3.jpg">\n          <img>\n        </ion-slide>\n\n        <ion-slide slide-zoom>\n          <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/loop/images/loop-4.jpg">\n          <img>\n        </ion-slide>\n\n      </ion-slides>\n    </div>\n\n    <p>新生专区</p>\n\n    <div>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4 text-center class="colnav" style="background: rgba(128,179,107,.9);">\n            <div (tap)="gotoReaderNote()">\n              读者指南\n            </div>\n          </ion-col>\n          <ion-col col-4 text-center class="colnav" style="background: rgba(237,133,80,.9);">\n            <div (tap)="gotoBooksDist()">\n              图书分布\n            </div>\n          </ion-col>\n          <ion-col col-4 text-center class="colnav" style="background: rgba(247,147,173,.9);">\n            <div (tap)="gotoAnother()">\n              机构设置\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n\n    <p>热门推荐</p>\n\n    <div>\n      <ion-slides [pager]="true" [loop]="true" autoplay="3000">\n\n        <ion-slide class="side-book">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_01.jpg">\n              </ion-col>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_02.jpg">\n              </ion-col>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_03.jpg">\n              </ion-col>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_04.jpg">\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-slide>\n\n        <ion-slide class="side-book">\n          <ion-grid>\n            <ion-row>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_01.jpg">\n              </ion-col>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_02.jpg">\n              </ion-col>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_03.jpg">\n              </ion-col>\n              <ion-col col-3 text-center class="book">\n                <img src="http://[2001:da8:270:2018:f816:3eff:fe66:11c]/media/books/images/commend_book_04.jpg">\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-slide>\n\n      </ion-slides>\n    </div>\n  </div>\n\n  <div *ngIf="searched">\n    <ion-card *ngFor="let f of booksinfo">\n\n      <ion-item>\n        <h1>{{f?.booktitle}}</h1>\n        <p>评分</p>\n      </ion-item>\n      <div>\n        <ion-row>\n          <ion-col col-4>\n            <img src="{{f?.book_image}}">\n          </ion-col>\n          <ion-col col-8>\n            <ion-list no-border>\n              <ion-item>\n                作者\n                <ion-note item-end>\n                  {{f?.authors}}\n                </ion-note>\n              </ion-item>\n              <ion-item>\n                出版社\n                <ion-note item-end>\n                  {{f?.pub_house}}\n                </ion-note>\n              </ion-item>\n              <ion-item>\n                索书号\n                <ion-note item-end>\n                  {{f?.call_num}}\n                </ion-note>\n              </ion-item>\n            </ion-list>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </div>\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_themeable_browser__["a" /* ThemeableBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_itutu_itutu__["a" /* ItutuProvider */]])
    ], HomePage);
    return HomePage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_itutu_itutu__ = __webpack_require__(49);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = (function (_super) {
    __extends(SearchPage, _super);
    function SearchPage(navCtrl, navParams, viewCtrl, modalCtrl, itutu, loadingCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.modalCtrl = modalCtrl;
        _this.itutu = itutu;
        _this.loadingCtrl = loadingCtrl;
        _this.notSearch = true;
        _this.searched = false;
        return _this;
    }
    /*
    gotoSearchDetails() {
      var modal = this.modalCtrl.create(SearchdetailsPage, this.search);
      modal.present();
    }*/
    SearchPage.prototype.searchBooksInfo = function (search) {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中...");
        this.notSearch = false;
        this.searched = true;
        this.itutu.searchBooksInfo(search).then(function (data) {
            _this.booksinfo = data["results"];
            loading.dismiss();
        }, function (error) { return (_this.errorMessage = error); });
    };
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad SearchPage");
    };
    SearchPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-search",template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\search\search.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>图书检索</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">取消</span>\n        <ion-icon name="md-close" showWhen="android"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n  <div *ngIf="notSearch">\n    <ion-list>\n      <ion-item>\n        <ion-select [(ngModel)]="selected">\n          <ion-label>检索项</ion-label>\n          <ion-option value="subject" selected="true">主题</ion-option>\n          <ion-option value="title">篇名</ion-option>\n          <ion-option value="author">作者</ion-option>\n          <ion-option value="publisher">单位</ion-option>\n          <ion-option value="keywords">关键词</ion-option>\n          <ion-option value="source">来源</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-searchbar placeholder="图书检索" [(ngModel)]="search"></ion-searchbar>\n      </ion-item>\n    </ion-list>\n    <div padding>\n      <button ion-button color="primary" block (click)="searchBooksInfo(search)">检 索</button>\n    </div>\n\n\n    <ion-grid text-center>\n\n      <ion-row>\n        <p style="color: #4CD964;">检索历史</p>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-3 style="color: #999999;">主题</ion-col>\n        <ion-col col-9>数据分析</ion-col>\n      </ion-row>\n\n      <ion-row>\n        <p>图书标签</p>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-3 style="color: red;">科目</ion-col>\n        <ion-col col-3>计算机</ion-col>\n        <ion-col col-3>土木工程</ion-col>\n        <ion-col col-3>生物工程</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-3></ion-col>\n        <ion-col col-3>化学</ion-col>\n        <ion-col col-3>经济金融</ion-col>\n        <ion-col col-3>法律</ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-3 style="color: red;">文学</ion-col>\n        <ion-col col-3>随笔</ion-col>\n        <ion-col col-3>童话</ion-col>\n        <ion-col col-3>名著</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-3></ion-col>\n        <ion-col col-3>诗歌</ion-col>\n        <ion-col col-3>散文</ion-col>\n        <ion-col col-3>戏剧</ion-col>\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <div *ngIf="searched">\n    <ion-card *ngFor="let f of booksinfo">\n\n      <ion-item>\n        <h1>{{f?.booktitle}}</h1>\n        <p>评分</p>\n      </ion-item>\n      <div>\n        <ion-row>\n          <ion-col col-4>\n            <img src="{{f?.book_image}}">\n          </ion-col>\n          <ion-col col-8>\n            <ion-list no-border>\n              <ion-item>\n                作者\n                <ion-note item-end>\n                  {{f?.authors}}\n                </ion-note>\n              </ion-item>\n              <ion-item>\n                出版社\n                <ion-note item-end>\n                  {{f?.pub_house}}\n                </ion-note>\n              </ion-item>\n              <ion-item>\n                索书号\n                <ion-note item-end>\n                  {{f?.call_num}}\n                </ion-note>\n              </ion-item>\n            </ion-list>\n          </ion-col>\n        </ion-row>\n      </div>\n    </ion-card>\n  </div>\n\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\search\search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_itutu_itutu__["a" /* ItutuProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], SearchPage);
    return SearchPage;
}(__WEBPACK_IMPORTED_MODULE_2__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourcePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_themeable_browser__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ResourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResourcePage = (function () {
    function ResourcePage(navCtrl, themeableBrowser) {
        this.navCtrl = navCtrl;
        this.themeableBrowser = themeableBrowser;
    }
    ResourcePage.prototype.openBrowser = function () {
        var options = {
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
        };
        var browser = this.themeableBrowser.create('https://study.163.com', '_blank', options);
        browser.on('closePressed').subscribe(function (res) {
            browser.close();
        });
    };
    ResourcePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-resource',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\resource\resource.html"*/`<ion-header>\n</ion-header>\n<ion-content padding>\n  <button ion-button full (click)="openBrowser()" id="btn">跳转中...</button>\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\resource\resource.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_themeable_browser__["a" /* ThemeableBrowser */]])
    ], ResourcePage);
    return ResourcePage;
}());

//# sourceMappingURL=resource.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CirclePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__question_question__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__qa_deatils_qa_deatils__ = __webpack_require__(91);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CirclePage = (function (_super) {
    __extends(CirclePage, _super);
    function CirclePage(navCtrl, modalCtrl, loadingCtrl, rest) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        return _this;
    }
    CirclePage.prototype.ionViewDidLoad = function () {
        this.getFeeds();
    };
    CirclePage.prototype.gotoQuestion = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__question_question__["a" /* QuestionPage */]);
        modal.present();
    };
    CirclePage.prototype.gotoChat = function () {
        this.selectTab(2);
    };
    /**
     * 选定指定的 tab
     *
     * @param {number} index
     * @memberof HomePage
     */
    CirclePage.prototype.selectTab = function (index) {
        var t = this.navCtrl.parent;
        t.select(index);
    };
    CirclePage.prototype.getFeeds = function () {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中...");
        this.rest.getFeeds()
            .subscribe(function (f) {
            _this.feeds = f;
            loading.dismiss();
        }, function (error) { return _this.errorMessage = error; });
    };
    CirclePage.prototype.doRefresh = function (refresher) {
        this.getFeeds();
        refresher.complete();
    };
    CirclePage.prototype.gotoQaDetails = function (questionId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__qa_deatils_qa_deatils__["a" /* QaDeatilsPage */], { id: questionId });
    };
    CirclePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-circle',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\circle\circle.html"*/`<!--\n  Generated template for the CirclePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar>\n    <ion-searchbar placeholder="搜索：如何高效地学习 python 开发"></ion-searchbar>\n    <ion-icon name="text" class="top_header_message_icon" (tap)="gotoQuestion()"></ion-icon>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class="floatMenu">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-4 text-center>\n          <div (tap)="gotoQuestion()">\n            <ion-icon name="create"></ion-icon> 提问\n          </div>\n        </ion-col>\n        <ion-col col-4 text-center>\n          <div>\n            <span style="float:left;color:#dddddd;">|</span>\n            <ion-icon name="albums"></ion-icon> 回答\n            <span style="float:right;color:#dddddd;">|</span>\n          </div>\n        </ion-col>\n        <ion-col col-4 text-center>\n          <div (tap)="gotoQuestion()">\n            <ion-icon name="share-alt"></ion-icon> 分享\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content pullingIcon="arrow-down" pullingText="下拉刷新" refreshingSpinner="circles" refreshingText="数据加载中...">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let f of feeds" (click)="gotoQaDetails(f.IdentityId)">\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{f.HeadFace}}">\n      </ion-avatar>\n      <p>{{f.UserNickName}}回答了该问题\n        <ion-icon class="more_button" name="more"></ion-icon>\n      </p>\n    </ion-item>\n    <h2>{{f.ContentTitle}}</h2>\n    <ion-card-content>\n      <p>{{f.ContentSummary}}</p>\n    </ion-card-content>\n    <ion-row>\n      <ion-col col-8 center text-left>\n        <ion-note>\n          {{f.LikeCount}}&nbsp;赞同&nbsp;&nbsp;·&nbsp;&nbsp;{{f.CommentCount}}&nbsp;评论&nbsp;&nbsp;·&nbsp;&nbsp;关注问题\n        </ion-note>\n      </ion-col>\n      <ion-col col-4></ion-col>\n    </ion-row>\n  </ion-card>\n\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\circle\circle.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */]])
    ], CirclePage);
    return CirclePage;
}(__WEBPACK_IMPORTED_MODULE_3__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=circle.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(24);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var QuestionPage = (function (_super) {
    __extends(QuestionPage, _super);
    function QuestionPage(navCtrl, navParams, viewCtrl, storage, loadingCtrl, rest, toastCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.storage = storage;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        _this.toastCtrl = toastCtrl;
        return _this;
    }
    QuestionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuestionPage');
    };
    QuestionPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    QuestionPage.prototype.submitQuestion = function () {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val != null) {
                var loading = _super.prototype.showLoading.call(_this, _this.loadingCtrl, "发表中...");
                _this.rest.saveQuestion(val, _this.title, _this.content)
                    .subscribe(function (f) {
                    if (f["Status"] == "OK") {
                        loading.dismissAll();
                        _this.dismiss();
                    }
                    else {
                        loading.dismissAll();
                        _super.prototype.showToast.call(_this, _this.toastCtrl, f["StatusContent"]);
                    }
                }, function (error) { return _this.errorMessage = error; });
            }
            else {
                _super.prototype.showToast.call(_this, _this.toastCtrl, "请登录后发布提问...");
            }
        });
    };
    QuestionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-question',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\question\question.html"*/`<ion-header>\n    <ion-navbar>\n      <ion-title>提问</ion-title>\n      <ion-buttons start>\n        <button ion-button (click)="dismiss()">\n          <span ion-text color="primary" showWhen="ios">取消</span>\n          <ion-icon name="md-close" showWhen="android"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  <ion-content>\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>问题标题</ion-label>\n        <ion-input type="text" [(ngModel)]="title"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>问题内容</ion-label>\n        <ion-textarea type="text" rows="5" [(ngModel)]="content"></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <div padding>\n      <button ion-button color="primary" block (click)="submitQuestion()">提 问</button>\n    </div>\n  </ion-content>\n  `/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\question\question.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], QuestionPage);
    return QuestionPage;
}(__WEBPACK_IMPORTED_MODULE_3__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=question.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MorePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_user__ = __webpack_require__(363);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MorePage = (function (_super) {
    __extends(MorePage, _super);
    function MorePage(navCtrl, navParams, modalCtrl, storage, rest, loadCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.modalCtrl = modalCtrl;
        _this.storage = storage;
        _this.rest = rest;
        _this.loadCtrl = loadCtrl;
        _this.notLogin = true;
        _this.logined = false;
        return _this;
    }
    MorePage.prototype.showModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        //关闭后的回调
        modal.onDidDismiss(function () {
            _this.loadUserPage();
        });
        modal.present();
    };
    MorePage.prototype.ionViewDidEnter = function () {
        this.loadUserPage();
    };
    MorePage.prototype.loadUserPage = function () {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val != null) {
                //加载用户数据
                var loading = _super.prototype.showLoading.call(_this, _this.loadCtrl, "加载中...");
                _this.rest.getUserInfo(val)
                    .subscribe(function (userinfo) {
                    _this.userinfo = userinfo;
                    //给资源文件添加一个后缀去除缓存
                    _this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
                    _this.notLogin = false;
                    _this.logined = true;
                    loading.dismiss();
                });
            }
            else {
                _this.notLogin = true;
                _this.logined = false;
            }
        });
    };
    MorePage.prototype.gotoUserPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__user_user__["a" /* UserPage */]);
    };
    MorePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-more',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\more\more.html"*/`<!--\n  Generated template for the MorePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>更多</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="notLogin">\n    <ion-card>\n      <ion-card-header text-center>\n        登录 itutu，体验更多功能\n      </ion-card-header>\n      <ion-card-content text-center>\n        <button ion-button outline small (click)="showModal()">登录/注册</button>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <div *ngIf="logined">\n    <ion-list class="marginTop">\n      <button ion-item (click)="gotoUserPage()">\n        <ion-avatar item-start>\n          <img src="{{headface}}">\n        </ion-avatar>\n        <h2>{{userinfo.UserNickName}}</h2>\n        <p>查看个人主页或编辑简介</p>\n      </button>\n    </ion-list>\n  </div>\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\more\more.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], MorePage);
    return MorePage;
}(__WEBPACK_IMPORTED_MODULE_4__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=more.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(362);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(navCtrl, navParams, viewCtrl, loadingCtrl, rest, toastCtrl, storage) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        _this.toastCtrl = toastCtrl;
        _this.storage = storage;
        return _this;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "登录中...");
        this.rest.login(this.mobile, this.password)
            .subscribe(function (f) {
            if (f["Status"] == "OK") {
                //登录成功的页面跳转
                //也可以存储接口返回的 token
                _this.storage.set('UserId', f["UserId"]);
                loading.dismiss();
                _this.dismiss();
            }
            else {
                loading.dismiss();
                _super.prototype.showToast.call(_this, _this.toastCtrl, f["StatusContent"]);
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    /**
     * 关闭当前页面的方法
     * @wujiu 18-03-17
     * @memberof LoginPage
     */
    LoginPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    /**
     * 跳转到注册页面
     * @wujiu 2018-03-18
     * @memberof LoginPage
     */
    LoginPage.prototype.pushRegisterPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\login\login.html"*/`<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>用户登录</ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">取消</span>\n        <ion-icon name="md-close" showWhen="android"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n    \n    <ion-item>\n      <ion-label stacked>手机号码</ion-label>\n      <ion-input type="text" [(ngModel)]="mobile"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>密码</ion-label>\n      <ion-input type="password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n\n  </ion-list>\n  <div padding>\n    <button ion-button color="primary" block (click)="login()">登 录</button>\n  </div>\n  <div padding text-center>\n    <button ion-button color="primary" outline (click)="pushRegisterPage()">没有账号？注册</button>\n  </div>\n\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}(__WEBPACK_IMPORTED_MODULE_2__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(24);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function (_super) {
    __extends(RegisterPage, _super);
    function RegisterPage(navCtrl, navParams, viewCtrl, loadingCtrl, rest, toastCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        _this.toastCtrl = toastCtrl;
        return _this;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RegisterPage.prototype.gotoLogin = function () {
        this.navCtrl.pop();
    };
    RegisterPage.prototype.doRegister = function () {
        var _this = this;
        //前台验证表单数据的正确性，包括手机号码、昵称的长度、密码的长度
        //验证国内手机号码的格式，考虑所有的当前手机号码的可能性
        if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
            //后台进行大数据的保存
            _super.prototype.showToast.call(this, this.toastCtrl, "您的手机号码格式不正确。");
        }
        else if (this.nickname.length < 3 || this.nickname.length > 10) {
            _super.prototype.showToast.call(this, this.toastCtrl, "昵称的长度应该在 3 ~ 10 位之间。");
        }
        else if (this.password.length < 6 || this.password.length > 20
            || this.confirmPassword.length < 6 || this.confirmPassword.length > 20) {
            _super.prototype.showToast.call(this, this.toastCtrl, "密码的长度应该在 6 ~ 20 位之间。");
        }
        else if (this.password != this.confirmPassword) {
            _super.prototype.showToast.call(this, this.toastCtrl, "两次输入的密码不匹配。");
        }
        else {
            var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "注册中...");
            this.rest.register(this.mobile, this.nickname, this.password)
                .subscribe(function (f) {
                if (f["Status"] == "OK") {
                    loading.dismiss();
                    _super.prototype.showToast.call(_this, _this.toastCtrl, "注册成功。");
                    _this.dismiss();
                }
                else {
                    loading.dismiss();
                    _super.prototype.showToast.call(_this, _this.toastCtrl, f["StatusContent"]);
                }
            }, function (error) { return _this.errorMessage = error; });
        }
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\register\register.html"*/`<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>用户注册</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item>\n      <ion-label stacked>手机号码</ion-label>\n      <ion-input type="text" [(ngModel)]="mobile"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>用户昵称</ion-label>\n      <ion-input type="text" [(ngModel)]="nickname"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>密码</ion-label>\n      <ion-input type="password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>确认密码</ion-label>\n      <ion-input type="password" [(ngModel)]="confirmPassword"></ion-input>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button color="primary" block (click)="doRegister()">注 册</button>\n  </div>\n\n  <div padding text-center>\n    <button ion-button color="primary" outline (click)="gotoLogin()">已有账号？登录</button>\n  </div>\n\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], RegisterPage);
    return RegisterPage;
}(__WEBPACK_IMPORTED_MODULE_2__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__headface_headface__ = __webpack_require__(364);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//@IonicPage()
var UserPage = (function (_super) {
    __extends(UserPage, _super);
    function UserPage(navCtrl, navParams, viewCtrl, modalCtrl, loadCtrl, rest, toastCtrl, storage) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.modalCtrl = modalCtrl;
        _this.loadCtrl = loadCtrl;
        _this.rest = rest;
        _this.toastCtrl = toastCtrl;
        _this.storage = storage;
        _this.headface = "http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg?";
        _this.nickname = "加载中...";
        return _this;
    }
    UserPage.prototype.ionViewDidEnter = function () {
        this.loadUserPage();
    };
    UserPage.prototype.loadUserPage = function () {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val != null) {
                //加载用户数据
                var loading = _super.prototype.showLoading.call(_this, _this.loadCtrl, "加载中...");
                _this.rest.getUserInfo(val)
                    .subscribe(function (userinfo) {
                    _this.nickname = userinfo["UserNickName"];
                    _this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
                    loading.dismiss();
                }, function (error) { return _this.errorMessage = error; });
            }
        });
    };
    /**
     * 更新昵称
     * @wujiu 2018-03-19
     * @memberof UserPage
     */
    UserPage.prototype.updateNickName = function () {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val != null) {
                var loading = _super.prototype.showLoading.call(_this, _this.loadCtrl, "修改中...");
                _this.rest.updateNickName(val, _this.nickname)
                    .subscribe(function (f) {
                    if (f["Status"] == "OK") {
                        loading.dismiss();
                        _super.prototype.showToast.call(_this, _this.toastCtrl, "昵称修改成功。");
                    }
                    else {
                        loading.dismiss();
                        _super.prototype.showToast.call(_this, _this.toastCtrl, f["StatusContent"]);
                    }
                }, function (error) { return _this.errorMessage = error; });
            }
        });
    };
    /**
     * 注销账户
     * @wujiu 2018-03-19
     * @memberof UserPage
     */
    UserPage.prototype.logout = function () {
        this.storage.remove('UserId');
        this.viewCtrl.dismiss();
    };
    UserPage.prototype.gotoHeadface = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__headface_headface__["a" /* HeadfacePage */]);
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\user\user.html"*/`<!--\n  Generated template for the UserPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>个人中心</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list class="marginTop marginBottom">\n    <button ion-item (click)="gotoHeadface()">\n      <ion-avatar item-start>\n        <img src="{{headface}}" />\n      </ion-avatar>\n      <h2>修改头像</h2>\n    </button>\n  </ion-list>\n\n  <ion-list>\n    <ion-item>\n      <ion-label>用户昵称</ion-label>\n      <ion-input type="text" [(ngModel)]="nickname"></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <div padding text-center class="paddingTop">\n    <button ion-button color="primary" block (click)="updateNickName()">保存</button>\n  </div>\n\n  <div padding text-center class="paddingTop">\n    <button ion-button color="danger" block (click)="logout()">注销</button>\n  </div>\n\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\user\user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], UserPage);
    return UserPage;
}(__WEBPACK_IMPORTED_MODULE_3__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeadfacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(368);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//导入四个外部加载进来的组件




var HeadfacePage = (function (_super) {
    __extends(HeadfacePage, _super);
    function HeadfacePage(navCtrl, navParams, modalCtrl, loadingCtrl, rest, storage, actionSheetCtrl, camera, transfer, file, filePath, platform, toastCtrl, viewCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.modalCtrl = modalCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        _this.storage = storage;
        _this.actionSheetCtrl = actionSheetCtrl;
        _this.camera = camera;
        _this.transfer = transfer;
        _this.file = file;
        _this.filePath = filePath;
        _this.platform = platform;
        _this.toastCtrl = toastCtrl;
        _this.viewCtrl = viewCtrl;
        _this.lastImage = null;
        return _this;
    }
    HeadfacePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val != null) {
                _this.userId = val;
            }
        });
    };
    HeadfacePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '选择图片',
            buttons: [
                {
                    text: '从图片库中选择',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: '使用相机',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: '取消',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    HeadfacePage.prototype.takePicture = function (sourceType) {
        var _this = this;
        //定义相机的一些参数
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true //是否纠正拍摄的照片的方向
        };
        //获取图片的方法
        this.camera.getPicture(options).then(function (imagePath) {
            //特别处理 android 平台的文件路径问题
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath) //获取 android 平台下的真实路径
                    .then(function (filePath) {
                    //获取正确的路径
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    //获取正确的文件名
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                //获取正确的路径
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                //获取正确的文件名
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _super.prototype.showToast.call(_this, _this.toastCtrl, "选择图片出现错误，请在 App 中操作或检查相关权限。");
        });
    };
    //将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
    HeadfacePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _super.prototype.showToast.call(_this, _this.toastCtrl, "存储图片到本地图库出现错误。");
        });
    };
    //为文件生成一个新的文件名
    HeadfacePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg"; //拼接文件名
        return newFileName;
    };
    //处理图片的路径为可以上传的路径
    HeadfacePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* normalizeURL */])(cordova.file.dataDirectory + img);
        }
    };
    HeadfacePage.prototype.uploadImage = function () {
        var _this = this;
        var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
        var targetPath = this.pathForImage(this.lastImage);
        var filename = this.userId + ".jpg"; //定义上传后的文件名
        //fileTransfer 上传的参数
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename, 'userid': this.userId }
        };
        var fileTransfer = this.transfer.create();
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "上传中...");
        //开始正式地上传
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            loading.dismiss();
            _super.prototype.showToast.call(_this, _this.toastCtrl, "图片上传成功。");
            //在用户看清弹窗提示后进行页面的关闭
            setTimeout(function () {
                _this.viewCtrl.dismiss();
            }, 3000);
        }, function (err) {
            loading.dismiss();
            _super.prototype.showToast.call(_this, _this.toastCtrl, "图片上传发生错误，请重试。");
        });
    };
    HeadfacePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-headface',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\headface\headface.html"*/`<!--\n  Generated template for the HeadfacePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>设置头像</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <img src="{{pathForImage(lastImage)}}" style="width:100%;height:60%" [hidden]="lastImage === null">\n  <h3 [hidden]="lastImage !== null">请从图片库选择一张图片</h3>\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-toolbar color="promary">\n    <ion-buttons>\n      <button ion-button ion-left (click)="presentActionSheet()">\n        <ion-icon name="camera"></ion-icon>选择...\n      </button>\n      <button ion-button ion-left (click)="uploadImage()" [disabled]="lastImage === null">\n        <ion-icon name="cloud-upload"></ion-icon>上传\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n\n</ion-footer>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\headface\headface.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], HeadfacePage);
    return HeadfacePage;
}(__WEBPACK_IMPORTED_MODULE_3__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=headface.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmojiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the EmojiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EmojiProvider = (function () {
    function EmojiProvider(http) {
        this.http = http;
        //console.log('Hello EmojiProvider Provider');
    }
    /**
     * 获取所有表情的数组（已分组好了的）
     *
     * @memberof EmojiProvider
     */
    EmojiProvider.prototype.getEmojis = function () {
        var EMOJIS = "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 🤡 🤠 😏 😒 😞 😔 😟 😕 🙁" +
            " ☹️ 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 🤤 😭 😓 😪 😴 🙄 🤔 🤥 😬 🤐 🤢 🤧 😷 🤒 🤕 😈 👿" +
            " 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚" +
            " 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🤳 💅 🖖 💄 💋 👄 👅 👂 👃 👣 👁 👀 🗣 👤 👥 👶 👦 👧 👨 👩 👱‍♀️ 👱 👴 👵 👲 👳‍♀️ 👳 👮‍♀️ 👮 👷‍♀️ 👷" +
            " 💂‍♀️ 💂 🕵️‍♀️ 🕵️ 👩‍⚕️ 👨‍⚕️ 👩‍🌾 👨‍🌾 👩‍🍳 👨‍🍳 👩‍🎓 👨‍🎓 👩‍🎤 👨‍🎤 👩‍🏫 👨‍🏫 👩‍🏭 👨‍🏭 👩‍💻 👨‍💻 👩‍💼 👨‍💼 👩‍🔧 👨‍🔧 👩‍🔬 👨‍🔬" +
            " 👩‍🎨 👨‍🎨 👩‍🚒 👨‍🚒 👩‍✈️ 👨‍✈️ 👩‍🚀 👨‍🚀 👩‍⚖️ 👨‍⚖️ 🤶 🎅 👸 🤴 👰 🤵 👼 🤰 🙇‍♀️ 🙇 💁 💁‍♂️ 🙅 🙅‍♂️ 🙆 🙆‍♂️ 🙋 🙋‍♂️ 🤦‍♀️ 🤦‍♂️ 🤷‍♀" +
            "️ 🤷‍♂️ 🙎 🙎‍♂️ 🙍 🙍‍♂️ 💇 💇‍♂️ 💆 💆‍♂️ 🕴 💃 🕺 👯 👯‍♂️ 🚶‍♀️ 🚶 🏃‍♀️ 🏃 👫 👭 👬 💑 👩‍❤️‍👩 👨‍❤️‍👨 💏 👩‍❤️‍💋‍👩 👨‍❤️‍💋‍👨 👪 👨‍👩‍👧" +
            " 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👦 👩‍👧" +
            " 👩‍👧‍👦 👩‍👦‍👦 👩‍👧‍👧 👨‍👦 👨‍👧 👨‍👧‍👦 👨‍👦‍👦 👨‍👧‍👧 👚 👕 👖 👔 👗 👙 👘 👠 👡 👢 👞 👟 👒 🎩 🎓 👑 ⛑ 🎒 👝 👛 👜 💼 👓" +
            " 🕶 🌂 ☂️";
        //进行分组的操作
        var array = EMOJIS.split(' ');
        var groupNumber = Math.ceil(array.length / 24); //四舍五入，尽量取大数 15.1->16 , 15.6->16
        var items = [];
        //分组填充表情
        for (var i = 0; i < groupNumber; i++) {
            items.push(array.slice(24 * i, 24 * (i + 1)));
        }
        return items;
    };
    EmojiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], EmojiProvider);
    return EmojiProvider;
}());

//# sourceMappingURL=emoji.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItutuProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the ItutuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ItutuProvider = (function () {
    function ItutuProvider(http) {
        this.http = http;
        // 获取图书
        this.apiUrlBooksInfo = "http://[2001:da8:270:2018:f816:3eff:fe66:11c]/booksinfo/";
        // 图书检索
        this.apiUrlSearchBooksInfo = "http://[2001:da8:270:2018:f816:3eff:fe66:11c]/booksinfo/";
        console.log("Hello ItutuProvider Provider");
    }
    /**
     * 获取图书信息
     *
     * @returns
     * @memberof ItutuProvider
     */
    ItutuProvider.prototype.getBooksInfo = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http
                .get(_this.apiUrlBooksInfo)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    /**
     * 图书检索
     *
     * @param {any} search
     * @returns
     * @memberof ItutuProvider
     */
    ItutuProvider.prototype.searchBooksInfo = function (search) {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http
                .get(_this.apiUrlSearchBooksInfo + "?search=" + search)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    ItutuProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], ItutuProvider);
    return ItutuProvider;
}());

//# sourceMappingURL=itutu.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksDistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_itutu_itutu__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_baseui__ = __webpack_require__(23);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the BooksDistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BooksDistPage = (function (_super) {
    __extends(BooksDistPage, _super);
    function BooksDistPage(navCtrl, navParams, viewCtrl, itutu, loadingCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.viewCtrl = viewCtrl;
        _this.itutu = itutu;
        _this.loadingCtrl = loadingCtrl;
        return _this;
    }
    BooksDistPage.prototype.ngOnInit = function () {
        this.setItems();
    };
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
    BooksDistPage.prototype.setItems = function () {
        var _this = this;
        this.itutu.getBooksInfo().then(function (data) {
            _this.items = data["results"];
        }, function (error) { return (_this.errorMessage = error); });
    };
    BooksDistPage.prototype.filterItems = function (ev) {
        this.setItems();
        var val = ev.target.value;
        if (val && val.trim() !== "") {
            this.items = this.items.filter(function (item) {
                return item;
            });
        }
    };
    BooksDistPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    BooksDistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-books-dist",template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\books-dist\books-dist.html"*/`<!--\n  Generated template for the BooksDistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>booksDist</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">取消</span>\n        <ion-icon name="md-close" showWhen="android"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar placeholder="Filter Items" (ionInput)="filterItems($event)"></ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-card *ngFor="let item of items">\n  \n        <ion-item>\n          <h1>{{f?.booktitle}}</h1>\n          <p>评分</p>\n        </ion-item>\n        <div>\n          <ion-row>\n            <ion-col col-4 style="background: red;">\n              <img src="/src/assets/imgs/commend_book_01.jpg">\n            </ion-col>\n            <ion-col col-8>\n              <ion-list no-border>\n                <ion-item>\n                  作者\n                  <ion-note item-end>\n                    {{f?.authors}}\n                  </ion-note>\n                </ion-item>\n                <ion-item>\n                  出版社\n                  <ion-note item-end>\n                    {{f?.pub_house}}\n                  </ion-note>\n                </ion-item>\n                <ion-item>\n                  索书号\n                  <ion-note item-end>\n                    {{f?.call_num}}\n                  </ion-note>\n                </ion-item>\n              </ion-list>\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-card>\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\books-dist\books-dist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_itutu_itutu__["a" /* ItutuProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], BooksDistPage);
    return BooksDistPage;
}(__WEBPACK_IMPORTED_MODULE_3__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=books-dist.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_itutu_itutu__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SearchdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchdetailsPage = (function () {
    function SearchdetailsPage(navCtrl, navParams, viewCtrl, itutu, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.itutu = itutu;
        this.events = events;
    }
    SearchdetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchdetailsPage');
    };
    SearchdetailsPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchdetailsPage.prototype.getBooksinfo = function () {
        var _this = this;
        this.itutu.searchBooksInfo(this.events)
            .then(function (data) {
            _this.booksinfo = data['results'];
        }, function (error) { return _this.errorMessage = error; });
    };
    SearchdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-searchdetails',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\searchdetails\searchdetails.html"*/`<!--\n  Generated template for the SearchdetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>检索结果</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">取消</span>\n        <ion-icon name="md-close" showWhen="android"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor="let f of booksinfo">\n\n    <ion-item>\n      <h1>{{f?.booktitle}}</h1>\n      <p>评分</p>\n    </ion-item>\n    <div>\n      <ion-row>\n        <ion-col col-4>\n          <img src="http://localhost:8000/media/books/images/commend_book_01.jpg">\n        </ion-col>\n        <ion-col col-8>\n          <ion-list no-border>\n            <ion-item>\n              作者\n              <ion-note item-end>\n                {{f?.authors}}\n              </ion-note>\n            </ion-item>\n            <ion-item>\n              出版社\n              <ion-note item-end>\n                {{f?.pub_house}}\n              </ion-note>\n            </ion-item>\n            <ion-item>\n              索书号\n              <ion-note item-end>\n                {{f?.call_num}}\n              </ion-note>\n            </ion-item>\n          </ion-list>\n        </ion-col>\n      </ion-row>\n    </div>\n\n    <ion-card-content>\n      <p>“我”搬进那栋房子后不久，意外在阁楼发现了一幅雨田具彦不为世人所知的大师级作品，名为“刺杀骑士团长”...</p>\n    </ion-card-content>\n\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-left clear small>\n          <ion-icon name="thumbs-up"></ion-icon>\n          <div>12 想读</div>\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button icon-left clear small>\n          <ion-icon name="text"></ion-icon>\n          <div>4 评论</div>\n        </button>\n      </ion-col>\n      <ion-col center text-center>\n        <ion-note>\n          10分钟前\n        </ion-note>\n      </ion-col>\n    </ion-row>\n\n  </ion-card>\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\searchdetails\searchdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_itutu_itutu__["a" /* ItutuProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], SearchdetailsPage);
    return SearchdetailsPage;
}());

//# sourceMappingURL=searchdetails.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_itutu_itutu__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_baseui__ = __webpack_require__(23);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TestPage = (function (_super) {
    __extends(TestPage, _super);
    function TestPage(navCtrl, modalCtrl, loadingCtrl, itutu, viewCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.itutu = itutu;
        _this.viewCtrl = viewCtrl;
        return _this;
    }
    TestPage.prototype.ionViewDidLoad = function () {
        this.getBooksinfo();
    };
    TestPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    TestPage.prototype.getBooksinfo = function () {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中...");
        this.itutu.getBooksInfo()
            .then(function (data) {
            _this.booksinfo = data['results'];
            loading.dismiss();
        }, function (error) { return _this.errorMessage = error; });
    };
    TestPage.prototype.doRefresh = function (refresher) {
        this.getBooksinfo();
        refresher.complete();
    };
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-test',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\test\test.html"*/`<!--\n\n  Generated template for the TestPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar>\n\n      <ion-title>test</ion-title>\n\n      <ion-buttons start>\n\n        <button ion-button (click)="dismiss()">\n\n          <span ion-text color="primary" showWhen="ios">取消</span>\n\n          <ion-icon name="md-close" showWhen="android"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n    </ion-navbar>\n\n  \n\n  </ion-header>\n\n  \n\n  \n\n  <ion-content>\n\n  \n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content pullingIcon="arrow-down" pullingText="下拉刷新" refreshingSpinner="circles" refreshingText="数据加载中...">\n\n      </ion-refresher-content>\n\n    </ion-refresher>\n\n  \n\n    <ion-card *ngFor="let f of booksinfo">\n\n  \n\n      <ion-item>\n\n        <h1>{{f?.booktitle}}</h1>\n\n        <p>评分</p>\n\n      </ion-item>\n\n      <div>\n\n        <ion-row>\n\n          <ion-col col-4 style="background: red;">\n\n            <img src="/src/assets/imgs/commend_book_01.jpg">\n\n          </ion-col>\n\n          <ion-col col-8>\n\n            <ion-list no-border>\n\n              <ion-item>\n\n                作者\n\n                <ion-note item-end>\n\n                  {{f?.authors}}\n\n                </ion-note>\n\n              </ion-item>\n\n              <ion-item>\n\n                出版社\n\n                <ion-note item-end>\n\n                  {{f?.pub_house}}\n\n                </ion-note>\n\n              </ion-item>\n\n              <ion-item>\n\n                索书号\n\n                <ion-note item-end>\n\n                  {{f?.call_num}}\n\n                </ion-note>\n\n              </ion-item>\n\n            </ion-list>\n\n          </ion-col>\n\n        </ion-row>\n\n      </div>\n\n    </ion-card>\n\n  </ion-content>\n\n  `/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\test\test.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_itutu_itutu__["a" /* ItutuProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], TestPage);
    return TestPage;
}(__WEBPACK_IMPORTED_MODULE_3__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(500);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chat_chat__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_more_more__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_user_user__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_circle_circle__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_resource_resource__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_register_register__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_headface_headface__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_search_search__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_question_question__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_qa_deatils_qa_deatils__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_qa_answers_qa_answers__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_chatdetails_chatdetails__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_discover_discover__ = __webpack_require__(826);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_searchdetails_searchdetails__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_test_test__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_tabs_tabs__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_books_dist_books_dist__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_itutu_itutu__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_chatservice_chatservice__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_emoji_emoji__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_components_module__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_transfer__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_camera__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_file_path__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_file__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_themeable_browser__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pipes_relativetime_relativetime__ = __webpack_require__(829);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//页面加载
























//导入表情的 Provider



//导入5个外部加载进来的组件






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_circle_circle__["a" /* CirclePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_resource_resource__["a" /* ResourcePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_more_more__["a" /* MorePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_headface_headface__["a" /* HeadfacePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_qa_deatils_qa_deatils__["a" /* QaDeatilsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_qa_answers_qa_answers__["a" /* QaAnswersPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_chatdetails_chatdetails__["a" /* ChatdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_discover_discover__["a" /* DiscoverPage */],
                __WEBPACK_IMPORTED_MODULE_37__pipes_relativetime_relativetime__["a" /* RelativetimePipe */],
                __WEBPACK_IMPORTED_MODULE_20__pages_searchdetails_searchdetails__["a" /* SearchdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_books_dist_books_dist__["a" /* BooksDistPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: "返回"
                }, {
                    links: [
                        { loadChildren: '../pages/books-dist/books-dist.module#BooksDistPageModule', name: 'BooksDistPage', segment: 'books-dist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chatdetails/chatdetails.module#ChatdetailsPageModule', name: 'ChatdetailsPage', segment: 'chatdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/qa-deatils/qa-deatils.module#QaDeatilsPageModule', name: 'QaDeatilsPage', segment: 'qa-deatils', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/qa-answers/qa-answers.module#QaAnswersPageModule', name: 'QaAnswersPage', segment: 'qa-answers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/searchdetails/searchdetails.module#SearchdetailsPageModule', name: 'SearchdetailsPage', segment: 'searchdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/test/test.module#TestPageModule', name: 'TestPage', segment: 'test', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_30__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_storage__["a" /* IonicStorageModule */].forRoot() //全局定义 storage 的模块
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_circle_circle__["a" /* CirclePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_resource_resource__["a" /* ResourcePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_more_more__["a" /* MorePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_headface_headface__["a" /* HeadfacePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_qa_deatils_qa_deatils__["a" /* QaDeatilsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_qa_answers_qa_answers__["a" /* QaAnswersPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_chatdetails_chatdetails__["a" /* ChatdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_discover_discover__["a" /* DiscoverPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_searchdetails_searchdetails__["a" /* SearchdetailsPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_test_test__["a" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_books_dist_books_dist__["a" /* BooksDistPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_26__providers_rest_rest__["a" /* RestProvider */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_28__providers_chatservice_chatservice__["a" /* ChatserviceProvider */],
                __WEBPACK_IMPORTED_MODULE_29__providers_emoji_emoji__["a" /* EmojiProvider */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_themeable_browser__["a" /* ThemeableBrowser */],
                __WEBPACK_IMPORTED_MODULE_27__providers_itutu_itutu__["a" /* ItutuProvider */] //drf 的定义导入
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(354);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\app\app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__qa_deatils_qa_deatils__ = __webpack_require__(91);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ResourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DiscoverPage = (function (_super) {
    __extends(DiscoverPage, _super);
    function DiscoverPage(navCtrl, modalCtrl, loadingCtrl, rest) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.modalCtrl = modalCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        return _this;
    }
    DiscoverPage.prototype.ionViewDidLoad = function () {
        this.getQuestions();
    };
    DiscoverPage.prototype.getQuestions = function () {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "加载中...");
        this.rest.getQuestions()
            .subscribe(function (q) {
            _this.questions = q;
            loading.dismiss();
        }, function (error) { return _this.errorMessage = error; });
    };
    DiscoverPage.prototype.doRefresh = function (refresher) {
        this.getQuestions();
        refresher.complete();
    };
    DiscoverPage.prototype.gotoQADetails = function (questionId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__qa_deatils_qa_deatils__["a" /* QaDeatilsPage */], { id: questionId });
    };
    DiscoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-discover',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\discover\discover.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>发现</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content \n    pullingIcon="arrow-down" \n    pullingText="下拉刷新" \n    refreshingSpinner="circles" \n    refreshingText="数据加载中...">\n    </ion-refresher-content>\n  </ion-refresher>\n  <ion-card *ngFor="let q of questions" (click)="gotoQADetails(q.IdentityId)">\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{q.HeadFace}}">\n      </ion-avatar>\n      <p>{{q.UserNickName}}发布了该问题\n        <ion-icon class="more_button" name="more"></ion-icon>\n      </p>\n    </ion-item>\n    <h2>{{q.ContentTitle}}</h2>\n    <ion-card-content>\n      <p>{{q.ContentSummary}}</p>\n    </ion-card-content>\n    <ion-row>\n      <ion-col col-8 center text-left>\n        <ion-note>\n          {{q.LikeCount}}&nbsp;赞同&nbsp;&nbsp;·&nbsp;&nbsp;{{q.CommentCount}}&nbsp;评论&nbsp;&nbsp;·&nbsp;&nbsp;关注问题\n        </ion-note>\n      </ion-col>\n      <ion-col col-4></ion-col>\n    </ion-row>\n  </ion-card>\n</ion-content>\n`/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\discover\discover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]])
    ], DiscoverPage);
    return DiscoverPage;
}(__WEBPACK_IMPORTED_MODULE_2__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=discover.js.map

/***/ }),

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__emojipicker_emojipicker__ = __webpack_require__(828);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__emojipicker_emojipicker__["a" /* EmojipickerComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__emojipicker_emojipicker__["a" /* EmojipickerComponent */]),],
            exports: [__WEBPACK_IMPORTED_MODULE_2__emojipicker_emojipicker__["a" /* EmojipickerComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EMOJI_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmojipickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_emoji_emoji__ = __webpack_require__(369);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
//实现 EmojipickerComponent 的 providers
var EMOJI_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return EmojipickerComponent; }),
    multi: true
};
var EmojipickerComponent = (function () {
    function EmojipickerComponent(emojiProvider) {
        this.emojiArray = [];
        this.emojiArray = emojiProvider.getEmojis();
    }
    EmojipickerComponent.prototype.writeValue = function (obj) {
        this.content = obj;
    };
    EmojipickerComponent.prototype.registerOnChange = function (fn) {
        this.onChanged = fn;
        this.setValue(this.content);
    };
    EmojipickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    //再次处理新的内容赋值以及函数的绑定
    EmojipickerComponent.prototype.setValue = function (val) {
        this.content += val;
        if (this.content) {
            this.onChanged(this.content);
        }
    };
    EmojipickerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'emojipicker',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\components\emojipicker\emojipicker.html"*/`<!-- Generated template for the EmojipickerComponent component -->\n<div class="emoji-picker">\n    <div class="emoji-items">\n      <ion-slides pager>\n        <ion-slide *ngFor="let items of emojiArray">\n          <span class="emoji-item" (click)="setValue(item)" *ngFor="let item of items">\n            {{item}}\n          </span>\n        </ion-slide>\n      </ion-slides>\n    </div>\n  </div>\n  `/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\components\emojipicker\emojipicker.html"*/,
            providers: [EMOJI_ACCESSOR]
        })
        // 实现接口 ControlValueAccessor
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_emoji_emoji__["a" /* EmojiProvider */]])
    ], EmojipickerComponent);
    return EmojipickerComponent;
}());

//# sourceMappingURL=emojipicker.js.map

/***/ }),

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelativetimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the RelativetimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var RelativetimePipe = (function () {
    function RelativetimePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    RelativetimePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __WEBPACK_IMPORTED_MODULE_1_moment__(value).toNow();
    };
    RelativetimePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'relativetime',
        })
    ], RelativetimePipe);
    return RelativetimePipe;
}());

//# sourceMappingURL=relativetime.js.map

/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 370,
	"./af.js": 370,
	"./ar": 371,
	"./ar-dz": 372,
	"./ar-dz.js": 372,
	"./ar-kw": 373,
	"./ar-kw.js": 373,
	"./ar-ly": 374,
	"./ar-ly.js": 374,
	"./ar-ma": 375,
	"./ar-ma.js": 375,
	"./ar-sa": 376,
	"./ar-sa.js": 376,
	"./ar-tn": 377,
	"./ar-tn.js": 377,
	"./ar.js": 371,
	"./az": 378,
	"./az.js": 378,
	"./be": 379,
	"./be.js": 379,
	"./bg": 380,
	"./bg.js": 380,
	"./bm": 381,
	"./bm.js": 381,
	"./bn": 382,
	"./bn.js": 382,
	"./bo": 383,
	"./bo.js": 383,
	"./br": 384,
	"./br.js": 384,
	"./bs": 385,
	"./bs.js": 385,
	"./ca": 386,
	"./ca.js": 386,
	"./cs": 387,
	"./cs.js": 387,
	"./cv": 388,
	"./cv.js": 388,
	"./cy": 389,
	"./cy.js": 389,
	"./da": 390,
	"./da.js": 390,
	"./de": 391,
	"./de-at": 392,
	"./de-at.js": 392,
	"./de-ch": 393,
	"./de-ch.js": 393,
	"./de.js": 391,
	"./dv": 394,
	"./dv.js": 394,
	"./el": 395,
	"./el.js": 395,
	"./en-au": 396,
	"./en-au.js": 396,
	"./en-ca": 397,
	"./en-ca.js": 397,
	"./en-gb": 398,
	"./en-gb.js": 398,
	"./en-ie": 399,
	"./en-ie.js": 399,
	"./en-il": 400,
	"./en-il.js": 400,
	"./en-nz": 401,
	"./en-nz.js": 401,
	"./eo": 402,
	"./eo.js": 402,
	"./es": 403,
	"./es-do": 404,
	"./es-do.js": 404,
	"./es-us": 405,
	"./es-us.js": 405,
	"./es.js": 403,
	"./et": 406,
	"./et.js": 406,
	"./eu": 407,
	"./eu.js": 407,
	"./fa": 408,
	"./fa.js": 408,
	"./fi": 409,
	"./fi.js": 409,
	"./fo": 410,
	"./fo.js": 410,
	"./fr": 411,
	"./fr-ca": 412,
	"./fr-ca.js": 412,
	"./fr-ch": 413,
	"./fr-ch.js": 413,
	"./fr.js": 411,
	"./fy": 414,
	"./fy.js": 414,
	"./gd": 415,
	"./gd.js": 415,
	"./gl": 416,
	"./gl.js": 416,
	"./gom-latn": 417,
	"./gom-latn.js": 417,
	"./gu": 418,
	"./gu.js": 418,
	"./he": 419,
	"./he.js": 419,
	"./hi": 420,
	"./hi.js": 420,
	"./hr": 421,
	"./hr.js": 421,
	"./hu": 422,
	"./hu.js": 422,
	"./hy-am": 423,
	"./hy-am.js": 423,
	"./id": 424,
	"./id.js": 424,
	"./is": 425,
	"./is.js": 425,
	"./it": 426,
	"./it.js": 426,
	"./ja": 427,
	"./ja.js": 427,
	"./jv": 428,
	"./jv.js": 428,
	"./ka": 429,
	"./ka.js": 429,
	"./kk": 430,
	"./kk.js": 430,
	"./km": 431,
	"./km.js": 431,
	"./kn": 432,
	"./kn.js": 432,
	"./ko": 433,
	"./ko.js": 433,
	"./ky": 434,
	"./ky.js": 434,
	"./lb": 435,
	"./lb.js": 435,
	"./lo": 436,
	"./lo.js": 436,
	"./lt": 437,
	"./lt.js": 437,
	"./lv": 438,
	"./lv.js": 438,
	"./me": 439,
	"./me.js": 439,
	"./mi": 440,
	"./mi.js": 440,
	"./mk": 441,
	"./mk.js": 441,
	"./ml": 442,
	"./ml.js": 442,
	"./mr": 443,
	"./mr.js": 443,
	"./ms": 444,
	"./ms-my": 445,
	"./ms-my.js": 445,
	"./ms.js": 444,
	"./mt": 446,
	"./mt.js": 446,
	"./my": 447,
	"./my.js": 447,
	"./nb": 448,
	"./nb.js": 448,
	"./ne": 449,
	"./ne.js": 449,
	"./nl": 450,
	"./nl-be": 451,
	"./nl-be.js": 451,
	"./nl.js": 450,
	"./nn": 452,
	"./nn.js": 452,
	"./pa-in": 453,
	"./pa-in.js": 453,
	"./pl": 454,
	"./pl.js": 454,
	"./pt": 455,
	"./pt-br": 456,
	"./pt-br.js": 456,
	"./pt.js": 455,
	"./ro": 457,
	"./ro.js": 457,
	"./ru": 458,
	"./ru.js": 458,
	"./sd": 459,
	"./sd.js": 459,
	"./se": 460,
	"./se.js": 460,
	"./si": 461,
	"./si.js": 461,
	"./sk": 462,
	"./sk.js": 462,
	"./sl": 463,
	"./sl.js": 463,
	"./sq": 464,
	"./sq.js": 464,
	"./sr": 465,
	"./sr-cyrl": 466,
	"./sr-cyrl.js": 466,
	"./sr.js": 465,
	"./ss": 467,
	"./ss.js": 467,
	"./sv": 468,
	"./sv.js": 468,
	"./sw": 469,
	"./sw.js": 469,
	"./ta": 470,
	"./ta.js": 470,
	"./te": 471,
	"./te.js": 471,
	"./tet": 472,
	"./tet.js": 472,
	"./tg": 473,
	"./tg.js": 473,
	"./th": 474,
	"./th.js": 474,
	"./tl-ph": 475,
	"./tl-ph.js": 475,
	"./tlh": 476,
	"./tlh.js": 476,
	"./tr": 477,
	"./tr.js": 477,
	"./tzl": 478,
	"./tzl.js": 478,
	"./tzm": 479,
	"./tzm-latn": 480,
	"./tzm-latn.js": 480,
	"./tzm.js": 479,
	"./ug-cn": 481,
	"./ug-cn.js": 481,
	"./uk": 482,
	"./uk.js": 482,
	"./ur": 483,
	"./ur.js": 483,
	"./uz": 484,
	"./uz-latn": 485,
	"./uz-latn.js": 485,
	"./uz.js": 484,
	"./vi": 486,
	"./vi.js": 486,
	"./x-pseudo": 487,
	"./x-pseudo.js": 487,
	"./yo": 488,
	"./yo.js": 488,
	"./zh-cn": 489,
	"./zh-cn.js": 489,
	"./zh-hk": 490,
	"./zh-hk.js": 490,
	"./zh-tw": 491,
	"./zh-tw.js": 491
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 831;

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QaDeatilsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_baseui__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__qa_answers_qa_answers__ = __webpack_require__(160);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the QaDeatilsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QaDeatilsPage = (function (_super) {
    __extends(QaDeatilsPage, _super);
    function QaDeatilsPage(navCtrl, navParams, loadingCtrl, rest, storage, modalCtrl, toastCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.loadingCtrl = loadingCtrl;
        _this.rest = rest;
        _this.storage = storage;
        _this.modalCtrl = modalCtrl;
        _this.toastCtrl = toastCtrl;
        return _this;
    }
    QaDeatilsPage.prototype.ionViewDidLoad = function () {
        this.id = this.navParams.get('id');
        this.loadQuestion(this.id);
    };
    QaDeatilsPage.prototype.loadQuestion = function (id) {
        var _this = this;
        this.storage.get('UserId').then(function (val) {
            if (val !== null) {
                _this.userId = val;
                var loading = _super.prototype.showLoading.call(_this, _this.loadingCtrl, "加载中...");
                _this.rest.getQuestionWithUser(id, val)
                    .subscribe(function (q) {
                    _this.question = q;
                    _this.answers = q["Answers"];
                    _this.isFavourite = q["IsFavourite"];
                    _this.isMyQuestion = (q["OwnUserId"] == val);
                    loading.dismissAll();
                }, function (error) { return _this.errorMessage = error; });
            }
        });
    };
    QaDeatilsPage.prototype.saveFavourite = function () {
        var _this = this;
        var loading = _super.prototype.showLoading.call(this, this.loadingCtrl, "请求中...");
        this.rest.saveFavourite(this.id, this.userId)
            .subscribe(function (f) {
            if (f["Status"] == "OK") {
                loading.dismiss();
                _super.prototype.showToast.call(_this, _this.toastCtrl, _this.isFavourite ? "取消关注成功。" : "关注问题成功。");
                _this.isFavourite = !_this.isFavourite;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    QaDeatilsPage.prototype.showQaAnswersPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__qa_answers_qa_answers__["a" /* QaAnswersPage */], { "id": this.id });
        //关闭后的回调
        modal.onDidDismiss(function () {
            _this.loadQuestion(_this.id);
        });
        modal.present();
    };
    QaDeatilsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-qa-deatils',template:/*ion-inline-start:"D:\projects\ionic-projects\itutu\src\pages\qa-deatils\qa-deatils.html"*/`<!--\n  Generated template for the DetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <ion-title>{{question?.ContentTitle}}</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content>\n    <ion-card>\n      <ion-card-content>\n        {{question?.Content}}\n        <p>{{question?.LikeCount}}&nbsp;个关注&nbsp;&nbsp;&nbsp;&nbsp;{{question?.CommentCount}}&nbsp;个回答</p>\n        <button ion-button small [disabled]="isMyQuestion" (click)="showQaAnswersPage()">\n          <ion-icon name="add"></ion-icon>&nbsp;回答</button>&nbsp;&nbsp;\n        <button ion-button small color="secondary" (click)="saveFavourite()" >\n          &nbsp;{{isFavourite ? \'取消关注\' : \'关注\'}}</button>\n      </ion-card-content>\n    </ion-card>\n  \n    <ion-card *ngFor="let a of answers">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="{{a.HeadFace}}">\n        </ion-avatar>\n        <p>{{a.UserNickName}}</p>\n      </ion-item>\n      <ion-card-content>\n        <p>{{a.Content}}</p>\n        <p class="answer_date">{{a.CreateDateTime}}</p>\n      </ion-card-content>\n    </ion-card>\n  </ion-content>\n  `/*ion-inline-end:"D:\projects\ionic-projects\itutu\src\pages\qa-deatils\qa-deatils.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], QaDeatilsPage);
    return QaDeatilsPage;
}(__WEBPACK_IMPORTED_MODULE_2__common_baseui__["a" /* BaseUI */]));

//# sourceMappingURL=qa-deatils.js.map

/***/ })

},[495]);
//# sourceMappingURL=main.js.map