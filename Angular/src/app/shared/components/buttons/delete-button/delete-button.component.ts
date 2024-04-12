import {booleanAttribute, Component, EventEmitter, input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {ConfirmDialogDirective} from "../../../dialogs/confirm-dialog/confirm-dialog.directive";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenuItem} from "@angular/material/menu";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-delete-button',
    standalone: true,
    imports: [
        MatIcon,
        ConfirmDialogDirective,
        MatTooltip,
        MatMenuItem,
        NgIf
    ],
    templateUrl: './delete-button.component.html',
    styleUrl: './delete-button.component.scss'
})
export class DeleteButtonComponent {
    menuItem = input(false, {transform: (v) => booleanAttribute(v)})
    @Output() delete = new EventEmitter();
}
