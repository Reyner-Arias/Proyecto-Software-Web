import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMyProfileComponent } from './update-my-profile.component';

describe('UpdateMyProfileComponent', () => {
  let component: UpdateMyProfileComponent;
  let fixture: ComponentFixture<UpdateMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
