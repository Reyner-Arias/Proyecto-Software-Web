import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { User } from '../../../models/User.model'
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss']
})
export class PostUserComponent implements OnInit {

  private postUserForm: any;
  public validatedForm = false;
  private excalinestImgPath = "C:\\Excalinest\\img\\";
  private fakePath = "C:\\fakepath\\";

  newUser: User = {
    username: "",
    email: "",
    name: "",
    type: "",
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
    this.postUserForm = this.formBuilder.group({
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

  getPostUserForm() {
    return this.postUserForm;
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

  onPostUser() {
    this.newUser.username = this.postUserForm.value.username;
    this.newUser.email = this.postUserForm.value.email;
    this.newUser.name = this.postUserForm.value.name;
    this.newUser.type = this.postUserForm.value.type;
    
    this.showSpinner = true;

    this.usersService.postUser(this.newUser).subscribe({
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
    if(this.validateEmailFormat()) {
      this.validatedForm = true;
      if (this.postUserForm.dirty && this.postUserForm.valid) {
        this.onPostUser();
      }
    } else {
      this.error = true;
      this.modalMessage = "Error: Formato de correo electrónico no válido";
      this.openCloseInfoModal(false);
    }
  }

  validateEmailFormat() {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.postUserForm.value.email.match(emailFormat);
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
    this.postUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }

  completeForm() {
    this.validatedForm = false;
    this.postUserForm = this.formBuilder.group({
      username: [this.postUserForm.value.username, Validators.required],
      email: [this.postUserForm.value.email, Validators.required],
      name: [this.postUserForm.value.name, Validators.required],
      type: [this.postUserForm.value.type, Validators.required],
      facebook: ['', Validators.required],
      instagram: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }
  
}
