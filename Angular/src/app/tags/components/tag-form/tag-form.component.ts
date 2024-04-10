import {Component, inject, input, OnInit} from '@angular/core';
import {ITag} from "../../../core";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf, NgStyle} from "@angular/common";
import {MatChip} from "@angular/material/chips";
import {ColorInputComponent} from "../../../shared/components/input/color-input/color-input.component";

export interface ITagForm {
    id: FormControl<number>
    name: FormControl<string>
    color: FormControl<string>
    icon: FormControl<string>
}

@Component({
    selector: 'app-tag-form',
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        NgIf,
        ReactiveFormsModule,
        MatChip,
        NgStyle,
        ColorInputComponent,

    ],
    templateUrl: './tag-form.component.html',
    styleUrl: './tag-form.component.scss'
})
export class TagFormComponent implements OnInit {
    fb = inject(FormBuilder);
    tag = input<ITag>();

    form!: FormGroup<ITagForm>;

    ngOnInit() {
        this.form = this.fb.nonNullable.group({
            id: this.tag()?.id!,
            name: [this.tag()?.name!, Validators.required],
            color: this.tag()?.color!,
            icon: this.tag()?.icon!
        })
    }
}
