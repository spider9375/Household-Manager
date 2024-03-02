import {Routes} from "@angular/router";
import {CategoriesComponent} from "./categories.component";

export const routes: Routes = [
    {path: "", pathMatch: "full", component: CategoriesComponent}
]
