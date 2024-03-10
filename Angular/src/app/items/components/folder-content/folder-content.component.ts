import {Component, inject, input, OnInit} from '@angular/core';
import {TableComponent} from "@shared";
import {ActivatedRoute, Router} from "@angular/router";
import {INode, ItemFolderService} from "../../service/item.service";
import {IItem} from "../../../nomenclatures/items/models/item.model";

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

    columns = ["name"]

    items = input<IItem[]>();

    content!: INode;

    ngOnInit() {
        console.log(this.items());
        /*this.route.paramMap.subscribe((paramsMap) => {
            if (paramsMap.has('id')) {
                //this.content = this.service.getFolderContent(paramsMap.get('id')!);
                //console.log(this.content);
            }
        })*/
    }

}
