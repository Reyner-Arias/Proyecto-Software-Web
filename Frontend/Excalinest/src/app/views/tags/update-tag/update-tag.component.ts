import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../../../models/tag.model'
import { TagsService } from '../../../services/tags.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.scss']
})
export class UpdateTagComponent implements OnInit {
  tagId: number;
  private updateTagForm: FormGroup = new FormGroup({});
  public validatedForm = false;

  updatedTag: Tag = {
    id: -1,
    name: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute, 
    private TagsService: TagsService, 
    private formBuilder: FormBuilder,
    public router: Router) {
    this.tagId = -1;
    this.updateTagForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  getUpdateTagForm(): FormGroup {
    return this.updateTagForm;
  }

  ngOnInit(): void {
    
    this.updateTagForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  
    this.activatedRoute.queryParams.subscribe(params => {
      this.tagId = params['tag'];
      this.TagsService.getTag(this.tagId).subscribe(tag => {
        this.updateTagForm.setValue({
          name: tag.name
        });
      });
    });
    
  }
  
  onUpdateTag() {
    const id = +this.tagId;
    this.updatedTag.id = id;
    this.updatedTag.name = this.updateTagForm.value.name;

    this.TagsService.putTag(id, this.updatedTag).subscribe({
      error: (err: any) => { 
        this.error = true;
        this.modalMessage = err.error.replace(/['"]+/g, '');
        this.openCloseInfoModal();
        this.resetForm();
      },
      next: (res: any) => {
        this.error = false;
        this.modalMessage = res;
        this.openCloseInfoModal();
      }
    });
  }
  
  updateTag() {
    this.validatedForm = true;
    if (this.updateTagForm.dirty && this.updateTagForm.valid) {
      this.onUpdateTag();
    }
  }

  /* ---------------------- Modal ---------------------- */

  public modalMessage = "";
  public modalTitle = "Atención";
  public visible = false;
  public error = false;

  openCloseInfoModal() {
    this.visible = !this.visible;
    if(!this.visible) {
      this.resetForm();
    }
    if(!this.visible && !this.error) {
      this.router.navigate(['/tags']);
    }
  }

  handleInfoModalChange(event: any) {
    this.visible = event;
  }

  /* ---------------------- ----- ---------------------- */

  resetForm() {
    this.validatedForm = false;
    this.updateTagForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

}
