import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ICategory} from "../models/category.model";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    private http = inject(HttpClient)
    private url = `${environment.serverUrl}/category`

    getCategory(categoryId: string): Observable<ICategory> {
        return this.http.get<ICategory>(`${this.url}/${categoryId}`)
    }

    getCategories(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(`${this.url}`)
    }

    createCategory(payload: Partial<ICategory>): Observable<ICategory> {
        return this.http.post<ICategory>(this.url, payload);
    }

    updateCategory(payload: Partial<ICategory>): Observable<ICategory> {
        return this.http.put<ICategory>(`${this.url}/${payload.id}`, payload);
    }

    deleteCategory(categoryId: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${categoryId}`);
    }
}
