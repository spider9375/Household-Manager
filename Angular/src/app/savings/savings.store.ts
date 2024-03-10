import {computed, Injectable, signal} from "@angular/core";

export interface ISaving {
    id: string,
    icon: string
    tag: string,
    amount: number
    goal?: number
    name: string
    currency: string,
}

@Injectable({
    providedIn: 'root'
})
export class SavingsStore {
    private _savings = signal<ISaving[]>([
        {
            id: "1",
            name: "Emergency fund",
            tag: "1",
            amount: 10_000,
            goal: 10_000,
            icon: "thunderstorm",
            currency: "BGN"
        },
        {
            id: "2",
            name: "Cash",
            tag: "2",
            icon: "payments",
            amount: 5_000,
            currency: "BGN"
        },
        {
            id: "3",
            name: "Eur",
            tag: "3",
            icon: "euro",
            amount: 2_500,
            currency: "EUR"
        }
    ])

    savings = computed(() => this._savings());
}
