import {Component, input, OnInit} from '@angular/core';
import {MatTreeModule, MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconButton} from "@angular/material/button";
import {findNode, INode} from "../../service/item.service";
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

    node = input.required<INode>();
    activeNodeId = input<string>();

    recur = (node: INode) => {
        this.treeControl.expand(node);
        if (node.parentId) {
            this.recur(findNode(this.node(), node.parentId)!);
        }
    }

    ngOnInit() {
        this.dataSource.data = this.node().children!;

        if (this.activeNodeId()) {
            this.treeControl.collapseAll();
            this.recur(findNode(this.node(), this.activeNodeId()!)!)
        }
    }

    hasChild = (_: number, node: INode) => (node.children ?? []).filter(c => c.type === "folder").length > 0;
}
