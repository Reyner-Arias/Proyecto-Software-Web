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

  private putVideogameForm: any;
  public validatedForm = false;
  private excalinestImgPath = "C:\\Excalinest\\img\\";
  private excalinestBuildsPath = "C:\\Excalinest\\builds\\";
  private fakePath = "C:\\fakepath\\";

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
    private formBuilder: FormBuilder) {}

  getPutVideogameForm() {
    return this.putVideogameForm;
  }

  ngOnInit(){
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

  onPutVideogame() {
    this.newVideogame._id = "6405490673108c0ad51e7902";
    this.newVideogame.titulo = this.putVideogameForm.value.title;
    this.newVideogame.sinopsis = this.putVideogameForm.value.sinopsis;
    this.newVideogame.usuario = this.putVideogameForm.value.developer;
    this.newVideogame.imagepath = this.putVideogameForm.value.cover.replace(this.fakePath, this.excalinestImgPath);
    /*this.newVideogame.filepath = this.putVideogameForm.value.zip.replace(this.fakePath, this.excalinestBuildsPath);
    this.newVideogame.facepath = this.putVideogameForm.value.facebook.replace(this.fakePath, this.excalinestImgPath);
    this.newVideogame.instapath = this.putVideogameForm.value.instagram.replace(this.fakePath, this.excalinestImgPath);
    this.newVideogame.twitterpath = this.putVideogameForm.value.twitter.replace(this.fakePath, this.excalinestImgPath);*/

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
    if (this.putVideogameForm.dirty && this.putVideogameForm.valid) {
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
