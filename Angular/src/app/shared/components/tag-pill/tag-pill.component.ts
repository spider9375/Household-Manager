import {booleanAttribute, Component, effect, ElementRef, input, ViewChild} from '@angular/core';
import {ITag} from "../../../core";
import {NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-tag-pill',
    standalone: true,
    imports: [
        NgStyle,
        NgIf,
        MatIcon
    ],
    templateUrl: './tag-pill.component.html',
    styleUrl: './tag-pill.component.scss'
})
export class TagPillComponent {
    @ViewChild("pill", {read: ElementRef}) card!: ElementRef<HTMLDivElement>;

    tag = input.required<ITag>();
    showIcon = input<boolean>(false);
    displayColorCode = input(false, {transform: (v) => booleanAttribute(v)});

    constructor() {
        effect(() => {
            if (this.tag() && this.card) {
                this.card.nativeElement.style.setProperty('--background', this.tag()!.color);
            }
        });
    }
}
