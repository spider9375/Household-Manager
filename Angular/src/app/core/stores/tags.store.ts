import {computed, inject, Injectable, signal} from "@angular/core";
import {TagsService} from "../services/tags.service";
import {ITag} from "../models";
import {IOptionItem} from "../../shared/models/option-item";

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

    constructor() {
        this.service.getAll().subscribe(res => this._tags.set(res))
    }
}
