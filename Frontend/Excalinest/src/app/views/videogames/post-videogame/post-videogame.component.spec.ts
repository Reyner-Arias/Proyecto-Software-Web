import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVideogameComponent } from './post-videogame.component';

describe('PostVideogameComponent', () => {
  let component: PostVideogameComponent;
  let fixture: ComponentFixture<PostVideogameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostVideogameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostVideogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
