import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclatureDialogComponent } from './nomenclature-dialog.component';

describe('NomenclatureDialogComponent', () => {
  let component: NomenclatureDialogComponent;
  let fixture: ComponentFixture<NomenclatureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomenclatureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NomenclatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
