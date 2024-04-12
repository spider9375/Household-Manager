import {booleanAttribute, Component, input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenuItem} from "@angular/material/menu";
import {NgIf} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
    selector: 'app-edit-button',
    standalone: true,
    imports: [
        MatIcon,
        MatMenuItem,
        NgIf,
        MatTooltip
    ],
    templateUrl: './edit-button.component.html',
    styleUrl: './edit-button.component.scss'
})
export class EditButtonComponent {
    menuItem = input(false, {transform: (v) => booleanAttribute(v)});
}
