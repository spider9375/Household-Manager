import {Component, inject, OnInit} from '@angular/core';
import {MatTree} from "@angular/material/tree";
import {FoldersTreeComponent} from "./components/folders-tree/folders-tree.component";
import {INode, ItemFolderService} from "./service/item.service";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {FolderContentComponent} from "./components/folder-content/folder-content.component";

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [
        MatTree,
        FoldersTreeComponent,
        RouterOutlet,
        FolderContentComponent
    ],
    providers: [ItemFolderService],
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
    service = inject(ItemFolderService)
    route = inject(ActivatedRoute)
    router = inject(Router);

    content!: INode;

    ngOnInit() {
        this.route.paramMap.subscribe((paramsMap) => {
            if (paramsMap.has('id')) {
                this.content = this.service.getFolderContent(paramsMap.get('id')!);
                console.log(this.content);
            }
        })
    }
}
