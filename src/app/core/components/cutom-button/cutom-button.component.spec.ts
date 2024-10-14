import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomButtonComponent } from './cutom-button.component';

describe('CutomButtonComponent', () => {
  let component: CutomButtonComponent;
  let fixture: ComponentFixture<CutomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CutomButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
