import {Component, inject, OnInit} from '@angular/core';
import {MatTree} from "@angular/material/tree";
import {FoldersTreeComponent} from "./components/folders-tree/folders-tree.component";
import {INode, ItemFolderService} from "./service/item.service";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {FolderContentComponent} from "./components/folder-content/folder-content.component";
import {MatButton} from "@angular/material/button";
import {ItemService} from "../nomenclatures/items/services/item.service";
import {AsyncPipe} from "@angular/common";
import {IItem} from "../nomenclatures/items/models/item.model";

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [
        MatTree,
        FoldersTreeComponent,
        RouterOutlet,
        FolderContentComponent,
        MatButton,
        AsyncPipe
    ],
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {

    folderService = inject(ItemFolderService)
    itemsService = inject(ItemService);
    route = inject(ActivatedRoute)
    router = inject(Router);

    items!: IItem[]

    content!: INode;

    ngOnInit() {
        this.route.paramMap.subscribe((paramsMap) => {
            this.content = this.folderService.getFolderContent(paramsMap.get('id')!);
            console.log(this.folderService.getAllFolders());
        })

        this.itemsService.getAll().subscribe(items => this.items = items);
    }

    openDialog() {

    }
}
