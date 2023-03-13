import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Videogame } from '../../../models/Videogame.model'
import { VideogamesService } from '../../../services/videogames.service';

@Component({
  selector: 'app-update-videogame',
  templateUrl: './update-videogame.component.html',
  styleUrls: ['./update-videogame.component.scss']
})
export class UpdateVideogameComponent implements OnInit {

  private putVideogameForm: any;
  public validatedForm = false;
  private excalinestImgPath = "C:\\Excalinest\\img\\";
  private excalinestBuildsPath = "C:\\Excalinest\\builds\\";
  private fakePath = "C:\\fakepath\\";
  public listOfTags = []

  newVideogame: Videogame = {
    _id: '',
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
    private formBuilder: FormBuilder, public router: Router) {}

  getPutVideogameForm() {
    return this.putVideogameForm;
  }

  ngOnInit(){
    this.newVideogame._id = history.state._id;
    this.newVideogame.titulo = history.state.titulo;
    this.newVideogame.sinopsis = history.state.sinopsis;
    this.newVideogame.usuario = history.state.usuario;

    this.putVideogameForm = this.formBuilder.group({
      title: [this.newVideogame.titulo, Validators.required],
      developer: [this.newVideogame.usuario, Validators.required],
      sinopsis: [this.newVideogame.sinopsis, Validators.required],
      cover: ['', Validators.required],
      zip: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }

  onPutVideogame() {
    this.newVideogame.titulo = this.putVideogameForm.value.title;
    this.newVideogame.sinopsis = this.putVideogameForm.value.sinopsis;
    this.newVideogame.usuario = this.putVideogameForm.value.developer;

    if(this.putVideogameForm.value.cover != "") { this.newVideogame.imagepath = this.putVideogameForm.value.cover.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putVideogameForm.value.zip != "") { this.newVideogame.filepath = this.putVideogameForm.value.zip.replace(this.fakePath, this.excalinestBuildsPath); }
    if(this.putVideogameForm.value.facebook != "") { this.newVideogame.facepath = this.putVideogameForm.value.facebook.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putVideogameForm.value.instagram != "") { this.newVideogame.instapath = this.putVideogameForm.value.instagram.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putVideogameForm.value.twitter != "") { this.newVideogame.twitterpath = this.putVideogameForm.value.twitter.replace(this.fakePath, this.excalinestImgPath); }

    this.videogamesService.putVideogame(this.newVideogame).subscribe({
      error: (err: any) => { 
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal(false);
      },
      next: (res: any) => {
        this.modalMessage = res.replace(/['"]+/g, '');
        this.openCloseInfoModal(true);
      }
    });
  }

  submitVideogame() {
    this.validatedForm = true;
    if (this.putVideogameForm.dirty) {
      this.onPutVideogame();
    }
  }

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;

  openCloseInfoModal(cleanForm: boolean) {
    this.visible = !this.visible;
    if(this.visible && cleanForm) {
      this.resetForm();
    } else if(!this.visible) {
      this.router.navigate(['/videogames']);
    }
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

  resetForm() {
    this.validatedForm = false;
    this.putVideogameForm = this.formBuilder.group({
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

}
