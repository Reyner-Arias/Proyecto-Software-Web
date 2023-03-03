import { Component, OnInit } from '@angular/core';
import { VideogamesService } from '../../../services/videogames.service';
import { Videogame } from 'src/app/models/Videogame.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-get-videogames',
  templateUrl: './get-videogames.component.html',
  styleUrls: ['./get-videogames.component.scss']
})
export class GetVideogamesComponent implements OnInit {

  videogamesByDeveloper = new Array<Videogame>();
 
  constructor(private videogamesService: VideogamesService,
    private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videogamesService.getDeveloperVideogames("sirodriguez").subscribe({
      error: (err: any) => { 
        console.log(err);
      },
      next: (res: Array<Videogame>) => {
        console.log(res);
        res.forEach(videogame => {
          videogame.imagen = this.domSanitizer.bypassSecurityTrustResourceUrl("data:image/bmd;base64, " +  videogame.portada.data);
        
        });
        this.videogamesByDeveloper = res;
      }
    });
  }
}
