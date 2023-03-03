import { Component, OnInit } from '@angular/core';
import { VideogamesService } from '../../../services/videogames.service';
import { Videogame } from 'src/app/models/Videogame.model';

@Component({
  selector: 'app-get-videogames',
  templateUrl: './get-videogames.component.html',
  styleUrls: ['./get-videogames.component.scss']
})
export class GetVideogamesComponent implements OnInit {

  videogamesByDeveloper = new Array<Videogame>();

  constructor(private videogamesService: VideogamesService) {}

  ngOnInit(): void {
    this.videogamesService.getDeveloperVideogames("Fabricio Delgado").subscribe({
      error: (err: any) => { 
        console.log(err);
      },
      next: (res: Array<Videogame>) => {
        console.log(res);
        this.videogamesByDeveloper = res;
      }
    });
  }
}
