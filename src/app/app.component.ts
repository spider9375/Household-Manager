import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {NgClass} from "@angular/common";
import {ThemeService} from "./core/theme/theme.service";
import {ThemePickerComponent} from "./core/theme/theme-picker/theme-picker.component";
import {NavbarComponent} from "./core/components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatButton, MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, RouterLink, MatAnchor, NgClass, RouterLinkActive, ThemePickerComponent, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    open = false
    title = 'homeStock';
    themeService = inject(ThemeService);
}
