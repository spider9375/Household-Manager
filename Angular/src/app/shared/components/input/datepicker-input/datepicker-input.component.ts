import {Component, Host, Optional, SkipSelf} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ControlContainer, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CustomControl} from "../custom-control";
import {provideNativeDateAdapter} from "@angular/material/core";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-datepicker-input',
    standalone: true,
    imports: [
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatFormField,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule,
        NgIf,
        MatError
    ],
    templateUrl: './datepicker-input.component.html',
    styleUrl: './datepicker-input.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DatepickerInputComponent,
        multi: true
    },
        provideNativeDateAdapter(),
    ],

})
export class DatepickerInputComponent extends CustomControl {
    constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer) {
        super(controlContainer);
    }
}
