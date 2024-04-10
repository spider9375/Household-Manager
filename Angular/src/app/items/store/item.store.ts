import {computed, inject, Injectable, signal} from "@angular/core";
import {map, Subject, switchMap, tap} from "rxjs";
import {IItem} from "../models/item.model";
import {ItemService} from "../service/item.service";

@Injectable({
    providedIn: "root"
})
export class ItemStore {
    private _items = signal<IItem[]>([])

    items = computed(() => this._items());

    service = inject(ItemService);
    fetch$ = this.service.getAll();
    create$ = new Subject<IItem>()
    update$ = new Subject<IItem>()
    delete$ = new Subject<number>();

    constructor() {
        this.fetch$.subscribe(res => this._items.set(res));
        this.create$.pipe(
            switchMap(payload => this.service.create(payload)),
            tap(res => this._items.update(prev => [...prev, res]))
        ).subscribe();

        this.update$.pipe(
            switchMap(payload => this.service.update(payload)),
            tap(res => this._items.update(prev => prev.map(s => s.id === res.id ? res : s)))
        ).subscribe();

        this.delete$.pipe(
            switchMap(id => this.service.delete(id).pipe(map(() => id))),
            tap((id) => this._items.update(prev => prev.filter(s => s.id !== id)))
        ).subscribe()
    }
}
