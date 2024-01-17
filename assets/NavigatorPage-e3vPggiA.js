import{d as g,o as d,c as h,t as b,n as _,_ as u,s as x,a as w,w as p,b as f,V as y,e as k,f as v,g as C,h as o,r as D}from"./index-OFWz2ymS.js";const T=["title"],V=g({__name:"COverflowText",props:{text:{type:String,required:!0},lineClamp:{type:Number,default:4}},setup(r){const t=r;return(s,a)=>(d(),h("div",{class:"c-overflow-text",title:t.text,style:_(`-webkit-line-clamp: ${t.lineClamp}`)},b(t.text),13,T))}}),B=u(V,[["__scopeId","data-v-6f76ba75"]]),A={components:{COverflowText:B},data(){return x("navigator"),{totalDesserts:0,desserts:[],loading:!0,options:{},headers:[{title:"Dessert (100g serving)",align:"start",sortable:!1,key:"name"},{title:"Calories",key:"calories"},{title:"Fat (g)",key:"fat"},{title:"Carbs (g)",key:"carbs"},{title:"Protein (g)",key:"protein"},{title:"Iron (%)",key:"iron"}]}},watch:{options:{handler(){this.getDataFromApi()},deep:!0}},methods:{getDataFromApi(){this.loading=!0,this.fakeApiCall().then(r=>{this.desserts=r.items,this.totalDesserts=r.total,this.loading=!1})},fakeApiCall(){return new Promise(r=>{const{sortBy:t=[],page:s,itemsPerPage:a}=this.options;let e=this.getDesserts();const m=e.length;t.length&&(e=e.sort((l,c)=>{const n=l[t[0].key],i=c[t[0].key];return t[0].order?n<i?1:n>i?-1:0:n<i?-1:n>i?1:0})),a>0&&(e=e.slice((s-1)*a,s*a)),setTimeout(()=>{r({items:e,total:m})},200)})},getDesserts(){return[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,iron:1},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,iron:1},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,iron:7},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,iron:8},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,iron:16},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,iron:0},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,iron:2},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,iron:45},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,iron:22},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,iron:6},{name:"Frozen Yogurt 2",calories:159,fat:6,carbs:24,protein:4,iron:1},{name:"Ice cream sandwich 2",calories:237,fat:9,carbs:37,protein:4.3,iron:1},{name:"Eclair 2",calories:262,fat:16,carbs:23,protein:6,iron:7},{name:"Cupcake 2",calories:305,fat:3.7,carbs:67,protein:4.3,iron:8},{name:"Gingerbread 2",calories:356,fat:16,carbs:49,protein:3.9,iron:16},{name:"Jelly bean 2",calories:375,fat:0,carbs:94,protein:0,iron:0},{name:"Lollipop 2",calories:392,fat:.2,carbs:98,protein:0,iron:2},{name:"Honeycomb 2",calories:408,fat:3.2,carbs:87,protein:6.5,iron:45},{name:"Donut 2",calories:452,fat:25,carbs:51,protein:4.9,iron:22},{name:"KitKat 2",calories:518,fat:26,carbs:65,protein:7,iron:6}]}}},F=o("h1",{class:"text-center"},"Демонстрация компонента c-overflow-text",-1),N=o("br",null,null,-1),P=o("br",null,null,-1),I=o("br",null,null,-1),K=o("br",null,null,-1);function S(r,t,s,a,e,m){const l=D("c-overflow-text");return d(),w(C,null,{default:p(()=>[F,N,P,f(y,{width:"300",title:"Заголовок",variant:"outlined"},{default:p(()=>[f(l,{text:"1111 2222 3333 4444 5555 6666 7777 9999999999999999999999999999999999  000000000000001111111111 3333333333333 454444444 6666666666 88888 999999 2222222dasda fdgdg fghfghfghfg fghfghgf","line-clamp":3})]),_:1}),I,K,f(v,{headers:e.headers,items:e.desserts,"items-length":e.totalDesserts,loading:e.loading,"items-per-page":10,"item-value":"name","show-select":"","show-expand":"",class:"elevation-1","fixed-footer":"","fixed-header":"","onUpdate:options":t[0]||(t[0]=c=>e.options=c)},{"expanded-row":p(()=>[k(" This is an expanded row ")]),_:1},8,["headers","items","items-length","loading"])]),_:1})}const E=u(A,[["render",S]]);export{E as default};
