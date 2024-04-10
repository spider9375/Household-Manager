import {computed, inject, Injectable, signal} from "@angular/core";
import {TagsService} from "../services/tags.service";
import {ITag} from "../models";
import {IOptionItem} from "../../shared/models/option-item";
import {map, Subject, switchMap, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TagsStore {
    private _tags = signal<ITag[]>([])

    tags = computed(() => this._tags());
    tagById = computed<{ [key: string]: ITag }>(() => this._tags().reduce((acc, tag) => ({
        ...acc,
        [tag.id]: tag
    }), {}))
    tagsOptionItems = computed<IOptionItem[]>(() => this._tags().map(t => ({title: t.name, value: t.id})))

    service = inject(TagsService);
    fetch$ = this.service.getAll();
    create$ = new Subject<ITag>()
    update$ = new Subject<ITag>()
    delete$ = new Subject<number>();

    constructor() {
        this.fetch$.subscribe(res => this._tags.set(res));
        this.create$.pipe(
            switchMap(payload => this.service.create(payload)),
            tap(res => this._tags.update(prev => [...prev, res]))
        ).subscribe();

        this.update$.pipe(
            switchMap(payload => this.service.update(payload)),
            tap(res => this._tags.update(prev => prev.map(s => s.id === res.id ? res : s)))
        ).subscribe();

        this.delete$.pipe(
            switchMap(id => this.service.delete(id).pipe(map(() => id))),
            tap((id) => this._tags.update(prev => prev.filter(s => s.id !== id)))
        ).subscribe()
    }
}
