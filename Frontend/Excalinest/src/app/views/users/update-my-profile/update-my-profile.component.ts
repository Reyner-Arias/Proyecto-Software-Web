import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-my-profile',
  templateUrl: './update-my-profile.component.html',
  styleUrls: ['./update-my-profile.component.scss']
})
export class UpdateMyProfileComponent {
  private _id = "";
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
    instagram: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenInstagram: '',
    twitter: {data: {data: new ArrayBuffer(0), type: ''}, tipoImagen: ''},
    imagenTwitter: '',
    facebookFile: new File([], ''),
    instaFile: new File([], ''),
    twitterFile: new File([], '')
  }

  ngOnInit() {
    this._id = history.state._id;
    this.newUser.username = history.state.username;
    this.newUser.email = history.state.email;
    this.newUser.name = history.state.name;
    this.newUser.type = history.state.type;

    this.putUserForm = this.formBuilder.group({
      username: [this.newUser.username, Validators.required],
      email: [this.newUser.email, Validators.required],
      name: [this.newUser.name, Validators.required],
      type: [this.newUser.type, Validators.required],
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

  onFacebookFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const facebookFile = inputElement.files?.[0];
    if (facebookFile) {
      this.newUser.facebookFile = facebookFile;
    }
  }

  onInstagramFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const instaFile = inputElement.files?.[0];
    if (instaFile) {
      this.newUser.instaFile = instaFile;
    }
  }

  onTwitterFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const twitterFile = inputElement.files?.[0];
    if (twitterFile) {
      this.newUser.twitterFile = twitterFile;
    }
  }

  onPutUser() {
    if(this.putUserForm.value.username != "") { this.newUser.username = this.putUserForm.value.username; }
    if(this.putUserForm.value.email != "") { this.newUser.email = this.putUserForm.value.email; }
    if(this.putUserForm.value.name != "") { this.newUser.name = this.putUserForm.value.name; }
    if(this.putUserForm.value.type != "") {this.newUser.type = '';}

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
    return this.putUserForm.value.email == '' || this.putUserForm.value.email.match(emailFormat);
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
      this.router.navigate(['users/profile']);
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
