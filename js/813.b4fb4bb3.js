"use strict";(self["webpackChunkproject2022"]=self["webpackChunkproject2022"]||[]).push([[813],{9150:function(a,t,s){s.d(t,{Z:function(){return h}});var e=s(6252),n=s(3577);const o={class:"toast-container position-fixed top-0 end-0 pt-3 pe-3",style:{"z-index":"9999"}},i={class:"text-white me-auto"},l=(0,e._)("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"toast","aria-label":"Close"},null,-1),r={key:0,class:"toast-body"};function c(a,t,s,c,u,d){return(0,e.wg)(),(0,e.iD)("div",o,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(u.msg,((a,t)=>((0,e.wg)(),(0,e.iD)("div",{key:"item"+t,class:(0,n.C_)(["toast show",`toast${t}`]),role:"alert","aria-live":"assertive","aria-atomic":"true"},[(0,e._)("div",{class:(0,n.C_)(["toast-header",`bg-${a.style}`]),style:{opacity:"0.87"}},[(0,e._)("strong",i,(0,n.zw)(a.title),1),l],2),a.content?((0,e.wg)(),(0,e.iD)("div",r,(0,n.zw)(a.content),1)):(0,e.kq)("",!0)],2)))),128))])}var u=s(9868),d={data(){return{msg:[]}},mounted(){u.Z.on("toastMessage",(a=>{this.msg.push(a),this.toastShow()}))},methods:{toastShow(){setTimeout((()=>{this.msg.shift()}),6e3)}}},v=s(3744);const m=(0,v.Z)(d,[["render",c]]);var h=m},2813:function(a,t,s){s.r(t),s.d(t,{default:function(){return C}});var e=s(6252),n=s(3577);const o={class:"navbar navbar-expand-lg navbar-light bg-light"},i={class:"container-fluid"},l=(0,e._)("a",{class:"navbar-brand",href:"#"},"後台管理系統",-1),r=(0,e._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,e._)("span",{class:"navbar-toggler-icon"})],-1),c={class:"collapse navbar-collapse",id:"navbarNav"},u={class:"navbar-nav"},d={class:"nav-item"},v=(0,e.Uk)("商品"),m={class:"nav-item"},h=(0,e.Uk)("訂單"),g={class:"nav-item"},p=(0,e.Uk)("優惠券"),b={class:"nav-item"},k=(0,e.Uk)("登出");function w(a,t,s,w,_,f){const y=(0,e.up)("router-link"),x=(0,e.up)("router-view"),C=(0,e.up)("toastMessage");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e._)("div",null,[(0,e._)("nav",o,[(0,e._)("div",i,[l,r,(0,e._)("div",c,[(0,e._)("ul",u,[(0,e._)("li",d,[(0,e.Wm)(y,{class:"nav-link",to:"/admin/manage"},{default:(0,e.w5)((()=>[v])),_:1})]),(0,e._)("li",m,[(0,e.Wm)(y,{class:"nav-link",to:"/admin/order"},{default:(0,e.w5)((()=>[h])),_:1})]),(0,e._)("li",g,[(0,e.Wm)(y,{class:"nav-link",to:"/admin/coupon"},{default:(0,e.w5)((()=>[p])),_:1})]),(0,e._)("li",b,[(0,e.Wm)(y,{class:"nav-link",to:"/admin/logout"},{default:(0,e.w5)((()=>[k])),_:1})]),((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(_.linkList,((t,s)=>((0,e.wg)(),(0,e.iD)("li",{key:"item"+s,class:"nav-item"},[(0,e.Wm)(y,{class:(0,n.C_)(["nav-link",{"fw-bold":a.$route.name===t}]),to:`/admin/${t}`},{default:(0,e.w5)((()=>[(0,e.Uk)((0,n.zw)(t),1)])),_:2},1032,["class","to"])])))),128))])])])])]),(0,e.Wm)(x),(0,e.Wm)(C)],64)}var _=s(9150),f={data(){return{linkList:["product","order","coupon","logout"],linkName:"",activeId:"product"}},created(){this.adminCheck()},components:{toastMessage:_.Z},watch:{},methods:{adminCheck(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common.Authorization=a,this.axios.post("https://vue3-course-api.hexschool.io/v2/api/user/check",a).then((()=>{})).catch((a=>{console.dir(a),this.$httpToastMessage(a.response,"登入")}))}}},y=s(3744);const x=(0,y.Z)(f,[["render",w]]);var C=x}}]);
//# sourceMappingURL=813.b4fb4bb3.js.map