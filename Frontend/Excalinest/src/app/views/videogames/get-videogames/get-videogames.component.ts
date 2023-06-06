import { Component, OnInit } from '@angular/core';
import { VideogamesService } from '../../../services/videogames.service';
import { Videogame } from 'src/app/models/Videogame.model';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-videogames',
  templateUrl: './get-videogames.component.html',
  styleUrls: ['./get-videogames.component.scss']
})
export class GetVideogamesComponent implements OnInit {

  videogames = new Array<Videogame>();
 
  constructor(private videogamesService: VideogamesService,
    private domSanitizer: DomSanitizer, 
    private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUser().subscribe({
      error: (err: any) =>{
        this.showSpinner = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: User) => {
        this.videogamesService.getVideogames(res.type, res.username).subscribe({
          error: (err: any) => { 
            this.modalMessage = err.error.replace(/['"]+/g, '');
            this.openCloseInfoModal();
          },
          next: (res: Array<Videogame>) => {
            this.showSpinner = false;
            if(res.length == 0) {
              this.modalMessage = "Aún no hay videojuegos publicados."
              this.openCloseInfoModal();
            }
            res.forEach(videogame => {
              var portadaBase64 = btoa(
                new Uint8Array(videogame.portada.data.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
              videogame.imagen = this.domSanitizer.bypassSecurityTrustResourceUrl("data:" + videogame.portada.tipoImagen + ";base64, " + portadaBase64);
            });
            this.videogames = res;
          }
        });
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