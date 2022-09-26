import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiControllerActionEnum } from '../models/ApiControllerActionEnum';
import { IBaseModel } from '../models/IBaseModel';
import { ILocation } from '../models/ILocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClinet: HttpClient) { }

  private baseUrl = environment.baseUrl;

  getLocations(): Observable<Array<ILocation>> {
    return this.httpClinet.get<IBaseModel>(this.baseUrl + ApiControllerActionEnum.Location)
      .pipe(map((result: IBaseModel) => {
        return result.data as Array<ILocation>
      }))
  }

  createLocation(location: ILocation): Observable<IBaseModel> {
    return this.httpClinet
    .post<IBaseModel>(this.baseUrl + ApiControllerActionEnum.Location, location);
  }
}
