import {Component, inject} from '@angular/core';
import {DialogTitleComponent} from "../../../shared/dialogs/dialog-title/dialog-title.component";
import {MatButton} from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef
} from "@angular/material/dialog";
import {TagFormComponent} from "../../../tags/components/tag-form/tag-form.component";
import {IItemForm, ItemFormComponent} from "../item-form/item-form.component";
import {FormGroup} from "@angular/forms";
import {IItem} from "../../models/item.model";

@Component({
    selector: 'app-item-dialog',
    standalone: true,
    imports: [
        DialogTitleComponent,
        MatButton,
        MatDialogActions,
        MatDialogContent,
        TagFormComponent,
        ItemFormComponent,
        MatDialogClose
    ],
    templateUrl: './item-dialog.component.html',
    styleUrl: './item-dialog.component.scss'
})
export class ItemDialogComponent {
    dialogData: { item: IItem } = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<ItemDialogComponent>);

    get title(): string {
        if (this.dialogData?.item?.id) {
            return `<span class="text-neutral-500 text-xl font-light">Edit item <span class="font-normal">${this.dialogData.item.name}</span></span>`
        }

        return `<span class="text-neutral-500 text-xl font-light">Create item</span>`;
    }

    onConfirm(form: FormGroup<IItemForm>): void {
        form.markAllAsTouched();

        if (form.valid) {
            this.dialogRef.close(form.getRawValue());
        }
    }
}
