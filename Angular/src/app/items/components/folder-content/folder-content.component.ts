import {Component, inject, OnInit} from '@angular/core';
import {TableComponent} from "@shared";
import {ActivatedRoute, Router} from "@angular/router";
import {INode, ItemFolderService} from "../../service/item.service";

@Component({
    selector: 'app-folder-content',
    standalone: true,
    imports: [
        TableComponent
    ],
    templateUrl: './folder-content.component.html',
    styleUrl: './folder-content.component.scss'
})
export class FolderContentComponent implements OnInit {
    service = inject(ItemFolderService)
    route = inject(ActivatedRoute)
    router = inject(Router);

    content!: INode;

    /*ngOnInit() {
        this.route.paramMap.subscribe((paramsMap) => {
            if (paramsMap.has('id')) {
                //this.content = this.service.getFolderContent(paramsMap.get('id')!);
                //console.log(this.content);
            }
        })
    }*/

}
