import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApplicationsComponent } from './get-applications.component';

describe('GetApplicationsComponent', () => {
  let component: GetApplicationsComponent;
  let fixture: ComponentFixture<GetApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
