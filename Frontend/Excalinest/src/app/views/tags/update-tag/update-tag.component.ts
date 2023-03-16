import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../../../models/tag.model'
import { TagsService } from '../../../services/tags.service';

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
    private formBuilder: FormBuilder) {
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
      console.log(params);
      this.tagId = params['tag'];
      console.log(this.tagId);
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
    console.log(this.updatedTag);

    this.TagsService.putTag(id, this.updatedTag).subscribe({
      error: (err: any) => { 
        this.modalMessage = err;
        this.openCloseInfoModal();
      },
      next: (res: any) => {
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
  public modalTitle = "Actualización de etiqueta";
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
    this.updateTagForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

}
