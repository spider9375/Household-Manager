import {Component, inject} from '@angular/core';
import {ISavingForm, SavingFormComponent} from "../../components/saving-form/saving-form.component";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-saving-dialog',
    standalone: true,
    imports: [
        SavingFormComponent,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './saving-dialog.component.html',
    styleUrl: './saving-dialog.component.scss'
})
export class SavingDialogComponent {
    dialogData = inject(MAT_DIALOG_DATA)
    dialogRef = inject(MatDialogRef<SavingDialogComponent>)

    onConfirm(form: ISavingForm): void {
        form.markAllAsTouched();

        if (form.valid) {
            this.dialogRef.close(form.getRawValue());
        }
    }
}
