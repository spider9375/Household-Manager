import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FoldersTreeComponent} from './folders-tree.component';

describe('FoldersComponent', () => {
    let component: FoldersTreeComponent;
    let fixture: ComponentFixture<FoldersTreeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FoldersTreeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FoldersTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
