import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiControllerActionEnum } from '../models/ApiControllerActionEnum';
import { IBaseModel } from '../models/IBaseModel';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClinet: HttpClient) { }
  private baseUrl = environment.baseUrl;

  getEventsThatUserInIt(user: IUser, type: string): Observable<Array<IEvent>> {
    return this.httpClinet.get<IBaseModel>(this.baseUrl + ApiControllerActionEnum.Event + `?userId=${user._id}&type=${type}`)
      .pipe(map((result: IBaseModel) => {
        return result.data as Array<IEvent>
      }))
  }

  getNearByEvents(lng: number, lat: number): Observable<Array<IEvent>> {

    return this.httpClinet.get<IBaseModel>(this.baseUrl + ApiControllerActionEnum.Event + `?lng=${lng}&lat=${lat}`)
      .pipe(map((result: IBaseModel) => {
        return result.data as Array<IEvent>
      }))

  }

  participateInAnEvent(user: IUser, eventId: string): Observable<IBaseModel> {
    debugger
    return this.httpClinet
      .post<IBaseModel>(this.baseUrl + ApiControllerActionEnum.EventParticipate.replace(':id', eventId), user);
  }

  unparticipateInAnEvent(user: IUser, eventId: string): Observable<IBaseModel> {

    return this.httpClinet
      .delete<IBaseModel>(this.baseUrl +
        ApiControllerActionEnum.EventParticipateUserId.replace(':id', eventId).replace(':userId', user._id as string));
  }
  getEventTypes() {

    return this.httpClinet.get<IBaseModel>(this.baseUrl + ApiControllerActionEnum.EventGetEventTypes)
      .pipe(map((result: IBaseModel) => {
        return result.data as Array<any>
      }))
  }

  getEventById(id: string): Observable<IEvent> {

    return this.httpClinet.get<IBaseModel>(this.baseUrl + ApiControllerActionEnum.EventById.replace(':id', id))
      .pipe(map((result: IBaseModel) => {
        return result.data as IEvent
      }))
  }

  addEvent(event: IEvent): Observable<IBaseModel> {
    return this.httpClinet.post<IBaseModel>(this.baseUrl + ApiControllerActionEnum.Event, event);
  }

  updateEvent(event: IEvent): Observable<IBaseModel> {
    return this.httpClinet.put<IBaseModel>(this.baseUrl + ApiControllerActionEnum.EventById.replace(':id', event._id), event);
  }

  deleteEvent(id: string): Observable<IBaseModel> {
    return this.httpClinet.delete<IBaseModel>(this.baseUrl + ApiControllerActionEnum.EventById.replace(':id', id));
  }

}
