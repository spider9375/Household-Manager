import {Component} from '@angular/core';
import {MatAnchor} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ThemePickerComponent} from "../../theme/theme-picker/theme-picker.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        MatAnchor,
        MatToolbar,
        RouterLink,
        ThemePickerComponent,
        RouterLinkActive
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
