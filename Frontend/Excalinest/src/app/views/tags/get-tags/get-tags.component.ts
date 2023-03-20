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
 
  constructor(private tagsService: TagsService, private toastr: ToastrService) {}

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

  deleteTag(tagId: Number) {
    this.tagsService.deleteTag(tagId).subscribe({
      error: (err: any) =>{
        this.toastr.error('Ocurrió un error al eliminar la etiqueta', 'Error');
        console.log(err);
      },
      next: () => {
        this.toastr.success('La etiqueta se eliminó correctamente', 'Éxito');
        setTimeout(() => {
          location.reload();
        }, 3000); // Espera 3 segundos (3000 milisegundos) antes de recargar la página
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
