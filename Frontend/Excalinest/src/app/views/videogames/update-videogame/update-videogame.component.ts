import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Videogame } from '../../../models/Videogame.model'
import { VideogamesService} from '../../../services/videogames.service';

@Component({
  selector: 'app-update-videogame',
  templateUrl: './update-videogame.component.html',
  styleUrls: ['./update-videogame.component.scss']
})
export class UpdateVideogameComponent {

  newVideogame: Videogame = {
    name: '',
    developer: '',
  }

  constructor(private videogamesService: VideogamesService) {}

  onPostVideogame(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.newVideogame.name = form.value.name;
    this.newVideogame.developer = form.value.developer;

    this.videogamesService.postVideogame(this.newVideogame).subscribe({
      error: (err: any) => { 
      
      },
      next: (res: any) => {
      
        form.resetForm();
      }
    });
  }

  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;

  onSubmit1() {
    this.customStylesValidated = true;
    console.log('Submit... 1');
  }

  onReset1() {
    this.customStylesValidated = false;
    console.log('Reset... 1');
  }

  onSubmit2() {
    this.browserDefaultsValidated = true;
    console.log('Submit... 2');
  }

  onReset2() {
    this.browserDefaultsValidated = false;
    console.log('Reset... 3');
  }

  onSubmit3() {
    this.tooltipValidated = true;
    console.log('Submit... 3');
  }

  onReset3() {
    this.tooltipValidated = false;
    console.log('Reset... 3');
  }

}
