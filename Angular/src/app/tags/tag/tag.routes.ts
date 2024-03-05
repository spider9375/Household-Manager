import {Routes} from "@angular/router";
import { TagComponent } from "./tag.component";

export const routes: Routes = [
    {
        path: "", 
        pathMatch: "full",
        component: TagComponent
    }
]
