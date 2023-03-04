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
    tags: []
  }

  ngOnInit(): void {
    this.videogame = history.state;
    this.videogame.imagen = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
      this.videogame.portada.tipoImagen +";base64, " +  this.videogame.portada.data);
  }

}
