import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiControllerActionEnum } from '../models/ApiControllerActionEnum';
import { IAttachment } from '../models/IAttachment';
import { IBaseModel } from '../models/IBaseModel';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl;

  uploadAttachmnet(formdata: FormData): Observable<IAttachment> {


    return this.httpClient.post<IBaseModel>(this.baseUrl + ApiControllerActionEnum.Attachment, formdata)
      .pipe(map(result => result.data as IAttachment));
  }
}
