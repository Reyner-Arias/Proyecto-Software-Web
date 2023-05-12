import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Videogame } from '../../../models/Videogame.model'
import { VideogamesService } from '../../../services/videogames.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TagsService } from '../../../services/tags.service';

@Component({
  selector: 'app-post-videogame',
  templateUrl: './post-videogame.component.html',
  styleUrls: ['./post-videogame.component.scss']
})
export class PostVideogameComponent implements OnInit{

  private postVideogameForm: any;
  public validatedForm = false;
  private excalinestImgPath = "C:\\Excalinest\\img\\";
  private excalinestBuildsPath = "C:\\Excalinest\\builds\\";
  private fakePath = "C:\\fakepath\\";
  public listOfTags = [{id: -1, name: ""}];
  public tags = [{id: -1, name: ""}];

  newVideogame: Videogame = {
    _id:'',
    titulo: '',
    usuario: '',
    sinopsis: '',
    bucketId: '',
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
    private formBuilder: FormBuilder, public router: Router,
    private tagsService: TagsService) {}
    
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

    this.tagsService.getTags().subscribe({
      error: (err: any) => { 
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal(false);
      },
      next: (res: any) => {
        this.error = false;
        this.listOfTags = res;
      }
    });
  }

  addTag(selectedTag: any) {
    let id = parseInt(selectedTag.split(" - ")[0]);
    let name = selectedTag.split(" - ")[1];
    if(this.tags.find(tag => { return tag.id ===  id })) {
      if(this.tags.length == 1 && this.tags[0].id != -1) {
        this.tags.push({id: -1, name: ""});
      }
      this.tags.splice(this.tags.findIndex(item => item.id === id), 1);
    } else {
      if(this.tags.length == 1 && this.tags[0].id == -1) {
        this.tags.splice(this.tags.findIndex(item => item.id === -1), 1);
      }
      this.tags.push({id: id, name: name});
    }
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../../assets/audio/success.mp3";
    audio.load();
    audio.play();
  }

  onPostVideogame() {
    this.newVideogame.titulo = this.postVideogameForm.value.title;
    this.newVideogame.usuario = this.postVideogameForm.value.developer;
    this.newVideogame.sinopsis = this.postVideogameForm.value.sinopsis;
    this.newVideogame.imagepath = this.postVideogameForm.value.cover.replace(this.fakePath, this.excalinestImgPath);
    this.newVideogame.filepath = this.postVideogameForm.value.zip.replace(this.fakePath, this.excalinestBuildsPath);
    this.newVideogame.facepath = this.postVideogameForm.value.facebook.replace(this.fakePath, this.excalinestImgPath);
    this.newVideogame.instapath = this.postVideogameForm.value.instagram.replace(this.fakePath, this.excalinestImgPath);
    this.newVideogame.twitterpath = this.postVideogameForm.value.twitter.replace(this.fakePath, this.excalinestImgPath);
    this.newVideogame.tags = this.tags.map(({ id }) => id);

    this.showSpinner = true;

    this.videogamesService.postVideogame(this.newVideogame).subscribe({
      error: (err: any) => { 
        this.showSpinner = false;
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal(false);
      },
      next: (res: any) => {
        this.playAudio();
        this.showSpinner = false;
        this.error = false;
        this.modalMessage = res.replace(/['"]+/g, '');
        this.openCloseInfoModal(true);
      }
    });
  }

  submitVideogame() {
    this.validatedForm = true;
    if (this.postVideogameForm.dirty && this.postVideogameForm.valid
      && (this.tags.length != 1 || this.tags[0].id != -1)) {
      this.onPostVideogame();
    }
  }

  /* --------------------- Spinner --------------------- */

  public showSpinner = false;

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;
  public error = false;

  openCloseInfoModal(cleanForm: boolean) {
    this.visible = !this.visible;
    if(this.visible && cleanForm) {
      this.resetForm();
    } 
    if(!this.visible && !this.error) {
      this.router.navigate(['/videogames']);
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
      zip: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }
}
