import { Component } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UsersService } from '../../../services/users.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

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
    this.user = history.state;

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
  }

  constructor(private usersService: UsersService,
    private formBuilder: FormBuilder, public router: Router, 
    private toastr: ToastrService, private domSanitizer: DomSanitizer) {}

  showDeleteModal() {
    this.deleteButton = true;
    this.modalMessage = "¿Está seguro de eliminar "+ this.user.username +"?"
    this.openCloseInfoModal();
  }

  onDeleteUser() {
    this.openCloseInfoModal();
    this.showSpinner = true;
    this.usersService.deleteUser(this.user.email).subscribe({
      error: (err: any) =>{
        this.showSpinner = false;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
      },
      next: () => {
        this.showSpinner = false;
        this.router.navigate(['/users']);
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

  /* ---------------------- ----- ---------------------- */
}
