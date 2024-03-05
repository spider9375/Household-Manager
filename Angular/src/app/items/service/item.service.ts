import {Injectable} from "@angular/core";

export interface INode {
    id?: string,
    name?: string,
    type?: 'folder' | 'item',
    parentId?: string,
    children?: INode[]
}

const items: INode = {
    id: "root",
    name: "root",
    children: [
        {
            id: "1",
            name: "Kitchen",
            type: "folder",
            children: [
                {
                    id: "2",
                    type: "folder",
                    name: "Fridge",
                    children: [
                        {
                            id: "item-2431asdf",
                            name: "Milk",
                            type: "item",
                        }
                    ]
                }
            ]
        }
    ]
}

// Function to find a node in the tree recursively
function findNode(root: INode | null, id: string): INode | null {
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


@Injectable()
export class ItemFolderService {
    getAllFolders() {
        return items.children!;
    }

    getFolderContent(id: string) {
        return findNode(items, id)!;
    }
}
