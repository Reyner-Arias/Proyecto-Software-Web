import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { Videogame } from 'src/app/models/Videogame.model';
import { UsersService } from 'src/app/services/users.service';
import { VideogamesService } from 'src/app/services/videogames.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  public deleteButton = false;
  videogames = new Array<Videogame>();
  private videojuegosDownloadsPath = "C:\\Excalinest\\";

  private videogameToDelete = "";
  user: User = {
    username: "",
    email: "",
    name: "",
    type:"",
    facebook: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenFacebook: '',
    instagram: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenInstagram: '',
    twitter: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenTwitter: '',
    facebookFile: new File([], ''),
    instaFile: new File([], ''),
    twitterFile: new File([], '')
  }

  ngOnInit() {
    this.usersService.getUser().subscribe({
      error: (err: any) =>{
        this.showSpinner = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res:User) => {
        this.user = res;

        var facebookBase64 = btoa(
          new Uint8Array(this.user.facebook.data.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        this.user.imagenFacebook = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
          this.user.facebook.tipoImagen +";base64, " + facebookBase64);
        
        var instagramBase64 = btoa(
          new Uint8Array(this.user.instagram.data.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        this.user.imagenInstagram = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
          this.user.instagram.tipoImagen +";base64, " + instagramBase64);
        
        var twitterBase64 = btoa(
          new Uint8Array(this.user.twitter.data.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        this.user.imagenTwitter = this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+ 
          this.user.twitter.tipoImagen +";base64, " + twitterBase64);

        this.videogamesService.getVideogames("", this.user.username).subscribe({
          error: (err: any) =>{
            this.error = true;
            this.modalMessage = err.error.replace(/['"]+/g, '');
            this.openCloseInfoModal();
          },
          next: (res: Array<Videogame>) => {
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
        this.showSpinner = false;
      }
    });   
    
  }

  constructor(private usersService: UsersService,
    public router: Router,  private domSanitizer: DomSanitizer,
    private videogamesService: VideogamesService) {}

  downloadFile(videojuego: Videogame) {
    this.showSpinnerDownload = true;
    let body = {
      "destPath": this.videojuegosDownloadsPath,
      "filename": videojuego.titulo+".zip"
    }
    this.videogamesService.getZipFile(body).subscribe({
      error: (err: any) => {
        this.showSpinnerDownload = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: any) => {
        this.showSpinnerDownload = false;
        this.modalMessage = res+" Excalinest coloca el archivo en C:\\Excalinest";
        this.openCloseInfoModal();
      }
    });
  }

  deleteFile(videojuego: Videogame) {
    this.videogameToDelete = videojuego._id;
    this.deleteButton = true;
    this.modalMessage = "¿Está seguro de eliminar "+ videojuego.titulo +"?"
    this.openCloseInfoModal();
  }

  onDeleteVideogame() {
    this.openCloseInfoModal();
    this.showSpinnerDelete = true;
    this.videogamesService.deleteVideogame({_id: this.videogameToDelete}).subscribe({
      error: (err: any) => {
        this.showSpinnerDelete = false;
        this.deleteButton = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: (res: any) => {
        this.showSpinnerDelete = false;
        this.router.navigate(['/dashboard']);

      }
    });   
  }


  /* --------------------- Spinner --------------------- */

  public showSpinner = true;
  public showSpinnerDownload = false;
  public showSpinnerDelete = false;

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

  /* ---------------------- ----- ---------------------- */
}
