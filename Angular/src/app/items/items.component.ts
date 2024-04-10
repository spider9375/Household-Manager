import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatChip} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {TableComponent} from "@shared";
import {ItemTableComponent} from "./components/item-table/item-table.component";
import {MatDialog} from "@angular/material/dialog";
import {filter, tap} from "rxjs";
import {ItemStore} from "./store/item.store";
import {IItem} from "./models/item.model";
import {ItemDialogComponent} from "./components/item-dialog/item-dialog.component";

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [
        MatButton,
        MatChip,
        MatIcon,
        NgIf,
        TableComponent,
        ItemTableComponent
    ],
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss'
})
export class ItemsComponent {
    readonly itemStore = inject(ItemStore);
    readonly dialogService = inject(MatDialog);

    openModal(item?: IItem): void {
        const ref = this.dialogService.open(ItemDialogComponent, {data: {item}})
        ref.afterClosed().pipe(filter(x => !!x),
            tap((item: IItem) => {
                if (item.id) {
                    this.itemStore.update$.next(item);
                } else {
                    this.itemStore.create$.next(item);
                }
            })
        ).subscribe();
    }

    delete(id: number): void {
        this.itemStore.delete$.next(id);
    }
}
