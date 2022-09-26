import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiControllerActionEnum } from '../models/ApiControllerActionEnum';
import { IBaseModel } from '../models/IBaseModel';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userState: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null as any);
  private baseUrl = environment.baseUrl;

  constructor(private httpClinet: HttpClient) {
    let user = this.getSavedUser();
    if (user != null) {
      this.userState.next(user);
    }
  }


  //#region API's

  login(user: IUser): Observable<IUser> {
    return this.httpClinet
      .post<IUser>(this.baseUrl + ApiControllerActionEnum.AuthLogin, user)
    //.pipe(map((result: any) => result.data as IUser))
  }

  signUp(user: IUser): Observable<IBaseModel> {
    return this.httpClinet
      .post<IBaseModel>(this.baseUrl + ApiControllerActionEnum.AuthSignUp, user)
  }

  editProfile(user: IUser): Observable<IBaseModel> {
    return this.httpClinet
      .put<IBaseModel>(this.baseUrl + ApiControllerActionEnum.UserById.replace(':id', user._id as string), user)
  }

  //#endregion

  //#region Utils Methods

  public isLoggedIn(): boolean {

    return localStorage.getItem('user') !== null;
  }
  logout() {
    this.removeSavedUser();
    this.userState.next(null as any);
  }

  updateUserState(newValue: IUser) {
    this.userState.next(newValue);
    this.saveUser(newValue)
  }

  private saveUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getSavedUser(): IUser {
    return JSON.parse(localStorage.getItem('user') as string) as IUser;
  }

  private removeSavedUser() {
    localStorage.removeItem('user');
  }

  //#endregion

}
