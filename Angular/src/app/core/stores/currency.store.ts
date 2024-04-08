import {computed, Injectable, signal} from "@angular/core";
import {ICurrency} from "../../shared/models/currency";
import {IOptionItem} from "../../shared/models/option-item";

@Injectable({
    providedIn: "root"
})
export class CurrencyStore {
    private _currencies = signal<ICurrency[]>([
        {
            name: "Bulgarian Lev",
            code: "BGN",
            postfix: "лв."
        },
        {
            name: "Euro",
            code: "EUR",
            symbol: "€"
        }
    ])

    currencyOptionItems = computed<IOptionItem[]>(() => this._currencies().map(c => ({value: c.code, title: c.code})))
}
