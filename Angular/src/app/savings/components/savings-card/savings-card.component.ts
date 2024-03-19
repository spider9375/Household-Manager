import {Component, computed, effect, ElementRef, input, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatChip} from "@angular/material/chips";
import {ISaving} from "../../savings.store";
import {ISavingTag} from "../../saving-tags.store";

@Component({
    selector: 'app-savings-card',
    standalone: true,
    imports: [
        MatIcon,
        MatProgressBar,
        MatChip
    ],
    templateUrl: './savings-card.component.html',
    styleUrl: './savings-card.component.scss'
})
export class SavingsCardComponent {
    @ViewChild("savingCard", {read: ElementRef}) card!: ElementRef<HTMLDivElement>;
    tag = input<ISavingTag>();
    saving = input.required<ISaving>();
    formatter = computed(() => new Intl.NumberFormat("bg", {
        style: 'currency',
        currency: this.saving().currency,
        maximumFractionDigits: 0
    }))
    formattedAmount = computed(() => this.formatter().format(this.saving().amount))
    progress = computed(() => this.saving().goal && this.saving().amount / this.saving().goal! * 100);

    constructor() {
        effect(() => {
            if (this.tag() && this.card) {
                this.card.nativeElement.style.setProperty('--background', this.tag()!.color);
            }
        });
    }
}
