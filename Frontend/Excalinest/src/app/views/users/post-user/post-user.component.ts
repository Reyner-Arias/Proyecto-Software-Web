import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
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

  newUser: User = {
    username: "",
    email: "",
    name: ""
  }

  ngOnInit() {
    this.postUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  constructor(private usersService: UsersService,
    private formBuilder: FormBuilder, public router: Router) {}

  getPostUserForm() {
    return this.postUserForm;
  }

  onPostUser() {
    this.newUser.username = this.postUserForm.value.username;
    this.newUser.email = this.postUserForm.value.email;
    this.newUser.name = this.postUserForm.value.name;

    this.showSpinner = true;

    this.usersService.postUser(this.newUser).subscribe({
      error: (err: any) => { 
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
    if (this.postUserForm.dirty && this.postUserForm.valid) {
      this.onPostUser();
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
    this.postUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  
}
