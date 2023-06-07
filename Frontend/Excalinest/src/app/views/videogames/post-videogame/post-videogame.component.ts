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
  public listOfTags = [{id: -1, name: ""}];
  public tags = [{id: -1, name: ""}];

  newVideogame: Videogame = {
    _id:'',
    titulo: '',
    usuario: '',
    sinopsis: '',
    bucketId: '',
    portada: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagen: '',
    tags: [],
    facebook: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenFacebook: '',
    instagram: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenInstagram: '',
    twitter: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenTwitter: '',
    zipFile: new File([], ''),
    coverFile: new File([], ''),
    facebookFile: new File([], ''),
    instaFile: new File([], ''),
    twitterFile: new File([], '')
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

  onZipFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const zipfile = inputElement.files?.[0];
    if (zipfile) {
      this.newVideogame.zipFile = zipfile;
    }
  }

  onCoverFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const coverFile = inputElement.files?.[0];
    if (coverFile) {
      this.newVideogame.coverFile = coverFile;
    }
  }
  
  onFacebookFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const facebookFile = inputElement.files?.[0];
    if (facebookFile) {
      this.newVideogame.facebookFile = facebookFile;
    }
  }

  onInstagramFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const instaFile = inputElement.files?.[0];
    if (instaFile) {
      this.newVideogame.instaFile = instaFile;
    }
  }

  onTwitterFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const twitterFile = inputElement.files?.[0];
    if (twitterFile) {
      this.newVideogame.twitterFile = twitterFile;
    }
  }

  onPostVideogame() {
    this.newVideogame.titulo = this.postVideogameForm.value.title;
    this.newVideogame.usuario = this.postVideogameForm.value.developer;
    this.newVideogame.sinopsis = this.postVideogameForm.value.sinopsis;
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
    if(!cleanForm) {
      this.completeForm();
    } else if(this.visible && cleanForm) {
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

  completeForm() {
    this.validatedForm = false;
    this.postVideogameForm = this.formBuilder.group({
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
}
