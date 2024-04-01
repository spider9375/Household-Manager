import {Component, EventEmitter, inject, input, OnInit, Output} from '@angular/core';
import {ISaving} from "../../models";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {TagsStore} from "../../../core/stores/tags.store";
import {CurrencyStore} from "../../../core/stores/currency.store";

export interface ISavingForm extends FormGroup<{
    id: FormControl<string>,
    icon: FormControl<string>
    tag: FormControl<string>,
    amount: FormControl<number>
    goal: FormControl<number>
    name: FormControl<string>
    currency: FormControl<string>,
}> {
}

@Component({
    selector: 'app-saving-form',
    standalone: true,
    imports: [
        NgIf,
        MatInput,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButton,
        MatSelect,
        MatOption,
    ],
    templateUrl: './saving-form.component.html',
    styleUrl: './saving-form.component.scss'
})
export class SavingFormComponent implements OnInit {
    fb = inject(FormBuilder);
    saving = input<ISaving>();
    tagsStore = inject(TagsStore);
    currencyStore = inject(CurrencyStore);

    form!: ISavingForm

    @Output() ready = new EventEmitter<ISavingForm>();

    ngOnInit() {
        this.form = this.fb.nonNullable.group({
            id: this.saving()?.id!,
            icon: this.saving()?.icon!,
            tag: [this.saving()?.tag!, Validators.required],
            amount: [this.saving()?.amount!, [Validators.required, Validators.min(0)]],
            goal: this.saving()?.goal!,
            name: [this.saving()?.name!, Validators.required],
            currency: [this.saving()?.currency!, Validators.required],
        })

        this.ready.emit(this.form);
    }
}
