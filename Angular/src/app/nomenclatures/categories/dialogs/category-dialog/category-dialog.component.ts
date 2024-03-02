import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatInput} from "@angular/material/input";
import {ICategory} from "../../models/category.model";

interface ICategoryForm extends FormGroup<{
    name: FormControl<string | null>
    id: FormControl<string | null>
}> {
}

@Component({
    selector: 'app-category-dialog',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButton,
        MatProgressSpinner,
        ReactiveFormsModule,
        MatInput
    ],
    templateUrl: './category-dialog.component.html',
    styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit {
    dialogData: { category: ICategory } = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<CategoryDialogComponent>)
    fb = inject(FormBuilder)

    formGroup!: ICategoryForm;

    title: string = "";


    ngOnInit() {
        this.title = this.dialogData?.category ? `Edit Category ${this.dialogData.category.name}` : "Create Category";
        this.formGroup = this.fb.group({
            name: [this.dialogData?.category?.name ?? "", Validators.required],
            id: this.dialogData?.category?.id ?? ""
        })
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }

        this.dialogRef.close(this.formGroup.getRawValue());
    }
}
