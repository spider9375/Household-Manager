import {Injectable} from "@angular/core";

export interface INode {
    id?: string,
    name?: string,
    type?: 'folder' | 'item',
    parentId?: string,
    children?: INode[]
}

export const nodes: INode = {
    id: "root",
    name: "root",
    children: [
        {
            id: "1",
            name: "Kitchen",
            type: "folder",
            parentId: "root",
            children: [
                {
                    id: "2",
                    type: "folder",
                    parentId: "1",
                    name: "Fridge",
                    children: [
                        {
                            id: "item-2431asdf",
                            name: "Milk",
                            type: "item",
                            parentId: "2"
                        }
                    ]
                }
            ]
        }
    ]
}

// Function to find a node in the tree recursively
export function findNode(root: INode | null, id: string): INode | null {
    if (!root) {
        return null; // Base case: reached the end of the tree without finding the node
    }

    if (root.id === id) {
        return root; // Base case: found the node
    }

    // Recursively search in the children
    for (const child of root.children!) {
        const result = findNode(child, id);
        if (result) {
            return result; // Return the result if found in the child subtree
        }
    }

    return null; // Node not found in this subtree
}

export function getFolderNodes(root: INode): INode[] {
    if (!root) {
        return []
    }

    for (const child of root.children!) {
        const result = getFolderNodes(child);
        if (result) {
            return result; // Return the result if found in the child subtree
        }
    }

    if (root.type === 'folder') {
        return [root]
    }

    return [];
}

@Injectable({
    providedIn: "root"
})
export class ItemFolderService {
    getAllFolders() {
        return nodes!;
    }

    getFolderContent(id: string): INode {
        return id ? findNode(nodes, id)! : nodes;
    }
}
