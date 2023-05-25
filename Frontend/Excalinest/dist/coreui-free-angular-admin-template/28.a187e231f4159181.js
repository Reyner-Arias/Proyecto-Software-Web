"use strict";(self.webpackChunkcoreui_free_angular_admin_template=self.webpackChunkcoreui_free_angular_admin_template||[]).push([[28],{8028:(M,m,s)=>{s.r(m),s.d(m,{TagsModule:()=>C});var g=s(6895),u=s(1334),i=s(433),e=s(6602),d=s(593),c=s(8600),t=s(1571),p=s(623);const f=[{path:"",redirectTo:"get",pathMatch:"full"},{path:"",data:{title:"Etiquetas"},children:[{path:"",pathMatch:"full",redirectTo:"colors"},{path:"post",component:(()=>{class o{constructor(n,a){this.TagsService=n,this.formBuilder=a,this.postTagForm=new i.cw({}),this.validatedForm=!1,this.newTag={id:-1,name:""},this.modalMessage="",this.modalTitle="Atenci\xf3n",this.visible=!1}getPostTagForm(){return this.postTagForm}ngOnInit(){this.postTagForm=this.formBuilder.group({name:["",i.kI.required]})}onPostTag(){this.TagsService.getMaxId().subscribe(n=>{this.newTag.id=n+1,this.newTag.name=this.postTagForm.value.name,this.TagsService.postTag(this.newTag).subscribe({error:a=>{this.modalMessage=a.error.replace(/['"]+/g,""),this.openCloseInfoModal(),this.resetForm()},next:a=>{this.modalMessage=a,this.openCloseInfoModal()}})})}submitTag(){this.validatedForm=!0,this.postTagForm.dirty&&this.postTagForm.valid&&this.onPostTag()}openCloseInfoModal(){this.visible=!this.visible,this.visible||this.resetForm()}handleInfoModalChange(n){this.visible=n}resetForm(){this.validatedForm=!1,this.postTagForm=this.formBuilder.group({name:["",i.kI.required]})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(p.i),t.Y36(i.qu))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-post-tag"]],decls:26,vars:8,consts:[["cForm","",1,"row","g-3","needs-validation",3,"formGroup","validated","ngSubmit"],["md","4"],["cLabel","","for","name"],["cFormControl","","id","name","formControlName","name","required","","type","text"],[3,"valid"],[1,"row"],["cButton","","color","primary","type","submit",1,"update-button","row-margin-bottom"],["id","infoModal",3,"visible","alignment","visibleChange"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","secondary",3,"click"]],template:function(n,a){1&n&&(t.TgZ(0,"h2"),t._uU(1,"Crear etiqueta"),t.qZA(),t.TgZ(2,"form",0),t.NdJ("ngSubmit",function(){return a.submitTag()}),t.TgZ(3,"c-row")(4,"c-col",1)(5,"label",2),t._uU(6,"Nombre de la etiqueta"),t.qZA(),t._UZ(7,"input",3),t.TgZ(8,"c-form-feedback",4),t._uU(9,"Nombre de etiqueta v\xe1lido"),t.qZA(),t.TgZ(10,"c-form-feedback",4),t._uU(11,"Ingrese el nombre de etiqueta"),t.qZA()()(),t.TgZ(12,"c-row",5)(13,"c-col",1)(14,"button",6),t._uU(15," Crear "),t.qZA()()()(),t.TgZ(16,"c-modal",7),t.NdJ("visibleChange",function(b){return a.handleInfoModalChange(b)}),t.TgZ(17,"c-modal-header")(18,"h5",8),t._uU(19),t.qZA(),t.TgZ(20,"button",9),t.NdJ("click",function(){return a.openCloseInfoModal()}),t.qZA()(),t.TgZ(21,"c-modal-body"),t._uU(22),t.qZA(),t.TgZ(23,"c-modal-footer")(24,"button",10),t.NdJ("click",function(){return a.openCloseInfoModal()}),t._uU(25," Cerrar "),t.qZA()()()),2&n&&(t.xp6(2),t.Q6J("formGroup",a.getPostTagForm())("validated",a.validatedForm),t.xp6(6),t.Q6J("valid",!0),t.xp6(2),t.Q6J("valid",!1),t.xp6(6),t.Q6J("visible",a.visible)("alignment","center"),t.xp6(3),t.Oqu(a.modalTitle),t.xp6(3),t.Oqu(a.modalMessage))},dependencies:[e.iok,e.Yp0,e.$_X,e.oHf,e.dCl,e.eFW,e.Hq3,e.PFQ,i._Y,i.Fj,i.JJ,i.JL,i.Q7,i.sg,i.u,e.KF4,e.YI7,e.Rbl,e.vPP,e.zS7],styles:[".spinner[_ngcontent-%COMP%]{text-align:center;padding-top:33.3333333333vh;height:50vh}.update-button[_ngcontent-%COMP%]{width:100%}.row[_ngcontent-%COMP%]{margin-top:2%}.row-margin-bottom[_ngcontent-%COMP%]{margin-bottom:10%}"]}),o})(),data:{title:"Crear etiqueta"}},{path:"update",component:s(2079).f,data:{title:"Actualizar etiqueta"}},{path:"get",component:c.W,data:{title:"Etiquetas"}}]}];let v=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[d.Bz.forChild(f),d.Bz]}),o})(),C=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[g.ez,v,e.dTQ,e.zE6,e.gzQ,u.QX,e.dGk,e.P4_,e.ejP,e.hJ1,i.u5,i.UX,e.ga2,e.kWm,e.m81,e.Xo8,e.zkK]}),o})()}}]);