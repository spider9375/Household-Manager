import {Component, inject, OnInit} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {TextInputComponent} from "../../../shared/components/input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

interface ILoginForm {
    username: FormControl<string>
    password: FormControl<string>
}

interface ISignupForm {
    username: FormControl<string>
    password: FormControl<string>
    email: FormControl<string>
}

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        MatTabsModule,
        TextInputComponent,
        NgIf,
        ReactiveFormsModule,
        MatButton,
    ],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
    fb = inject(FormBuilder);
    service = inject(AuthService);
    router = inject(Router);

    loginForm!: FormGroup<ILoginForm>
    signupForm!: FormGroup<ISignupForm>


    ngOnInit() {
        this.loginForm = this.fb.group<ILoginForm>({
            password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
            username: this.fb.nonNullable.control('', [Validators.required])
        })

        this.signupForm = this.fb.group({
            username: this.fb.nonNullable.control("", [Validators.required]),
            email: this.fb.nonNullable.control("", [Validators.email]),
            password: this.fb.nonNullable.control("", [Validators.minLength(5)])
        })
    }

    login() {
        this.loginForm.markAllAsTouched();

        if (this.loginForm.valid) {
            this.service.login(this.loginForm.getRawValue()).subscribe(() => this.router.navigate([""]));
        }
    }

    register() {
        this.signupForm.markAllAsTouched();

        if (this.signupForm.valid) {
            this.service.register(this.signupForm.getRawValue()).subscribe(() => this.router.navigate([""]));
        }
    }
}
