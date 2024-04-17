import {computed, inject, Injectable, signal} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {of, tap} from "rxjs";

const TOKEN = "token";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    http = inject(HttpClient);
    private url = `${environment.serverUrl}/api/auth`

    token = signal<string | null>(this.getToken());

    isLoggedIn = computed(() => !!this.token());

    public getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    private storeToken(token: string): void {
        localStorage.setItem(TOKEN, token);
        this.token.set(token);
    }

    login(payload: { username: string, password: string }) {
        return this.http.post(`${this.url}/login`, payload, {responseType: "text"}).pipe(tap((token: string) => {
            this.storeToken(token);
        }));
    }

    register(payload: { username: string, password: string, email: string }) {
        return this.http.post(`${this.url}/register`, payload, {responseType: "text"}).pipe(tap((token: string) => {
            this.storeToken(token);
        }))
    }

    logout() {
        localStorage.removeItem(TOKEN);
        this.token.set(null);

        return of(true);
    }
}
