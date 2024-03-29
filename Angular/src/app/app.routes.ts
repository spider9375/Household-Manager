import {Routes} from '@angular/router';
import {NomenclaturesComponent} from "./nomenclatures/nomenclatures.component";
import {SavingsComponent} from "./savings/savings.component";

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
        path: "savings",
        component: SavingsComponent,
    },
    {path: "", pathMatch: "full", redirectTo: "dashboard"},

];
