import { Component, OnInit } from '@angular/core';
import { Application } from '../../../models/application.model'
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-get-applications',
  templateUrl: './get-applications.component.html',
  styleUrls: ['./get-applications.component.scss']
})
export class GetApplicationsComponent implements OnInit {

  versions = new Array<Application>();

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.applicationService.getAll().subscribe({
      error: (err: any) => { 
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: Array<Application>) => {
        this.showSpinner = false;
        if(res.length == 0) {
          this.modalMessage = "Aún no hay versiones de Excalinest - Desktop publicadas."
          this.openCloseInfoModal();
        }
        this.versions = res;
        console.log(this.versions)
      }
    });
  }

  downloadFile(version: Application) {
    this.showSpinner = true;
    let body = {
      "filename": version.title+".zip"
    }
    this.applicationService.getZipFile(body).subscribe({
      error: (err: any) => {
        this.showSpinner = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (blob: Blob) => {
        const filename = version.title+".zip";
        
        // Crear un objeto URL a partir del blob recibido
        const url = window.URL.createObjectURL(blob);
        
        // Crear un enlace temporal y simular un clic para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        // Liberar la URL temporal creada
        window.URL.revokeObjectURL(url)

        this.showSpinner = false;
      }
    });
  }

  /* --------------------- Spinner --------------------- */

  public showSpinner = false;

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;
  public error = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

}
