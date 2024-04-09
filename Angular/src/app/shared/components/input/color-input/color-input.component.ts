import {Component, Host, Optional, SkipSelf} from '@angular/core';
import {ControlContainer, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {CustomControl} from "../custom-control";
import {MatInput, MatLabel} from "@angular/material/input";
import {NgIf, NgStyle} from "@angular/common";

@Component({
    selector: 'app-color-input',
    standalone: true,
    imports: [
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        NgStyle,
        NgIf
    ],
    templateUrl: './color-input.component.html',
    styleUrl: './color-input.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ColorInputComponent,
        multi: true
    }]

})
export class ColorInputComponent extends CustomControl {
    constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer) {
        super(controlContainer);
    }
}
