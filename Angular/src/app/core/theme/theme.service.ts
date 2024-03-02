import {computed, effect, Injectable, signal} from "@angular/core";

export enum Theme {
    Dark = "dark",
    Light = "light",
}

@Injectable({
    providedIn: "root"
})
export class ThemeService {
    private theme = signal<Theme>(localStorage.getItem("theme") ? localStorage.getItem("theme") as Theme : Theme.Dark);

    themeClass = computed(() => `${this.theme()}-theme`);
    activeTheme = computed(() => this.theme());

    constructor() {
        effect(() => {
            localStorage.setItem("theme", this.theme())
        });
    }

    toggleTheme() {
        this.theme.update(prev => prev === Theme.Dark ? Theme.Light : Theme.Dark)
    }
}
