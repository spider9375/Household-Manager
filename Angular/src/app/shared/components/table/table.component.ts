import {Component, Input, TemplateRef} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {NgTemplateOutlet} from "@angular/common";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        MatTableModule,
        NgTemplateOutlet,
        MatSortModule,
        MatPaginatorModule,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {
    @Input({required: true}) dataSource: any[] = []
    @Input({required: true}) columns: string[] = []
    @Input() actionColumnTemplate: TemplateRef<any> | null = null;

    public get dataColumns() {
        return this.columns.filter(c => c !== "actions")
    }
}
