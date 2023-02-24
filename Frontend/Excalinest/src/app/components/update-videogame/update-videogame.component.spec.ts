import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVideogameComponent } from './update-videogame.component';

describe('UpdateVideogameComponent', () => {
  let component: UpdateVideogameComponent;
  let fixture: ComponentFixture<UpdateVideogameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVideogameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVideogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
