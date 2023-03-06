import { Component, OnInit } from '@angular/core';
import { VideogamesService } from '../../../services/videogames.service';
import { Videogame } from 'src/app/models/Videogame.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-get-videogames',
  templateUrl: './get-videogames.component.html',
  styleUrls: ['./get-videogames.component.scss']
})
export class GetVideogamesComponent implements OnInit {

  videogamesByDeveloper = new Array<Videogame>();
  tags = [{id: 5, name: "Indie"}, {id: 3, name: "2D"}, {id: 7, name: "Singleplayer"}];
 
  constructor(private videogamesService: VideogamesService,
    private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videogamesService.getDeveloperVideogames("sirodriguez").subscribe({
      error: (err: any) => { 
        console.log(err);
      },
      next: (res: Array<Videogame>) => {
        this.showSpinner = false;
        if(res.length == 0) {
          this.modalMessage = "Aún no hay videojuegos publicados."
          this.openCloseInfoModal();
        }
        res.forEach(videogame => {
          videogame.imagen = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ videogame.portada.tipoImagen +";base64, " +  videogame.portada.data);
          videogame.tags = this.tags;
        });
        this.videogamesByDeveloper = res;
      }
    });
  }

  /* --------------------- Spinner --------------------- */

  public showSpinner = true;

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