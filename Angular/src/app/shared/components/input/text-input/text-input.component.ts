import {Component, Host, Optional, SkipSelf} from '@angular/core';
import {CustomControl} from "../custom-control";
import {ControlContainer, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-text-input',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInput,
        ReactiveFormsModule,
        NgIf,
    ],
    templateUrl: './text-input.component.html',
    styleUrl: './text-input.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TextInputComponent,
        multi: true
    }]
})
export class TextInputComponent extends CustomControl {
    constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer) {
        super(controlContainer);
    }
}
