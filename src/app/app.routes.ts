import {Routes} from '@angular/router';

export const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "dashboard"},
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
        loadChildren: () => import("./nomenclatures/nomenclatures.routes").then(x => x.routes)
    }
];
