import {Component, Host, input, Optional, SkipSelf} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CustomControl} from "../custom-control";
import {IOptionItem} from "../../../models";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-select-input',
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './select-input.component.html',
    styleUrl: './select-input.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SelectInputComponent,
        multi: true
    }]
})
export class SelectInputComponent extends CustomControl {
    data = input.required<IOptionItem[]>();

    constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer) {
        super(controlContainer);
    }
}
