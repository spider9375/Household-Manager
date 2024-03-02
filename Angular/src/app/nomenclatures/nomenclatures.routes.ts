import {Routes} from "@angular/router";
import {ItemsComponent} from "./items/items.component";

export const routes: Routes = [
    {
        path: "categories",
        loadChildren: () => import("./categories/categories.routes").then(x => x.routes)
    },
    {
        path: "items",
        component: ItemsComponent
    }
]
