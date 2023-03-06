import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Videogame } from 'src/app/models/Videogame.model';

@Component({
  selector: 'app-videogame-detail',
  templateUrl: './videogame-detail.component.html',
  styleUrls: ['./videogame-detail.component.scss']
})
export class VideogameDetailComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) {}

  videogame: Videogame = {
    titulo: '',
    usuario: '',
    sinopsis: '',
    portada: {data: new ArrayBuffer(0), tipoImagen: ''},
    imagen: '',
    tags: [],
    facebook: {data: new ArrayBuffer(0), tipoImagen: ''},
    imagenFacebook: '',
    instagram: {data: new ArrayBuffer(0), tipoImagen: ''},
    imagenInstagram: '',
    twitter: {data: new ArrayBuffer(0), tipoImagen: ''},
    imagenTwitter: ''
  }

  ngOnInit(): void {
    this.videogame = history.state;
    this.videogame.imagen = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.portada.tipoImagen +";base64, " +  this.videogame.portada.data);
    this.videogame.imagenFacebook = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.facebook.tipoImagen +";base64, " +  this.videogame.facebook.data);
    this.videogame.imagenInstagram = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.instagram.tipoImagen +";base64, " +  this.videogame.instagram.data);
    this.videogame.imagenTwitter = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.twitter.tipoImagen +";base64, " +  this.videogame.twitter.data);
  }

}
