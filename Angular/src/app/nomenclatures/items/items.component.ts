import {Component, inject, OnInit} from '@angular/core';
import {IItem} from "./models/item.model";
import {ItemService} from "./services/item.service";
import {ItemsTableComponent} from "./components/items-table/items-table.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {ItemDialogComponent} from "./components/item-dialog/item-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {combineLatest, filter, switchMap, tap} from "rxjs";
import {ICategory} from "../categories/models/category.model";
import {CategoryService} from "../categories/service/category.service";

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [
        ItemsTableComponent,
        MatToolbar,
        MatButton
    ],
    providers: [ItemService],
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
    private service = inject(ItemService)
    private dialog = inject(MatDialog);
    private categoryService = inject(CategoryService);
    items: IItem[] = [];
    categories: ICategory[] = [];

    ngOnInit() {
        combineLatest([this.getItems(),
            this.categoryService.getCategories(),
        ]).subscribe(([_, categories]: [IItem[], ICategory[]]) => {
            this.categories = categories;
        })
    }

    openModal(item?: IItem) {
        const dialogRef = this.dialog.open(ItemDialogComponent, {
            data: {
                item,
                categories: this.categories
            }
        });

        dialogRef.afterClosed().pipe(
            filter(x => !!x),
            switchMap((item: IItem) => {
                if (item.id) {
                    return this.service.update(item)
                }

                return this.service.create(item)
            }),
            switchMap(() => this.getItems())
        ).subscribe();
    }

    delete(item: IItem) {
        this.service.delete(item.id).pipe(switchMap(() => this.getItems())).subscribe()
    }

    private getItems() {
        return this.service.getAll().pipe(tap(items => this.items = items));
    }
}
