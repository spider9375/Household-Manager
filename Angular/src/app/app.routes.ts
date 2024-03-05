import {Routes} from '@angular/router';
import {NomenclaturesComponent} from "./nomenclatures/nomenclatures.component";
import { TagsComponent } from './tags/tags.component';

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
        path: "inventory",
        loadChildren: () => import("./inventory/inventory.routes").then(x => x.routes)
    },
    {
        path: "nomenclatures",
        component: NomenclaturesComponent,
        loadChildren: () => import("./nomenclatures/nomenclatures.routes").then(x => x.routes),
    },
    {
        path: "tags",
        component: TagsComponent,
        loadChildren: () => import("./tags/tags.routes").then(x => x.routes),
    },
    {path: "", pathMatch: "full", redirectTo: "dashboard"},

];
