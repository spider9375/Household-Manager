import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {IItem} from "../../models/item.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {ICategory} from "../../../categories/models/category.model";

interface IItemFormGroup extends FormGroup<{
    id: FormControl<string>
    name: FormControl<string>
    categoryId: FormControl<string>
}> {
}

@Component({
    selector: 'app-item-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatProgressSpinner,
        ReactiveFormsModule,
        MatInput,
        MatButtonModule,
        MatSelect,
        MatOption,
    ],
    templateUrl: './item-dialog.component.html',
    styleUrl: './item-dialog.component.scss'
})
export class ItemDialogComponent implements OnInit {
    dialogData: { item: IItem, categories: ICategory[] } = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<ItemDialogComponent>)
    fb = inject(FormBuilder)
    formGroup!: IItemFormGroup;
    title: string = "";

    ngOnInit() {
        this.title = this.dialogData?.item ? `Edit Item ${this.dialogData.item.name}` : "Create Item";

        this.formGroup = this.fb.nonNullable.group({
            id: this.dialogData?.item?.id,
            name: [this.dialogData?.item?.name, Validators.required],
            categoryId: [this.dialogData?.item?.categoryId, Validators.required]
        })
    }

    submit(): void {
        this.formGroup.markAllAsTouched();

        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.getRawValue());
        }
    }

}

