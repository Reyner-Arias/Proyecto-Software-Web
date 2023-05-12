import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../models/User.model'
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  private _id = "645879201d6d96be185338f0"
  private putUserForm: any;
  public validatedForm = false;
  private excalinestImgPath = "C:\\Excalinest\\img\\";
  private fakePath = "C:\\fakepath\\";

  newUser: User = {
    username: "",
    email: "",
    name: "",
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
    this.putUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required],
    });
  }

  constructor(private usersService: UsersService,
    private formBuilder: FormBuilder, public router: Router) {}

  getPutUserForm() {
    return this.putUserForm;
  }

  onPutUser() {
    if(this.putUserForm.value.username != "") { this.newUser.username = this.putUserForm.value.username; }
    if(this.putUserForm.value.email != "") { this.newUser.email = this.putUserForm.value.email; }
    if(this.putUserForm.value.name != "") { this.newUser.name = this.putUserForm.value.name; }
    if(this.putUserForm.value.facebook != "") { this.newUser.facepath = this.putUserForm.value.facebook.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putUserForm.value.instagram != "") { this.newUser.instapath = this.putUserForm.value.instagram.replace(this.fakePath, this.excalinestImgPath); }
    if(this.putUserForm.value.twitter != "") { this.newUser.twitterpath = this.putUserForm.value.twitter.replace(this.fakePath, this.excalinestImgPath); }

    this.showSpinner = true;

    this.usersService.putUser(this._id, this.newUser).subscribe({
      error: (err: any) => { 
        this.showSpinner = false;
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal(false);
      },
      next: (res: any) => {
        this.showSpinner = false;
        this.error = false;
        this.modalMessage = res.replace(/['"]+/g, '');
        this.openCloseInfoModal(true);
      }
    });
  }

  submitUser() {
    this.validatedForm = true;
    if (this.putUserForm.dirty && this.putUserForm.valid) {
      this.onPutUser();
    }
  }

  /* --------------------- Spinner --------------------- */

  public showSpinner = false;

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;
  public error = false;

  openCloseInfoModal(cleanForm: boolean) {
    this.visible = !this.visible;
    if(this.visible && cleanForm) {
      this.resetForm();
    } 
    if(!this.visible && !this.error) {
      this.router.navigate(['/users']);
    }
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

  resetForm() {
    this.validatedForm = false;
    this.putUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required],
    });
  }
}
