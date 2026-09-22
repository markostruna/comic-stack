import{a as se,b as Ge,c as We,d as M,e as P,k as Ue,o as Q,q as Qe,r as $e,s as qe,u as $,w as Ye,z as q}from"./chunk-AO3V3DRX.js";import{K as Ve,a as Le,e as ne,h as W,j as oe,m as je,o as Ne,p as ze,r as He,s as U,v as k}from"./chunk-CXUHBRWM.js";import{c as Fe,d as Re}from"./chunk-WNHJ4PIH.js";import{$a as O,B as R,Ba as z,Bb as te,Cb as ie,Cc as w,Dc as ae,E as ue,Eb as we,Ec as Be,G as S,Ha as ye,Ib as Te,Jb as Se,Kb as Ie,L as D,La as p,Ma as ve,Na as be,Pa as Ce,Qb as E,Sb as a,Tb as h,U as L,Ub as Ee,Wa as A,Xa as H,Ya as I,Zb as u,_a as De,_b as g,a as _,aa as x,ab as V,b as he,ba as B,da as b,ga as r,j as v,jb as G,jc as ke,l as X,lb as xe,mb as Ae,pa as y,qa as ge,qb as Oe,rb as l,sb as d,ta as j,tb as ee,ua as fe,w as J,wa as _e,wc as Me,xc as Pe,za as N}from"./chunk-WIMJFYSB.js";function lt(n,o){}var C=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext};var de=(()=>{class n extends We{_elementRef=r(z);_focusTrapFactory=r(ze);_config;_interactivityChecker=r(Ne);_ngZone=r(fe);_focusMonitor=r(je);_renderer=r(Ce);_changeDetectorRef=r(ke);_injector=r(y);_platform=r(Le);_document=r(ge);_portalOutlet;_focusTrapped=new v;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=r(C,{optional:!0})||new C,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{s(),m(),e.removeAttribute("tabindex")},s=this._renderer.listen(e,"blur",i),m=this._renderer.listen(e,"mousedown",i)})),e.focus(t)}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,t)}_trapFocus(e){this._isDestroyed||ve(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||t.focus(e);break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e=="string"?t=this._document.querySelector(e):typeof e=="boolean"?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus=="function"){let i=W(),s=this._elementRef.nativeElement;(!i||i===this._document.body||i===s||s.contains(i))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,t=W();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=W()))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=A({type:n,selectors:[["cdk-dialog-container"]],viewQuery:function(t,i){if(t&1&&Te(M,7),t&2){let s;Se(s=Ie())&&(i._portalOutlet=s.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,i){t&2&&G("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null)},features:[O],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,i){t&1&&V(0,lt,0,0,"ng-template",0)},dependencies:[M],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2})}return n})(),F=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new v;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(o,e){this.overlayRef=o,this.config=e,this.disableClose=e.disableClose,this.backdropClick=o.backdropClick(),this.keydownEvents=o.keydownEvents(),this.outsidePointerEvents=o.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!U(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=o.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(o,e){if(this._canClose(o)){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(o),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(o="",e=""){return this.overlayRef.updateSize({width:o,height:e}),this}addPanelClass(o){return this.overlayRef.addPanelClass(o),this}removePanelClass(o){return this.overlayRef.removePanelClass(o),this}_canClose(o){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(o,e,this.componentInstance))}},dt=new b("DialogScrollStrategy",{providedIn:"root",factory:()=>{let n=r(y);return()=>Q(n)}}),ct=new b("DialogData"),mt=new b("DefaultDialogConfig");function pt(n){let o=_e(n),e=new j;return{valueSignal:o,get value(){return o()},change:e,ngOnDestroy(){e.complete()}}}var ce=(()=>{class n{_injector=r(y);_defaultOptions=r(mt,{optional:!0});_parentDialog=r(n,{optional:!0,skipSelf:!0});_overlayContainer=r($e);_idGenerator=r(k);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new v;_afterOpenedAtThisLevel=new v;_ariaHiddenElements=new Map;_scrollStrategy=r(dt);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=R(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(L(void 0)));constructor(){}open(e,t){let i=this._defaultOptions||new C;t=_(_({},i),t),t.id=t.id||this._idGenerator.getId("cdk-dialog-"),t.id&&this.getDialogById(t.id);let s=this._getOverlayConfig(t),m=Ye(this._injector,s),c=new F(m,t),f=this._attachContainer(m,c,t);if(c.containerInstance=f,!this.openDialogs.length){let K=this._overlayContainer.getContainerElement();f._focusTrapped?f._focusTrapped.pipe(D(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(K)}):this._hideNonDialogContentFromAssistiveTechnology(K)}return this._attachDialogContent(e,c,f,t),this.openDialogs.push(c),c.closed.subscribe(()=>this._removeOpenDialog(c,!0)),this.afterOpened.next(c),c}closeAll(){re(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){re(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),re(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new Qe({positionStrategy:e.positionStrategy||$().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,i){let s=i.injector||i.viewContainerRef?.injector,m=[{provide:C,useValue:i},{provide:F,useValue:t},{provide:qe,useValue:e}],c;i.container?typeof i.container=="function"?c=i.container:(c=i.container.type,m.push(...i.container.providers(i))):c=de;let f=new se(c,i.viewContainerRef,y.create({parent:s||this._injector,providers:m}));return e.attach(f).instance}_attachDialogContent(e,t,i,s){if(e instanceof be){let m=this._createInjector(s,t,i,void 0),c={$implicit:s.data,dialogRef:t};s.templateContext&&(c=_(_({},c),typeof s.templateContext=="function"?s.templateContext():s.templateContext)),i.attachTemplatePortal(new Ge(e,null,c,m))}else{let m=this._createInjector(s,t,i,this._injector),c=i.attachComponentPortal(new se(e,s.viewContainerRef,m));t.componentRef=c,t.componentInstance=c.instance}}_createInjector(e,t,i,s){let m=e.injector||e.viewContainerRef?.injector,c=[{provide:ct,useValue:e.data},{provide:F,useValue:t}];return e.providers&&(typeof e.providers=="function"?c.push(...e.providers(t,e,i)):c.push(...e.providers)),e.direction&&(!m||!m.get(ae,null,{optional:!0}))&&c.push({provide:ae,useValue:pt(e.direction)}),y.create({parent:m||s,providers:c})}_removeOpenDialog(e,t){let i=this.openDialogs.indexOf(e);i>-1&&(this.openDialogs.splice(i,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((s,m)=>{s?m.setAttribute("aria-hidden",s):m.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let t=e.parentElement.children;for(let i=t.length-1;i>-1;i--){let s=t[i];s!==e&&s.nodeName!=="SCRIPT"&&s.nodeName!=="STYLE"&&!s.hasAttribute("aria-live")&&!s.hasAttribute("popover")&&(this._ariaHiddenElements.set(s,s.getAttribute("aria-hidden")),s.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(t){return new(t||n)};static \u0275prov=x({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function re(n,o){let e=n.length;for(;e--;)o(n[e])}var Ke=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=H({type:n});static \u0275inj=B({providers:[ce],imports:[q,P,He,P]})}return n})();function ht(n,o){}var Z=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration},me="mdc-dialog--open",Xe="mdc-dialog--opening",Je="mdc-dialog--closing",ut=150,gt=75,ft=(()=>{class n extends de{_animationStateChanged=new j;_animationsEnabled=!ne();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?tt(this._config.enterAnimationDuration)??ut:0;_exitAnimationDuration=this._animationsEnabled?tt(this._config.exitAnimationDuration)??gt:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(et,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Xe,me)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(me),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(me),this._animationsEnabled?(this._hostElement.style.setProperty(et,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Je)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(Xe,Je)}_waitForAnimationToComplete(e,t){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(t,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let t=super.attachComponentPortal(e);return t.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),t}static \u0275fac=(()=>{let e;return function(i){return(e||(e=N(n)))(i||n)}})();static \u0275cmp=A({type:n,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(t,i){t&2&&(te("id",i._config.id),G("aria-modal",i._config.ariaModal)("role",i._config.role)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null),E("_mat-animation-noopable",!i._animationsEnabled)("mat-mdc-dialog-container-with-actions",i._actionSectionCount>0))},features:[O],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(t,i){t&1&&(l(0,"div",0)(1,"div",1),V(2,ht,0,0,"ng-template",2),d()())},dependencies:[M],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2})}return n})(),et="--mat-dialog-transition-duration";function tt(n){return n==null?null:typeof n=="number"?n:n.endsWith("ms")?oe(n.substring(0,n.length-2)):n.endsWith("s")?oe(n.substring(0,n.length-1))*1e3:n==="0"?0:null}var Y=(function(n){return n[n.OPEN=0]="OPEN",n[n.CLOSING=1]="CLOSING",n[n.CLOSED=2]="CLOSED",n})(Y||{}),T=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new X(1);_beforeClosed=new X(1);_result;_closeFallbackTimeout;_state=Y.OPEN;_closeInteractionType;constructor(o,e,t){this._ref=o,this._config=e,this._containerInstance=t,this.disableClose=e.disableClose,this.id=o.id,o.addPanelClass("mat-mdc-dialog-panel"),t._animationStateChanged.pipe(S(i=>i.state==="opened"),D(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(S(i=>i.state==="closed"),D(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),o.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),ue(this.backdropClick(),this.keydownEvents().pipe(S(i=>i.keyCode===27&&!this.disableClose&&!U(i)))).subscribe(i=>{this.disableClose||(i.preventDefault(),_t(this,i.type==="keydown"?"keyboard":"mouse"))})}close(o){let e=this._config.closePredicate;e&&!e(o,this._config,this.componentInstance)||(this._result=o,this._containerInstance._animationStateChanged.pipe(S(t=>t.state==="closing"),D(1)).subscribe(t=>{this._beforeClosed.next(o),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100)}),this._state=Y.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(o){let e=this._ref.config.positionStrategy;return o&&(o.left||o.right)?o.left?e.left(o.left):e.right(o.right):e.centerHorizontally(),o&&(o.top||o.bottom)?o.top?e.top(o.top):e.bottom(o.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(o="",e=""){return this._ref.updateSize(o,e),this}addPanelClass(o){return this._ref.addPanelClass(o),this}removePanelClass(o){return this._ref.removePanelClass(o),this}getState(){return this._state}_finishDialogClose(){this._state=Y.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function _t(n,o,e){return n._closeInteractionType=o,n.close(e)}var pe=new b("MatMdcDialogData"),yt=new b("mat-mdc-dialog-default-options"),vt=new b("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let n=r(y);return()=>Q(n)}}),it=(()=>{class n{_defaultOptions=r(yt,{optional:!0});_scrollStrategy=r(vt);_parentDialog=r(n,{optional:!0,skipSelf:!0});_idGenerator=r(k);_injector=r(y);_dialog=r(ce);_animationsDisabled=ne();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new v;_afterOpenedAtThisLevel=new v;dialogConfigClass=Z;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=R(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(L(void 0)));constructor(){this._dialogRefConstructor=T,this._dialogContainerType=ft,this._dialogDataToken=pe}open(e,t){let i;t=_(_({},this._defaultOptions||new Z),t),t.id=t.id||this._idGenerator.getId("mat-mdc-dialog-"),t.scrollStrategy=t.scrollStrategy||this._scrollStrategy();let s=this._dialog.open(e,he(_({},t),{positionStrategy:$(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||t.enterAnimationDuration?.toLocaleString()==="0"||t.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:t},{provide:C,useValue:t}]},templateContext:()=>({dialogRef:i}),providers:(m,c,f)=>(i=new this._dialogRefConstructor(m,t,f),i.updatePosition(t?.position),[{provide:this._dialogContainerType,useValue:f},{provide:this._dialogDataToken,useValue:c.data},{provide:this._dialogRefConstructor,useValue:i}])}));return i.componentRef=s.componentRef,i.componentInstance=s.componentInstance,this.openDialogs.push(i),this.afterOpened.next(i),i.afterClosed().subscribe(()=>{let m=this.openDialogs.indexOf(i);m>-1&&(this.openDialogs.splice(m,1),this.openDialogs.length||this._getAfterAllClosed().next())}),i}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let t=e.length;for(;t--;)e[t].close()}static \u0275fac=function(t){return new(t||n)};static \u0275prov=x({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var nt=(()=>{class n{_dialogRef=r(T,{optional:!0});_elementRef=r(z);_dialog=r(it);constructor(){}ngOnInit(){this._dialogRef||(this._dialogRef=bt(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static \u0275fac=function(t){return new(t||n)};static \u0275dir=I({type:n})}return n})(),at=(()=>{class n extends nt{id=r(k).getId("mat-mdc-dialog-title-");_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=N(n)))(i||n)}})();static \u0275dir=I({type:n,selectors:[["","mat-dialog-title",""],["","matDialogTitle",""]],hostAttrs:[1,"mat-mdc-dialog-title","mdc-dialog__title"],hostVars:1,hostBindings:function(t,i){t&2&&te("id",i.id)},inputs:{id:"id"},exportAs:["matDialogTitle"],features:[O]})}return n})(),ot=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275dir=I({type:n,selectors:[["","mat-dialog-content",""],["mat-dialog-content"],["","matDialogContent",""]],hostAttrs:[1,"mat-mdc-dialog-content","mdc-dialog__content"],features:[De([Ue])]})}return n})(),st=(()=>{class n extends nt{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=N(n)))(i||n)}})();static \u0275dir=I({type:n,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(t,i){t&2&&E("mat-mdc-dialog-actions-align-start",i.align==="start")("mat-mdc-dialog-actions-align-center",i.align==="center")("mat-mdc-dialog-actions-align-end",i.align==="end")},inputs:{align:"align"},features:[O]})}return n})();function bt(n,o){let e=n.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?o.find(t=>t.id===e.id):null}var rt=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=H({type:n});static \u0275inj=B({providers:[it],imports:[Ke,q,P,Be]})}return n})();function Dt(n,o){if(n&1&&(a(0,`
      `),l(1,"div",9),a(2,`
        `),l(3,"span",10),a(4),u(5,"translate"),d(),a(6,`
        `),l(7,"span",12),a(8),d(),a(9,`
      `),d(),a(10,`
      `)),n&2){let e=we();p(4),h(g(5,2,"Collection")),p(4),h(e.comic.collection)}}var fi=(()=>{class n{constructor(){this.comic=r(pe),this.dialogRef=r(T)}close(){this.dialogRef.close()}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=A({type:n,selectors:[["app-comic-details-dialog"]],decls:87,vars:39,consts:[["mat-dialog-title",""],["mat-dialog-content","",1,"dialog-content"],[1,"dialog-layout"],[1,"thumbnail-panel"],[1,"section-label"],[3,"src","alt"],[1,"availability-value"],[1,"availability-dot"],[1,"fields","primary-fields"],[1,"detail-field"],[1,"field-label"],[1,"field-value","multiline"],[1,"field-value"],["mat-dialog-actions","","align","end"],["mat-flat-button","","color","primary","type","button",3,"click"]],template:function(t,i){t&1&&(l(0,"h2",0),a(1),u(2,"translate"),d(),a(3,`
`),l(4,"div",1),a(5,`
  `),l(6,"div",2),a(7,`
    `),l(8,"div",3),a(9,`
      `),l(10,"span",4),a(11),u(12,"translate"),d(),a(13,`
      `),ee(14,"img",5),a(15,`
      `),l(16,"span",6),a(17,`
        `),ee(18,"span",7),a(19),u(20,"translate"),u(21,"translate"),d(),a(22,`
    `),d(),a(23,`

    `),l(24,"div",8),a(25,`
      `),l(26,"div",9),a(27,`
        `),l(28,"span",10),a(29),u(30,"translate"),d(),a(31,`
        `),l(32,"span",11),a(33),d(),a(34,`
      `),d(),a(35,`
      `),l(36,"div",9),a(37,`
        `),l(38,"span",10),a(39),u(40,"translate"),d(),a(41,`
        `),l(42,"span",11),a(43),d(),a(44,`
      `),d(),a(45,`
      `),l(46,"div",9),a(47,`
        `),l(48,"span",10),a(49),u(50,"translate"),d(),a(51,`
        `),l(52,"span",12),a(53),d(),a(54,`
      `),d(),a(55,`
      `),l(56,"div",9),a(57,`
        `),l(58,"span",10),a(59),u(60,"translate"),d(),a(61,`
        `),l(62,"span",12),a(63),d(),a(64,`
      `),d(),a(65,`
      `),xe(66,Dt,11,4),l(67,"div",9),a(68,`
        `),l(69,"span",10),a(70),u(71,"translate"),d(),a(72,`
        `),l(73,"span",12),a(74),d(),a(75,`
      `),d(),a(76,`
    `),d(),a(77,`
  `),d(),a(78,`
`),d(),a(79,`
`),l(80,"div",13),a(81,`
  `),l(82,"button",14),ie("click",function(){return i.close()}),a(83),u(84,"translate"),d(),a(85,`
`),d(),a(86,`
`)),t&2&&(p(),h(g(2,19,"Comic details")),p(10),h(g(12,21,"Thumbnail")),p(3),Oe("src",i.comic.thumbnailPath,ye)("alt",i.comic.titlesResolved||i.comic.filename),p(2),E("missing-value",i.comic.comicMissing),p(3),Ee(`
        `,i.comic.comicMissing?g(20,23,"Missing"):g(21,25,"Available"),`
      `),p(10),h(g(30,27,"Titles")),p(4),h(i.comic.titlesResolved),p(6),h(g(40,29,"Hero")),p(4),h(i.comic.heroesResolved||" "),p(6),h(g(50,31,"Number")),p(4),h(i.comic.numberResolved),p(6),h(g(60,33,"Publisher")),p(4),h(i.comic.publisher),p(3),Ae(i.comic.collection?66:-1),p(4),h(g(71,35,"Original filename")),p(4),h(i.comic.originalFilename),p(9),h(g(84,37,"Close")))},dependencies:[rt,at,st,ot,Ve,Re,Fe],styles:[".dialog-content[_ngcontent-%COMP%]{min-width:min(820px,88vw);padding-top:4px}.dialog-layout[_ngcontent-%COMP%]{display:grid;grid-template-columns:132px minmax(0,calc(100% - 160px));gap:28px;align-items:start;margin-bottom:28px}.thumbnail-panel[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.thumbnail-panel[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:132px;height:198px;object-fit:contain;border-radius:2px;background:#171717;box-shadow:0 2px 8px #00000059}.section-label[_ngcontent-%COMP%], .field-label[_ngcontent-%COMP%]{color:#fff9;font-size:12px;line-height:1.2}.availability-value[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:8px;width:fit-content;color:#2e7d32;font-size:16px}.missing-value[_ngcontent-%COMP%]{color:#b3261e}.availability-dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%;background:currentcolor}.fields[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,calc(50% - 14px)));gap:20px 28px}.primary-fields[_ngcontent-%COMP%]{gap:18px 28px}.detail-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px;min-width:0}.primary-fields[_ngcontent-%COMP%]   .detail-field[_ngcontent-%COMP%]:last-child{grid-column:1/-1}.field-value[_ngcontent-%COMP%]{min-height:22px;overflow-wrap:anywhere;color:#ffffffeb;font-size:16px;line-height:1.35}.multiline[_ngcontent-%COMP%]{white-space:pre-wrap}@media(max-width:650px){.dialog-layout[_ngcontent-%COMP%], .fields[_ngcontent-%COMP%]{grid-template-columns:100%}.primary-fields[_ngcontent-%COMP%]   .detail-field[_ngcontent-%COMP%]:last-child{grid-column:auto}.dialog-layout[_ngcontent-%COMP%]{gap:18px}.thumbnail-panel[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:112px;height:168px}}"]})}}return n})();var xi=(()=>{class n{constructor(){this.http=r(Pe)}readPublishers(){return this.http.get(`${w.apiUrl}publishers`)}readComics(e){let t=e?`${w.apiUrl}publishers/${encodeURIComponent(e)}/comics`:`${w.apiUrl}comics?pageSize=10000`;return this.http.get(t).pipe(J(i=>Array.isArray(i)?i:i.items))}searchComics(e){let t=new Me().set("pageSize","10000");return Object.entries(e).forEach(([i,s])=>{s&&s!=="All"&&(t=t.set(i,s))}),this.http.get(`${w.apiUrl}comics`,{params:t}).pipe(J(i=>i.items))}readSearchOptions(){return this.http.get(`${w.apiUrl}search/options`)}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275prov=x({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();export{it as a,rt as b,fi as c,xi as d};
