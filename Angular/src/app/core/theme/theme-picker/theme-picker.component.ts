import {Component, inject} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {Theme, ThemeService} from "../theme.service";
import {MatLabel} from "@angular/material/form-field";
import {MatDivider} from "@angular/material/divider";

@Component({
    selector: 'app-theme-picker',
    standalone: true,
    imports: [
        MatSlideToggle,
        MatLabel,
        MatDivider
    ],
    templateUrl: './theme-picker.component.html',
    styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent {
    themeService = inject(ThemeService)
    protected readonly Theme = Theme;
}
