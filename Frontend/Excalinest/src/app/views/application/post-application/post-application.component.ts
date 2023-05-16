import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Application } from '../../../models/application.model'

@Component({
  selector: 'app-post-application',
  templateUrl: './post-application.component.html',
  styleUrls: ['./post-application.component.scss']
})
export class PostApplicationComponent implements OnInit {
  private postApplicationForm: FormGroup = new FormGroup({});
  public validatedForm = false;

  newApplication: Application = {
    title: '',
    filepath: '',
    bucketId: ''
  }

  constructor(private formBuilder: FormBuilder) {}

  getPostApplicationForm(): FormGroup {
    return this.postApplicationForm;
  }

  ngOnInit(){
    this.postApplicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      filepath: ['', Validators.required]
    });
  }

  onPostApplication() {
    
  }
  
  submitApplication() {
    this.validatedForm = true;
    if (this.postApplicationForm.dirty && this.postApplicationForm.valid) {
      this.onPostApplication();
    }
  }

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
    if(!this.visible) {
      this.resetForm();
    }
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

  resetForm() {
    this.validatedForm = false;
    this.postApplicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      filepath: ['', Validators.required],
    });
  }

}