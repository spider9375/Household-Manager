import {Routes} from "@angular/router";
import {ExpensesComponent} from "./expenses.component";

export const routes: Routes = [
  {path: "", pathMatch: "full", component: ExpensesComponent}
]
