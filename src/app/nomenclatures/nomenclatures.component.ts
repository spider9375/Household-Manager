import {Component, inject} from '@angular/core';
import {
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent
} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {
    NomenclatureDialogComponent
} from "./dialogs/nomenclature-dialog/nomenclature-dialog.component";

@Component({
    selector: 'app-nomenclatures',
    standalone: true,
    imports: [
        MatSidenav,
        MatSidenavContent,
        MatDrawerContent,
        MatDrawer,
        MatDrawerContainer,
        MatSidenavContainer,
        MatToolbar,
        MatButton,
        MatMiniFabButton,
        MatFabButton
    ],
    templateUrl: './nomenclatures.component.html',
    styleUrl: './nomenclatures.component.scss'
})
export class NomenclaturesComponent {
    dialog = inject(MatDialog);

    openDialog() {
        const ref = this.dialog.open(NomenclatureDialogComponent, {data: {foo: "foo"}})
    }
}
