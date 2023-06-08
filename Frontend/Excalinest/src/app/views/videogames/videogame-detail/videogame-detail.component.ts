import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Videogame } from 'src/app/models/Videogame.model';
import { VideogamesService } from '../../../services/videogames.service';
import { Router } from '@angular/router';
import { TagsService } from 'src/app/services/tags.service';
import { VideogameTagService } from 'src/app/services/videogame-tag.service'
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-videogame-detail',
  templateUrl: './videogame-detail.component.html',
  styleUrls: ['./videogame-detail.component.scss']
})
export class VideogameDetailComponent implements OnInit {

  private excalinestDownloadsPath = "C:\\Excalinest\\";
  public deleteButton = false;
  public videogameTags = [{id: -1, name: ""}];
  public spinnerMessage = "Cargando videojuego...";

  constructor(private domSanitizer: DomSanitizer,  public router: Router,
    private videogamesService: VideogamesService, private tagsService: TagsService,
    private videogameTagService: VideogameTagService) {}

  videogame: Videogame = {
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

  getTagInfo(listOfTags: any) {
    let tagInfoArray = [{id: -1, name: ""}];
    this.videogameTagService.getVideogameTags(this.videogame._id).subscribe({
      error: (err: any) => {
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
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
  
  ngOnInit(): void {
    this.videogame = history.state;

    this.tagsService.getTags().subscribe({
      error: (err: any) => { 
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: any) => {
        this.error = false;
        this.videogameTags = this.getTagInfo(res);
      }
    });

    var portadaBase64 = btoa(
      new Uint8Array(this.videogame.portada.data.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    this.videogame.imagen = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.portada.tipoImagen +";base64, " + portadaBase64);
    
    var facebookBase64 = btoa(
      new Uint8Array(this.videogame.facebook.data.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    this.videogame.imagenFacebook = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.facebook.tipoImagen +";base64, " + facebookBase64);
    
    var instagramBase64 = btoa(
      new Uint8Array(this.videogame.instagram.data.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    this.videogame.imagenInstagram = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.instagram.tipoImagen +";base64, " + instagramBase64);
    
    var twitterBase64 = btoa(
      new Uint8Array(this.videogame.twitter.data.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    this.videogame.imagenTwitter = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.twitter.tipoImagen +";base64, " + twitterBase64);
  }

  showDeleteModal() {
    this.deleteButton = true;
    this.modalMessage = "¿Está seguro de eliminar "+ this.videogame.titulo +"?"
    this.openCloseInfoModal();
  }

  onDeleteVideogame() {
    this.openCloseInfoModal();
    this.showSpinner = true;
    this.spinnerMessage = "Eliminando videojuego...";
    this.videogamesService.deleteVideogame({_id: this.videogame._id}).subscribe({
      error: (err: any) => {
        this.showSpinner = false;
        this.deleteButton = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: any) => {
        this.router.navigate(['/videogames']);
      }
    });   
  }

  downloadFile() {
    let body = {
      "filename": this.videogame.titulo+".zip"
    }
    this.showSpinner = true;
    this.spinnerMessage = "Descargando videojuego...";
    this.videogamesService.getZipFile(body).subscribe({
      error: (err: any) => {
        this.showSpinner = false;
        this.deleteButton = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: async (blob: Blob) => {
        this.showSpinner = false;
        const filename = this.videogame.titulo+".zip";
        
        // Crear un objeto URL a partir del blob recibido
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace temporal y simular un clic para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        // Liberar la URL temporal creada
        window.URL.revokeObjectURL(url)

        this.deleteButton = false;
      }
    });
  }

  /* --------------------- Spinner --------------------- */

  public showSpinner = false;

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;
  public error = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

}
