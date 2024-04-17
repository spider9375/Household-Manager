import {Routes} from '@angular/router';
import {SavingsComponent} from "./savings/savings.component";
import {TagsComponent} from "./tags/tags.component";
import {ItemsComponent} from "./items/items.component";
import {AuthComponent} from "./core/components/auth/auth.component";
import {loggedInGuardFn} from "./core/guards/logged-in.guard";

export const routes: Routes = [
    {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.routes").then(x => x.routes),
        canActivate: [loggedInGuardFn]
    },
    {
        path: "expenses",
        loadChildren: () => import("./expenses/expenses.routes").then(x => x.routes),
        canActivate: [loggedInGuardFn]
    },
    {
        path: "savings",
        component: SavingsComponent,
        canActivate: [loggedInGuardFn]
    },
    {
        path: "items",
        component: ItemsComponent,
        canActivate: [loggedInGuardFn]
    },
    {
        path: "tags",
        component: TagsComponent,
        canActivate: [loggedInGuardFn]
    },
    {
        path: "auth",
        component: AuthComponent,
    },
    {path: "", pathMatch: "full", redirectTo: "items"},

];
