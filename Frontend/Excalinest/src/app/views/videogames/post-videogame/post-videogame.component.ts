import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Videogame } from '../../../models/Videogame.model'
import { VideogamesService } from '../../../services/videogames.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    juegoZip: {data: {data: new ArrayBuffer(0), type: ''}, tipoArchivo: ''},
    filepath: '',
    portada: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagen: '',
    imagepath: '',
    tags: [],
    facebook: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenFacebook: '',
    facepath: '',
    instagram: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenInstagram: '',
    instapath: '',
    twitter: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenTwitter: '',
    twitterpath: '',
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
      zip: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }
  
  onPostVideogame() {
    this.newVideogame.titulo = this.postVideogameForm.value.title;
    this.newVideogame.usuario = this.postVideogameForm.value.developer;
    this.newVideogame.sinopsis = this.postVideogameForm.value.sinopsis;
    this.newVideogame.imagepath = this.postVideogameForm.value.cover;
    this.newVideogame.filepath = this.postVideogameForm.value.zip;
    this.newVideogame.facepath = this.postVideogameForm.value.facebook;
    this.newVideogame.instapath = this.postVideogameForm.value.instagram;
    this.newVideogame.twitterpath = this.postVideogameForm.value.twitter;
    console.log(this.postVideogameForm.value.cover);
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
      title: ['', Validators.required],
      developer: ['', Validators.required],
      sinopsis: ['', Validators.required],
      cover: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }
}
