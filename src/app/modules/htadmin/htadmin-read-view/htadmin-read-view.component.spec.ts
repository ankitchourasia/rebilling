import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTAdminReadViewComponent } from './htadmin-read-view.component';

describe('HTAdminReadViewComponent', () => {
  let component: HTAdminReadViewComponent;
  let fixture: ComponentFixture<HTAdminReadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HTAdminReadViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HTAdminReadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
