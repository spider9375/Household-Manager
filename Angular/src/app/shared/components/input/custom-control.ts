import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    UntypedFormControl,
    ValidationErrors
} from "@angular/forms";
import {Directive, Host, Input, OnInit, Optional, SkipSelf, TemplateRef} from "@angular/core";

@Directive()
export abstract class CustomControl implements OnInit, ControlValueAccessor {
    // prevents (ngModelChange) emit on control initialization
    private _isControlSetup: boolean = false;
    private _value: any = null;
    private onChangeCallback: (_: any) => void = (_: any) => {
    };
    public onTouchedCallback: () => void = () => {
    };

    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() formControlName: string = '';
    @Input() formControl: UntypedFormControl | undefined;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() tooltip: string | TemplateRef<any> | null | undefined;
    @Input() docLink: string | undefined;
    private readonly validationErrorTranslations = {
        isRequired: `is required`,
        mustBeAbove: `must be above`,
        mustBeBelow: `must be below`,
        mustBeInteger: `must be an integer`,
        valuesDontMatch: `Values don't match`,
        maxLength: `The maximum length for this field is`,
        minLength: `The minimum length for this field is`,
        minDate: `Min date is `,
        maxDate: `Max date is `,
    };

    protected constructor(@Optional() @Host() @SkipSelf() protected controlContainer: ControlContainer) {
    }

    public ngOnInit() {
        if (this.controlContainer && this.formControlName) {
            this.formControl = this.controlContainer.control?.get(this.formControlName) as UntypedFormControl;
        }
    }

    public get value(): any {
        return this._value;
    }

    public set value(value: any) {
        if (this._value !== value) {
            this._value = value;

            if (!this.formControl) {
                if (this._isControlSetup) {
                    this.onChangeCallback(this._value);
                } else {
                    this._isControlSetup = true;
                }
            }
        }
    }

    public get isRequired(): boolean {
        if (this.formControl?.validator) {
            return !!this.formControl?.validator({} as AbstractControl)?.["required"];
        }

        return this.required;
    }

    public get validationErrorMessage(): string {
        const fieldName = this.label ?? 'Field';
        const errors: ValidationErrors = this.formControl?.errors!;

        if (errors["required"]) {
            return `${fieldName} ${this.validationErrorTranslations.isRequired}`;
        }

        if (errors["min"]) {
            return `${fieldName} ${this.validationErrorTranslations.mustBeAbove} ${errors["min"].min}`;
        }

        if (errors["pattern"]) {
            return `${fieldName} is invalid`;
        }

        if (errors["max"]) {
            return `${fieldName} ${this.validationErrorTranslations.mustBeBelow} ${errors["max"].max}`;
        }

        if (errors["integer"]) {
            return `${fieldName} ${this.validationErrorTranslations.mustBeInteger}`;
        }

        if (errors["exactValue"]) {
            return this.validationErrorTranslations.valuesDontMatch;
        }

        if (errors["maxlength"]) {
            return `${this.validationErrorTranslations.maxLength} ${errors["maxlength"].requiredLength}`
        }

        if (errors["minlength"]) {
            return `${this.validationErrorTranslations.minLength} ${errors["minlength"].requiredLength}`
        }

        const errorKeys = Object.keys(errors);
        if (errorKeys.length) {
            let errorMessage = '';
            for (let err of errorKeys) {
                if (!(err in this.validationErrorTranslations) && errors[err].message) {
                    errorMessage = errors[err].message;
                    break;
                }
            }

            return errorMessage;
        }

        return '';
    }

    public writeValue(value: any) {
        this.value = value;
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
