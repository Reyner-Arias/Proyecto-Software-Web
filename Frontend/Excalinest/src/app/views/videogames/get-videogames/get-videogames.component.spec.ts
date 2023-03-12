import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetVideogamesComponent } from './get-videogames.component';

describe('GetVideogamesComponent', () => {
  let component: GetVideogamesComponent;
  let fixture: ComponentFixture<GetVideogamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetVideogamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetVideogamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
