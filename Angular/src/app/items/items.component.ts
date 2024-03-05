import {Component, inject} from '@angular/core';
import {MatTree} from "@angular/material/tree";
import {FoldersTreeComponent} from "./components/folders-tree/folders-tree.component";
import {ItemFolderService} from "./service/item.service";
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [
        MatTree,
        FoldersTreeComponent,
        RouterOutlet
    ],
    providers: [ItemFolderService],
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss'
})
export class ItemsComponent {
    service = inject(ItemFolderService);

    constructor() {
    }

}
