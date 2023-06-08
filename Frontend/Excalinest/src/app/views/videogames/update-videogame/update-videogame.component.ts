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
  public listOfTags = [{id: -1, name: ""}];
  public tags = [{id: -1, name: ""}];

  newVideogame: Videogame = {
    _id: '',
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

  onPutVideogame() {
    this.newVideogame.titulo = this.putVideogameForm.value.title;
    this.newVideogame.sinopsis = this.putVideogameForm.value.sinopsis;
    this.newVideogame.tags = this.tags.map(({ id }) => id);

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
