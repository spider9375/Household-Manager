import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {SavingsCardComponent} from "../savings/components/savings-card/savings-card.component";
import {TableComponent} from "@shared";
import {TagsStore} from "../core/stores/tags.store";
import {MatMenuItem} from "@angular/material/menu";
import {MatChip} from "@angular/material/chips";
import {NgIf, NgStyle} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {TagDialogComponent} from "./dialogs/tag-dialog/tag-dialog.component";
import {ITag} from "../core";
import {filter, tap} from 'rxjs';
import {ConfirmDialogDirective} from "../shared/dialogs/confirm-dialog/confirm-dialog.directive";
import {ITableColumn} from "../shared/components/table/models";
import {TagPillComponent} from "../shared/components/tag-pill/tag-pill.component";

@Component({
    selector: 'app-tags',
    standalone: true,
    imports: [
        MatButton,
        MatIcon,
        SavingsCardComponent,
        TableComponent,
        MatMenuItem,
        MatChip,
        NgIf,
        NgStyle,
        ConfirmDialogDirective,
        TagPillComponent,
    ],
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.scss'
})
export class TagsComponent {
    readonly columns: ITableColumn[] = [
        {
            field: "icon",
            label: 'Icon'
        }, {
            field: "name",
            label: 'Name',
        }, {
            field: "color",
            label: 'Color'
        }, {
            field: "actions",
            label: "Actions"
        }]
    readonly tagStore = inject(TagsStore);
    readonly dialogService = inject(MatDialog);

    openModal(tag?: ITag): void {
        const ref = this.dialogService.open(TagDialogComponent, {data: {tag}})
        ref.afterClosed().pipe(filter(x => !!x),
            tap((tag: ITag) => {
                if (tag.id) {
                    this.tagStore.update$.next(tag);
                } else {
                    this.tagStore.create$.next(tag);
                }
            })
        ).subscribe();
    }

    delete(id: number): void {
        this.tagStore.delete$.next(id);
    }
}
