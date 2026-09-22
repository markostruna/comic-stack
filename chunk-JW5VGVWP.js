import{a as O}from"./chunk-MEUS3PTT.js";import{e as S}from"./chunk-IMOSEOKP.js";import{I as y}from"./chunk-CXUHBRWM.js";import{Ab as v,Cb as M,Eb as c,Ic as B,La as r,Sb as e,Tb as g,Ub as x,Wa as u,Yb as w,ga as b,la as f,lb as d,ma as _,mb as k,ob as C,pb as h,qb as p,rb as o,sb as i,wa as s}from"./chunk-WIMJFYSB.js";var E=t=>["/reader",t],I=(t,m)=>m.id;function D(t,m){t&1&&(e(0,`
  `),o(1,"p",5),e(2,"Loading bookmarks..."),i(),e(3,`
  `))}function L(t,m){if(t&1&&(e(0,`
  `),o(1,"p",6),e(2),i(),e(3,`
  `)),t&2){let n=c();r(2),g(n.error())}}function T(t,m){t&1&&(e(0,`
  `),o(1,"p",5),e(2,"You have no saved bookmarks yet."),i(),e(3,`
  `))}function F(t,m){if(t&1&&(e(0,`
        `),o(1,"span",12),e(2),i(),e(3,`
        `)),t&2){let n=c().$implicit;r(2),g(n.note)}}function N(t,m){if(t&1){let n=v();e(0,`
    `),o(1,"article",8),e(2,`
      `),o(3,"a",9),e(4,`
        `),o(5,"span",10),e(6),i(),e(7,`
        `),o(8,"span"),e(9),i(),e(10,`
        `),d(11,F,4,1),i(),e(12,`
      `),o(13,"button",11),M("click",function(){let l=f(n).$implicit,P=c(2);return _(P.deleteBookmark(l))}),e(14,`
        `),o(15,"mat-icon"),e(16,"delete_outline"),i(),e(17,`
      `),i(),e(18,`
    `),i(),e(19,`
    `)}if(t&2){let n=m.$implicit,a=c(2);r(3),p("routerLink",w(5,E,n.comicId)),r(3),x("Comic #",n.comicId),r(3),x("Page ",n.pageIndex+1),r(2),k(n.note?11:-1),r(2),p("disabled",a.deletingId()!==null)}}function $(t,m){if(t&1&&(e(0,`
  `),o(1,"div",7),e(2,`
    `),C(3,N,20,7,null,null,I),i(),e(5,`
  `)),t&2){let n=c();r(3),h(n.bookmarks())}}var A=(()=>{class t{constructor(){this.userState=b(O),this.bookmarks=s([]),this.isLoading=s(!0),this.error=s(""),this.deletingId=s(null)}ngOnInit(){this.loadBookmarks()}deleteBookmark(n){this.deletingId()===null&&(this.deletingId.set(n.id),this.userState.deleteBookmark(n.id).subscribe({next:()=>this.bookmarks.update(a=>a.filter(l=>l.id!==n.id)),error:()=>this.error.set("Unable to delete bookmark."),complete:()=>this.deletingId.set(null)}))}loadBookmarks(){this.userState.readBookmarks().subscribe({next:n=>this.bookmarks.set(n),error:()=>this.error.set("Unable to load bookmarks."),complete:()=>this.isLoading.set(!1)})}static{this.\u0275fac=function(a){return new(a||t)}}static{this.\u0275cmp=u({type:t,selectors:[["app-bookmarks"]],decls:22,vars:1,consts:[["aria-labelledby","bookmarks-title",1,"bookmarks-page"],[1,"bookmarks-header"],[1,"eyebrow"],["id","bookmarks-title"],["routerLink","/publisher",1,"back-link"],[1,"status"],["role","alert",1,"status","error"],[1,"bookmark-list"],[1,"bookmark-row"],[1,"bookmark-page",3,"routerLink"],[1,"bookmark-comic"],["mat-icon-button","","type","button","title","Delete bookmark","aria-label","Delete bookmark",3,"click","disabled"],[1,"bookmark-note"]],template:function(a,l){a&1&&(o(0,"section",0),e(1,`
  `),o(2,"header",1),e(3,`
    `),o(4,"div"),e(5,`
      `),o(6,"p",2),e(7,"Library"),i(),e(8,`
      `),o(9,"h1",3),e(10,"Bookmarks"),i(),e(11,`
    `),i(),e(12,`
    `),o(13,"a",4),e(14,"Back to comics"),i(),e(15,`
  `),i(),e(16,`

  `),d(17,D,4,0)(18,L,4,1)(19,T,4,0)(20,$,6,0),i(),e(21,`
`)),a&2&&(r(17),k(l.isLoading()?17:l.error()?18:l.bookmarks().length===0?19:20))},dependencies:[S,B,y],styles:["[_nghost-%COMP%]{display:block;min-height:100%}.bookmarks-page[_ngcontent-%COMP%]{max-width:900px;margin:0 auto;padding:clamp(1.5rem,4vw,3.5rem);color:#f4f1ea}.bookmarks-header[_ngcontent-%COMP%]{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:2rem;border-bottom:1px solid rgba(255,255,255,.18);padding-bottom:1rem}.eyebrow[_ngcontent-%COMP%]{margin:0 0 .35rem;color:#80cbc4;font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}h1[_ngcontent-%COMP%]{margin:0;color:#fff;font-family:Georgia,serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:400}.back-link[_ngcontent-%COMP%]{color:#fff;font-weight:600;text-decoration:none}.back-link[_ngcontent-%COMP%]:hover{color:#f1c40f;text-decoration:none}.status[_ngcontent-%COMP%]{margin:2rem 0;color:#c5d1d1}.error[_ngcontent-%COMP%]{color:#ffab91}.bookmark-list[_ngcontent-%COMP%]{display:grid;gap:.5rem}.bookmark-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;min-height:68px;border:1px solid rgba(255,255,255,.14);background:#00000038}.bookmark-page[_ngcontent-%COMP%]{display:grid;gap:.2rem;min-width:0;padding:.85rem 1rem;color:#f4f1ea;text-decoration:none}.bookmark-page[_ngcontent-%COMP%]:hover{background:#80cbc41f}.bookmark-comic[_ngcontent-%COMP%]{color:#80cbc4;font-weight:700}.bookmark-note[_ngcontent-%COMP%]{overflow:hidden;color:#aebcbc;font-size:.9rem;text-overflow:ellipsis;white-space:nowrap}@media(max-width:600px){.bookmarks-page[_ngcontent-%COMP%]{padding:1.25rem .75rem}.bookmarks-header[_ngcontent-%COMP%]{align-items:start;flex-direction:column}}"],changeDetection:0})}}return t})();export{A as BookmarksComponent};
