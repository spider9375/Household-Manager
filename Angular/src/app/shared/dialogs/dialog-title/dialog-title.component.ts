import {Component, input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatDialogClose} from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-title',
    standalone: true,
    imports: [
        MatIcon,
        MatDialogClose
    ],
    templateUrl: './dialog-title.component.html',
    styleUrl: './dialog-title.component.scss'
})
export class DialogTitleComponent {
    title = input.required<string>();
}
