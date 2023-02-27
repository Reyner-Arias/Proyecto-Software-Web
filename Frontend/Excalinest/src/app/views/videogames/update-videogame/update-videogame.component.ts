import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Videogame } from '../../../models/Videogame.model'
import { VideogamesService } from '../../../services/videogames.service';

@Component({
  selector: 'app-update-videogame',
  templateUrl: './update-videogame.component.html',
  styleUrls: ['./update-videogame.component.scss']
})
export class UpdateVideogameComponent implements OnInit {

  private postVideogameForm: any;
  validatedForm = false;

  newVideogame: Videogame = {
    name: '',
    developer: '',
  }

  constructor(private videogamesService: VideogamesService,
    private formBuilder: FormBuilder) {}

  getPostVideogameForm() {
    return this.postVideogameForm;
  }

  ngOnInit(){
    this.postVideogameForm = this.formBuilder.group({
      name: ['', Validators.required],
      developer: ['', Validators.required]
    });
  }

  onPostVideogame() {
    this.newVideogame.name = this.postVideogameForm.value.name;
    this.newVideogame.developer = this.postVideogameForm.value.developer;
    console.log(this.newVideogame);

    this.videogamesService.postVideogame(this.newVideogame).subscribe({
      error: (err: any) => { 
        alert("Error: " + err);
      },
      next: (res: any) => {
        alert("Bien hecho! " + res);
      }
    });
  }

  submitVideogame() {
    this.validatedForm = true;
    if (this.postVideogameForm.dirty && this.postVideogameForm.valid) {
      this.onPostVideogame();
      //alert(`Name: ${this.postVideogameForm.value.name} --- Developer: ${this.postVideogameForm.value.developer}`);
    }
  }

}
