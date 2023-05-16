import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Application } from '../../../models/application.model'
import { ApplicationService } from '../../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-application',
  templateUrl: './post-application.component.html',
  styleUrls: ['./post-application.component.scss']
})
export class PostApplicationComponent implements OnInit {

  private postApplicationForm: FormGroup = new FormGroup({});
  public validatedForm = false;

  private excalinestAppPath = "C:\\Excalinest\\app\\";
  private fakePath = "C:\\fakepath\\";

  newApplication: Application = {
    title: '',
    filepath: '',
    bucketId: ''
  }

  constructor(private applicationService: ApplicationService, 
    private formBuilder: FormBuilder, public router: Router) {}

  getPostApplicationForm(): FormGroup {
    return this.postApplicationForm;
  }

  ngOnInit(){
    this.postApplicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  onPostApplication() {
    this.newApplication.title = this.postApplicationForm.value.title;
    this.newApplication.filepath = this.postApplicationForm.value.zip.replace(this.fakePath, this.excalinestAppPath);

    console.log(this.newApplication)

    this.showSpinner = true;

    this.applicationService.postApplication(this.newApplication).subscribe({
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
  
  submitApplication() {
    this.validatedForm = true;
    if (this.postApplicationForm.dirty && this.postApplicationForm.valid) {
      this.onPostApplication();
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
    if(!cleanForm) {
      this.completeForm();
    } else if(this.visible && cleanForm) {
      this.resetForm();
    }
    if(!this.visible && !this.error) {
      this.router.navigate(['/applications']);
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
      zip: ['', Validators.required],
    });
  }

  completeForm() {
    this.validatedForm = false;
    this.postApplicationForm = this.formBuilder.group({
      title: [this.newApplication.title, Validators.required],
      zip: ['', Validators.required],
    });
  }

}