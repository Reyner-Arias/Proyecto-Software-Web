import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from '../../../models/tag.model'
import { TagsService } from '../../../services/tags.service';

@Component({
  selector: 'app-post-tag',
  templateUrl: './post-tag.component.html',
  styleUrls: ['./post-tag.component.scss']
})
export class PostTagComponent implements OnInit {

  private postTagForm: FormGroup = new FormGroup({});
  public validatedForm = false;

  newTag: Tag = {
    id: -1,
    name: ''
  }

  constructor(private TagsService: TagsService,
    private formBuilder: FormBuilder) {}

  getPostTagForm(): FormGroup {
    return this.postTagForm;
  }

  ngOnInit(){
    this.postTagForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onPostTag() {
    this.TagsService.getMaxId().subscribe((response) => {
      this.newTag.id = response + 1;
      this.newTag.name = this.postTagForm.value.name;

      this.TagsService.postTag(this.newTag).subscribe({
        error: (err: any) => { 
          this.modalMessage = err.error.replace(/['"]+/g, '');
          this.openCloseInfoModal();
        },
        next: (res: any) => {
          this.modalMessage = res;
          this.openCloseInfoModal();
        }
      });
    });
  }
  
  submitTag() {
    this.validatedForm = true;
    if (this.postTagForm.dirty && this.postTagForm.valid) {
      this.onPostTag();
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
    this.postTagForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

}
