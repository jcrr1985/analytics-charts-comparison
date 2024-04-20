import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotyComponent } from './ploty.component';

describe('PlotyComponent', () => {
  let component: PlotyComponent;
  let fixture: ComponentFixture<PlotyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
