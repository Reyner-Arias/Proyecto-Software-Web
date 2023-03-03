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
  public validatedForm = false;

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
        this.modalMessage = err;
        this.openCloseInfoModal();
      },
      next: (res: any) => {
        this.modalMessage = res;
        this.openCloseInfoModal();
      }
    });
  }

  submitVideogame() {
    this.validatedForm = true;
    if (this.postVideogameForm.dirty && this.postVideogameForm.valid) {
      this.onPostVideogame();
    }
  }

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Creación de videojuego";
  public visible = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
    if(!this.visible) {
      this.resetForm();
    }
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

  resetForm() {
    this.validatedForm = false;
    this.postVideogameForm = this.formBuilder.group({
      name: ['', Validators.required],
      developer: ['', Validators.required]
    });
  }

}