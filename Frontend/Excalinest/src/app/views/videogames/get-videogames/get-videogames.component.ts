import { Component, OnInit } from '@angular/core';
import { VideogamesService } from '../../../services/videogames.service';

@Component({
  selector: 'app-get-videogames',
  templateUrl: './get-videogames.component.html',
  styleUrls: ['./get-videogames.component.scss']
})
export class GetVideogamesComponent implements OnInit {

  videogamesByDeveloper = [];

  constructor(private videogamesService: VideogamesService) {}

  ngOnInit(): void {
    this.videogamesService.getDeveloperVideogames("Fabricio Delgado").subscribe({
      error: (err: any) => { 
        console.log(err);
      },
      next: (res: any) => {
        console.log(res);
        this.videogamesByDeveloper = res;
      }
    });
  }
}
