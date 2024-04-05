import {Component, inject} from '@angular/core';
import {SavingsCardComponent} from "./components/savings-card/savings-card.component";
import {SavingsStore} from "./savings.store";
import {TagsStore} from "../core/stores/tags.store";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {SavingDialogComponent} from "./dialogs/saving-dialog/saving-dialog.component";
import {filter, take, tap} from "rxjs";
import {ISaving} from "./models";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-savings',
    standalone: true,
    imports: [
        SavingsCardComponent,
        MatButton,
        MatIcon,
    ],
    templateUrl: './savings.component.html',
    styleUrl: './savings.component.scss'
})
export class SavingsComponent {
    savingsStore = inject(SavingsStore);
    tagsStore = inject(TagsStore);
    matDialog = inject(MatDialog);

    openModal(saving?: ISaving): void {
        const ref = this.matDialog.open(SavingDialogComponent, {data: {saving}})

        ref.afterClosed().pipe(take(1), filter(x => !!x), tap((saving: ISaving) => {
            if (!saving.id) {
                return this.savingsStore.create$.next(saving)
            } else {
                return this.savingsStore.update$.next(saving)
            }
        })).subscribe();
    }
}
