import{a as Ge}from"./chunk-I7ZJVN7A.js";import{d as $e}from"./chunk-IMOSEOKP.js";import{b as lt,p as ct,q as ut,t as mt,w as dt}from"./chunk-AO3V3DRX.js";import{G as it,H as ot,I as rt,K as st,e as fe,f as Ze,g as qe,m as _e,s as et,u as tt,v as nt}from"./chunk-CXUHBRWM.js";import{a as Ke}from"./chunk-WNHJ4PIH.js";import{$a as Oe,Ab as ne,Ba as J,Bb as He,Ca as ke,Cb as H,Cc as d,Db as je,Dc as Qe,E as $,Eb as h,Fb as de,Fc as Je,G as Me,Gb as ie,Hb as Ue,I as O,Ib as Ve,Ic as at,Jb as j,Kb as U,L as Ce,La as c,Ma as Ie,Na as Pe,Ob as pe,Pa as Te,Qb as he,Ra as Re,Rb as Ye,Sa as Ee,Sb as l,Tb as ze,U as K,Ub as ge,V as A,W as Q,Wa as b,Xb as We,Y as G,Ya as ue,a as R,aa as x,b as W,bb as Ae,da as F,ea as xe,f as M,fc as D,ga as s,j as C,jb as L,jc as oe,la as f,lb as ee,lc as S,ma as _,mb as te,na as De,nb as Fe,ob as Be,pa as Z,pb as Le,qa as Se,qb as g,r as ce,rb as u,s as E,sb as m,ta as q,tb as N,ua as we,ub as me,vb as Ne,w as X,wa as B,xc as Xe}from"./chunk-WIMJFYSB.js";var St=xe;function wt(n){return!!n[St]}var kt=Symbol("__destroy"),It=Symbol("__decoratorApplied");function pt(n){return typeof n=="string"?Symbol(`__destroy__${n}`):kt}function Pt(n){n.prototype[It]=!0}function ht(n,o){n[o]||(n[o]=new C)}function gt(n,o){n[o]&&(n[o].next(),n[o].complete(),n[o]=null)}function ft(n){n instanceof M&&n.unsubscribe()}function Tt(n){Array.isArray(n)&&n.forEach(ft)}function _t(n,o){return function(){if(n&&n.call(this),gt(this,pt()),o.arrayName&&Tt(this[o.arrayName]),o.checkProperties)for(let e in this)o.blackList?.includes(e)||ft(this[e])}}function Rt(n,o){n.prototype.ngOnDestroy=_t(n.prototype.ngOnDestroy,o)}function Et(n,o){let e=n.\u0275pipe;e.onDestroy=_t(e.onDestroy,o)}function un(n={}){return o=>{wt(o)?Et(o,n):Rt(o,n),Pt(o)}}function Ot(n,o,e){let t=n[o];ht(n,e),n[o]=function(){t.apply(this,arguments),gt(this,e),n[o]=t}}function mn(n,o){return e=>{let t=pt(o);typeof o=="string"?Ot(n,o,t):ht(n,t);let i=n[t];return e.pipe(Q(i))}}var hn=(n,o)=>{let e=/^(http|https):/i.test(n.url),t=n.url.startsWith(d.serverUrl),i=n.url.startsWith("/api/")||n.url.startsWith(d.apiUrl);return!e&&!t&&!i&&(n=n.clone({url:d.serverUrl+n.url})),o(n)};var V="credentials",re=(()=>{class n{constructor(){this._credentials=null;let e=sessionStorage.getItem(V)||localStorage.getItem(V);e&&(this._credentials=JSON.parse(e))}isAuthenticated(){return!!this.credentials}get credentials(){return this._credentials}setCredentials(e,t){this._credentials=e||null,e?(t?localStorage:sessionStorage).setItem(V,JSON.stringify(e)):(sessionStorage.removeItem(V),localStorage.removeItem(V))}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275prov=x({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var bt=(()=>{class n{constructor(){this.http=s(Xe),this.credentialsService=s(re)}login(e){return this.http.post(`${d.apiUrl}auth/login`,{username:e.username,password:e.password}).pipe(X(t=>({id:t.user.id,username:t.user.username,role:t.user.role,token:t.accessToken,refreshToken:t.refreshToken})),G(t=>this.credentialsService.setCredentials(t,e.remember)))}refresh(){let e=this.credentialsService.credentials;return this.http.post(`${d.apiUrl}auth/refresh`,{refreshToken:e?.refreshToken}).pipe(X(t=>W(R({},e),{token:t.accessToken})),G(t=>this.credentialsService.setCredentials(t,!!e?.refreshToken)))}logout(){let e=this.credentialsService.credentials?.refreshToken;return this.http.post(`${d.apiUrl}auth/logout`,{refreshToken:e}).pipe(X(()=>!0),G(()=>this.credentialsService.setCredentials()))}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275prov=x({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var Rn=(n,o)=>{let e=s(re),t=s(bt),i=s($e),r=n.url.startsWith(`${d.apiUrl}auth/`),a=e.credentials,p=a&&!r?n.clone({setHeaders:{Authorization:`Bearer ${a.token}`}}):n;return o(p).pipe(O(y=>y.status!==401||r||!a?.refreshToken?E(()=>y):t.refresh().pipe(A(()=>o(n.clone({setHeaders:{Authorization:`Bearer ${e.credentials.token}`}}))),O(P=>(e.setCredentials(),i.navigate(["/login"],{replaceUrl:!0}),E(()=>P))))))};var v=(function(n){return n[n.Off=0]="Off",n[n.Error=1]="Error",n[n.Warning=2]="Warning",n[n.Info=3]="Info",n[n.Debug=4]="Debug",n})(v||{}),w=class n{static{this.level=v.Debug}static{this.outputs=[]}static enableProductionMode(){n.level=v.Warning}constructor(o){this.source=o}debug(...o){this.log(console.log,v.Debug,o)}info(...o){this.log(console.info,v.Info,o)}warn(...o){this.log(console.warn,v.Warning,o)}error(...o){this.log(console.error,v.Error,o)}log(o,e,t){if(e<=n.level){let i=this.source?["["+this.source+"]"].concat(t):t;o.apply(console,i),n.outputs.forEach(r=>r.apply(r,[this.source,e,...t]))}}};var At=new w("ErrorHandlerInterceptor"),Nn=(n,o)=>o(n).pipe(O(e=>(d.production||At.error("Request error",e),E(()=>e))));var zn=(()=>{class n{constructor(){this.isLoading=D(!1),this.size=D(1),this.message=D()}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=b({type:n,selectors:[["app-loader"]],inputs:{isLoading:[1,"isLoading"],size:[1,"size"],message:[1,"message"]},decls:8,vars:4,consts:[[3,"hidden"],["mode","indeterminate",3,"strokeWidth","diameter"],[1,"message"]],template:function(t,i){t&1&&(u(0,"div",0),l(1,`
  `),N(2,"mat-progress-spinner",1),l(3,`
  `),u(4,"span",2),l(5),m(),l(6,`
`),m(),l(7,`
`)),t&2&&(g("hidden",!i.isLoading()),c(2),g("strokeWidth",2)("diameter",32*i.size()),c(3),ze(i.message()))},dependencies:[Ge],styles:[".mat-mdc-progress-spinner[_ngcontent-%COMP%]{display:inline-block;vertical-align:middle}.message[_ngcontent-%COMP%]{margin-left:.5em}"],changeDetection:0})}}return n})();var jt=["mat-menu-item",""],Ut=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],Vt=["mat-icon, [matMenuItemIcon]","*"];function Yt(n,o){n&1&&(De(),u(0,"svg",2),N(1,"polygon",3),m())}var zt=["*"];function Wt(n,o){if(n&1){let e=ne();me(0,"div",0),je("click",function(){f(e);let i=h();return _(i.closed.emit("click"))})("animationstart",function(i){f(e);let r=h();return _(r._onAnimationStart(i.animationName))})("animationend",function(i){f(e);let r=h();return _(r._onAnimationDone(i.animationName))})("animationcancel",function(i){f(e);let r=h();return _(r._onAnimationDone(i.animationName))}),me(1,"div",1),ie(2),Ne()()}if(n&2){let e=h();Ye(e._classList),he("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),He("id",e.panelId),L("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var ve=new F("MAT_MENU_PANEL"),z=(()=>{class n{_elementRef=s(J);_document=s(Se);_focusMonitor=s(_e);_parentMenu=s(ve,{optional:!0});_changeDetectorRef=s(oe);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new C;_focused=new C;_highlighted=!1;_triggersSubmenu=!1;constructor(){s(Je).load(ot),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let i=0;i<t.length;i++)t[i].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=b({type:n,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,i){t&1&&H("click",function(a){return i._checkDisabled(a)})("mouseenter",function(){return i._handleMouseEnter()}),t&2&&(L("role",i.role)("tabindex",i._getTabIndex())("aria-disabled",i.disabled)("disabled",i.disabled||null),he("mat-mdc-menu-item-highlighted",i._highlighted)("mat-mdc-menu-item-submenu-trigger",i._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",S],disableRipple:[2,"disableRipple","disableRipple",S]},exportAs:["matMenuItem"],attrs:jt,ngContentSelectors:Vt,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,i){t&1&&(de(Ut),ie(0),u(1,"span",0),ie(2,1),m(),N(3,"div",1),ee(4,Yt,2,0,":svg:svg",2)),t&2&&(c(3),g("matRippleDisabled",i.disableRipple||i.disabled)("matRippleTrigger",i._getHostElement()),c(),te(i._triggersSubmenu?4:-1))},dependencies:[it],encapsulation:2,changeDetection:0})}return n})();var Xt=new F("MatMenuContent");var $t=new F("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),be="_mat-menu-enter",se="_mat-menu-exit",I=(()=>{class n{_elementRef=s(J);_changeDetectorRef=s(oe);_injector=s(Z);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=fe();_allItems;_directDescendantItems=new ke;_classList={};_panelAnimationState="void";_animationDone=new C;_isAnimating=B(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let t=this._previousPanelClass,i=R({},this._classList);t&&t.length&&t.split(" ").forEach(r=>{i[r]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(r=>{i[r]=!0}),this._elementRef.nativeElement.className=""),this._classList=i}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new q;close=this.closed;panelId=s(nt).getId("mat-menu-panel-");constructor(){let e=s($t);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new tt(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(K(this._directDescendantItems),A(e=>$(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let i=e.toArray(),r=Math.max(0,Math.min(i.length-1,t.activeItemIndex||0));i[r]&&!i[r].disabled?t.setActiveItem(r):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(K(this._directDescendantItems),A(t=>$(...t.map(i=>i._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,i=this._keyManager;switch(t){case 27:et(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&i.setFocusOrigin("keyboard"),i.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=Ie(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let i=this._keyManager;i.setFocusOrigin(e).setFirstItemActive(),!i.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=W(R({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===se;(t||e===be)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===be||e===se)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(se),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?be:se)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(K(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=b({type:n,selectors:[["mat-menu"]],contentQueries:function(t,i,r){if(t&1&&Ue(r,Xt,5)(r,z,5)(r,z,4),t&2){let a;j(a=U())&&(i.lazyContent=a.first),j(a=U())&&(i._allItems=a),j(a=U())&&(i.items=a)}},viewQuery:function(t,i){if(t&1&&Ve(Pe,5),t&2){let r;j(r=U())&&(i.templateRef=r.first)}},hostVars:3,hostBindings:function(t,i){t&2&&L("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",S],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:S(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[We([{provide:ve,useExisting:n}])],ngContentSelectors:zt,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,i){t&1&&(de(),Ae(0,Wt,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2,changeDetection:0})}return n})(),Kt=new F("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let n=s(Z);return()=>ct(n)}});var k=new WeakMap,Qt=(()=>{class n{_canHaveBackdrop;_element=s(J);_viewContainerRef=s(Ee);_menuItemInstance=s(z,{optional:!0,self:!0});_dir=s(Qe,{optional:!0});_focusMonitor=s(_e);_ngZone=s(we);_injector=s(Z);_scrollStrategy=s(Kt);_changeDetectorRef=s(oe);_animationsDisabled=fe();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=M.EMPTY;_menuCloseSubscription=M.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=s(ve,{optional:!0});this._parentMaterialMenu=t instanceof I?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&k.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let i=k.get(t);k.set(t,this),i&&i!==this&&i._closeMenu();let r=this._createOverlay(t),a=r.getConfig(),p=a.positionStrategy;this._setPosition(t,p),this._canHaveBackdrop?a.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:a.hasBackdrop=t.hasBackdrop??!1,r.hasAttached()||(r.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),t instanceof I&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(Q(t.close)).subscribe(()=>{p.withLockedPosition(!1).reapplyLastPosition(),p.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,i=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),i instanceof I&&this._ownsMenu(i)?(this._pendingRemoval=i._animationDone.pipe(Ce(1)).subscribe(()=>{t.detach(),k.has(i)||i.lazyContent?.detach()}),i._setIsOpen(!1)):(t.detach(),i?.lazyContent?.detach()),i&&this._ownsMenu(i)&&k.delete(i),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=dt(this._injector,t),this._overlayRef.keydownEvents().subscribe(i=>{this._menu instanceof I&&this._menu._handleKeydown(i)})}return this._overlayRef}_getOverlayConfig(e){return new ut({positionStrategy:mt(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(i=>{this._ngZone.run(()=>{let r=i.connectionPair.overlayX==="start"?"after":"before",a=i.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(r,a)})})}_setPosition(e,t){let[i,r]=e.xPosition==="before"?["end","start"]:["start","end"],[a,p]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[y,P]=[a,p],[ae,le]=[i,r],T=0;if(this._triggersSubmenu()){if(le=i=e.xPosition==="before"?"start":"end",r=ae=i==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let ye=this._parentMaterialMenu.items.first;this._parentInnerPadding=ye?ye._getHostElement().offsetTop:0}T=a==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(y=a==="top"?"bottom":"top",P=p==="top"?"bottom":"top");t.withPositions([{originX:i,originY:y,overlayX:ae,overlayY:a,offsetY:T},{originX:r,originY:y,overlayX:le,overlayY:a,offsetY:T},{originX:i,originY:P,overlayX:ae,overlayY:p,offsetY:-T},{originX:r,originY:P,overlayX:le,overlayY:p,offsetY:-T}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),i=this._parentMaterialMenu?this._parentMaterialMenu.closed:ce(),r=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(Me(a=>this._menuOpen&&a!==this._menuItemInstance)):ce();return $(e,i,r,t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new lt(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return k.get(e)===this}_triggerIsAriaDisabled(){return S(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){Re()};static \u0275dir=ue({type:n})}return n})(),Mt=(()=>{class n extends Qt{_cleanupTouchstart;_hoverSubscription=M.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new q;onMenuOpen=this.menuOpened;menuClosed=new q;onMenuClose=this.menuClosed;constructor(){super(!0);let e=s(Te);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{qe(t)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){Ze(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(t){return new(t||n)};static \u0275dir=ue({type:n,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,i){t&1&&H("click",function(a){return i._handleClick(a)})("mousedown",function(a){return i._handleMousedown(a)})("keydown",function(a){return i._handleKeydown(a)}),t&2&&L("aria-haspopup",i.menu?"menu":null)("aria-expanded",i.menuOpen)("aria-controls",i.menuOpen?i.menu==null?null:i.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[Oe]})}return n})();var Ct={APP_NAME:"Comic stack",About:"About",Comics:"Comics","Hello world !":"Hello world !",Home:"Home",Login:"Login",Logout:"Logout","Parse folders":"Parse folders",Password:"Password","Password is required":"Password is required",Publishers:"Publishers","Remember me":"Remember me",Search:"Search",Tools:"Tools",Username:"Username","Username is required":"Username is required","Username or password incorrect.":"Username or password incorrect.",Version:"Version",Import:"Import",Store:"Store",Preview:"Preview","Stored data":"Stored data","No stored catalog":"No stored catalog. Import and store comic data from Tools.",path:"Comic path",thumbnailPath:"Thumbnail path",coverPath:"Cover path",comicMissing:"Comic missing",thumbnailMissing:"Thumbnail missing",coverMissing:"Cover missing","Reset missing information":"Reset missing information",Edit:"Edit",Details:"Details","Comic details":"Comic details",Close:"Close","Edit comic":"Edit comic",Save:"Save",Cancel:"Cancel",Actions:"Actions",missingInformation:"Missing",Thumbnail:"Thumbnail",Cover:"Cover",Availability:"Availability","Comic file":"Comic file",Missing:"Missing",Available:"Available",Unknown:"Unknown","Checking availability":"Checking availability...",filename:"Filename",originalFilename:"Original filename",heroesResolved:"Hero",collection:"Collection",missing:"Is missing?",numberResolved:"Number",publisherResolved:"Publisher",titlesResolved:"Titles"};var Zt=new w("I18nService"),xt="language",Dt=(()=>{class n{constructor(){this.translateService=s(Ke),this.translateService.setTranslation("en-US",Ct)}init(e,t){this.defaultLanguage=e,this.supportedLanguages=t,this.language="",this.langChangeSubscription=this.translateService.onLangChange.subscribe(i=>{localStorage.setItem(xt,i.lang)})}destroy(){this.langChangeSubscription&&this.langChangeSubscription.unsubscribe()}set language(e){let t=e||localStorage.getItem(xt)||this.translateService.getBrowserCultureLang()||"",i=this.supportedLanguages.includes(t);t&&!i&&(t=t.split("-")[0],t=this.supportedLanguages.find(r=>r.startsWith(t))||"",i=!!t),(!t||!i)&&(t=this.defaultLanguage),e=t,Zt.debug(`Language set to ${e}`),this.translateService.use(e)}get language(){return this.translateService.currentLang}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275prov=x({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();function qt(n,o){if(n&1&&(l(0,`
`),u(1,"button",1),l(2,`
  `),u(3,"mat-icon"),l(4,"language"),m(),l(5,`
`),m(),l(6,`
`)),n&2){h();let e=pe(3);c(),g("matMenuTriggerFor",e)}}function Jt(n,o){if(n&1&&(l(0,`
`),u(1,"button",2),l(2),m(),l(3,`
`)),n&2){let e=h(),t=pe(3);c(),g("matMenuTriggerFor",t),c(),ge(`
  `,e.currentLanguage(),`
`)}}function en(n,o){if(n&1){let e=ne();l(0,`
  `),u(1,"button",3),H("click",function(){let i=f(e).$implicit,r=h();return _(r.setLanguage(i))}),l(2),m(),l(3,`
  `)}if(n&2){let e=o.$implicit;c(2),ge(`
    `,e,`
  `)}}var Ki=(()=>{class n{constructor(){this.i18nService=s(Dt),this.icon=D(!1),this.currentLanguage=B(""),this.languages=B([])}ngOnInit(){this.currentLanguage.set(this.i18nService.language),this.languages.set(this.i18nService.supportedLanguages)}setLanguage(e){this.i18nService.language=e,this.currentLanguage.set(this.i18nService.language)}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=b({type:n,selectors:[["app-language-selector"]],inputs:{icon:[1,"icon"]},decls:8,vars:1,consts:[["languageMenu","matMenu"],["mat-icon-button","",3,"matMenuTriggerFor"],["mat-raised-button","","color","primary",3,"matMenuTriggerFor"],["mat-menu-item","",3,"click"]],template:function(t,i){t&1&&(ee(0,qt,7,1)(1,Jt,4,2),u(2,"mat-menu",null,0),l(4,`
  `),Be(5,en,4,1,null,null,Fe),m(),l(7,`
`)),t&2&&(te(i.icon()?0:1),c(5),Le(i.languages()))},dependencies:[rt,Mt,at,st,I,z],encapsulation:2,changeDetection:0})}}return n})();export{un as a,mn as b,hn as c,re as d,bt as e,Rn as f,w as g,Nn as h,zn as i,Dt as j,z as k,I as l,Mt as m,Ki as n};
