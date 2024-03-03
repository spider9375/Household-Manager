import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {NgClass} from "@angular/common";
import {ThemeService} from "./core/theme/theme.service";
import {ThemePickerComponent} from "./core/theme/theme-picker/theme-picker.component";
import {NavbarComponent} from "./core/components/navbar/navbar.component";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet,
        MatButton, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, RouterLink, MatAnchor, NgClass, RouterLinkActive, ThemePickerComponent, NavbarComponent, MatIconModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    open = false
    title = 'homeStock';

    links = [
        {
            label: "Dashboard",
            icon: "dashboard",
            route: "/dashboard"
        },
        {
            label: "Expenses",
            icon: "payments",
            route: "/expenses"
        },
        {
            label: "Savings",
            icon: "savings",
            route: "/savings"
        },
        {
            label: "Items",
            icon: "inventory_2",
            route: "/items"
        },
        {
            label: "Tags",
            icon: "sell",
            route: "/tags"
        },
    ]

    themeService = inject(ThemeService);
}
