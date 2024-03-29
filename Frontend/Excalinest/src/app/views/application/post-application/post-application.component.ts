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

  newApplication: Application = {
    title: '',
    description: '',
    bucketId: '',
    appFile: new File([], '')
  }

  constructor(private applicationService: ApplicationService, 
    private formBuilder: FormBuilder, public router: Router) {}

  getPostApplicationForm(): FormGroup {
    return this.postApplicationForm;
  }

  ngOnInit(){
    this.postApplicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  onAppFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const appfile = inputElement.files?.[0];
    if (appfile) {
      this.newApplication.appFile = appfile;
    }
  }

  onPostApplication() {
    this.newApplication.title = this.postApplicationForm.value.title;
    this.newApplication.description = this.postApplicationForm.value.description;

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
      description: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  completeForm() {
    this.validatedForm = false;
    this.postApplicationForm = this.formBuilder.group({
      title: [this.newApplication.title, Validators.required],
      description: [this.newApplication.description, Validators.required],
      zip: ['', Validators.required],
    });
  }

}