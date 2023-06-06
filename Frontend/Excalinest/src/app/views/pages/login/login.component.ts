import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { User } from '../../../models/User.model'
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public emailEnteredByUser = false;
  private loginUserForm: any;
  private codeUserForm: any;
  public validatedForm = false;
  private token: any;

  private code = '';

  newUser: User = {
    username: "",
    email: "",
    name: "",
    type: "",
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
    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.codeUserForm = this.formBuilder.group({
      code: ['', Validators.required],
    })
  }

  constructor(private usersService: UsersService,
    private formBuilder: FormBuilder, public router: Router) {}

  getLoginUserForm() {
    return this.loginUserForm;
  }

  getCodeUserForm() {
    return this.codeUserForm;
  }

  onMailUser() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 6; i++ ) {
      this.code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.newUser.email = this.loginUserForm.value.email;
    this.newUser.username = this.code;

    this.usersService.mail(this.newUser).subscribe({
      error: (err: any) => {
        this.showSpinner = false;
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal(false);
      },
      next: (res: any) => {
        this.showSpinner = false;
        this.error = false;
        this.modalMessage = "Se envió el código de verificación a su correo, si no le ha llegado recargue la página e inténtelo de nuevo.";
        this.openCloseInfoModal(false);
        this.emailEnteredByUser = true;
      }
    });
  }

  mail() {
    if(this.validateEmailFormat()) {
      this.showSpinner = true;

      this.usersService.login(this.loginUserForm.value.email).subscribe({
        error: (err: any) =>{
          this.showSpinner = false;
          this.modalMessage = err.error.replace(/['"]+/g, '');
          this.openCloseInfoModal(false);
        },
        next: (res) => {
          this.validatedForm = true;
          if (this.loginUserForm.dirty && this.loginUserForm.valid) {
            this.onMailUser();
            this.token = res.token;
          }
        }
      }); 
      
    } else {
      this.showSpinner = false;
      this.error = true;
      this.modalMessage = "Error: Formato de correo electrónico no válido";
      this.openCloseInfoModal(false);
    }
  }

  checkCode() {
    var input = this.codeUserForm.value.code
    var realCode = this.code;

    if (input === realCode && realCode != ''){
      this.modalMessage = "Código correcto";
      this.openCloseInfoModal(false);
      localStorage.setItem('token', this.token);
      this.router.navigate(['/videogames/get']);
    } else {
      this.error = true;
      this.modalMessage = "Error: Código incorrecto";
      this.openCloseInfoModal(false);
    }
  }

  validateEmailFormat() {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.loginUserForm.value.email.match(emailFormat);
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
      this.router.navigate(['/login']);
    }
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

  resetForm() {
    this.validatedForm = false;
    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.codeUserForm = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  completeForm() {
    this.validatedForm = false;
    this.loginUserForm = this.formBuilder.group({
      email: [this.loginUserForm.value.email, Validators.required],
    });
    this.codeUserForm = this.formBuilder.group({
      code: [this.codeUserForm.value.code, Validators.required],
    });
  }
}
