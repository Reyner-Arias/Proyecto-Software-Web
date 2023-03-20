"use strict";(self.webpackChunkcoreui_free_angular_admin_template=self.webpackChunkcoreui_free_angular_admin_template||[]).push([[296],{7296:(L,b,d)=>{d.r(b),d.d(b,{VideogamesModule:()=>u});var c=d(6895),Z=d(1334),s=d(433),a=d(6602),m=d(593),e=d(1571),v=d(726),T=d(1481);function C(i,o){1&i&&(e.TgZ(0,"div",8),e._UZ(1,"i",9),e.TgZ(2,"span",10),e._uU(3,"Cargando mis videojuegos..."),e.qZA()())}const w=function(){return["/videogames/videogame"]};function x(i,o){if(1&i&&(e.TgZ(0,"c-col",11)(1,"c-card",12),e._UZ(2,"img",13),e.TgZ(3,"c-card-body")(4,"h5",14),e._uU(5),e.qZA(),e.TgZ(6,"c-row")(7,"c-col",15)(8,"button",16),e._uU(9,"Ver detalles"),e.qZA()()(),e.TgZ(10,"p",17)(11,"small",18),e._uU(12),e.qZA()()()()()),2&i){const t=o.$implicit;e.Q6J("sm",3),e.xp6(2),e.Q6J("src",t.imagen,e.LSH),e.xp6(3),e.Oqu(t.titulo),e.xp6(3),e.Q6J("routerLink",e.DdM(6,w))("state",t),e.xp6(4),e.hij("Por ",t.usuario,"")}}const I=function(){return["/videogames/post"]};class h{constructor(o,t){this.videogamesService=o,this.domSanitizer=t,this.videogames=new Array,this.admin=!0,this.user="sirodriguez",this.showSpinner=!0,this.modalMessage="",this.modalTitle="Atenci\xf3n",this.visible=!1}ngOnInit(){this.videogamesService.getVideogames(this.admin,this.user).subscribe({error:o=>{this.modalMessage=o.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:o=>{this.showSpinner=!1,0==o.length&&(this.modalMessage="A\xfan no hay videojuegos publicados.",this.openCloseInfoModal()),o.forEach(t=>{var r=btoa(new Uint8Array(t.portada.data.data).reduce((n,l)=>n+String.fromCharCode(l),""));t.imagen=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+t.portada.tipoImagen+";base64, "+r)}),this.videogames=o}})}openCloseInfoModal(){this.visible=!this.visible}handleInfoModalChange(o){this.visible=o}}h.\u0275fac=function(o){return new(o||h)(e.Y36(v.l),e.Y36(T.H7))},h.\u0275cmp=e.Xpm({type:h,selectors:[["app-get-videogames"]],decls:15,vars:8,consts:[["class","fade show spinner",4,"ngIf"],[1,"row-cols-sm-2","row-cols-md-3","row-cols-lg-4"],[3,"sm",4,"ngFor","ngForOf"],["id","infoModal",3,"visible","alignment","visibleChange"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","dark",3,"routerLink"],["cButton","","color","secondary",3,"click"],[1,"fade","show","spinner"],[1,"spinner-grow","spinner-grow-sm"],[1,"m-1"],[3,"sm"],[1,"mb-4"],["cCardImg","top","height","200",2,"object-fit","cover",3,"src"],["cCardTitle",""],[1,"text-end","mb-12"],["cButton","","color","dark","size","sm",1,"mb-4",3,"routerLink","state"],["cCardText",""],[1,"text-medium-emphasis"]],template:function(o,t){1&o&&(e.YNc(0,C,4,0,"div",0),e.TgZ(1,"c-row",1),e.YNc(2,x,13,7,"c-col",2),e.qZA(),e.TgZ(3,"c-modal",3),e.NdJ("visibleChange",function(n){return t.handleInfoModalChange(n)}),e.TgZ(4,"c-modal-header")(5,"h5",4),e._uU(6),e.qZA(),e.TgZ(7,"button",5),e.NdJ("click",function(){return t.openCloseInfoModal()}),e.qZA()(),e.TgZ(8,"c-modal-body"),e._uU(9),e.qZA(),e.TgZ(10,"c-modal-footer")(11,"button",6),e._uU(12,"Publicar videojuego"),e.qZA(),e.TgZ(13,"button",7),e.NdJ("click",function(){return t.openCloseInfoModal()}),e._uU(14," Cerrar "),e.qZA()()()),2&o&&(e.Q6J("ngIf",t.showSpinner),e.xp6(2),e.Q6J("ngForOf",t.videogames),e.xp6(1),e.Q6J("visible",t.visible)("alignment","center"),e.xp6(3),e.Oqu(t.modalTitle),e.xp6(3),e.hij(" ",t.modalMessage," "),e.xp6(2),e.Q6J("routerLink",e.DdM(7,I)))},dependencies:[c.sg,c.O5,m.rH,a.AkF,a.yue,a.pce,a.PVT,a.qkm,a.iok,a.Yp0,a.Hq3,a.PFQ,a.KF4,a.YI7,a.Rbl,a.vPP,a.zS7],styles:[".spinner[_ngcontent-%COMP%]{text-align:center;padding-top:33.3333333333vh;height:50vh}"]});var A=d(1462);function q(i,o){1&i&&(e.TgZ(0,"div",7),e._UZ(1,"i",8),e.TgZ(2,"span",9),e._uU(3,"Eliminando videojuego..."),e.qZA()())}function k(i,o){if(1&i&&(e.TgZ(0,"button",28),e._uU(1),e.qZA()),2&i){const t=o.$implicit;e.xp6(1),e.Oqu(t.name)}}const U=function(){return["/videogames/update"]};function M(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"div")(1,"c-row",10)(2,"c-col",11),e._UZ(3,"img",12),e.qZA(),e.TgZ(4,"c-col",13)(5,"c-row")(6,"h1"),e._uU(7),e.qZA()(),e.TgZ(8,"c-row")(9,"h5"),e._uU(10),e.qZA()(),e.TgZ(11,"c-row",14)(12,"button",15),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.downloadFile())}),e.O4$(),e._UZ(13,"svg",16),e._uU(14,"Descargar .zip"),e.qZA()(),e.kcU(),e.TgZ(15,"c-row",17)(16,"button",18),e.O4$(),e._UZ(17,"svg",19),e._uU(18,"Modificar"),e.qZA(),e.kcU(),e.TgZ(19,"button",20),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.showDeleteModal())}),e.O4$(),e._UZ(20,"svg",21),e._uU(21,"Eliminar"),e.qZA()()()(),e.kcU(),e.TgZ(22,"c-row",22)(23,"c-col",11)(24,"h5"),e._uU(25,"Tags"),e.qZA()(),e.TgZ(26,"c-col",11),e.YNc(27,k,2,1,"button",23),e.qZA()(),e.TgZ(28,"c-row",22)(29,"h5"),e._uU(30,"Sinopsis"),e.qZA()(),e.TgZ(31,"c-row",24)(32,"c-col",11)(33,"p"),e._uU(34),e.qZA()()(),e.TgZ(35,"c-row",22)(36,"h5"),e._uU(37,"Redes sociales de desarrolladores"),e.qZA()(),e.TgZ(38,"c-row",25)(39,"c-col",11)(40,"c-row",26)(41,"h6"),e._uU(42,"Facebook"),e.qZA()(),e.TgZ(43,"c-row"),e._UZ(44,"img",27),e.qZA()(),e.TgZ(45,"c-col",11)(46,"c-row",26)(47,"h6"),e._uU(48,"Instagram"),e.qZA()(),e.TgZ(49,"c-row"),e._UZ(50,"img",27),e.qZA()(),e.TgZ(51,"c-col",11)(52,"c-row",26)(53,"h6"),e._uU(54,"Twitter"),e.qZA()(),e.TgZ(55,"c-row"),e._UZ(56,"img",27),e.qZA()()()()}if(2&i){const t=e.oxw();e.xp6(2),e.Q6J("sm",4),e.xp6(1),e.Q6J("src",t.videogame.imagen,e.LSH),e.xp6(1),e.Q6J("sm",8),e.xp6(3),e.Oqu(t.videogame.titulo),e.xp6(3),e.hij("Publicado por ",t.videogame.usuario,""),e.xp6(6),e.Q6J("routerLink",e.DdM(18,U))("state",t.videogame),e.xp6(7),e.Q6J("sm",2),e.xp6(3),e.Q6J("sm",10),e.xp6(1),e.Q6J("ngForOf",t.videogame.tags),e.xp6(5),e.Q6J("sm",10),e.xp6(2),e.Oqu(t.videogame.sinopsis),e.xp6(5),e.Q6J("sm",4),e.xp6(5),e.Q6J("src",t.videogame.imagenFacebook,e.LSH),e.xp6(1),e.Q6J("sm",4),e.xp6(5),e.Q6J("src",t.videogame.imagenInstagram,e.LSH),e.xp6(1),e.Q6J("sm",4),e.xp6(5),e.Q6J("src",t.videogame.imagenTwitter,e.LSH)}}function V(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"button",29),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.onDeleteVideogame())}),e._uU(1,"Eliminar"),e.qZA()}}class f{constructor(o,t,r){this.domSanitizer=o,this.router=t,this.videogamesService=r,this.excalinestDownloadsPath="C:\\Excalinest\\",this.deleteButton=!1,this.videogame={_id:"",titulo:"",usuario:"",sinopsis:"",bucketId:"",filepath:"",portada:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagen:"",imagepath:"",tags:[],facebook:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenFacebook:"",facepath:"",instagram:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenInstagram:"",instapath:"",twitter:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenTwitter:"",twitterpath:""},this.showSpinner=!1,this.modalMessage="",this.modalTitle="Atenci\xf3n",this.visible=!1}ngOnInit(){this.videogame=history.state;var o=btoa(new Uint8Array(this.videogame.portada.data.data).reduce((l,g)=>l+String.fromCharCode(g),""));this.videogame.imagen=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.portada.tipoImagen+";base64, "+o);var t=btoa(new Uint8Array(this.videogame.facebook.data.data).reduce((l,g)=>l+String.fromCharCode(g),""));this.videogame.imagenFacebook=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.facebook.tipoImagen+";base64, "+t);var r=btoa(new Uint8Array(this.videogame.instagram.data.data).reduce((l,g)=>l+String.fromCharCode(g),""));this.videogame.imagenInstagram=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.instagram.tipoImagen+";base64, "+r);var n=btoa(new Uint8Array(this.videogame.twitter.data.data).reduce((l,g)=>l+String.fromCharCode(g),""));this.videogame.imagenTwitter=this.domSanitizer.bypassSecurityTrustResourceUrl("data:"+this.videogame.twitter.tipoImagen+";base64, "+n)}showDeleteModal(){this.deleteButton=!0,this.modalMessage="\xbfEst\xe1 seguro de eliminar "+this.videogame.titulo+"?",this.openCloseInfoModal()}onDeleteVideogame(){this.openCloseInfoModal(),this.showSpinner=!0,this.videogamesService.deleteVideogame({_id:this.videogame._id}).subscribe({error:o=>{this.showSpinner=!1,this.deleteButton=!1,this.modalMessage=o.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:o=>{this.router.navigate(["/videogames"])}})}downloadFile(){this.videogamesService.getZipFile({destPath:this.excalinestDownloadsPath,filename:this.videogame.titulo+".zip"}).subscribe({error:t=>{this.deleteButton=!1,this.modalMessage=t.error.replace(/['"]+/g,""),this.openCloseInfoModal()},next:t=>{this.deleteButton=!1,this.modalMessage=t+" Excalinest coloca el archivo en C:\\Excalinest",this.openCloseInfoModal()}})}openCloseInfoModal(){this.visible=!this.visible}handleInfoModalChange(o){this.visible=o}}f.\u0275fac=function(o){return new(o||f)(e.Y36(T.H7),e.Y36(m.F0),e.Y36(v.l))},f.\u0275cmp=e.Xpm({type:f,selectors:[["app-videogame-detail"]],decls:13,vars:7,consts:[["class","fade show spinner",4,"ngIf"],[4,"ngIf"],["id","infoModal",3,"visible","alignment","visibleChange"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","danger",3,"click",4,"ngIf"],["cButton","","color","secondary",3,"click"],[1,"fade","show","spinner"],[1,"spinner-grow","spinner-grow-sm"],[1,"m-1"],[1,"row-1"],[3,"sm"],["cCardImg","top",1,"w-75","p-3","rounded","mx-auto","d-block",3,"src"],[1,"col-title",3,"sm"],[1,"col-download-button"],["cButton","","color","dark",1,"download-button",3,"click"],["cIcon","","name","cilCloudDownload",1,"me-2","icon"],[1,"d-grid","gap-2","d-md-flex","justify-content-md-end","crud-buttons"],["cButton","","color","info","size","sm",1,"crud-button",3,"routerLink","state"],["cIcon","","name","cilPencil",1,"me-2","icon"],["cButton","","color","danger","size","sm",1,"crud-button",3,"click"],["cIcon","","name","cilTrash",1,"me-2","icon"],[1,"row-title"],["cButton","","color","light","shape","rounded-pill","class","tag","disabled","",4,"ngFor","ngForOf"],[1,"justify-content-center","row-1"],[1,"row-social-net"],[1,"text-center"],["cCardImg","top",1,"w-50","p-3","rounded","mx-auto","d-block",3,"src"],["cButton","","color","light","shape","rounded-pill","disabled","",1,"tag"],["cButton","","color","danger",3,"click"]],template:function(o,t){1&o&&(e.YNc(0,q,4,0,"div",0),e.YNc(1,M,57,19,"div",1),e.TgZ(2,"c-modal",2),e.NdJ("visibleChange",function(n){return t.handleInfoModalChange(n)}),e.TgZ(3,"c-modal-header")(4,"h5",3),e._uU(5),e.qZA(),e.TgZ(6,"button",4),e.NdJ("click",function(){return t.openCloseInfoModal()}),e.qZA()(),e.TgZ(7,"c-modal-body"),e._uU(8),e.qZA(),e.TgZ(9,"c-modal-footer"),e.YNc(10,V,2,0,"button",5),e.TgZ(11,"button",6),e.NdJ("click",function(){return t.openCloseInfoModal()}),e._uU(12," Cerrar "),e.qZA()()()),2&o&&(e.Q6J("ngIf",t.showSpinner),e.xp6(1),e.Q6J("ngIf",0==t.showSpinner),e.xp6(1),e.Q6J("visible",t.visible)("alignment","center"),e.xp6(3),e.Oqu(t.modalTitle),e.xp6(3),e.hij(" ",t.modalMessage," "),e.xp6(2),e.Q6J("ngIf",t.deleteButton))},dependencies:[c.sg,c.O5,m.rH,a.pce,a.iok,a.Yp0,Z.ar,a.Hq3,a.PFQ,a.KF4,a.YI7,a.Rbl,a.vPP,a.zS7],styles:[".spinner[_ngcontent-%COMP%]{text-align:center;padding-top:33.3333333333vh;height:50vh}.row-1[_ngcontent-%COMP%]{margin-top:3%}.col-title[_ngcontent-%COMP%]{padding-top:5%;padding-bottom:5%}.col-download-button[_ngcontent-%COMP%]{margin-top:5%}.download-button[_ngcontent-%COMP%]{max-width:150px;margin-left:1%}.crud-buttons[_ngcontent-%COMP%]{margin-top:4%;margin-right:10%}.crud-button[_ngcontent-%COMP%]{max-width:150px;margin-left:1%}.row-title[_ngcontent-%COMP%]{margin-left:4%;margin-top:3%}.row-social-net[_ngcontent-%COMP%]{margin-top:3%;margin-bottom:10%}.tag[_ngcontent-%COMP%]{margin-right:1%}"]});var P=d(623);function F(i,o){1&i&&(e.TgZ(0,"div",6),e._UZ(1,"i",7),e.TgZ(2,"span",8),e._uU(3,"Publicando videojuego..."),e.qZA()())}function J(i,o){if(1&i&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&i){const t=o.$implicit;e.xp6(1),e.AsE(" ",t.id," - ",t.name," ")}}function y(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"select",40,41),e.NdJ("change",function(){e.CHM(t);const n=e.MAs(1),l=e.oxw(2);return e.KtG(l.addTag(n.value))}),e.YNc(2,J,2,2,"option",42),e.qZA()}if(2&i){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.listOfTags)}}function Q(i,o){if(1&i&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&i){const t=o.$implicit;e.xp6(1),e.AsE(" ",t.id," - ",t.name," ")}}function S(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"select",43,41),e.NdJ("change",function(){e.CHM(t);const n=e.MAs(1),l=e.oxw(2);return e.KtG(l.addTag(n.value))}),e.YNc(2,Q,2,2,"option",42),e.qZA()}if(2&i){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.listOfTags)}}function O(i,o){if(1&i&&(e.TgZ(0,"option"),e._uU(1),e.qZA()),2&i){const t=o.$implicit;e.xp6(1),e.AsE(" ",t.id," - ",t.name," ")}}function B(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"select",44,41),e.NdJ("change",function(){e.CHM(t);const n=e.MAs(1),l=e.oxw(2);return e.KtG(l.addTag(n.value))}),e.YNc(2,O,2,2,"option",42),e.qZA()}if(2&i){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.listOfTags)}}function z(i,o){1&i&&(e.TgZ(0,"label",45),e._uU(1,"Etiqueta v\xe1lida"),e.qZA())}function N(i,o){1&i&&(e.TgZ(0,"label",46),e._uU(1,"Ingrese m\xednimo una etiqueta"),e.qZA())}function E(i,o){if(1&i&&(e.TgZ(0,"button",48),e._uU(1),e.qZA()),2&i){const t=o.$implicit;e.xp6(1),e.Oqu(t.name)}}function Y(i,o){if(1&i&&(e.TgZ(0,"c-col",31),e.YNc(1,E,2,1,"button",47),e.qZA()),2&i){const t=e.oxw(2);e.Q6J("sm",10),e.xp6(1),e.Q6J("ngForOf",t.tags)}}function D(i,o){if(1&i){const t=e.EpF();e.TgZ(0,"div")(1,"h2"),e._uU(2,"Publicar videojuego"),e.qZA(),e.TgZ(3,"form",9),e.NdJ("ngSubmit",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.submitVideogame())}),e.TgZ(4,"c-row")(5,"c-col",10)(6,"label",11),e._uU(7,"T\xedtulo"),e.qZA(),e._UZ(8,"input",12),e.TgZ(9,"c-form-feedback",13),e._uU(10,"T\xedtulo v\xe1lido"),e.qZA(),e.TgZ(11,"c-form-feedback",13),e._uU(12,"Ingrese el t\xedtulo del videojuego"),e.qZA()(),e.TgZ(13,"c-col",14)(14,"label",15),e._uU(15,"Portada"),e.qZA(),e._UZ(16,"input",16),e.TgZ(17,"c-form-feedback",13),e._uU(18,"Portada v\xe1lida"),e.qZA(),e.TgZ(19,"c-form-feedback",13),e._uU(20,"Ingrese la portada"),e.qZA()()(),e.TgZ(21,"c-row",17)(22,"c-col",14)(23,"label",18),e._uU(24,"Desarrollador"),e.qZA(),e._UZ(25,"input",19),e.TgZ(26,"c-form-feedback",13),e._uU(27,"Desarrollador v\xe1lido"),e.qZA(),e.TgZ(28,"c-form-feedback",13),e._uU(29,"Ingrese el nombre del desarrollador"),e.qZA()(),e.TgZ(30,"c-col",10)(31,"label",20),e._uU(32,"Sinopsis"),e.qZA(),e._UZ(33,"textarea",21),e.TgZ(34,"c-form-feedback",13),e._uU(35,"Sinopsis v\xe1lida"),e.qZA(),e.TgZ(36,"c-form-feedback",13),e._uU(37,"Ingrese la sinopsis"),e.qZA()()(),e.TgZ(38,"c-row",17)(39,"c-col",22)(40,"label",23),e._uU(41,"Archivo"),e.qZA(),e._UZ(42,"input",24),e.TgZ(43,"c-form-feedback",13),e._uU(44,"Archivo v\xe1lido"),e.qZA(),e.TgZ(45,"c-form-feedback",13),e._uU(46,"Ingrese el archivo"),e.qZA()()(),e.TgZ(47,"c-row",17)(48,"c-col",14)(49,"label",25),e._uU(50,"Facebook"),e.qZA(),e._UZ(51,"input",26),e.TgZ(52,"c-form-feedback",13),e._uU(53,"Archivo v\xe1lido"),e.qZA(),e.TgZ(54,"c-form-feedback",13),e._uU(55,"Ingrese el archivo"),e.qZA()(),e.TgZ(56,"c-col",14)(57,"label",27),e._uU(58,"Instagram"),e.qZA(),e._UZ(59,"input",28),e.TgZ(60,"c-form-feedback",13),e._uU(61,"Archivo v\xe1lido"),e.qZA(),e.TgZ(62,"c-form-feedback",13),e._uU(63,"Ingrese el archivo"),e.qZA()(),e.TgZ(64,"c-col",14)(65,"label",29),e._uU(66,"Twitter"),e.qZA(),e._UZ(67,"input",30),e.TgZ(68,"c-form-feedback",13),e._uU(69,"Archivo v\xe1lido"),e.qZA(),e.TgZ(70,"c-form-feedback",13),e._uU(71,"Ingrese el archivo"),e.qZA()()(),e.TgZ(72,"c-row",17)(73,"c-col",31)(74,"label",32),e._uU(75,"Tags"),e.qZA()(),e.TgZ(76,"c-col",31),e.YNc(77,y,3,1,"select",33),e.YNc(78,S,3,1,"select",34),e.YNc(79,B,3,1,"select",35),e.YNc(80,z,2,0,"label",36),e.YNc(81,N,2,0,"label",37),e.qZA(),e.YNc(82,Y,2,2,"c-col",38),e.qZA(),e.TgZ(83,"c-row",17)(84,"c-col",14)(85,"button",39),e._uU(86," Publicar "),e.qZA()()()()()}if(2&i){const t=e.oxw();e.xp6(3),e.Q6J("formGroup",t.getPostVideogameForm())("validated",t.validatedForm),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(7),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(7),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(7),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(6),e.Q6J("valid",!0),e.xp6(2),e.Q6J("valid",!1),e.xp6(3),e.Q6J("sm",2),e.xp6(3),e.Q6J("sm",10),e.xp6(1),e.Q6J("ngIf",0==t.validatedForm),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1==t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1!=t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1!=t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1==t.validatedForm&&-1==t.tags[0].id),e.xp6(1),e.Q6J("ngIf",1!=t.tags.length||-1!=t.tags[0].id)}}class _{constructor(o,t,r,n){this.videogamesService=o,this.formBuilder=t,this.router=r,this.tagsService=n,this.validatedForm=!1,this.excalinestImgPath="C:\\Excalinest\\img\\",this.excalinestBuildsPath="C:\\Excalinest\\builds\\",this.fakePath="C:\\fakepath\\",this.listOfTags=[{id:-1,name:""}],this.tags=[{id:-1,name:""}],this.newVideogame={_id:"",titulo:"",usuario:"",sinopsis:"",bucketId:"",filepath:"",portada:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagen:"",imagepath:"",tags:[],facebook:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenFacebook:"",facepath:"",instagram:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenInstagram:"",instapath:"",twitter:{data:{data:new ArrayBuffer(0),type:""},tipoImagen:""},imagenTwitter:"",twitterpath:""},this.showSpinner=!1,this.modalMessage="",this.modalTitle="Atenci\xf3n",this.visible=!1,this.error=!1}getPostVideogameForm(){return this.postVideogameForm}ngOnInit(){this.postVideogameForm=this.formBuilder.group({title:["",s.kI.required],developer:["",s.kI.required],sinopsis:["",s.kI.required],cover:["",s.kI.required],zip:["",s.kI.required],facebook:["",s.kI.required],instagram:["",s.kI.required],twitter:["",s.kI.required]}),this.tagsService.getTags().subscribe({error:o=>{this.error=!0,this.modalMessage=o.error.replace(/['"]+/g,""),this.openCloseInfoModal(!1)},next:o=>{this.error=!1,this.listOfTags=o}})}addTag(o){let t=parseInt(o.split(" - ")[0]),r=o.split(" - ")[1];this.tags.find(n=>n.id===t)?(1==this.tags.length&&-1!=this.tags[0].id&&this.tags.push({id:-1,name:""}),this.tags.splice(this.tags.findIndex(n=>n.id===t),1)):(1==this.tags.length&&-1==this.tags[0].id&&this.tags.splice(this.tags.findIndex(n=>-1===n.id),1),this.tags.push({id:t,name:r}))}playAudio(){let o=new Audio;o.src="../../../../assets/audio/success.mp3",o.load(),o.play()}onPostVideogame(){this.newVideogame.titulo=this.postVideogameForm.value.title,this.newVideogame.usuario=this.postVideogameForm.value.developer,this.newVideogame.sinopsis=this.postVideogameForm.value.sinopsis,this.newVideogame.imagepath=this.postVideogameForm.value.cover.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.filepath=this.postVideogameForm.value.zip.replace(this.fakePath,this.excalinestBuildsPath),this.newVideogame.facepath=this.postVideogameForm.value.facebook.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.instapath=this.postVideogameForm.value.instagram.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.twitterpath=this.postVideogameForm.value.twitter.replace(this.fakePath,this.excalinestImgPath),this.newVideogame.tags=this.tags,this.showSpinner=!0,this.videogamesService.postVideogame(this.newVideogame).subscribe({error:o=>{this.error=!0,this.modalMessage=o.error.replace(/['"]+/g,""),this.openCloseInfoModal(!1)},next:o=>{this.playAudio(),this.showSpinner=!1,this.error=!1,this.modalMessage=o.replace(/['"]+/g,""),this.openCloseInfoModal(!0)}})}submitVideogame(){this.validatedForm=!0,this.postVideogameForm.dirty&&this.postVideogameForm.valid&&(1!=this.tags.length||-1!=this.tags[0].id)&&this.onPostVideogame()}openCloseInfoModal(o){this.visible=!this.visible,this.visible&&o&&this.resetForm(),!this.visible&&!this.error&&this.router.navigate(["/videogames"])}handleInfoModalChange(o){this.visible=o}resetForm(){this.validatedForm=!1,this.postVideogameForm=this.formBuilder.group({title:["",s.kI.required],developer:["",s.kI.required],sinopsis:["",s.kI.required],cover:["",s.kI.required],zip:["",s.kI.required],facebook:["",s.kI.required],instagram:["",s.kI.required],twitter:["",s.kI.required]})}}_.\u0275fac=function(o){return new(o||_)(e.Y36(v.l),e.Y36(s.qu),e.Y36(m.F0),e.Y36(P.i))},_.\u0275cmp=e.Xpm({type:_,selectors:[["app-post-videogame"]],decls:12,vars:6,consts:[["class","fade show spinner",4,"ngIf"],[4,"ngIf"],["id","infoModal",3,"visible","alignment","visibleChange"],["cModalTitle",""],["cButtonClose","",3,"click"],["cButton","","color","secondary",3,"click"],[1,"fade","show","spinner"],[1,"spinner-grow","spinner-grow-sm"],[1,"m-1"],["cForm","",1,"row","g-3","needs-validation",3,"formGroup","validated","ngSubmit"],["md","8"],["cLabel","","for","title"],["cFormControl","","id","title","formControlName","title","required","","type","text"],[3,"valid"],["md","4"],["cLabel","","for","cover"],["cFormControl","","id","cover","formControlName","cover","accept","image/png, image/jpeg","required","","type","file"],[1,"row"],["cLabel","","for","developer"],["cFormControl","","id","developer","formControlName","developer","required","","type","text"],["cLabel","","for","sinopsis"],["cFormControl","","id","sinopsis","formControlName","sinopsis","required","","type","text"],["md","12"],["cLabel","","for","zip"],["cFormControl","","id","zip","formControlName","zip","accept","application/zip","required","","type","file"],["cLabel","","for","facebook"],["cFormControl","","id","facebook","formControlName","facebook","accept","image/png, image/jpeg","required","","type","file"],["cLabel","","for","instagram"],["cFormControl","","id","instagram","formControlName","instagram","accept","image/png, image/jpeg","required","","type","file"],["cLabel","","for","twitter"],["cFormControl","","id","twitter","formControlName","twitter","accept","image/png, image/jpeg","required","","type","file"],[1,"columns-tags",3,"sm"],["cLabel","","for","tags"],["cSelect","","size","3","sizing","md","class","tag-picker",3,"change",4,"ngIf"],["cSelect","","size","3","sizing","md","style","border: 1px solid #e55353;",3,"change",4,"ngIf"],["cSelect","","size","3","sizing","md","style","border: 1px solid #2eb85c;",3,"change",4,"ngIf"],["style","margin-top: 0.25rem; font-size: 0.875em; color: #2eb85c;",4,"ngIf"],["style","margin-top: 0.25rem; font-size: 0.875em; color: #e55353;",4,"ngIf"],["class","columns-tags",3,"sm",4,"ngIf"],["cButton","","color","primary","type","submit",1,"update-button","row-margin-bottom"],["cSelect","","size","3","sizing","md",1,"tag-picker",3,"change"],["selectTags",""],[4,"ngFor","ngForOf"],["cSelect","","size","3","sizing","md",2,"border","1px solid #e55353",3,"change"],["cSelect","","size","3","sizing","md",2,"border","1px solid #2eb85c",3,"change"],[2,"margin-top","0.25rem","font-size","0.875em","color","#2eb85c"],[2,"margin-top","0.25rem","font-size","0.875em","color","#e55353"],["cButton","","color","light","shape","rounded-pill","class","tag","disabled","",4,"ngFor","ngForOf"],["cButton","","color","light","shape","rounded-pill","disabled","",1,"tag"]],template:function(o,t){1&o&&(e.YNc(0,F,4,0,"div",0),e.YNc(1,D,87,26,"div",1),e.TgZ(2,"c-modal",2),e.NdJ("visibleChange",function(n){return t.handleInfoModalChange(n)}),e.TgZ(3,"c-modal-header")(4,"h5",3),e._uU(5),e.qZA(),e.TgZ(6,"button",4),e.NdJ("click",function(){return t.openCloseInfoModal(!1)}),e.qZA()(),e.TgZ(7,"c-modal-body"),e._uU(8),e.qZA(),e.TgZ(9,"c-modal-footer")(10,"button",5),e.NdJ("click",function(){return t.openCloseInfoModal(!1)}),e._uU(11," Cerrar "),e.qZA()()()),2&o&&(e.Q6J("ngIf",t.showSpinner),e.xp6(1),e.Q6J("ngIf",0==t.showSpinner),e.xp6(1),e.Q6J("visible",t.visible)("alignment","center"),e.xp6(3),e.Oqu(t.modalTitle),e.xp6(3),e.hij(" ",t.modalMessage," "))},dependencies:[c.sg,c.O5,a.iok,a.Yp0,a.$_X,a.oHf,a.dCl,a.eFW,a.nqR,a.Hq3,a.PFQ,s._Y,s.YN,s.Kr,s.Fj,s.JJ,s.JL,s.Q7,s.sg,s.u,a.KF4,a.YI7,a.Rbl,a.vPP,a.zS7],styles:[".spinner[_ngcontent-%COMP%]{text-align:center;padding-top:33.3333333333vh;height:50vh}.update-button[_ngcontent-%COMP%]{width:100%}.row[_ngcontent-%COMP%]{margin-top:2%}.row-margin-bottom[_ngcontent-%COMP%]{margin-bottom:10%}.columns-tags[_ngcontent-%COMP%]{margin-top:2%;margin-bottom:3%}.tag[_ngcontent-%COMP%]{margin-right:1%}.tag-picker[_ngcontent-%COMP%]{border:1px solid #b1b7c1}"]});const j=[{path:"",redirectTo:"get",pathMatch:"full"},{path:"",data:{title:"Videojuegos"},children:[{path:"",pathMatch:"full",redirectTo:"colors"},{path:"update",component:A.G,data:{title:"Editar videojuego"}},{path:"get",component:h,data:{title:"Mis videojuegos"}},{path:"post",component:_,data:{title:"Publicar videojuego"}},{path:"videogame",component:f,data:{title:"Detalles del videojuego"}}]}];class p{}p.\u0275fac=function(o){return new(o||p)},p.\u0275mod=e.oAB({type:p}),p.\u0275inj=e.cJS({imports:[m.Bz.forChild(j),m.Bz]});class u{}u.\u0275fac=function(o){return new(o||u)},u.\u0275mod=e.oAB({type:u}),u.\u0275inj=e.cJS({imports:[c.ez,p,a.dTQ,a.zE6,a.gzQ,Z.QX,a.dGk,a.P4_,a.ejP,a.hJ1,s.u5,s.UX,a.ga2,a.kWm,a.m81,a.Xo8,a.zkK]})}}]);