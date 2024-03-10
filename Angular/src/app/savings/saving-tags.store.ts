import {computed, Injectable, signal} from "@angular/core";

export interface ISavingTag {
    id: string
    name: string
    color: string
}

@Injectable({
    providedIn: 'root'
})
export class SavingsTagsStore {
    private _tags = signal<ISavingTag[]>([
        {
            id: "1",
            name: "Emergency",
            color: "#6495EDFF",
        },
        {
            id: "2",
            name: "Cash",
            color: "#9370DBFF",
        },
        {
            id: "3",
            name: "Euro",
            color: "#9FCDCD"
        }
    ])

    tags = computed(() => this._tags());
    tagById = computed<{ [key: string]: ISavingTag }>(() => this._tags().reduce((acc, tag) => ({
        ...acc,
        [tag.id]: tag
    }), {}))
}
