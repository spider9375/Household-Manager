import {Component, inject} from '@angular/core';
import {SavingsCardComponent} from "./components/savings-card/savings-card.component";
import {SavingsStore} from "./savings.store";
import {SavingsTagsStore} from "./saving-tags.store";

@Component({
    selector: 'app-savings',
    standalone: true,
    imports: [
        SavingsCardComponent
    ],
    templateUrl: './savings.component.html',
    styleUrl: './savings.component.scss'
})
export class SavingsComponent {
    savingsStore = inject(SavingsStore);
    savingsTagsStore = inject(SavingsTagsStore);
}
