import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    //console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";

  /**
   * 根据用户的手机号码和密码进行登录
   * @wujiu 2018-03-17
   * @param {any} moblie 
   * @param {any} password 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  login(moblie, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + moblie + "&password=" + password);
  }

  /**
   * 获取用户的信息
   * @wujiu 2018-03-18
   * @param {any} userId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserInfo(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId);
  }

  /**
   * 更新用户的昵称
   * @wujiu 2018-03-19
   * @param {any} userId 
   * @param {any} nickname 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  updateNickName(userId, nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname);
  }

  /**
     * 保存提问
     * @wujiu 2018-03-19
     * @param {any} userId 
     * @param {any} title 
     * @param {any} content 
     * @returns {Observable<string[]>} 
     * @memberof RestProvider
     */
  saveQuestion(userId, title, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userId + "&title=" + title + "&content=" + content);
  }

  /**
    * 获取问题的详情
    * 
    * @param {any} id 
    * @returns {Observable<string[]>} 
    * @memberof RestProvider
    */
  getQuestion(id): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" + id);
  }

  /**
   * 获取问题的详情，传递 userid 获取到当前用户有没有关注此问题
   * 
   * @param {any} questionId 
   * @param {any} userId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getQuestionWithUser(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId);
  }

  saveFavourite(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId);
  }

  answer(userId, questionId, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlAnswer + "?userid=" + userId + "&questionid=" + questionId + "&content=" + content);
  }

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
  register(moblie, nickname, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + moblie + "&nickname=" + nickname + "&password=" + password);
  }

  /**
     * 请求首页的 feeds 流
     * 
     * @returns {Observable<string[]>} 
     * @memberof RestProvider
     */
  getFeeds(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlFeeds);
  }

  getQuestions(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionList);
  }

  /**
   * 全局获取 HTTP 请求的方法
   * @wujiu 2018-03-17
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 处理接口返回的数据，json格式
   * @wujiu 2018-03-17
   * @private
   * @param {Response} res 
   * @returns 
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json();
    return JSON.parse(body) || {};
  }

  /**
   * 处理请求中的错误，考虑各种情况的错误并处理则在 console 显示 error
   * @wujiu 2018-03-17
   * @private
   * @param {(Response | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
