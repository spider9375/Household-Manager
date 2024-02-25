import {Routes} from "@angular/router";

export const routes: Routes = [
    {
        path: ":nomenclature",
        loadChildren: () => import("./categories/categories.routes").then(x => x.routes)
    },
]
