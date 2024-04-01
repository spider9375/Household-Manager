import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISaving} from "./models";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class SavingsService {
    private http = inject(HttpClient)
    private url = `${environment.serverUrl}/savings`


    get(id: string): Observable<ISaving> {
        return this.http.get<ISaving>(`${this.url}/${id}`)
    }

    getAll(): Observable<ISaving[]> {
        return this.http.get<ISaving[]>(`${this.url}`)
    }

    create(payload: Partial<ISaving>): Observable<ISaving> {
        return this.http.post<ISaving>(this.url, payload);
    }

    update(payload: Partial<ISaving>): Observable<ISaving> {
        return this.http.put<ISaving>(`${this.url}/${payload.id}`, payload);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
