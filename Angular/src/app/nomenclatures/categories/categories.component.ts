import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {CategoryTableComponent} from "./components/category-table/category-table.component";
import {CategoryService} from "./service/category.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "./dialogs/category-dialog/category-dialog.component";
import {ICategory} from "./models/category.model";
import {filter, tap} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ThemeService} from "../../core/theme/theme.service";

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        RouterOutlet,
        MatTableModule,
        CategoryTableComponent,
        AsyncPipe,
        NgIf,
        MatButton,
        MatToolbar,
        MatProgressSpinner,
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
    service = inject(CategoryService)
    themeService = inject(ThemeService);
    categories: ICategory[] = [];
    loading = true;
    dialog = inject(MatDialog);

    public ngOnInit() {
        this.getCategories();
    }

    openDialog(category?: ICategory): void {
        const ref = this.dialog.open(CategoryDialogComponent, {data: {category},panelClass: this.themeService.themeClass()})

        ref.afterClosed().pipe(
            filter(x => !!x),
            tap(((payload: ICategory) => {
                this.loading = true;
                if (category?.id) {
                    this.service.updateCategory(payload).subscribe()
                } else {
                    this.service.createCategory(payload).subscribe()
                }
            })),
            tap(() => this.getCategories())).subscribe();
    }

    delete(category: ICategory) {
        this.loading = true;
        this.service.deleteCategory(category.id).subscribe(() => this.getCategories());
    }

    edit(category: ICategory) {
        this.openDialog(category);
    }

    private getCategories(): void {
        this.service.getCategories().subscribe(categories => {
            this.categories = categories
            this.loading = false;
        });
    }
}
