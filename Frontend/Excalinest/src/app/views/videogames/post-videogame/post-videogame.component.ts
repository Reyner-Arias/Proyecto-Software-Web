import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Videogame } from '../../../models/Videogame.model'
import { VideogamesService } from '../../../services/videogames.service';

@Component({
  selector: 'app-post-videogame',
  templateUrl: './post-videogame.component.html',
  styleUrls: ['./post-videogame.component.scss']
})
export class PostVideogameComponent implements OnInit{

  private postVideogameForm: any;
  public validatedForm = false;

  newVideogame: Videogame = {
    titulo: '',
    usuario: '',
    sinopsis: '',
    portada: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagen: '',
    tags: [],
    facebook: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenFacebook: '',
    instagram: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenInstagram: '',
    twitter: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenTwitter: '',
  }

  constructor(private videogamesService: VideogamesService,
    private formBuilder: FormBuilder) {}
  
  getPostVideogameForm() {
    return this.postVideogameForm;
  }
  
  ngOnInit(){
    this.postVideogameForm = this.formBuilder.group({
      title: ['', Validators.required],
      developer: ['', Validators.required],
      sinopsis: ['', Validators.required],
      cover: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }
  
  onPostVideogame() {
    this.newVideogame.titulo = this.postVideogameForm.value.name;
    //this.newVideogame.portada = this.postVideogameForm.value.portada;
    //this.newVideogame.imagen = this.postVideogameForm.value.portada.name;
    this.newVideogame.sinopsis = this.postVideogameForm.value.sinopsis;
    this.newVideogame.usuario = this.postVideogameForm.value.developer;
    //this.newVideogame.juegoZip = this.postVideogameForm.value.juegoZip;
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
