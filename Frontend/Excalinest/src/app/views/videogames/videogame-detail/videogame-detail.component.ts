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

  constructor(private domSanitizer: DomSanitizer,  public router: Router,
    private videogamesService: VideogamesService) {}

  videogame: Videogame = {
    _id: '',
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
    imagenTwitter: ''
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
        console.log(err);
      },
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/videogames']);
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
