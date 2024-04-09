import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {TagFormComponent} from "../../../tags/components/tag-form/tag-form.component";
import {DialogTitleComponent} from "../dialog-title/dialog-title.component";

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatIcon,
        TagFormComponent,
        DialogTitleComponent,
        MatDialogClose,
    ],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
}
