import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClientModule} from "@angular/common/http";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MAT_DATE_LOCALE} from "@angular/material/core";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideAnimationsAsync(),
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
        {provide: MAT_DATE_LOCALE, useValue: navigator.language},
        importProvidersFrom(
            HttpClientModule,
        ),
    ],
};
