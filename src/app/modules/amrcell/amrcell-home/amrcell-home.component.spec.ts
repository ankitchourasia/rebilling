import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AMRCellHomeComponent } from './amrcell-home.component';

describe('AMRCellHomeComponent', () => {
  let component: AMRCellHomeComponent;
  let fixture: ComponentFixture<AMRCellHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AMRCellHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AMRCellHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
