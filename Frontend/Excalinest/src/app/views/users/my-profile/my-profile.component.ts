import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  public deleteButton = false;

  user: User = {
    username: "",
    email: "",
    name: "",
    type:"",
    facebook: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenFacebook: '',
    facepath: '',
    instagram: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenInstagram: '',
    instapath: '',
    twitter: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenTwitter: '',
    twitterpath: '',
  }

  ngOnInit() {
    let email = "mhidalgos0708@gmail.com";
    this.usersService.getUser(email).subscribe({
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

        this.showSpinner = false;
      }
    });   
    
  }

  constructor(private usersService: UsersService,
    public router: Router,  private domSanitizer: DomSanitizer) {}


  /* --------------------- Spinner --------------------- */

  public showSpinner = true;

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
