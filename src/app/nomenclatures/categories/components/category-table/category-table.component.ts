import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgComponentOutlet, NgTemplateOutlet} from "@angular/common";
import {TableComponent} from "../../../../shared/components/table/table/table.component";
import {ICategory} from "../../models/category.model";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-category-table',
    standalone: true,
    imports: [
        MatTableModule,
        MatToolbar,
        MatPaginator,
        MatSortHeader,
        MatSort,
        MatButton,
        NgComponentOutlet,
        NgTemplateOutlet,
        TableComponent,
        MatIconModule,
        MatIconButton,
    ],
    templateUrl: './category-table.component.html',
    styleUrl: './category-table.component.scss'
})
export class CategoryTableComponent {
    @Input({required: true}) categories: ICategory[] = [];
    displayedColumns = ["name", "actions"];
    @Output() delete = new EventEmitter<ICategory>();
    @Output() edit = new EventEmitter<ICategory>();
}
