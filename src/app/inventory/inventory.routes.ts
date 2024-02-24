import {Routes} from "@angular/router";
import {InventoryComponent} from "./inventory.component";

export const routes: Routes = [
  {path: "", pathMatch: "full", component: InventoryComponent}
]
