import {Routes} from "@angular/router";

export const routes: Routes = [
    {
        path: ":id",
        loadChildren: () => import("./tag/tag.routes").then(x => x.routes)
    }
]
