import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutUserComponent } from './put-user.component';

describe('PutUserComponent', () => {
  let component: PutUserComponent;
  let fixture: ComponentFixture<PutUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
