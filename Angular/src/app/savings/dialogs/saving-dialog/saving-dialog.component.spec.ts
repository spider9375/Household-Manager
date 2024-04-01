import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingDialogComponent } from './saving-dialog.component';

describe('SavingDialogComponent', () => {
  let component: SavingDialogComponent;
  let fixture: ComponentFixture<SavingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
