import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../../services/tags.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-get-tags',
  templateUrl: './get-tags.component.html',
  styleUrls: ['./get-tags.component.scss']
})
export class GetTagsComponent implements OnInit {

  tags = new Array<Tag>();
 
  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsService.getTags().subscribe({
      error: (err: any) => { 
        console.log(err);
      },
      next: (res: Array<Tag>) => {
        this.showSpinner = false;
        if(res.length == 0) {
          this.modalMessage = "Aún no hay etiquetas."
          this.openCloseInfoModal();
        }
        this.tags = res;
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
