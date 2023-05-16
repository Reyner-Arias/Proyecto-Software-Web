import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostApplicationComponent } from './post-application.component';

describe('PostApplicationComponent', () => {
  let component: PostApplicationComponent;
  let fixture: ComponentFixture<PostApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
