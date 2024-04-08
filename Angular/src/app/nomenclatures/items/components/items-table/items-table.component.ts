import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import {TableComponent} from "@shared";
import {IItem} from "../../models/item.model";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-items-table',
    standalone: true,
    imports: [
        TableComponent,
        MatButton,
        MatToolbar,
        MatIcon,
        MatIconButton
    ],
    templateUrl: './items-table.component.html',
    styleUrl: './items-table.component.scss'
})
export class ItemsTableComponent {
    dialog = inject(MatDialog);
    columns = input.required<string[]>();
    items = input.required<IItem[]>();
    @Output() edit = new EventEmitter<IItem>();
    @Output() delete = new EventEmitter<IItem>();
}
