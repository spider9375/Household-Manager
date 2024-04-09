/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, EventEmitter, Input, Output,} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs";
import {ConfirmDialogComponent} from "./confirm-dialog.component";

@Directive({
    selector: '[dialog-confirm]',
    exportAs: 'matDialogClose',
    standalone: true,
    host: {
        '(click)': '_onButtonClick()',
    },
})
export class ConfirmDialogDirective {
    @Output('dialog-confirm') onConfirm = new EventEmitter();
    /** Default to "button" to prevent accidental form submits. */
    @Input() type: 'submit' | 'button' | 'reset' = 'button';

    constructor(
        private _dialog: MatDialog,
    ) {
    }

    _onButtonClick() {
        const ref = this._dialog.open(ConfirmDialogComponent);
        ref.afterClosed().pipe(filter(confirm => !!confirm)).subscribe(() => this.onConfirm.emit());
    }
}
