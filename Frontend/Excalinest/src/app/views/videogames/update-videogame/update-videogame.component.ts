import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Videogame } from '../../../models/Videogame.model'
import { VideogamesService } from '../../../services/videogames.service';
import { TagsService } from '../../../services/tags.service';
import { VideogameTagService } from 'src/app/services/videogame-tag.service';

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
  public listOfTags = [{id: -1, name: ""}];
  public tags = [{id: -1, name: ""}];

  newVideogame: Videogame = {
    _id: '',
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
    private tagsService: TagsService, private videogameTagService: VideogameTagService) {}

  getPutVideogameForm() {
    return this.putVideogameForm;
  }

  getTagInfo(listOfTags: any) {
    let tagInfoArray = [{id: -1, name: ""}];
    this.videogameTagService.getVideogameTags(this.newVideogame._id).subscribe({
      error: (err: any) => {
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal(false);
      },
      next: (res: any) => {
        this.error = false;
        for(const id of res) {
          let newTag = listOfTags.find((item: { id: any; }) => item.id === id)
          if(newTag)
            if(tagInfoArray.length == 1 && tagInfoArray[0].id == -1)
              tagInfoArray.splice(tagInfoArray.findIndex(item => item.id === -1), 1);
            tagInfoArray.push(newTag);
        }
        return tagInfoArray;
      }
    });
    return tagInfoArray;
  }

  ngOnInit() {
    this.newVideogame._id = history.state._id;
    this.newVideogame.titulo = history.state.titulo;
    this.newVideogame.sinopsis = history.state.sinopsis;
    this.newVideogame.bucketId = history.state.bucketId;

    this.putVideogameForm = this.formBuilder.group({
      title: [this.newVideogame.titulo, Validators.required],
      sinopsis: [this.newVideogame.sinopsis, Validators.required],
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
        this.tags = this.getTagInfo(res);
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

  onPutVideogame() {
    this.newVideogame.titulo = this.putVideogameForm.value.title;
    this.newVideogame.sinopsis = this.putVideogameForm.value.sinopsis;
    this.newVideogame.tags = this.tags.map(({ id }) => id);

    if(this.putVideogameForm.value.cover != "") { this.newVideogame.imagepath = this.putVideogameForm.value.cover.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putVideogameForm.value.zip != "") { this.newVideogame.filepath = this.putVideogameForm.value.zip.replace(this.fakePath, this.excalinestBuildsPath); }
    if(this.putVideogameForm.value.facebook != "") { this.newVideogame.facepath = this.putVideogameForm.value.facebook.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putVideogameForm.value.instagram != "") { this.newVideogame.instapath = this.putVideogameForm.value.instagram.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putVideogameForm.value.twitter != "") { this.newVideogame.twitterpath = this.putVideogameForm.value.twitter.replace(this.fakePath, this.excalinestImgPath); }

    this.showSpinner = true;

    this.videogamesService.putVideogame(this.newVideogame).subscribe({
      error: (err: any) => { 
        this.error = true;
        this.showSpinner = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal(false);
      },
      next: (res: any) => {
        this.error = false;
        this.showSpinner = false;
        this.modalMessage = res.replace(/['"]+/g, '');
        this.openCloseInfoModal(true);
      }
    });
  }

  isValidForm() {
    return this.putVideogameForm.value.title != "" ||
      this.putVideogameForm.value.sinopsis != "" ||
      this.putVideogameForm.value.developer != "" ||
      (this.tags.length != 1 || this.tags[0].id != -1);
  }

  submitVideogame() {
    this.validatedForm = true;
    if(this.isValidForm()) {
      this.onPutVideogame();
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
    this.putVideogameForm = this.formBuilder.group({
      title: ['', Validators.required],
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
    this.putVideogameForm = this.formBuilder.group({
      title: [this.newVideogame.titulo, Validators.required],
      sinopsis: [this.newVideogame.sinopsis, Validators.required],
      cover: ['', Validators.required],
      zip: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }

}
