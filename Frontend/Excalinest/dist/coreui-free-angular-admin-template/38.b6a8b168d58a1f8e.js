"use strict";(self.webpackChunkcoreui_free_angular_admin_template=self.webpackChunkcoreui_free_angular_admin_template||[]).push([[38],{38:(M,b,o)=>{o.r(b),o.d(b,{DashboardModule:()=>u});var h=o(6895),n=o(433),e=o(6602),T=o(1334),A=o(7834),f=o(593),a=o(1571),m=o(1445);class g{constructor(){this.mainChart={},this.initMainChart()}random(s,r){return Math.floor(Math.random()*(r-s+1)+s)}initMainChart(s="Month"){const r=(0,m.Z)("--cui-success")??"#4dbd74",i=(0,m.Z)("--cui-info")??"#20a8d8",p=((t,s=100)=>{if(typeof t>"u")throw new TypeError("Hex color is not defined");if(!t.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error(`${t} is not a valid hex color`);let i,p,l;return 7===t.length?(i=parseInt(t.slice(1,3),16),p=parseInt(t.slice(3,5),16),l=parseInt(t.slice(5,7),16)):(i=parseInt(t.slice(1,2),16),p=parseInt(t.slice(2,3),16),l=parseInt(t.slice(3,5),16)),`rgba(${i}, ${p}, ${l}, ${s/100})`})((0,m.Z)("--cui-info"),10)??"#20a8d8",l=(0,m.Z)("--cui-danger")||"#f86c6b";this.mainChart.elements="Month"===s?12:27,this.mainChart.Data1=[],this.mainChart.Data2=[],this.mainChart.Data3=[];for(let c=0;c<=this.mainChart.elements;c++)this.mainChart.Data1.push(this.random(50,240)),this.mainChart.Data2.push(this.random(20,160)),this.mainChart.Data3.push(65);let v=[];if("Month"===s)v=["January","February","March","April","May","June","July","August","September","October","November","December"];else{const c=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];v=c.concat(c,c,c)}const U=[{backgroundColor:p,borderColor:i,pointHoverBackgroundColor:i,borderWidth:2,fill:!0},{backgroundColor:"transparent",borderColor:r||"#4dbd74",pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:l||"#f86c6b",pointHoverBackgroundColor:l,borderWidth:1,borderDash:[8,5]}],k=[{data:this.mainChart.Data1,label:"Current",...U[0]},{data:this.mainChart.Data2,label:"Previous",...U[1]},{data:this.mainChart.Data3,label:"BEP",...U[2]}],D={maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{callbacks:{labelColor:function(c){return{backgroundColor:c.dataset.borderColor}}}}},scales:{x:{grid:{drawOnChartArea:!1}},y:{beginAtZero:!0,max:250,ticks:{maxTicksLimit:5,stepSize:Math.ceil(50)}}},elements:{line:{tension:.4},point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}};this.mainChart.type="line",this.mainChart.options=D,this.mainChart.data={datasets:k,labels:v}}}g.\u0275fac=function(s){return new(s||g)},g.\u0275prov=a.Yz7({token:g,factory:g.\u0275fac,providedIn:"any"});var y=o(8747),q=o(5792);function C(t,s){if(1&t&&(a.TgZ(0,"tr")(1,"td",76),a._UZ(2,"c-avatar",79),a.qZA(),a.TgZ(3,"td")(4,"div"),a._uU(5),a.qZA(),a.TgZ(6,"div",80)(7,"span"),a._uU(8),a.qZA()()(),a.TgZ(9,"td",76),a.O4$(),a._UZ(10,"svg",81),a.qZA(),a.kcU(),a.TgZ(11,"td")(12,"div",82)(13,"div",83)(14,"strong"),a._uU(15),a.qZA()(),a.TgZ(16,"div",84)(17,"small",16),a._uU(18),a.qZA()()(),a.TgZ(19,"c-progress",35),a._UZ(20,"c-progress-bar",85),a.qZA()(),a.TgZ(21,"td",76),a.O4$(),a._UZ(22,"svg",86),a.qZA(),a.kcU(),a.TgZ(23,"td")(24,"div",3),a._uU(25,"Last login"),a.qZA(),a.TgZ(26,"div",87),a._uU(27),a.qZA()()()),2&t){const r=s.$implicit;a.xp6(2),a.s9C("src",r.avatar),a.s9C("status",r.status),a.xp6(3),a.Oqu(r.name),a.xp6(3),a.AsE(" ",r.state," | Registered: ",r.registered," "),a.xp6(2),a.s9C("id",r.country+r.name),a.MGl("name","cif",r.country,""),a.s9C("title",r.country),a.xp6(5),a.hij("",r.usage,"%"),a.xp6(3),a.hij(" ",r.period," "),a.xp6(2),a.s9C("color",r.color),a.Q6J("value",r.usage),a.xp6(2),a.MGl("name","cibCc",r.payment,""),a.xp6(5),a.Oqu(r.activity)}}const x=function(){return{"marginTop.px":40}};class Z{constructor(s){this.chartsData=s,this.users=[{name:"Yiorgos Avraamu",state:"New",registered:"Jan 1, 2021",country:"Us",usage:50,period:"Jun 11, 2021 - Jul 10, 2021",payment:"Mastercard",activity:"10 sec ago",avatar:"./assets/img/avatars/1.jpg",status:"success",color:"success"},{name:"Avram Tarasios",state:"Recurring ",registered:"Jan 1, 2021",country:"Br",usage:10,period:"Jun 11, 2021 - Jul 10, 2021",payment:"Visa",activity:"5 minutes ago",avatar:"./assets/img/avatars/2.jpg",status:"danger",color:"info"},{name:"Quintin Ed",state:"New",registered:"Jan 1, 2021",country:"In",usage:74,period:"Jun 11, 2021 - Jul 10, 2021",payment:"Stripe",activity:"1 hour ago",avatar:"./assets/img/avatars/3.jpg",status:"warning",color:"warning"},{name:"En\xe9as Kwadwo",state:"Sleep",registered:"Jan 1, 2021",country:"Fr",usage:98,period:"Jun 11, 2021 - Jul 10, 2021",payment:"Paypal",activity:"Last month",avatar:"./assets/img/avatars/4.jpg",status:"secondary",color:"danger"},{name:"Agapetus Tade\xe1\u0161",state:"New",registered:"Jan 1, 2021",country:"Es",usage:22,period:"Jun 11, 2021 - Jul 10, 2021",payment:"ApplePay",activity:"Last week",avatar:"./assets/img/avatars/5.jpg",status:"success",color:"primary"},{name:"Friderik D\xe1vid",state:"New",registered:"Jan 1, 2021",country:"Pl",usage:43,period:"Jun 11, 2021 - Jul 10, 2021",payment:"Amex",activity:"Yesterday",avatar:"./assets/img/avatars/6.jpg",status:"info",color:"dark"}],this.mainChart={},this.chart=[],this.trafficRadioGroup=new n.nJ({trafficRadio:new n.p4("Month")})}ngOnInit(){this.initCharts()}initCharts(){this.mainChart=this.chartsData.mainChart}setTrafficPeriod(s){this.trafficRadioGroup.setValue({trafficRadio:s}),this.chartsData.initMainChart(s),this.initCharts()}}Z.\u0275fac=function(s){return new(s||Z)(a.Y36(g))},Z.\u0275cmp=a.Xpm({type:Z,selectors:[["ng-component"]],decls:280,vars:15,consts:[[1,"mb-4"],["sm","5"],["id","traffic",1,"card-title","mb-0"],[1,"small","text-medium-emphasis"],["sm","7",1,"d-none","d-md-block"],["cButton","","color","primary",1,"float-end"],["cIcon","","name","cilCloudDownload"],[3,"formGroup"],["role","group",1,"float-end","me-3"],["formControlName","trafficRadio","type","radio","value","Day",1,"btn-check"],["cButton","","cFormCheckLabel","","color","secondary","variant","outline",3,"click"],["formControlName","trafficRadio","type","radio","value","Month",1,"btn-check"],["formControlName","trafficRadio","type","radio","value","Year",1,"btn-check"],[3,"data","height","ngStyle","options","type"],[1,"text-center",3,"md","xs"],[1,"mb-sm-2","mb-0"],[1,"text-medium-emphasis"],["thin","",1,"mt-2"],["color","success","value","40"],["color","info","value","20"],["color","warning","value","60"],["color","danger","value","80"],["value","40"],[3,"withCharts"],["xs",""],["md","6","xl","6","xs","12"],["sm","6"],[1,"border-start","border-start-4","border-start-info","py-1","px-3","mb-3"],[1,"text-medium-emphasis","small"],[1,"fs-5","fw-semibold"],[1,"border-start","border-start-4","border-start-danger","py-1","px-3","mb-3"],[1,"mt-0"],[1,"progress-group","mb-4"],[1,"progress-group-prepend"],[1,"progress-group-bars"],["thin",""],["color","info","value","34"],["color","danger","value","78"],["color","info","value","56"],["color","danger","value","94"],["color","info","value","12"],["color","danger","value","67"],["color","info","value","43"],["color","danger","value","91"],["color","info","value","22"],["color","danger","value","73"],["color","info","value","53"],["color","danger","value","82"],["color","info","value","9"],["color","danger","value","69"],[1,"legend","text-center"],[1,"badge","badge-pill","badge-sm","bg-info"],[1,"badge","badge-pill","badge-sm","bg-danger"],[1,"border-start","border-start-4","border-start-warning","py-1","px-3","mb-3"],[1,"border-start","border-start-4","border-start-success","py-1","px-3","mb-3"],[1,"progress-group-header"],["cIcon","","name","cilUser",1,"icon","icon-lg","me-2"],[1,"ms-auto","font-semibold"],["color","warning","value","43"],[1,"progress-group","mb-5"],["cIcon","","name","cilUserFemale",1,"icon","icon-lg","me-2"],["color","warning","value","37"],[1,"progress-group"],["cIcon","","name","cibGoogle",1,"icon","icon-lg","me-2"],["color","success","value","56"],["cIcon","","name","cibFacebook",1,"icon","icon-lg","me-2"],["color","success","value","15"],["cIcon","","name","cibTwitter",1,"icon","icon-lg","me-2"],["color","success","value","11"],["cIcon","","name","cibLinkedin",1,"icon","icon-lg","me-2"],["color","success","value","8"],[1,"divider","d-flex","justify-content-center"],["cButton","","color","transparent","size","sm","type","button",1,"text-muted","btn-link"],["cIcon","","name","cil-options"],["align","middle","cTable","",1,"mb-0","border",3,"hover","responsive","striped"],["cTableColor","light"],[1,"text-center"],["cIcon","","name","cilPeople"],[4,"ngFor","ngForOf"],["size","md",3,"src","status"],[1,"small","text-medium-emphasis","text-nowrap"],["cIcon","","size","xl",3,"id","name","title"],[1,"d-flex","justify-content-between"],[1,"float-start"],[1,"float-end","ms-1","text-nowrap"],[3,"value","color"],["cIcon","","size","xl",3,"name"],[1,"fw-semibold","text-nowrap"]],template:function(s,r){1&s&&(a._UZ(0,"app-widgets-dropdown"),a.TgZ(1,"c-card",0)(2,"c-card-body")(3,"c-row")(4,"c-col",1)(5,"h4",2),a._uU(6,"Traffic"),a.qZA(),a.TgZ(7,"div",3),a._uU(8,"January - December 2021"),a.qZA()(),a.TgZ(9,"c-col",4)(10,"button",5),a.O4$(),a._UZ(11,"svg",6),a.qZA(),a.kcU(),a.TgZ(12,"form",7)(13,"c-button-group",8),a._UZ(14,"input",9),a.TgZ(15,"label",10),a.NdJ("click",function(){return r.setTrafficPeriod("Day")}),a._uU(16,"Day"),a.qZA(),a._UZ(17,"input",11),a.TgZ(18,"label",10),a.NdJ("click",function(){return r.setTrafficPeriod("Month")}),a._uU(19,"Month"),a.qZA(),a._UZ(20,"input",12),a.TgZ(21,"label",10),a.NdJ("click",function(){return r.setTrafficPeriod("Year")}),a._uU(22,"Year"),a.qZA()()()()(),a.TgZ(23,"c-chart",13),a._uU(24," Main chart "),a.qZA()(),a.TgZ(25,"c-card-footer")(26,"c-row",14)(27,"c-col",15)(28,"div",16),a._uU(29,"Visits"),a.qZA(),a.TgZ(30,"strong"),a._uU(31,"29.703 Users (40%)"),a.qZA(),a.TgZ(32,"c-progress",17),a._UZ(33,"c-progress-bar",18),a.qZA()(),a.TgZ(34,"c-col",15)(35,"div",16),a._uU(36,"Unique"),a.qZA(),a.TgZ(37,"strong"),a._uU(38,"24.093 Users (20%)"),a.qZA(),a.TgZ(39,"c-progress",17),a._UZ(40,"c-progress-bar",19),a.qZA()(),a.TgZ(41,"c-col",15)(42,"div",16),a._uU(43,"Page views"),a.qZA(),a.TgZ(44,"strong"),a._uU(45,"78.706 Views (60%)"),a.qZA(),a.TgZ(46,"c-progress",17),a._UZ(47,"c-progress-bar",20),a.qZA()(),a.TgZ(48,"c-col",15)(49,"div",16),a._uU(50,"New Users"),a.qZA(),a.TgZ(51,"strong"),a._uU(52,"22.123 Users (80%)"),a.qZA(),a.TgZ(53,"c-progress",17),a._UZ(54,"c-progress-bar",21),a.qZA()(),a.TgZ(55,"c-col",15)(56,"div",16),a._uU(57,"Bounce Rate"),a.qZA(),a.TgZ(58,"strong"),a._uU(59,"Average Rate (40.15%)"),a.qZA(),a.TgZ(60,"c-progress",17),a._UZ(61,"c-progress-bar",22),a.qZA()()()()(),a._UZ(62,"app-widgets-brand",23),a.TgZ(63,"c-row")(64,"c-col",24)(65,"c-card",0)(66,"c-card-header"),a._uU(67),a.qZA(),a.TgZ(68,"c-card-body")(69,"c-row")(70,"c-col",25)(71,"c-row")(72,"c-col",26)(73,"div",27)(74,"div",28),a._uU(75,"New Clients"),a.qZA(),a.TgZ(76,"div",29),a._uU(77,"9,123"),a.qZA()()(),a.TgZ(78,"c-col",26)(79,"div",30)(80,"div",28),a._uU(81," Recurring Clients "),a.qZA(),a.TgZ(82,"div",29),a._uU(83,"22,643"),a.qZA()()()(),a._UZ(84,"hr",31),a.TgZ(85,"div",32)(86,"div",33)(87,"span",28),a._uU(88,"Monday"),a.qZA()(),a.TgZ(89,"div",34)(90,"c-progress",35),a._UZ(91,"c-progress-bar",36),a.qZA(),a.TgZ(92,"c-progress",35),a._UZ(93,"c-progress-bar",37),a.qZA()()(),a.TgZ(94,"div",32)(95,"div",33)(96,"span",28),a._uU(97,"Tuesday"),a.qZA()(),a.TgZ(98,"div",34)(99,"c-progress",35),a._UZ(100,"c-progress-bar",38),a.qZA(),a.TgZ(101,"c-progress",35),a._UZ(102,"c-progress-bar",39),a.qZA()()(),a.TgZ(103,"div",32)(104,"div",33)(105,"span",28),a._uU(106,"Wednesday"),a.qZA()(),a.TgZ(107,"div",34)(108,"c-progress",35),a._UZ(109,"c-progress-bar",40),a.qZA(),a.TgZ(110,"c-progress",35),a._UZ(111,"c-progress-bar",41),a.qZA()()(),a.TgZ(112,"div",32)(113,"div",33)(114,"span",28),a._uU(115,"Thursday"),a.qZA()(),a.TgZ(116,"div",34)(117,"c-progress",35),a._UZ(118,"c-progress-bar",42),a.qZA(),a.TgZ(119,"c-progress",35),a._UZ(120,"c-progress-bar",43),a.qZA()()(),a.TgZ(121,"div",32)(122,"div",33)(123,"span",28),a._uU(124,"Friday"),a.qZA()(),a.TgZ(125,"div",34)(126,"c-progress",35),a._UZ(127,"c-progress-bar",44),a.qZA(),a.TgZ(128,"c-progress",35),a._UZ(129,"c-progress-bar",45),a.qZA()()(),a.TgZ(130,"div",32)(131,"div",33)(132,"span",28),a._uU(133,"Saturday"),a.qZA()(),a.TgZ(134,"div",34)(135,"c-progress",35),a._UZ(136,"c-progress-bar",46),a.qZA(),a.TgZ(137,"c-progress",35),a._UZ(138,"c-progress-bar",47),a.qZA()()(),a.TgZ(139,"div",32)(140,"div",33)(141,"span",28),a._uU(142,"Sunday"),a.qZA()(),a.TgZ(143,"div",34)(144,"c-progress",35),a._UZ(145,"c-progress-bar",48),a.qZA(),a.TgZ(146,"c-progress",35),a._UZ(147,"c-progress-bar",49),a.qZA()()(),a.TgZ(148,"div",50),a._uU(149,"\n              "),a.TgZ(150,"small"),a._uU(151,"\n                "),a.TgZ(152,"sup"),a._uU(153,"\n                  "),a.TgZ(154,"span",51),a._uU(155,"\xa0"),a.qZA(),a._uU(156,"\n                "),a.qZA(),a._uU(157,"\n                "),a.TgZ(158,"span"),a._uU(159,"New clients"),a.qZA(),a._uU(160,"\n                \xa0\xa0\n                "),a.TgZ(161,"sup"),a._uU(162,"\n                  "),a.TgZ(163,"span",52),a._uU(164,"\xa0"),a.qZA(),a._uU(165,"\n                "),a.qZA(),a._uU(166,"\n                "),a.TgZ(167,"span"),a._uU(168,"Recurring clients"),a.qZA(),a._uU(169,"\n              "),a.qZA(),a._uU(170,"\n            "),a.qZA()(),a.TgZ(171,"c-col",25)(172,"c-row")(173,"c-col",26)(174,"div",53)(175,"div",28),a._uU(176,"Page views"),a.qZA(),a.TgZ(177,"div",29),a._uU(178,"78,623"),a.qZA()()(),a.TgZ(179,"c-col",26)(180,"div",54)(181,"div",28),a._uU(182,"Organic"),a.qZA(),a.TgZ(183,"div",29),a._uU(184,"49,123"),a.qZA()()()(),a._UZ(185,"hr",31),a.TgZ(186,"div",32)(187,"div",55),a.O4$(),a._UZ(188,"svg",56),a.kcU(),a.TgZ(189,"span"),a._uU(190,"Male"),a.qZA(),a.TgZ(191,"span",57),a._uU(192,"43%"),a.qZA()(),a.TgZ(193,"div",34)(194,"c-progress",35),a._UZ(195,"c-progress-bar",58),a.qZA()()(),a.TgZ(196,"div",59)(197,"div",55),a.O4$(),a._UZ(198,"svg",60),a.kcU(),a.TgZ(199,"span"),a._uU(200,"Female"),a.qZA(),a.TgZ(201,"span",57),a._uU(202,"37%"),a.qZA()(),a.TgZ(203,"div",34)(204,"c-progress",35),a._UZ(205,"c-progress-bar",61),a.qZA()()(),a.TgZ(206,"div",62)(207,"div",55),a.O4$(),a._UZ(208,"svg",63),a.kcU(),a.TgZ(209,"span"),a._uU(210,"Organic Search"),a.qZA(),a.TgZ(211,"span",57),a._uU(212," 191,235 "),a.TgZ(213,"span",28),a._uU(214,"(56%)"),a.qZA()()(),a.TgZ(215,"div",34)(216,"c-progress",35),a._UZ(217,"c-progress-bar",64),a.qZA()()(),a.TgZ(218,"div",62)(219,"div",55),a.O4$(),a._UZ(220,"svg",65),a.kcU(),a.TgZ(221,"span"),a._uU(222,"Facebook"),a.qZA(),a.TgZ(223,"span",57),a._uU(224," 51,223 "),a.TgZ(225,"span",28),a._uU(226,"(15%)"),a.qZA()()(),a.TgZ(227,"div",34)(228,"c-progress",35),a._UZ(229,"c-progress-bar",66),a.qZA()()(),a.TgZ(230,"div",62)(231,"div",55),a.O4$(),a._UZ(232,"svg",67),a.kcU(),a.TgZ(233,"span"),a._uU(234,"Twitter"),a.qZA(),a.TgZ(235,"span",57),a._uU(236," 37,564 "),a.TgZ(237,"span",28),a._uU(238,"(11%)"),a.qZA()()(),a.TgZ(239,"div",34)(240,"c-progress",35),a._UZ(241,"c-progress-bar",68),a.qZA()()(),a.TgZ(242,"div",62)(243,"div",55),a.O4$(),a._UZ(244,"svg",69),a.kcU(),a.TgZ(245,"span"),a._uU(246,"LinkedIn"),a.qZA(),a.TgZ(247,"span",57),a._uU(248," 27,319 "),a.TgZ(249,"span",28),a._uU(250,"(8%)"),a.qZA()()(),a.TgZ(251,"div",34)(252,"c-progress",35),a._UZ(253,"c-progress-bar",70),a.qZA()()(),a.TgZ(254,"div",71)(255,"button",72),a.O4$(),a._UZ(256,"svg",73),a.qZA()()()()()()()(),a.kcU(),a.TgZ(257,"c-row")(258,"c-col",24)(259,"c-card",0)(260,"c-card-header"),a._uU(261,"Users"),a.qZA(),a.TgZ(262,"c-card-body")(263,"table",74)(264,"thead",75)(265,"tr")(266,"th",76),a.O4$(),a._UZ(267,"svg",77),a.qZA(),a.kcU(),a.TgZ(268,"th"),a._uU(269,"User"),a.qZA(),a.TgZ(270,"th",76),a._uU(271,"Country"),a.qZA(),a.TgZ(272,"th"),a._uU(273,"Usage"),a.qZA(),a.TgZ(274,"th",76),a._uU(275,"Payment Method"),a.qZA(),a.TgZ(276,"th"),a._uU(277,"Activity"),a.qZA()()(),a.TgZ(278,"tbody"),a.YNc(279,C,28,14,"tr",78),a.qZA()()()()()()),2&s&&(a.xp6(12),a.Q6J("formGroup",r.trafficRadioGroup),a.xp6(11),a.Q6J("data",r.mainChart.data)("height",300)("ngStyle",a.DdM(14,x))("options",r.mainChart.options)("type",r.mainChart.type),a.xp6(3),a.Q6J("md",5)("xs",1),a.xp6(36),a.Q6J("withCharts",!0),a.xp6(5),a.hij("Traffic ","&"," Sales"),a.xp6(196),a.Q6J("hover",!0)("responsive",!0)("striped",!0),a.xp6(16),a.Q6J("ngForOf",r.users))},dependencies:[e.AkF,e.yue,e.xUh,e.nkx,T.ar,h.sg,h.PC,e.iok,e.Yp0,e.t15,e.RIQ,n._Y,n.Fj,n._,n.JJ,n.JL,n.sg,n.u,e.Hq3,e.NWu,e.KbJ,A.d,e.Ao0,e.auY,e.io7,y.O,q.c],styles:["[_nghost-%COMP%]   .legend[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:x-small}"]});const w=[{path:"",component:Z,data:{title:$localize`Dashboard`}}];class d{}d.\u0275fac=function(s){return new(s||d)},d.\u0275mod=a.oAB({type:d}),d.\u0275inj=a.cJS({imports:[f.Bz.forChild(w),f.Bz]});var J=o(7143);class u{}u.\u0275fac=function(s){return new(s||u)},u.\u0275mod=a.oAB({type:u}),u.\u0275inj=a.cJS({imports:[d,e.dTQ,e.dGk,T.QX,e.P4_,h.ez,e.zE6,e.qek,n.UX,e.hJ1,e.ejP,e.hJ1,e.ga2,A.N,e.FxY,e.U$I,J.WidgetsModule]})}}]);