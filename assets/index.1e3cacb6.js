import{_ as O,b as i,o as c,k as v,w as n,j as l,e as _,aF as w,ay as J,f as t,h as r,R as d}from"./index.38b1c2b0.js";const L={data(){return{value:"",uid:"",nickname:"",socket:"",msg:"",messageList:[],visible:!0}},created(){let o=JSON.parse(sessionStorage.getItem("user_info")||"{}");this.uid=o.uid,this.nickname=o.nickname,this.visible=JSON.parse(sessionStorage.getItem("card_status")||null),this.uid&&this.nickname&&this.connectWebSocket(),this.messageList=JSON.parse(sessionStorage.getItem("messageList")||"[]")},methods:{connectWebSocket(){let o=this;if(!window.WebSocket)console.log("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 WebSocket \u901A\u4FE1\uFF01");else{this.socket=new WebSocket("ws://127.0.0.1:3000/");let e=this.socket;e.onopen=function(y){console.log("\u8FDE\u63A5\u670D\u52A1\u5668\u6210\u529F"),e.onclose=function(u){console.log("\u670D\u52A1\u5668\u5173\u95ED")},e.onerror=function(){console.log("\u8FDE\u63A5\u51FA\u9519")},e.onmessage=function(u){console.log(JSON.parse(u.data)),o.messageList.push(JSON.parse(u.data)),sessionStorage.setItem("messageList",JSON.stringify(o.messageList))}}}},sendMessage(o,e){this.socket.send(JSON.stringify({uid:this.uid,type:o,nickname:this.nickname,msg:e})),this.value=""},send(){this.sendMessage(1,this.value)},handleOk(){let o={uid:this.uid,nickname:this.nickname};sessionStorage.setItem("user_info",JSON.stringify(o)),this.visible=!1,sessionStorage.setItem("card_status",JSON.stringify(this.visible))}}},I={class:"chat-content"},C={key:0,class:"msg-item"},W={class:"msg-item-right"},z={style:{"font-size":"10px","margin-bottom":"0px"}},B={key:1,class:"msg-item",style:{"justify-content":"flex-end"}},U={class:"msg-item-right"},V={style:{"font-size":"10px","margin-bottom":"0px"}},j={class:"chat-input"},F={class:"btn-send"};function M(o,e,y,u,a,p){const f=i("a-avatar"),m=i("a-card"),b=i("a-textarea"),g=i("a-button"),S=i("a-layout"),h=i("a-input"),k=i("a-form-item"),x=i("a-form");return a.visible?(c(),v(m,{key:1,class:"enter-card"},{default:n(()=>[t(x,{name:"basic",autocomplete:"off"},{default:n(()=>[t(k,null,{default:n(()=>[t(h,{value:a.uid,"onUpdate:value":e[1]||(e[1]=s=>a.uid=s),placeholder:"\u8BF7\u8F93\u5165uid"},null,8,["value"])]),_:1}),t(k,null,{default:n(()=>[t(h,{value:a.nickname,"onUpdate:value":e[2]||(e[2]=s=>a.nickname=s),placeholder:"\u8BF7\u8F93\u5165nickname"},null,8,["value"])]),_:1})]),_:1}),t(g,{type:"primary",style:{width:"100%"},onClick:p.handleOk},{default:n(()=>[r("\u786E \u8BA4")]),_:1},8,["onClick"])]),_:1})):(c(),v(S,{key:0},{default:n(()=>[l("div",I,[(c(!0),_(J,null,w(a.messageList,(s,N)=>(c(),_("div",{key:N},[s.uid!==a.uid?(c(),_("div",C,[t(f,{style:{"background-color":"#f56a00","margin-right":"10px"}},{default:n(()=>[r(d(s.uid),1)]),_:2},1024),l("div",W,[l("p",z,d(s.date),1),t(m,{style:{"font-size":"16px"}},{default:n(()=>[r(d(s.msg),1)]),_:2},1024)])])):(c(),_("div",B,[l("div",U,[l("p",V,d(s.date),1),t(m,{style:{"font-size":"16px"}},{default:n(()=>[r(d(s.msg),1)]),_:2},1024)]),t(f,{style:{"background-color":"#1890ff","margin-left":"10px"}},{default:n(()=>[r(d(s.uid),1)]),_:2},1024)]))]))),128))]),l("div",j,[t(b,{value:a.value,"onUpdate:value":e[0]||(e[0]=s=>a.value=s),"allow-clear":""},null,8,["value"]),l("div",F,[t(g,{type:"primary",style:{"margin-left":"20px"},disabled:!a.value,onClick:p.send},{default:n(()=>[r("\u53D1 \u9001")]),_:1},8,["disabled","onClick"])])])]),_:1}))}const E=O(L,[["render",M],["__scopeId","data-v-6c408b96"]]);export{E as default};