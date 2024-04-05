import {computed, inject, Injectable, signal} from "@angular/core";
import {ISaving} from "./models";
import {SavingsService} from "./savings.service";
import {map, Subject, switchMap, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SavingsStore {
    private service = inject(SavingsService)
    private _savings = signal<ISaving[]>([])

    savings = computed(() => this._savings());

    fetch$ = this.service.getAll();
    create$ = new Subject<ISaving>()
    update$ = new Subject<ISaving>()
    delete$ = new Subject<number>();

    constructor() {
        this.fetch$.subscribe(res => this._savings.set(res));
        this.create$.pipe(
            switchMap(payload => this.service.create(payload)),
            tap(res => this._savings.update(prev => [...prev, res]))
        ).subscribe();

        this.update$.pipe(
            switchMap(payload => this.service.update(payload)),
            tap(res => this._savings.update(prev => prev.map(s => s.id === res.id ? res : s)))
        ).subscribe();

        this.delete$.pipe(
            switchMap(id => this.service.delete(id).pipe(map(() => id))),
            tap((id) => this._savings.update(prev => prev.filter(s => s.id !== id)))
        ).subscribe()
    }
}
