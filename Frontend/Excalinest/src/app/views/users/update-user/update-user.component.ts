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

  private _id = "645de152a30d413db2bde610"
  private putUserForm: any;
  public validatedForm = false;
  private excalinestImgPath = "C:\\Excalinest\\img\\";
  private fakePath = "C:\\fakepath\\";

  newUser: User = {
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
    this.putUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
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
    if(this.putUserForm.value.type != "") { this.newUser.type = this.putUserForm.value.type; }
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

  isValidForm() {
    return this.putUserForm.value.username != "" ||
      this.putUserForm.value.email != "" ||
      this.putUserForm.value.name != "" ||
      this.putUserForm.value.facebook != "" ||
      this.putUserForm.value.instagram != "" ||
      this.putUserForm.value.twitter != "";
  }

  submitUser() {
    if(this.validateEmailFormat()) {
      this.validatedForm = true;
      if (this.isValidForm()) {
        this.onPutUser();
      }
    } else {
      this.error = true;
      this.modalMessage = "Error: Formato de correo electrónico no válido";
      this.openCloseInfoModal(false);
    }
  }

  validateEmailFormat() {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.putUserForm.value.email.match(emailFormat);
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
    if(!cleanForm) {
      this.completeForm();
    } else if(this.visible && cleanForm) {
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
      type: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required],
    });
  }

  completeForm() {
    this.validatedForm = false;
    this.putUserForm = this.formBuilder.group({
      username: [this.putUserForm.value.username, Validators.required],
      email: [this.putUserForm.value.email, Validators.required],
      name: [this.putUserForm.value.name, Validators.required],
      type: [this.putUserForm.value.type, Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }
}
