import {Component} from '@angular/core';
import {
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent
} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
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
        MatAnchor,
    ],
    templateUrl: './nomenclatures.component.html',
    styleUrl: './nomenclatures.component.scss'
})
export class NomenclaturesComponent {
}
