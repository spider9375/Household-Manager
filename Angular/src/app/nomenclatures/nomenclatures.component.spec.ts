import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclaturesComponent } from './nomenclatures.component';

describe('NomenclaturesComponent', () => {
  let component: NomenclaturesComponent;
  let fixture: ComponentFixture<NomenclaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomenclaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NomenclaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
