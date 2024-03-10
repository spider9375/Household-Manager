import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ICategory} from "../../categories/models/category.model";
import {IItem} from "../models/item.model";

@Injectable({
    providedIn: "root"
})
export class ItemService {
    http = inject(HttpClient);

    private url = `${environment.serverUrl}/item`

    getById(id: string): Observable<IItem> {
        return this.http.get<IItem>(`${this.url}/${id}`)
    }

    getAll(): Observable<IItem[]> {
        return this.http.get<IItem[]>(`${this.url}`)
    }

    create(payload: Partial<IItem>): Observable<ICategory> {
        return this.http.post<IItem>(this.url, payload);
    }

    update(payload: Partial<IItem>): Observable<ICategory> {
        return this.http.put<IItem>(`${this.url}/${payload.id}`, payload);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
