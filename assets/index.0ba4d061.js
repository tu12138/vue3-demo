import{d as w,u as b,r as x,a as y,c as N,b as i,o as P,e as S,f as a,w as t,g as u,U as C,L as F,h as k,m,p as I,i as B,j,_ as O}from"./index.38b1c2b0.js";const U=r=>(I("data-v-9b651a06"),r=r(),B(),r),z={class:"login-container"},L=U(()=>j("h2",{class:"title"},"xiaohui\u7CFB\u7EDF\u767B\u5F55",-1)),R=w({__name:"index",setup(r){const _=b(),c=x(),e=y({userName:"xiaohui",password:"123456"}),p={userName:[{required:!0,message:"Please input user name",trigger:"blur"}],password:[{required:!0,validator:(n,s)=>{let o=s.trim();if(o){if(o.length<6)return Promise.reject("Password length is at least 6!")}else return Promise.reject("Please input the password!");return Promise.resolve()},trigger:"blur"}]},f=()=>{var n;(n=c.value)==null||n.validate().then(async()=>{console.log(e),m.success("Successfully"),_.push("/home"),sessionStorage.setItem("selectKeys",JSON.stringify(["/home"])),sessionStorage.setItem("userinfo",JSON.stringify(e))}).catch(s=>(m.error("Failed logged"),Promise.reject(s)))},g=N(()=>!(e.userName&&e.password));return(n,s)=>{const o=i("a-input"),d=i("a-form-item"),v=i("a-button"),h=i("a-form");return P(),S("div",z,[a(h,{model:e,name:"normal_login",class:"login-form",ref_key:"userFormRef",ref:c,rules:p},{default:t(()=>[L,a(d,{name:"userName"},{default:t(()=>[a(o,{value:e.userName,"onUpdate:value":s[0]||(s[0]=l=>e.userName=l),allowClear:"",size:"large"},{prefix:t(()=>[a(u(C),{class:"site-form-item-icon"})]),_:1},8,["value"])]),_:1}),a(d,{name:"password"},{default:t(()=>[a(o,{value:e.password,"onUpdate:value":s[1]||(s[1]=l=>e.password=l),type:"password",allowClear:"",size:"large"},{prefix:t(()=>[a(u(F),{class:"site-form-item-icon"})]),_:1},8,["value"])]),_:1}),a(v,{disabled:u(g),type:"primary",block:"",size:"large",onClick:f},{default:t(()=>[k(" Log in ")]),_:1},8,["disabled"])]),_:1},8,["model"])])}}});const E=O(R,[["__scopeId","data-v-9b651a06"]]);export{E as default};
