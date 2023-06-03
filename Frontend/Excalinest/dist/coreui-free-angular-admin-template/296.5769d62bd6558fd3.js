"use strict";(self.webpackChunkcoreui_free_angular_admin_template=self.webpackChunkcoreui_free_angular_admin_template||[]).push([[296],{7296:(H,h,c)=>{c.r(h),c.d(h,{VideogamesModule:()=>G});var m=c(6895),f=c(1334),n=c(433),a=c(6602),p=c(593),e=c(1571),u=c(726),_=c(1481);function b(o,s){1&o&&(e.TgZ(0,"div",8),e._UZ(1,"i",9),e.TgZ(2,"span",10),e._uU(3,"Cargando mis videojuegos..."),e.qZA()())}const Z=function(){return["/videogames/videogame"]};function T(o,s){if(1&o&&(e.TgZ(0,"c-col",11)(1,"c-card",12),e._UZ(2,"img",13),e.TgZ(3,"c-card-body")(4,"h5",14),e._uU(5),e.qZA(),e.TgZ(6,"c-row")(7,"c-col",15)(8,"button",16),e._uU(9,"Ver detalles"),e.qZA()()(),e.TgZ(10,"p",17)(11,"small",18),e._uU(12),e.qZA()()()()()),2&o){const t=s.$implicit;e.Q6J("sm",3),e.xp6(2),e.Q6J("src",t.imagen,e.LSH),e.xp6(3),e.Oqu(t.titulo),e.xp6(3),e.Q6J("routerLink",e.DdM(6,Z))("state",t),e.xp6(4),e.hij("Por ",t.usuario,"")}}const C=function(){return["/videogames/post"]};let w=(()=>{class o{constructor(t,i){this.videogamesService=t,this.domSanitizer=i,this.videogames=new Array,this.admin=!0,this.user="sirodriguez",this.showSpinner=!0,this.modalMessage="",this.modalTitle="Atenci\xf3n",this.visible=!1}ngOnInit(){this.videogamesService.getVideogames(this.admin,this.user).subscribe({error:t=>{this.modalMessage=t.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:t=>{this.showSpinner=!1,0==t.length&&(this.modalMessage="A\xfan no hay videojuegos publicados.",this.openCloseInfoModal()),t.forEach(i=>{var r=btoa(new Uint8Array(i.portada.data.data).reduce((l,d)=>l+String.fromCharCode(d),""));i.imagen=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+i.portada.tipoImagen+";base64, "+r)}),this.videogames=t}})}openCloseInfoModal(){this.visible=!this.visible}handleInfoModalChange(t){this.visible=t}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(u.l),e.Y36(_.H7))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-get-videogames"]],decls:15,vars:8,consts:[["class","fade show spinner",4,"ngIf"],[1,"row-cols-sm-2","row-cols-md-3","row-cols-lg-4"],[3,"sm",4,"ngFor","ngForOf"],["id","infoModal",3,"visible","alignment","visibleChange"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","dark",3,"routerLink"],["cButton","","color","secondary",3,"click"],[1,"fade","show","spinner"],[1,"spinner-grow","spinner-grow-sm"],[1,"m-1"],[3,"sm"],[1,"mb-4"],["cCardImg","top","height","200",2,"object-fit","cover",3,"src"],["cCardTitle",""],[1,"text-end","mb-12"],["cButton","","color","dark","size","sm",1,"mb-4",3,"routerLink","state"],["cCardText",""],[1,"text-medium-emphasis"]],template:function(t,i){1&t&&(e.YNc(0,b,4,0,"div",0),e.TgZ(1,"c-row",1),e.YNc(2,T,13,7,"c-col",2),e.qZA(),e.TgZ(3,"c-modal",3),e.NdJ("visibleChange",function(l){return i.handleInfoModalChange(l)}),e.TgZ(4,"c-modal-header")(5,"h5",4),e._uU(6),e.qZA(),e.TgZ(7,"button",5),e.NdJ("click",function(){return i.openCloseInfoModal()}),e.qZA()(),e.TgZ(8,"c-modal-body"),e._uU(9),e.qZA(),e.TgZ(10,"c-modal-footer")(11,"button",6),e._uU(12,"Publicar videojuego"),e.qZA(),e.TgZ(13,"button",7),e.NdJ("click",function(){return i.openCloseInfoModal()}),e._uU(14," Cerrar "),e.qZA()()()),2&t&&(e.Q6J("ngIf",i.showSpinner),e.xp6(2),e.Q6J("ngForOf",i.videogames),e.xp6(1),e.Q6J("visible",i.visible)("alignment","center"),e.xp6(3),e.Oqu(i.modalTitle),e.xp6(3),e.hij(" ",i.modalMessage," "),e.xp6(2),e.Q6J("routerLink",e.DdM(7,C)))},dependencies:[m.sg,m.O5,p.rH,a.AkF,a.yue,a.pce,a.PVT,a.qkm,a.iok,a.Yp0,a.Hq3,a.PFQ,a.KF4,a.YI7,a.Rbl,a.vPP,a.zS7],styles:[".spinner[_ngcontent-%COMP%]{text-align:center;padding-top:33.3333333333vh;height:50vh}"]}),o})();var x=c(1462),v=c(623),I=c(8875);function q(o,s){1&o&&(e.TgZ(0,"div",7),e._UZ(1,"i",8),e.TgZ(2,"span",9),e._uU(3,"Eliminando videojuego..."),e.qZA()())}function A(o,s){if(1&o&&(e.TgZ(0,"button",28),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.Oqu(t.name)}}const k=function(){return["/videogames/update"]};function U(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div")(1,"c-row",10)(2,"c-col",11),e._UZ(3,"img",12),e.qZA(),e.TgZ(4,"c-col",13)(5,"c-row")(6,"h1"),e._uU(7),e.qZA()(),e.TgZ(8,"c-row")(9,"h5"),e._uU(10),e.qZA()(),e.TgZ(11,"c-row",14)(12,"button",15),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.downloadFile())}),e.O4$(),e._UZ(13,"svg",16),e._uU(14,"Descargar .zip"),e.qZA()(),e.kcU(),e.TgZ(15,"c-row",17)(16,"button",18),e.O4$(),e._UZ(17,"svg",19),e._uU(18,"Editar"),e.qZA(),e.kcU(),e.TgZ(19,"button",20),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.showDeleteModal())}),e.O4$(),e._UZ(20,"svg",21),e._uU(21,"Eliminar"),e.qZA()()()(),e.kcU(),e.TgZ(22,"c-row",22)(23,"c-col",11)(24,"h5"),e._uU(25,"Tags"),e.qZA()(),e.TgZ(26,"c-col",11),e.YNc(27,A,2,1,"button",23),e.qZA()(),e.TgZ(28,"c-row",22)(29,"h5"),e._uU(30,"Sinopsis"),e.qZA()(),e.TgZ(31,"c-row",24)(32,"c-col",11)(33,"p"),e._uU(34),e.qZA()()(),e.TgZ(35,"c-row",22)(36,"h5"),e._uU(37,"Redes sociales de desarrolladores"),e.qZA()(),e.TgZ(38,"c-row",25)(39,"c-col",11)(40,"c-row",26)(41,"h6"),e._uU(42,"Facebook"),e.qZA()(),e.TgZ(43,"c-row"),e._UZ(44,"img",27),e.qZA()(),e.TgZ(45,"c-col",11)(46,"c-row",26)(47,"h6"),e._uU(48,"Instagram"),e.qZA()(),e.TgZ(49,"c-row"),e._UZ(50,"img",27),e.qZA()(),e.TgZ(51,"c-col",11)(52,"c-row",26)(53,"h6"),e._uU(54,"Twitter"),e.qZA()(),e.TgZ(55,"c-row"),e._UZ(56,"img",27),e.qZA()()()()}if(2&o){const t=e.oxw();e.xp6(2),e.Q6J("sm",4),e.xp6(1),e.Q6J("src",t.videogame.imagen,e.LSH),e.xp6(1),e.Q6J("sm",8),e.xp6(3),e.Oqu(t.videogame.titulo),e.xp6(3),e.hij("Publicado por ",t.videogame.usuario,""),e.xp6(6),e.Q6J("routerLink",e.DdM(18,k))("state",t.videogame),e.xp6(7),e.Q6J("sm",2),e.xp6(3),e.Q6J("sm",10),e.xp6(1),e.Q6J("ngForOf",t.videogameTags),e.xp6(5),e.Q6J("sm",10),e.xp6(2),e.Oqu(t.videogame.sinopsis),e.xp6(5),e.Q6J("sm",4),e.xp6(5),e.Q6J("src",t.videogame.imagenFacebook,e.LSH),e.xp6(1),e.Q6J("sm",4),e.xp6(5),e.Q6J("src",t.videogame.imagenInstagram,e.LSH),e.xp6(1),e.Q6J("sm",4),e.xp6(5),e.Q6J("src",t.videogame.imagenTwitter,e.LSH)}}function V(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"button",29),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.onDeleteVideogame())}),e._uU(1,"Eliminar"),e.qZA()}}let M=(()=>{class o{constructor(t,i,r,l,d){this.domSanitizer=t,this.router=i,this.videogamesService=r,this.tagsService=l,this.videogameTagService=d,this.excalinestDownloadsPath="C:\\Excalinest\\",this.deleteButton=!1,this.videogameTags=[{id:-1,name:""}],this.videogame={_id:"",titulo:"",usuario:"",sinopsis:"",bucketId:"",filepath:"",portada:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagen:"",imagepath:"",tags:[],facebook:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenFacebook:"",facepath:"",instagram:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenInstagram:"",instapath:"",twitter:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenTwitter:"",twitterpath:""},this.showSpinner=!1,this.modalMessage="",this.modalTitle="Atenci\xf3n",this.visible=!1,this.error=!1}getTagInfo(t){let i=[{id:-1,name:""}];return this.videogameTagService.getVideogameTags(this.videogame._id).subscribe({error:r=>{this.error=!0,this.modalMessage=r.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:r=>{this.error=!1;for(const l of r){let d=t.find(g=>g.id===l);d&&1==i.length&&-1==i[0].id&&i.splice(i.findIndex(g=>-1===g.id),1),i.push(d)}return i}}),i}ngOnInit(){this.videogame=history.state,this.tagsService.getTags().subscribe({error:d=>{this.error=!0,this.modalMessage=d.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:d=>{this.error=!1,this.videogameTags=this.getTagInfo(d)}});var t=btoa(new Uint8Array(this.videogame.portada.data.data).reduce((d,g)=>d+String.fromCharCode(g),""));this.videogame.imagen=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.portada.tipoImagen+";base64, "+t);var i=btoa(new Uint8Array(this.videogame.facebook.data.data).reduce((d,g)=>d+String.fromCharCode(g),""));this.videogame.imagenFacebook=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.facebook.tipoImagen+";base64, "+i);var r=btoa(new Uint8Array(this.videogame.instagram.data.data).reduce((d,g)=>d+String.fromCharCode(g),""));this.videogame.imagenInstagram=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.instagram.tipoImagen+";base64, "+r);var l=btoa(new Uint8Array(this.videogame.twitter.data.data).reduce((d,g)=>d+String.fromCharCode(g),""));this.videogame.imagenTwitter=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.twitter.tipoImagen+";base64, "+l)}showDeleteModal(){this.deleteButton=!0,this.modalMessage="\xbfEst\xe1 seguro de eliminar "+this.videogame.titulo+"?",this.openCloseInfoModal()}onDeleteVideogame(){this.openCloseInfoModal(),this.showSpinner=!0,this.videogamesService.deleteVideogame({_id:this.videogame._id}).subscribe({error:t=>{this.showSpinner=!1,this.deleteButton=!1,this.modalMessage=t.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:t=>{this.router.navigate(["/videogames"])}})}downloadFile(){this.videogamesService.getZipFile({destPath:this.excalinestDownloadsPath,filename:this.videogame.titulo+".zip"}).subscribe({error:i=>{this.deleteButton=!1,this.modalMessage=i.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:i=>{this.deleteButton=!1,this.modalMessage=i+" Excalinest coloca el archivo en C:\\Excalinest",this.openCloseInfoModal()}})}openCloseInfoModal(){this.visible=!this.visible}handleInfoModalChange(t){this.visible=t}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(_.H7),e.Y36(p.F0),e.Y36(u.l),e.Y36(v.i),e.Y36(I.P))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-videogame-detail"]],decls:13,vars:7,consts:[["class","fade show spinner",4,"ngIf"],[4,"ngIf"],["id","infoModal",3,"visible","alignment","visibleChange"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","danger",3,"click",4,"ngIf"],["cButton","","color","secondary",3,"click"],[1,"fade","show","spinner"],[1,"spinner-grow","spinner-grow-sm"],[1,"m-1"],[1,"row-1"],[3,"sm"],["cCardImg","top",1,"w-75","p-3","rounded","mx-auto","d-block",3,"src"],[1,"col-title",3,"sm"],[1,"col-download-button"],["cButton","","color","dark",1,"download-button",3,"click"],["cIcon","","name","cilCloudDownload",1,"me-2","icon"],[1,"d-grid","gap-2","d-md-flex","justify-content-md-end","crud-buttons"],["cButton","","color","info","size","sm",1,"crud-button",3,"routerLink","state"],["cIcon","","name","cilPencil",1,"me-2","icon"],["cButton","","color","danger","size","sm",1,"crud-button",3,"click"],["cIcon","","name","cilTrash",1,"me-2","icon"],[1,"row-title"],["cButton","","color","light","shape","rounded-pill","class","tag","disabled","",4,"ngFor","ngForOf"],[1,"justify-content-center","row-1"],[1,"row-social-net"],[1,"text-center"],["cCardImg","top",1,"w-50","p-3","rounded","mx-auto","d-block",3,"src"],["cButton","","color","light","shape","rounded-pill","disabled","",1,"tag"],["cButton","","color","danger",3,"click"]],template:function(t,i){1&t&&(e.YNc(0,q,4,0,"div",0),e.YNc(1,U,57,19,"div",1),e.TgZ(2,"c-modal",2),e.NdJ("visibleChange",function(l){return i.handleInfoModalChange(l)}),e.TgZ(3,"c-modal-header")(4,"h5",3),e._uU(5),e.qZA(),e.TgZ(6,"button",4),e.NdJ("click",function(){return i.openCloseInfoModal()}),e.qZA()(),e.TgZ(7,"c-modal-body"),e._uU(8),e.qZA(),e.TgZ(9,"c-modal-footer"),e.YNc(10,V,2,0,"button",5),e.TgZ(11,"button",6),e.NdJ("click",function(){return i.openCloseInfoModal()}),e._uU(12," Cerrar "),e.qZA()()()),2&t&&(e.Q6J("ngIf",i.showSpinner),e.xp6(1),e.Q6J("ngIf",0==i.showSpinner),e.xp6(1),e.Q6J("visible",i.visible)("alignment","center"),e.xp6(3),e.Oqu(i.modalTitle),e.xp6(3),e.hij(" ",i.modalMessage," "),e.xp6(2),e.Q6J("ngIf",i.deleteButton))},dependencies:[m.sg,m.O5,p.rH,a.pce,a.iok,a.Yp0,f.ar,a.Hq3,a.PFQ,a.KF4,a.YI7,a.Rbl,a.vPP,a.zS7],styles:[".spinner[_ngcontent-%COMP%]{text-align:center;padding-top:33.3333333333vh;height:50vh}.row-1[_ngcontent-%COMP%]{margin-top:3%}.col-title[_ngcontent-%COMP%]{padding-top:5%;padding-bottom:5%}.col-download-button[_ngcontent-%COMP%]{margin-top:5%}.download-button[_ngcontent-%COMP%]{max-width:150px;margin-left:1%}.crud-buttons[_ngcontent-%COMP%]{margin-top:4%;margin-right:10%}.crud-button[_ngcontent-%COMP%]{max-width:150px;margin-left:1%}.row-title[_ngcontent-%COMP%]{margin-left:4%;margin-top:3%}.row-social-net[_ngcontent-%COMP%]{margin-top:3%;margin-bottom:10%}.tag[_ngcontent-%COMP%]{margin-right:1%}"]}),o})();function P(o,s){1&o&&(e.TgZ(0,"div",6),e._UZ(1,"i",7),e.TgZ(2,"span",8),e._uU(3,"Publicando videojuego..."),e.qZA()())}function F(o,s){if(1&o&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.AsE(" ",t.id," - ",t.name," ")}}function J(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"select",40,41),e.NdJ("change",function(){e.CHM(t);const r=e.MAs(1),l=e.oxw(2);return e.KtG(l.addTag(r.value))}),e.YNc(2,F,2,2,"option",42),e.qZA()}if(2&o){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.listOfTags)}}function y(o,s){if(1&o&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.AsE(" ",t.id," - ",t.name," ")}}function S(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"select",43,41),e.NdJ("change",function(){e.CHM(t);const r=e.MAs(1),l=e.oxw(2);return e.KtG(l.addTag(r.value))}),e.YNc(2,y,2,2,"option",42),e.qZA()}if(2&o){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.listOfTags)}}function Q(o,s){if(1&o&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.AsE(" ",t.id," - ",t.name," ")}}function O(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"select",44,41),e.NdJ("change",function(){e.CHM(t);const r=e.MAs(1),l=e.oxw(2);return e.KtG(l.addTag(r.value))}),e.YNc(2,Q,2,2,"option",42),e.qZA()}if(2&o){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.listOfTags)}}function B(o,s){1&o&&(e.TgZ(0,"label",45),e._uU(1,"Etiqueta v\xe1lida"),e.qZA())}function z(o,s){1&o&&(e.TgZ(0,"label",46),e._uU(1,"Ingrese m\xednimo una etiqueta"),e.qZA())}function N(o,s){if(1&o&&(e.TgZ(0,"button",48),e._uU(1),e.qZA()),2&o){const t=s.$implicit;e.xp6(1),e.Oqu(t.name)}}function Y(o,s){if(1&o&&(e.TgZ(0,"c-col",31),e.YNc(1,N,2,1,"button",47),e.qZA()),2&o){const t=e.oxw(2);e.Q6J("sm",10),e.xp6(1),e.Q6J("ngForOf",t.tags)}}function E(o,s){if(1&o){const t=e.EpF();e.TgZ(0,"div")(1,"h2"),e._uU(2,"Publicar videojuego"),e.qZA(),e.TgZ(3,"form",9),e.NdJ("ngSubmit",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.submitVideogame())}),e.TgZ(4,"c-row")(5,"c-col",10)(6,"label",11),e._uU(7,"T\xedtulo"),e.qZA(),e._UZ(8,"input",12),e.TgZ(9,"c-form-feedback",13),e._uU(10,"T\xedtulo v\xe1lido"),e.qZA(),e.TgZ(11,"c-form-feedback",13),e._uU(12,"Ingrese el t\xedtulo del videojuego"),e.qZA()(),e.TgZ(13,"c-col",14)(14,"label",15),e._uU(15,"Portada"),e.qZA(),e._UZ(16,"input",16),e.TgZ(17,"c-form-feedback",13),e._uU(18,"Portada v\xe1lida"),e.qZA(),e.TgZ(19,"c-form-feedback",13),e._uU(20,"Ingrese la portada"),e.qZA()()(),e.TgZ(21,"c-row",17)(22,"c-col",14)(23,"label",18),e._uU(24,"Desarrollador"),e.qZA(),e._UZ(25,"input",19),e.TgZ(26,"c-form-feedback",13),e._uU(27,"Desarrollador v\xe1lido"),e.qZA(),e.TgZ(28,"c-form-feedback",13),e._uU(29,"Ingrese el nombre del desarrollador"),e.qZA()(),e.TgZ(30,"c-col",10)(31,"label",20),e._uU(32,"Sinopsis"),e.qZA(),e._UZ(33,"textarea",21),e.TgZ(34,"c-form-feedback",13),e._uU(35,"Sinopsis v\xe1lida"),e.qZA(),e.TgZ(36,"c-form-feedback",13),e._uU(37,"Ingrese la sinopsis"),e.qZA()()(),e.TgZ(38,"c-row",17)(39,"c-col",22)(40,"label",23),e._uU(41,"Archivo"),e.qZA(),e._UZ(42,"input",24),e.TgZ(43,"c-form-feedback",13),e._uU(44,"Archivo v\xe1lido"),e.qZA(),e.TgZ(45,"c-form-feedback",13),e._uU(46,"Ingrese el archivo"),e.qZA()()(),e.TgZ(47,"c-row",17)(48,"c-col",14)(49,"label",25),e._uU(50,"Facebook"),e.qZA(),e._UZ(51,"input",26),e.TgZ(52,"c-form-feedback",13),e._uU(53,"Archivo v\xe1lido"),e.qZA(),e.TgZ(54,"c-form-feedback",13),e._uU(55,"Ingrese el archivo"),e.qZA()(),e.TgZ(56,"c-col",14)(57,"label",27),e._uU(58,"Instagram"),e.qZA(),e._UZ(59,"input",28),e.TgZ(60,"c-form-feedback",13),e._uU(61,"Archivo v\xe1lido"),e.qZA(),e.TgZ(62,"c-form-feedback",13),e._uU(63,"Ingrese el archivo"),e.qZA()(),e.TgZ(64,"c-col",14)(65,"label",29),e._uU(66,"Twitter"),e.qZA(),e._UZ(67,"input",30),e.TgZ(68,"c-form-feedback",13),e._uU(69,"Archivo v\xe1lido"),e.qZA(),e.TgZ(70,"c-form-feedback",13),e._uU(71,"Ingrese el archivo"),e.qZA()()(),e.TgZ(72,"c-row",17)(73,"c-col",31)(74,"label",32),e._uU(75,"Tags"),e.qZA()(),e.TgZ(76,"c-col",31),e.YNc(77,J,3,1,"select",33),e.YNc(78,S,3,1,"select",34),e.YNc(79,O,3,1,"select",35),e.YNc(80,B,2,0,"label",36),e.YNc(81,z,2,0,"label",37),e.qZA(),e.YNc(82,Y,2,2,"c-col",38),e.qZA(),e.TgZ(83,"c-row",17)(84,"c-col",14)(85,"button",39),e._uU(86," Publicar "),e.qZA()()()()()}if(2&o){const t=e.oxw();e.xp6(3),e.Q6J("formGroup",t.getPostVideogameForm())("validated",t.validatedForm),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(7),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(7),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(7),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(3),e.Q6J("sm",2),e.xp6(3),e.Q6J("sm",10),e.xp6(1),e.Q6J("ngIf",0==t.validatedForm),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1==t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1!=t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1!=t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1==t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1!=t.tags.length||-1!=t.tags[0].id)}}const j=[{path:"",redirectTo:"get",pathMatch:"full"},{path:"",data:{title:"Videojuegos"},children:[{path:"",pathMatch:"full",redirectTo:"colors"},{path:"update",component:x.G,data:{title:"Editar videojuego"}},{path:"get",component:w,data:{title:"Mis videojuegos"}},{path:"post",component:(()=>{class o{constructor(t,i,r,l){this.videogamesService=t,this.formBuilder=i,this.router=r,this.tagsService=l,this.validatedForm=!1,this.excalinestImgPath="C:\\Excalinest\\img\\",this.excalinestBuildsPath="C:\\Excalinest\\builds\\",this.fakePath="C:\\fakepath\\",this.listOfTags=[{id:-1,name:""}],this.tags=[{id:-1,name:""}],this.newVideogame={_id:"",titulo:"",usuario:"",sinopsis:"",bucketId:"",filepath:"",portada:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagen:"",imagepath:"",tags:[],facebook:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenFacebook:"",facepath:"",instagram:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenInstagram:"",instapath:"",twitter:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenTwitter:"",twitterpath:""},this.showSpinner=!1,this.modalMessage="",this.modalTitle="Atenci\xf3n",this.visible=!1,this.error=!1}getPostVideogameForm(){return this.postVideogameForm}ngOnInit(){this.postVideogameForm=this.formBuilder.group({title:["",n.kI.required],developer:["",n.kI.required],sinopsis:["",n.kI.required],cover:["",n.kI.required],zip:["",n.kI.required],facebook:["",n.kI.required],instagram:["",n.kI.required],twitter:["",n.kI.required]}),this.tagsService.getTags().subscribe({error:t=>{this.error=!0,this.modalMessage=t.error.replace(/['"]+/g,""),this.openCloseInfoModal(!1)},next:t=>{this.error=!1,this.listOfTags=t}})}addTag(t){let i=parseInt(t.split(" - ")[0]),r=t.split(" - ")[1];this.tags.find(l=>l.id===i)?(1==this.tags.length&&-1!=this.tags[0].id&&this.tags.push({id:-1,name:""}),this.tags.splice(this.tags.findIndex(l=>l.id===i),1)):(1==this.tags.length&&-1==this.tags[0].id&&this.tags.splice(this.tags.findIndex(l=>-1===l.id),1),this.tags.push({id:i,name:r}))}playAudio(){let t=new Audio;t.src="../../../../assets/audio/success.mp3",t.load(),t.play()}onPostVideogame(){this.newVideogame.titulo=this.postVideogameForm.value.title,this.newVideogame.usuario=this.postVideogameForm.value.developer,this.newVideogame.sinopsis=this.postVideogameForm.value.sinopsis,this.newVideogame.imagepath=this.postVideogameForm.value.cover.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.filepath=this.postVideogameForm.value.zip.replace(this.fakePath,this.excalinestBuildsPath),this.newVideogame.facepath=this.postVideogameForm.value.facebook.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.instapath=this.postVideogameForm.value.instagram.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.twitterpath=this.postVideogameForm.value.twitter.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.tags=this.tags.map(({id:t})=>t),this.showSpinner=!0,this.videogamesService.postVideogame(this.newVideogame).subscribe({error:t=>{this.showSpinner=!1,this.error=!0,this.modalMessage=t.error.replace(/['"]+/g,""),this.openCloseInfoModal(!1)},next:t=>{this.playAudio(),this.showSpinner=!1,this.error=!1,this.modalMessage=t.replace(/['"]+/g,""),this.openCloseInfoModal(!0)}})}submitVideogame(){this.validatedForm=!0,this.postVideogameForm.dirty&&this.postVideogameForm.valid&&(1!=this.tags.length||-1!=this.tags[0].id)&&this.onPostVideogame()}openCloseInfoModal(t){this.visible=!this.visible,t?this.visible&&t&&this.resetForm():this.completeForm(),!this.visible&&!this.error&&this.router.navigate(["/videogames"])}handleInfoModalChange(t){this.visible=t}resetForm(){this.validatedForm=!1,this.postVideogameForm=this.formBuilder.group({title:["",n.kI.required],developer:["",n.kI.required],sinopsis:["",n.kI.required],cover:["",n.kI.required],zip:["",n.kI.required],facebook:["",n.kI.required],instagram:["",n.kI.required],twitter:["",n.kI.required]})}completeForm(){this.validatedForm=!1,this.postVideogameForm=this.formBuilder.group({title:[this.newVideogame.titulo,n.kI.required],developer:[this.newVideogame.usuario,n.kI.required],sinopsis:[this.newVideogame.sinopsis,n.kI.required],cover:["",n.kI.required],zip:["",n.kI.required],facebook:["",n.kI.required],instagram:["",n.kI.required],twitter:["",n.kI.required]})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(u.l),e.Y36(n.qu),e.Y36(p.F0),e.Y36(v.i))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-post-videogame"]],decls:12,vars:6,consts:[["class","fade show spinner",4,"ngIf"],[4,"ngIf"],["id","infoModal",3,"visible","alignment","visibleChange"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","secondary",3,"click"],[1,"fade","show","spinner"],[1,"spinner-grow","spinner-grow-sm"],[1,"m-1"],["cForm","",1,"row","g-3","needs-validation",3,"formGroup","validated","ngSubmit"],["md","8"],["cLabel","","for","title"],["cFormControl","","id","title","formControlName","title","required","","type","text"],[3,"valid"],["md","4"],["cLabel","","for","cover"],["cFormControl","","id","cover","formControlName","cover","accept","image/png, image/jpeg","required","","type","file"],[1,"row"],["cLabel","","for","developer"],["cFormControl","","id","developer","formControlName","developer","required","","type","text"],["cLabel","","for","sinopsis"],["cFormControl","","id","sinopsis","formControlName","sinopsis","required","","type","text"],["md","12"],["cLabel","","for","zip"],["cFormControl","","id","zip","formControlName","zip","accept","application/zip","required","","type","file"],["cLabel","","for","facebook"],["cFormControl","","id","facebook","formControlName","facebook","accept","image/png, image/jpeg","required","","type","file"],["cLabel","","for","instagram"],["cFormControl","","id","instagram","formControlName","instagram","accept","image/png, image/jpeg","required","","type","file"],["cLabel","","for","twitter"],["cFormControl","","id","twitter","formControlName","twitter","accept","image/png, image/jpeg","required","","type","file"],[1,"columns-tags",3,"sm"],["cLabel","","for","tags"],["cSelect","","size","3","sizing","md","class","tag-picker",3,"change",4,"ngIf"],["cSelect","","size","3","sizing","md","style","border: 1px solid #e55353;",3,"change",4,"ngIf"],["cSelect","","size","3","sizing","md","style","border: 1px solid #2eb85c;",3,"change",4,"ngIf"],["style","margin-top: 0.25rem; font-size: 0.875em; color: #2eb85c;",4,"ngIf"],["style","margin-top: 0.25rem; font-size: 0.875em; color: #e55353;",4,"ngIf"],["class","columns-tags",3,"sm",4,"ngIf"],["cButton","","color","primary","type","submit",1,"update-button","row-margin-bottom"],["cSelect","","size","3","sizing","md",1,"tag-picker",3,"change"],["selectTags",""],[4,"ngFor","ngForOf"],["cSelect","","size","3","sizing","md",2,"border","1px solid #e55353",3,"change"],["cSelect","","size","3","sizing","md",2,"border","1px solid #2eb85c",3,"change"],[2,"margin-top","0.25rem","font-size","0.875em","color","#2eb85c"],[2,"margin-top","0.25rem","font-size","0.875em","color","#e55353"],["cButton","","color","light","shape","rounded-pill","class","tag","disabled","",4,"ngFor","ngForOf"],["cButton","","color","light","shape","rounded-pill","disabled","",1,"tag"]],template:function(t,i){1&t&&(e.YNc(0,P,4,0,"div",0),e.YNc(1,E,87,26,"div",1),e.TgZ(2,"c-modal",2),e.NdJ("visibleChange",function(l){return i.handleInfoModalChange(l)}),e.TgZ(3,"c-modal-header")(4,"h5",3),e._uU(5),e.qZA(),e.TgZ(6,"button",4),e.NdJ("click",function(){return i.openCloseInfoModal(!1)}),e.qZA()(),e.TgZ(7,"c-modal-body"),e._uU(8),e.qZA(),e.TgZ(9,"c-modal-footer")(10,"button",5),e.NdJ("click",function(){return i.openCloseInfoModal(!1)}),e._uU(11," Cerrar "),e.qZA()()()),2&t&&(e.Q6J("ngIf",i.showSpinner),e.xp6(1),e.Q6J("ngIf",0==i.showSpinner),e.xp6(1),e.Q6J("visible",i.visible)("alignment","center"),e.xp6(3),e.Oqu(i.modalTitle),e.xp6(3),e.hij(" ",i.modalMessage," "))},dependencies:[m.sg,m.O5,a.iok,a.Yp0,a.$_X,a.oHf,a.dCl,a.eFW,a.nqR,a.Hq3,a.PFQ,n._Y,n.YN,n.Kr,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u,a.KF4,a.YI7,a.Rbl,a.vPP,a.zS7],styles:[".spinner[_ngcontent-%COMP%]{text-align:center;padding-top:33.3333333333vh;height:50vh}.update-button[_ngcontent-%COMP%]{width:100%}.row[_ngcontent-%COMP%]{margin-top:2%}.row-margin-bottom[_ngcontent-%COMP%]{margin-bottom:10%}.columns-tags[_ngcontent-%COMP%]{margin-top:2%;margin-bottom:3%}.tag[_ngcontent-%COMP%]{margin-right:1%}.tag-picker[_ngcontent-%COMP%]{border:1px solid #b1b7c1}"]}),o})(),data:{title:"Publicar videojuego"}},{path:"videogame",component:M,data:{title:"Detalles del videojuego"}}]}];let L=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[p.Bz.forChild(j),p.Bz]}),o})(),G=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[m.ez,L,a.dTQ,a.zE6,a.gzQ,f.QX,a.dGk,a.P4_,a.ejP,a.hJ1,n.u5,n.UX,a.ga2,a.kWm,a.m81,a.Xo8,a.zkK]}),o})()}}]);