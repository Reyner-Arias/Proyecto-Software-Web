import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Videogame } from 'src/app/models/Videogame.model';
import { VideogamesService } from '../../../services/videogames.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videogame-detail',
  templateUrl: './videogame-detail.component.html',
  styleUrls: ['./videogame-detail.component.scss']
})
export class VideogameDetailComponent implements OnInit {

  private excalinestDownloadsPath = "C:\\Excalinest\\";

  constructor(private domSanitizer: DomSanitizer,  public router: Router,
    private videogamesService: VideogamesService) {}

  videogame: Videogame = {
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
  
  ngOnInit(): void {
    this.videogame = history.state;

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
    this.modalMessage = "¿Está seguro de eliminar "+ this.videogame.titulo +"?"
    this.openCloseInfoModal();
  }

  onDeleteVideogame() {
    this.videogamesService.deleteVideogame({_id: this.videogame._id}).subscribe({
      error: (err: any) => { 
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
      "destPath": this.excalinestDownloadsPath,
      "filename": this.videogame.titulo+".zip"
    }
    this.videogamesService.getZipFile(body).subscribe({
      error: (err: any) => {
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: any) => {
        this.modalMessage = res+". Excalinest coloca el archivo en C:\\Excalinest";
        this.openCloseInfoModal();
      }
    });
  }

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

}
