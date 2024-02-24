import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {INomenclature} from "../../models/nomenclature.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

interface INomenclatureForm extends FormGroup<{
    id?: FormControl<string>
    name: FormControl<string | null>
}> {
}

@Component({
    selector: 'app-nomenclature-dialog',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinner,
    ],
    templateUrl: './nomenclature-dialog.component.html',
    styleUrl: './nomenclature-dialog.component.scss'
})
export class NomenclatureDialogComponent implements OnInit {
    dialogData: { item: INomenclature } = inject(MAT_DIALOG_DATA);
    dialogRef = inject(MatDialogRef<NomenclatureDialogComponent>)
    fb = inject(FormBuilder)

    formGroup!: INomenclatureForm;


    ngOnInit() {
        const item = this.dialogData?.item;
        this.formGroup = this.fb.group({
            name: [item?.name ?? "", Validators.required],
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
