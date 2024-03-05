import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {inject, Injectable} from "@angular/core";
import { Observable } from 'rxjs';
import { ITag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private http = inject(HttpClient)
  private url = `${environment.serverUrl}/category`

  getCategory(tagId: string): Observable<ITag> {
      return this.http.get<ITag>(`${this.url}/${tagId}`)
  }

  getCategories(): Observable<ITag[]> {
      return this.http.get<ITag[]>(`${this.url}`)
      
  }

  // createCategory(payload: Partial<ITag>): Observable<ITag> {
  //     return this.http.post<ITag>(this.url, payload);
  // }

  // updateCategory(payload: Partial<ITag>): Observable<ITag> {
  //     return this.http.put<ITag>(`${this.url}/${payload.id}`, payload);
  // }

  // deleteCategory(categoryId: string): Observable<void> {
  //     return this.http.delete<void>(`${this.url}/${categoryId}`);
  // }
  
}
