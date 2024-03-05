import {Routes} from "@angular/router";
import {FolderContentComponent} from "./components/folder-content/folder-content.component";

export const routes: Routes = [
    {
        path: ":id",
        component: FolderContentComponent
    }
]
