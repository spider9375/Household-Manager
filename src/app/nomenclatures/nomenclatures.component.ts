import {Component, inject, OnInit} from '@angular/core';
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
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NgClass} from "@angular/common";

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
        MatFabButton,
        RouterOutlet,
        RouterModule,
        RouterLink,
        NgClass,
    ],
    templateUrl: './nomenclatures.component.html',
    styleUrl: './nomenclatures.component.scss'
})
export class NomenclaturesComponent implements OnInit {
    dialog = inject(MatDialog);

    http = inject(HttpClient);

    ngOnInit() {
        this.http.get(`${environment.serverUrl}/category`).subscribe(res => console.log(res))
    }

    openDialog() {
        const ref = this.dialog.open(NomenclatureDialogComponent, {data: {foo: "foo"}})
    }
}
