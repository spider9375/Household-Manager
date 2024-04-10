import {Routes} from '@angular/router';
import {SavingsComponent} from "./savings/savings.component";
import {TagsComponent} from "./tags/tags.component";
import {ItemsComponent} from "./items/items.component";

export const routes: Routes = [
    {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.routes").then(x => x.routes)
    },
    {
        path: "expenses",
        loadChildren: () => import("./expenses/expenses.routes").then(x => x.routes)
    },
    {
        path: "savings",
        component: SavingsComponent,
    },
    {
        path: "items",
        component: ItemsComponent
    },
    {
        path: "tags",
        component: TagsComponent,
    },
    {path: "", pathMatch: "full", redirectTo: "dashboard"},

];
