import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videogame-detail',
  templateUrl: './videogame-detail.component.html',
  styleUrls: ['./videogame-detail.component.scss']
})
export class VideogameDetailComponent implements OnInit {

  ngOnInit(): void {
    console.log(history.state);
  }

}
