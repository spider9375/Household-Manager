import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {SavingFormComponent} from "../../../savings/components/saving-form/saving-form.component";
import {ITagForm, TagFormComponent} from "../../components/tag-form/tag-form.component";
import {ITag} from "../../../core";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-tag-dialog',
    standalone: true,
    imports: [
        MatButton,
        MatDialogModule,
        MatIcon,
        SavingFormComponent,
        TagFormComponent
    ],
    templateUrl: './tag-dialog.component.html',
    styleUrl: './tag-dialog.component.scss'
})
export class TagDialogComponent {
    dialogData: { tag: ITag } = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<TagDialogComponent>);

    get title(): string {
        if (this.dialogData?.tag?.id) {
            return `<span class="text-neutral-500 text-xl font-light">Edit saving <span class="font-normal">${this.dialogData.tag.name}</span></span>`
        }

        return `<span class="text-neutral-500 text-xl font-light">Create saving</span>`;
    }

    onConfirm(form: FormGroup<ITagForm>): void {
        form.markAllAsTouched();

        if (form.valid) {
            this.dialogRef.close(form.getRawValue());
        }
    }
}
