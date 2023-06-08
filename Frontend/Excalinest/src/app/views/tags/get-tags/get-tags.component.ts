import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TagsService } from '../../../services/tags.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-get-tags',
  templateUrl: './get-tags.component.html',
  styleUrls: ['./get-tags.component.scss']
})
export class GetTagsComponent implements OnInit {

  tags = new Array<Tag>();
  tagToDelete:Number =0;
 
  constructor(private tagsService: TagsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.tagsService.getTags().subscribe({
      error: (err: any) => { 
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
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

  deleteTag(tagId: Number, tagName: String) {
    this.tagToDelete = tagId;
    this.modalMessage = "¿Está seguro que desea eliminar la etiqueta " + tagName + "?";
    this.deleteButton = true;
    this.openCloseInfoModal();
  }

  onDeleteTag() {
    this.openCloseInfoModal();
    this.showSpinnerDelete = true;
    this.tagsService.deleteTag(this.tagToDelete).subscribe({
      error: (err: any) =>{
        this.showSpinnerDelete = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: () => {
        location.reload();
      }
    });
  }
  
  /* --------------------- Spinner --------------------- */

  public showSpinner = true;
  public showSpinnerDelete = false;

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;
  public deleteButton = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */
}
