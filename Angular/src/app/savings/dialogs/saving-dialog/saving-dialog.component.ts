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
import {MatIcon} from "@angular/material/icon";
import {ISaving} from "../../models";

@Component({
    selector: 'app-saving-dialog',
    standalone: true,
    imports: [
        SavingFormComponent,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatIcon
    ],
    templateUrl: './saving-dialog.component.html',
    styleUrl: './saving-dialog.component.scss'
})
export class SavingDialogComponent {
    dialogData: { saving: ISaving } = inject(MAT_DIALOG_DATA)
    dialogRef = inject(MatDialogRef<SavingDialogComponent>)

    get title(): string {
        if (this.dialogData?.saving?.id) {
            return `<span class="text-neutral-500 text-xl font-light">Edit saving <span class="font-normal">${this.dialogData.saving.name}</span></span>`
        }

        return `<span class="text-neutral-500 text-xl font-light">Create saving</span>`;
    }

    onConfirm(form: ISavingForm): void {
        form.markAllAsTouched();

        if (form.valid) {
            this.dialogRef.close(form.getRawValue());
        }
    }
}
