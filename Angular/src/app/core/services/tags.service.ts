import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ITag} from "../models";

@Injectable({
    providedIn: "root"
})
export class TagsService {
    http = inject(HttpClient);

    private url = `${environment.serverUrl}/api/tags`

    get(id: string): Observable<ITag> {
        return this.http.get<ITag>(`${this.url}/${id}`)
    }

    getAll(): Observable<ITag[]> {
        return this.http.get<ITag[]>(`${this.url}`)
    }

    create(payload: Partial<ITag>): Observable<ITag> {
        return this.http.post<ITag>(this.url, payload);
    }

    update(payload: Partial<ITag>): Observable<ITag> {
        return this.http.put<ITag>(`${this.url}/${payload.id}`, payload);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
