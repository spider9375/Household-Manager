import {Component, EventEmitter, inject, input, Output, signal} from '@angular/core';
import {MatChip} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {ConfirmDialogDirective} from "../../../shared/dialogs/confirm-dialog/confirm-dialog.directive";
import {IItem} from "../../models/item.model";
import {TableComponent} from "@shared";
import {ITableColumn} from "../../../shared/components/table/models";
import {TagsStore} from "../../../core/stores/tags.store";
import {TagPillComponent} from "../../../shared/components/tag-pill/tag-pill.component";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
    selector: 'app-item-table',
    standalone: true,
    imports: [
        MatChip,
        MatIcon,
        NgIf,
        NgStyle,
        ConfirmDialogDirective,
        TableComponent,
        TagPillComponent,
        DatePipe,
        NgClass,
        MatTooltip
    ],
    templateUrl: './item-table.component.html',
    styleUrl: './item-table.component.scss'
})
export class ItemTableComponent {
    columns: ITableColumn[] = [{
        field: 'name',
        label: 'Name',
    }, {
        field: 'tag',
        label: "Tag",
    }, {
        field: 'unitOfMeasure',
        label: 'Unit of measure'
    }, {
        field: 'quantity',
        label: 'Quantity'
    }, {
        field: 'expirationDate',
        label: 'Expiration Date'
    }, {
        field: 'actions',
        label: 'Actions'
    }]
    items = input.required<IItem[]>();
    tagStore = inject(TagsStore);
    today = signal(new Date());
    @Output() delete = new EventEmitter<number>()
    @Output() edit = new EventEmitter<IItem>()

    isExpired(date: Date): boolean {
        return this.today().getTime() >= new Date(date).getTime();
    }

    expiresSoon(date: Date): boolean {
        const days = this.dateDiffInDays(this.today(), new Date(date))
        console.log(days);
        return days < 3 && days > 0;
    }

    convertToDate(date: string): Date {
        return new Date(date);
    }

    dateDiffInDays(a: Date, b: Date) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
}
