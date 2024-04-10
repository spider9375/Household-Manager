import {Component, computed, input, Input, TemplateRef} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ITableColumn} from "./models";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        MatTableModule,
        NgTemplateOutlet,
        MatSortModule,
        MatPaginatorModule,
        NgIf,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent {
    data = input.required<any[]>();
    columns = input.required<ITableColumn[]>();
    customColumns = input<string[]>([]);
    customColumnsTemplate = input<TemplateRef<any> | null>(null)
    @Input() pagination: boolean = false;
    @Input() actionColumnTemplate: TemplateRef<any> | null = null;

    columnFields = computed(() => this.columns().map(c => c.field));
    dataColumns = computed(() => this.columns().filter(c => c.field !== "actions"))
}
