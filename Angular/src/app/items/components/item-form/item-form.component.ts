import {Component, inject, input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IItem} from "../../models/item.model";
import {NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TagsStore} from "../../../core/stores/tags.store";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {provideNativeDateAdapter} from "@angular/material/core";

export interface IItemForm {
    id: FormControl<number>
    name: FormControl<string>
    tag: FormControl<number>
    unitOfMeasure: FormControl<string>
    quantity: FormControl<string>
    expirationDate: FormControl<Date>
}

@Component({
    selector: 'app-item-form',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './item-form.component.html',
    styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit {
    fb = inject(FormBuilder);
    form!: FormGroup<IItemForm>;
    tagsStore = inject(TagsStore);
    item = input<IItem>();

    ngOnInit() {
        this.form = this.fb.nonNullable.group({
            id: this.item()?.id!,
            name: [this.item()?.name!, Validators.required],
            tag: this.item()?.tag!,
            unitOfMeasure: this.item()?.unitOfMeasure!,
            expirationDate: this.item()?.expirationDate!,
            quantity: this.item()?.quantity!
        })
    }
}
