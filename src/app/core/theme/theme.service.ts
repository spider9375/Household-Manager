import {effect, Injectable, signal} from "@angular/core";

export enum Theme {
    Dark = "dark",
    Light = "light",
}

@Injectable({
    providedIn: "root"
})
export class ThemeService {
    theme = signal<Theme>(localStorage.getItem("theme") ? localStorage.getItem("theme") as Theme : Theme.Dark);

    constructor() {
        effect(() => {
            localStorage.setItem("theme", this.theme())
        });
    }

    toggleTheme() {
        this.theme.update(prev => prev === Theme.Dark ? Theme.Light : Theme.Dark)
    }
}
