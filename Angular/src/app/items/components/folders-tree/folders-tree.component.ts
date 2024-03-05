import {Component, input, OnInit} from '@angular/core';
import {MatTreeModule, MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconButton} from "@angular/material/button";
import {INode} from "../../service/item.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-folders-tree',
    standalone: true,
    imports: [
        MatTreeModule,
        MatIconModule,
        MatFormFieldModule,
        MatInput,
        MatFormField,
        MatIconButton,
        RouterLink,
    ],
    templateUrl: './folders-tree.component.html',
    styleUrl: './folders-tree.component.scss'
})
export class FoldersTreeComponent implements OnInit {
    treeControl = new NestedTreeControl<INode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<INode>();

    folders = input.required<INode[]>();

    ngOnInit() {
        this.dataSource.data = this.folders();
    }

    hasChild = (_: number, node: INode) => !!node.children && node.children.length > 0;
}
