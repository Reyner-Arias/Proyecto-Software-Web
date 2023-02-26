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

}
