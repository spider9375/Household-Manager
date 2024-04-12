import {Component, Host, Optional, SkipSelf} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ControlContainer, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CustomControl} from "../custom-control";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-number-input',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        NgIf,
        MatError
    ],
    templateUrl: './number-input.component.html',
    styleUrl: './number-input.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NumberInputComponent,
        multi: true
    }]
})
export class NumberInputComponent extends CustomControl {
    constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer) {
        super(controlContainer);
    }
}
