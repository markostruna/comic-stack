import{a as re}from"./chunk-JGWATJXY.js";import{a as mt,b as ht}from"./chunk-DGCDZ7MM.js";import{a as Ke}from"./chunk-I7ZJVN7A.js";import{a as pt}from"./chunk-H4CQU3CW.js";import{b as dt}from"./chunk-LFYS75XJ.js";import{a as st}from"./chunk-MEUS3PTT.js";import{b as He,d as $e}from"./chunk-IMOSEOKP.js";import{b as H,c as se,d as ut,e as bt,f as _t}from"./chunk-UYVPAWHM.js";import{d as le}from"./chunk-4Z5BSF5U.js";import{a as ne,b as ie,c as it,f as oe,g as ot,h as ct,j as C,k as at,l as ce,m as rt,n as lt,q as ae}from"./chunk-E534F33P.js";import"./chunk-UVTCIYIH.js";import{l as nt}from"./chunk-AO3V3DRX.js";import{F as be,G as Ye,H as Xe,I as Ze,K as Je,L as et,e as Ge,v as Qe}from"./chunk-CXUHBRWM.js";import{c as Ue,d as qe}from"./chunk-WNHJ4PIH.js";import{$ as q,Ab as B,Ba as V,Bb as Ae,C as Me,Cb as g,Eb as x,Fb as Z,Fc as We,G as Se,Gb as A,Hb as Fe,Ib as J,Ic as tt,Jb as w,Kb as P,L as Oe,La as l,M as Ie,Ob as Le,Qa as D,Qb as v,Rb as Ne,Sb as o,Tb as p,U as we,Ub as ue,V as me,Vb as Re,W as S,Wa as I,Xa as W,Xb as ee,Y as he,Ya as pe,Yb as ze,Zb as s,_b as d,a as F,b as L,ba as G,cc as j,da as K,ec as Ve,ga as k,j as xe,jb as T,jc as te,k as ve,la as N,lb as y,lc as E,ma as R,mb as M,mc as Be,na as Pe,nb as Q,oa as Ee,ob as Y,pb as X,qb as h,r as Ce,rb as r,sb as a,ta as z,tb as b,tc as je,ua as De,w as U,wa as O,x as ye,ya as Te}from"./chunk-WIMJFYSB.js";var xt=["input"],vt=["label"],Ct=["*"],_e={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},yt=new K("mat-checkbox-default-options",{providedIn:"root",factory:()=>_e}),_=(function(i){return i[i.Init=0]="Init",i[i.Checked=1]="Checked",i[i.Unchecked=2]="Unchecked",i[i.Indeterminate=3]="Indeterminate",i})(_||{}),fe=class{source;checked},ft=(()=>{class i{_elementRef=k(V);_changeDetectorRef=k(te);_ngZone=k(De);_animationsDisabled=Ge();_options=k(yt,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let n=new fe;return n.source=this,n.checked=e,n}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new z;indeterminateChange=new z;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=_.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){k(We).load(Xe);let e=k(new Ve("tabindex"),{optional:!0});this._options=this._options||_e,this.color=this._options.color||_e.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=k(Qe).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let n=e!=this._indeterminate();this._indeterminate.set(e),n&&(e?this._transitionCheckState(_.Indeterminate):this._transitionCheckState(this.checked?_.Checked:_.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=O(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let n=this._currentCheckState,t=this._getAnimationTargetElement();if(!(n===e||!t)&&(this._currentAnimationClass&&t.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(n,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){t.classList.add(this._currentAnimationClass);let c=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{t.classList.remove(c)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?_.Checked:_.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,n){if(this._animationsDisabled)return"";switch(e){case _.Init:if(n===_.Checked)return this._animationClasses.uncheckedToChecked;if(n==_.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case _.Unchecked:return n===_.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case _.Checked:return n===_.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case _.Indeterminate:return n===_.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let n=this._inputElement;n&&(n.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=I({type:i,selectors:[["mat-checkbox"]],viewQuery:function(n,t){if(n&1&&J(xt,5)(vt,5),n&2){let c;w(c=P())&&(t._inputElement=c.first),w(c=P())&&(t._labelElement=c.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(n,t){n&2&&(Ae("id",t.id),T("tabindex",null)("aria-label",null)("aria-labelledby",null),Ne(t.color?"mat-"+t.color:"mat-accent"),v("_mat-animation-noopable",t._animationsDisabled)("mdc-checkbox--disabled",t.disabled)("mat-mdc-checkbox-disabled",t.disabled)("mat-mdc-checkbox-checked",t.checked)("mat-mdc-checkbox-disabled-interactive",t.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",E],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",E],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",E],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:Be(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",E],checked:[2,"checked","checked",E],disabled:[2,"disabled","disabled",E],indeterminate:[2,"indeterminate","indeterminate",E]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[ee([{provide:ne,useExisting:q(()=>i),multi:!0},{provide:it,useExisting:i,multi:!0}]),Te],ngContentSelectors:Ct,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(n,t){if(n&1&&(Z(),r(0,"div",3),g("click",function(m){return t._preventBubblingFromLabel(m)}),r(1,"div",4,0)(3,"div",5),g("click",function(){return t._onTouchTargetClick()}),a(),r(4,"input",6,1),g("blur",function(){return t._onBlur()})("click",function(){return t._onInputClick()})("change",function(m){return t._onInteractionEvent(m)}),a(),b(6,"div",7),r(7,"div",8),Pe(),r(8,"svg",9),b(9,"path",10),a(),Ee(),b(10,"div",11),a(),b(11,"div",12),a(),r(12,"label",13,2),A(14),a()()),n&2){let c=Le(2);h("labelPosition",t.labelPosition),l(4),v("mdc-checkbox--selected",t.checked),h("checked",t.checked)("indeterminate",t.indeterminate)("disabled",t.disabled&&!t.disabledInteractive)("id",t.inputId)("required",t.required)("tabIndex",t.disabled&&!t.disabledInteractive?-1:t.tabIndex),T("aria-label",t.ariaLabel||null)("aria-labelledby",t.ariaLabelledby)("aria-describedby",t.ariaDescribedby)("aria-checked",t.indeterminate?"mixed":null)("aria-controls",t.ariaControls)("aria-disabled",t.disabled&&t.disabledInteractive?!0:null)("aria-expanded",t.ariaExpanded)("aria-owns",t.ariaOwns)("name",t.name)("value",t.value),l(7),h("matRippleTrigger",c)("matRippleDisabled",t.disableRipple||t.disabled)("matRippleCentered",!0),l(),h("for",t.inputId)}},dependencies:[Ye,ht],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return i})();var gt=(()=>{class i{get vertical(){return this._vertical}set vertical(e){this._vertical=be(e)}_vertical=!1;get inset(){return this._inset}set inset(e){this._inset=be(e)}_inset=!1;static \u0275fac=function(n){return new(n||i)};static \u0275cmp=I({type:i,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(n,t){n&2&&(T("aria-orientation",t.vertical?"vertical":"horizontal"),v("mat-divider-vertical",t.vertical)("mat-divider-horizontal",!t.vertical)("mat-divider-inset",t.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(n,t){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-top-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-right-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2,changeDetection:0})}return i})();var St=["searchSelectInput"],Ot=["innerSelectSearch"],It=[[["",8,"mat-select-search-custom-header-content"]],[["","ngxMatSelectSearchClear",""]],[["","ngxMatSelectNoEntriesFound",""]]],wt=[".mat-select-search-custom-header-content","[ngxMatSelectSearchClear]","[ngxMatSelectNoEntriesFound]"];function Pt(i,u){if(i&1){let e=B();r(0,"mat-checkbox",10),g("change",function(t){N(e);let c=x();return R(c._emitSelectAllBooleanToParent(t.checked))}),a()}if(i&2){let e=x();h("color",e.matFormField==null?null:e.matFormField.color)("checked",e.toggleAllCheckboxChecked)("indeterminate",e.toggleAllCheckboxIndeterminate)("matTooltip",e.toggleAllCheckboxTooltipMessage)("matTooltipPosition",e.toggleAllCheckboxTooltipPosition)}}function Et(i,u){i&1&&b(0,"mat-spinner",7)}function Dt(i,u){i&1&&A(0,1)}function Tt(i,u){if(i&1&&b(0,"mat-icon",12),i&2){let e=x(2);h("svgIcon",e.closeSvgIcon)}}function At(i,u){if(i&1&&(r(0,"mat-icon"),o(1),a()),i&2){let e=x(2);l(),ue(" ",e.closeIcon," ")}}function Ft(i,u){if(i&1){let e=B();r(0,"button",11),g("click",function(){N(e);let t=x();return R(t._reset(!0))}),y(1,Dt,1,0)(2,Tt,1,1,"mat-icon",12)(3,At,2,1,"mat-icon"),a()}if(i&2){let e=x();l(),M(e.clearIcon?1:e.closeSvgIcon?2:3)}}function Lt(i,u){i&1&&A(0,2)}function Nt(i,u){if(i&1&&o(0),i&2){let e=x(2);ue(" ",e.noEntriesFoundLabel," ")}}function Rt(i,u){if(i&1&&(r(0,"div",9),y(1,Lt,1,0)(2,Nt,1,1),a()),i&2){let e=x();l(),M(e.noEntriesFound?1:2)}}var zt=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275dir=pe({type:i,selectors:[["","ngxMatSelectSearchClear",""]]})}return i})(),Vt=["ariaLabel","clearSearchInput","closeIcon","closeSvgIcon","disableInitialFocus","disableScrollToActiveOnOptionsChanged","enableClearOnEscapePressed","hideClearSearchButton","noEntriesFoundLabel","placeholderLabel","preventHomeEndKeyPropagation","searching"],Bt=new K("mat-selectsearch-default-options");var jt=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275dir=pe({type:i,selectors:[["","ngxMatSelectNoEntriesFound",""]]})}return i})(),ke=(()=>{class i{matSelect;changeDetectorRef;_viewportRuler;matOption;matFormField;placeholderLabel="Suche";type="text";closeIcon="close";closeSvgIcon;noEntriesFoundLabel="Keine Optionen gefunden";clearSearchInput=!0;searching=!1;disableInitialFocus=!1;enableClearOnEscapePressed=!1;preventHomeEndKeyPropagation=!1;disableScrollToActiveOnOptionsChanged=!1;ariaLabel="dropdown search";showToggleAllCheckbox=!1;toggleAllCheckboxChecked=!1;toggleAllCheckboxIndeterminate=!1;toggleAllCheckboxTooltipMessage="";toggleAllCheckboxTooltipPosition="below";hideClearSearchButton=!1;alwaysRestoreSelectedOptionsMulti=!1;recreateValuesArray=!1;toggleAll=new z;searchSelectInput;innerSelectSearch;clearIcon;noEntriesFound;get value(){return this._formControl.value}_lastExternalInputValue;onTouched=()=>{};set _options(e){this._options$.next(e)}get _options(){return this._options$.getValue()}_options$=new ve(null);optionsList$=this._options$.pipe(me(e=>e?e.changes.pipe(U(n=>n.toArray()),we(e.toArray())):Ce(null)));optionsLength$=this.optionsList$.pipe(U(e=>e?e.length:0));previousSelectedValues;_formControl=new C("",{nonNullable:!0});_showNoEntriesFound$=ye([this._formControl.valueChanges,this.optionsLength$]).pipe(U(([e,n])=>!!(this.noEntriesFoundLabel&&e&&n===this.getOptionsLengthOffset())));_onDestroy=new xe;activeDescendant;_removePanelKeydownListener;constructor(e,n,t,c,m,f){this.matSelect=e,this.changeDetectorRef=n,this._viewportRuler=t,this.matOption=c,this.matFormField=m,this.applyDefaultOptions(f)}applyDefaultOptions(e){if(e)for(let n of Vt)Object.prototype.hasOwnProperty.call(e,n)&&(this[n]=e[n])}ngOnInit(){this.matOption?(this.matOption.disabled=!0,this.matOption._getHostElement().classList.add("contains-mat-select-search"),this.matOption._getHostElement().setAttribute("role","presentation")):console.error("<ngx-mat-select-search> must be placed inside a <mat-option> element"),this.matSelect.openedChange.pipe(Ie(1),S(this._onDestroy)).subscribe(e=>{e?(this.updateInputWidth(),this.disableInitialFocus||this._focus(),this._installPanelKeydownListener()):(this._removePanelKeydownListener?.(),this._removePanelKeydownListener=void 0,this.clearSearchInput&&this._reset())}),this.matSelect.openedChange.pipe(Oe(1),me(()=>{this._options=this.matSelect.options;let e=this._options.toArray()[this.getOptionsLengthOffset()];return this._options.changes.pipe(he(()=>{setTimeout(()=>{let n=this._options.toArray(),t=n[this.getOptionsLengthOffset()],c=this.matSelect._keyManager;c&&this.matSelect.panelOpen&&t&&((!e||!this.matSelect.compareWith(e.value,t.value)||!c.activeItem||!n.find(f=>this.matSelect.compareWith(f.value,c.activeItem?.value)))&&c.setActiveItem(this.getOptionsLengthOffset()),setTimeout(()=>{this.updateInputWidth()})),e=t})}))})).pipe(S(this._onDestroy)).subscribe(),this._showNoEntriesFound$.pipe(S(this._onDestroy)).subscribe(e=>{this.matOption&&(e?this.matOption._getHostElement().classList.add("mat-select-search-no-entries-found"):this.matOption._getHostElement().classList.remove("mat-select-search-no-entries-found"))}),this._viewportRuler.change().pipe(S(this._onDestroy)).subscribe(()=>{this.matSelect.panelOpen&&this.updateInputWidth()}),this.initMultipleHandling(),this.optionsList$.pipe(S(this._onDestroy)).subscribe(()=>{this.changeDetectorRef.markForCheck()})}_emitSelectAllBooleanToParent(e){this.toggleAll.emit(e)}ngOnDestroy(){this._removePanelKeydownListener?.(),this._removePanelKeydownListener=void 0,this._onDestroy.next(),this._onDestroy.complete()}_isToggleAllCheckboxVisible(){return this.matSelect.multiple&&this.showToggleAllCheckbox}_handleKeydown(e){(e.key&&e.key.length===1||this.preventHomeEndKeyPropagation&&(e.key==="Home"||e.key==="End"))&&e.stopPropagation(),this.matSelect.multiple&&e.key&&e.key==="Enter"&&setTimeout(()=>this._focus()),this.enableClearOnEscapePressed&&e.key==="Escape"&&this.value&&(this._reset(!0),e.stopPropagation())}_installPanelKeydownListener(){this._removePanelKeydownListener?.(),this._removePanelKeydownListener=void 0;let e=this.matSelect.panel?.nativeElement;if(!e)return;let n=t=>{t.key!=="Escape"&&t.stopPropagation()};e.addEventListener("keydown",n),this._removePanelKeydownListener=()=>e.removeEventListener("keydown",n)}_handleKeyup(e){if(e.key==="ArrowUp"||e.key==="ArrowDown"){let n=this.matSelect._getAriaActiveDescendant(),t=this._options.toArray().findIndex(c=>c.id===n);t!==-1&&(this.unselectActiveDescendant(),this.activeDescendant=this._options.toArray()[t]._getHostElement(),this.activeDescendant.setAttribute("aria-selected","true"),this.searchSelectInput.nativeElement.setAttribute("aria-activedescendant",n))}}writeValue(e){this._lastExternalInputValue=e,this._formControl.setValue(e),this.changeDetectorRef.markForCheck()}onBlur(){this.unselectActiveDescendant(),this.onTouched()}registerOnChange(e){this._formControl.valueChanges.pipe(Se(n=>n!==this._lastExternalInputValue),he(()=>this._lastExternalInputValue=void 0),S(this._onDestroy)).subscribe(e)}registerOnTouched(e){this.onTouched=e}_focus(){if(!this.searchSelectInput||!this.matSelect.panel)return;let e=this.matSelect.panel.nativeElement,n=e.scrollTop;this.searchSelectInput.nativeElement.focus(),e.scrollTop=n}_reset(e){this._formControl.setValue(""),e&&this._focus()}initMultipleHandling(){if(!this.matSelect.ngControl){this.matSelect.multiple&&console.error("the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true");return}this.previousSelectedValues=this.matSelect.ngControl.value,this.matSelect.ngControl.valueChanges&&this.matSelect.ngControl.valueChanges.pipe(S(this._onDestroy)).subscribe(e=>{let n=!1;if(this.matSelect.multiple&&(this.alwaysRestoreSelectedOptionsMulti||this._formControl.value&&this._formControl.value.length)&&this.previousSelectedValues&&Array.isArray(this.previousSelectedValues)){(!e||!Array.isArray(e))&&(e=[]);let t=this.matSelect.options.map(c=>c.value);this.previousSelectedValues.forEach(c=>{!e.some(m=>this.matSelect.compareWith(m,c))&&!t.some(m=>this.matSelect.compareWith(m,c))&&(this.recreateValuesArray?e=[...e,c]:e.push(c),n=!0)})}this.previousSelectedValues=e,n&&this.matSelect._onChange(e)})}updateInputWidth(){if(!this.innerSelectSearch||!this.innerSelectSearch.nativeElement)return;let e=this.innerSelectSearch.nativeElement,n=null;for(;e&&e.parentElement;)if(e=e.parentElement,e.classList.contains("mat-select-panel")){n=e;break}n&&(this.innerSelectSearch.nativeElement.style.width=n.clientWidth+"px")}getOptionsLengthOffset(){return this.matOption?1:0}unselectActiveDescendant(){this.activeDescendant?.removeAttribute("aria-selected"),this.searchSelectInput.nativeElement.removeAttribute("aria-activedescendant")}static \u0275fac=function(n){return new(n||i)(D(se),D(te),D(nt),D(H,8),D(le,8),D(Bt,8))};static \u0275cmp=I({type:i,selectors:[["ngx-mat-select-search"]],contentQueries:function(n,t,c){if(n&1&&Fe(c,zt,5)(c,jt,5),n&2){let m;w(m=P())&&(t.clearIcon=m.first),w(m=P())&&(t.noEntriesFound=m.first)}},viewQuery:function(n,t){if(n&1&&J(St,7,V)(Ot,7,V),n&2){let c;w(c=P())&&(t.searchSelectInput=c.first),w(c=P())&&(t.innerSelectSearch=c.first)}},inputs:{placeholderLabel:"placeholderLabel",type:"type",closeIcon:"closeIcon",closeSvgIcon:"closeSvgIcon",noEntriesFoundLabel:"noEntriesFoundLabel",clearSearchInput:"clearSearchInput",searching:"searching",disableInitialFocus:"disableInitialFocus",enableClearOnEscapePressed:"enableClearOnEscapePressed",preventHomeEndKeyPropagation:"preventHomeEndKeyPropagation",disableScrollToActiveOnOptionsChanged:"disableScrollToActiveOnOptionsChanged",ariaLabel:"ariaLabel",showToggleAllCheckbox:"showToggleAllCheckbox",toggleAllCheckboxChecked:"toggleAllCheckboxChecked",toggleAllCheckboxIndeterminate:"toggleAllCheckboxIndeterminate",toggleAllCheckboxTooltipMessage:"toggleAllCheckboxTooltipMessage",toggleAllCheckboxTooltipPosition:"toggleAllCheckboxTooltipPosition",hideClearSearchButton:"hideClearSearchButton",alwaysRestoreSelectedOptionsMulti:"alwaysRestoreSelectedOptionsMulti",recreateValuesArray:"recreateValuesArray"},outputs:{toggleAll:"toggleAll"},features:[ee([{provide:ne,useExisting:q(()=>i),multi:!0}])],ngContentSelectors:wt,decls:13,vars:14,consts:[["innerSelectSearch",""],["searchSelectInput",""],["matInput","",1,"mat-select-search-input","mat-select-search-hidden"],[1,"mat-select-search-inner","mat-typography","mat-datepicker-content","mat-tab-header"],[1,"mat-select-search-inner-row"],["matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",1,"mat-select-search-toggle-all-checkbox",3,"color","checked","indeterminate","matTooltip","matTooltipPosition"],["autocomplete","off",1,"mat-select-search-input",3,"keydown","keyup","blur","type","formControl","placeholder"],["diameter","16",1,"mat-select-search-spinner"],["mat-icon-button","","aria-label","Clear",1,"mat-select-search-clear"],[1,"mat-select-search-no-entries-found"],["matTooltipClass","ngx-mat-select-search-toggle-all-tooltip",1,"mat-select-search-toggle-all-checkbox",3,"change","color","checked","indeterminate","matTooltip","matTooltipPosition"],["mat-icon-button","","aria-label","Clear",1,"mat-select-search-clear",3,"click"],[3,"svgIcon"]],template:function(n,t){n&1&&(Z(It),b(0,"input",2),r(1,"div",3,0)(3,"div",4),y(4,Pt,1,5,"mat-checkbox",5),r(5,"input",6,1),g("keydown",function(m){return t._handleKeydown(m)})("keyup",function(m){return t._handleKeyup(m)})("blur",function(){return t.onBlur()}),a(),y(7,Et,1,0,"mat-spinner",7),y(8,Ft,4,1,"button",8),A(9),a(),b(10,"mat-divider"),a(),y(11,Rt,3,1,"div",9),s(12,"async")),n&2&&(l(),v("mat-select-search-inner-multiple",t.matSelect.multiple)("mat-select-search-inner-toggle-all",t._isToggleAllCheckboxVisible()),l(3),M(t._isToggleAllCheckboxVisible()?4:-1),l(),h("type",t.type)("formControl",t._formControl)("placeholder",t.placeholderLabel),T("aria-label",t.ariaLabel),l(2),M(t.searching?7:-1),l(),M(!t.hideClearSearchButton&&t.value&&!t.searching?8:-1),l(3),M(d(12,12,t._showNoEntriesFound$)?11:-1))},dependencies:[ae,ie,oe,ce,ft,gt,bt,Ke,tt,et,Ze,je],styles:[".mat-select-search-hidden[_ngcontent-%COMP%]{visibility:hidden}.mat-select-search-inner[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none;background-color:var(--mat-sys-surface-container, var(--mat-select-panel-background-color, white))}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-inner-row[_ngcontent-%COMP%]{display:flex;align-items:center}.mat-select-search-input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background-color:var(--mat-sys-surface-container, var(--mat-select-panel-background-color, white));padding:0 44px 0 16px;height:47px;line-height:47px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-right:16px;padding-left:44px}.mat-select-search-input[_ngcontent-%COMP%]::placeholder{color:var(--mat-form-field-filled-input-text-placeholder-color, var(--mdc-filled-text-field-input-text-placeholder-color))}.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-left:5px}.mat-select-search-no-entries-found[_ngcontent-%COMP%]{padding-top:8px}.mat-select-search-clear[_ngcontent-%COMP%]{position:absolute;right:4px;top:0}[dir=rtl][_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{right:auto;left:4px}.mat-select-search-spinner[_ngcontent-%COMP%]{position:absolute;right:16px;top:calc(50% - 8px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%]{right:auto;left:16px}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:5px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:0;padding-right:5px}"],changeDetection:0})}return i})();var kt=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=W({type:i});static \u0275inj=G({imports:[ke]})}return i})();var $t=i=>[i];function Ut(i,u){if(i&1&&(o(0,`
          `),r(1,"mat-option",21),o(2),a(),o(3,`
          `)),i&2){let e=u.$implicit;l(),h("value",e),l(),p(e)}}function qt(i,u){if(i&1&&(o(0,`
          `),r(1,"mat-option",21),o(2),a(),o(3,`
          `)),i&2){let e=u.$implicit;l(),h("value",e),l(),p(e)}}function Gt(i,u){if(i&1&&(o(0,`
          `),r(1,"mat-option",21),o(2),a(),o(3,`
          `)),i&2){let e=u.$implicit;l(),h("value",e),l(),p(e)}}function Kt(i,u){i&1&&(o(0,`
  `),r(1,"div",22),o(2),s(3,"translate"),a(),o(4,`
  `)),i&2&&(l(2),p(d(3,1,"Loading comics")))}function Wt(i,u){i&1&&(o(0,`
  `),r(1,"div",22),o(2),s(3,"translate"),a(),o(4,`
  `)),i&2&&(l(2),p(d(3,1,"No comics found")))}function Qt(i,u){if(i&1){let e=B();o(0,`
  `),b(1,"app-comic",24),o(2,`
  `),r(3,"mat-paginator",25),g("page",function(t){N(e);let c=x(2);return R(c.onPageChange(t))}),a(),o(4,`
  `)}if(i&2){let e=x(2);l(),h("comicsInput",e.pagedComics())("displayPublisher",!0),l(2),h("length",e.results().comics.length)("pageIndex",e.pageIndex())("pageSize",e.pageSize)("pageSizeOptions",ze(7,$t,e.pageSize))("showFirstLastButtons",!0)}}function Yt(i,u){if(i&1&&(o(0,`
  `),r(1,"div",23),o(2,`
    `),r(3,"h1"),o(4),s(5,"translate"),a(),o(6,`
    `),r(7,"span"),o(8),s(9,"translate"),a(),o(10,`
  `),a(),o(11,`
  `),y(12,Wt,5,3)(13,Qt,5,9)),i&2){let e=x();l(4),p(d(5,4,"Search results")),l(4),Re("",e.results().comics.length," ",d(9,6,"comics")),l(4),M(e.results().comics.length===0?12:13)}}var _i=(()=>{class i{constructor(){this.route=k(He),this.router=k($e),this.publisherService=k(dt),this.userState=k(st),this.options=O({heroes:[],publishers:[],collections:[]}),this.results=O({title:"",hero:"All",publisher:"All",collection:"All",availability:"All",comics:[]}),this.isLoading=O(!0),this.pageIndex=O(0),this.pageSize=50,this.openSelect=O(null),this.heroFilterControl=new C("",{nonNullable:!0}),this.publisherFilterControl=new C("",{nonNullable:!0}),this.collectionFilterControl=new C("",{nonNullable:!0}),this.filteredHeroes=j(()=>this.filterOptions(this.options().heroes,this.heroFilter())),this.filteredPublishers=j(()=>this.filterOptions(this.options().publishers,this.publisherFilter())),this.filteredCollections=j(()=>this.filterOptions(this.options().collections,this.collectionFilter())),this.pagedComics=j(()=>{let e=this.pageIndex()*this.pageSize;return this.results().comics.slice(e,e+this.pageSize)}),this.form=new ct({title:new C("",{nonNullable:!0}),hero:new C("All",{nonNullable:!0}),publisher:new C("All",{nonNullable:!0}),collection:new C("All",{nonNullable:!0}),availability:new C("All",{nonNullable:!0})}),this.heroFilter=re(this.heroFilterControl.valueChanges,{initialValue:""}),this.publisherFilter=re(this.publisherFilterControl.valueChanges,{initialValue:""}),this.collectionFilter=re(this.collectionFilterControl.valueChanges,{initialValue:""})}ngOnInit(){this.route.queryParams.subscribe(e=>{let n=this.filtersFromParams(e);this.form.patchValue(n,{emitEvent:!1}),this.isLoading.set(!0),Me({options:this.publisherService.getSearchOptionsFromApi(),comics:this.publisherService.searchComics(n),continueReading:this.userState.readContinueReading(),bookmarks:this.userState.readBookmarks()}).subscribe({next:({options:t,comics:c,continueReading:m,bookmarks:f})=>{this.options.set(t),this.results.set(L(F({},n),{comics:this.decorateComics(c,m,f)})),this.pageIndex.set(0),this.isLoading.set(!1)},error:()=>{this.results.set(L(F({},n),{comics:[]})),this.pageIndex.set(0),this.isLoading.set(!1)}})})}setOpenSelect(e){this.openSelect.set(e)}clearOpenSelect(e){this.openSelect()===e&&this.openSelect.set(null)}onPageChange(e){this.pageIndex.set(e.pageIndex)}searchComics(){let e=this.form.getRawValue(),n=Object.fromEntries(Object.entries(e).filter(([,t])=>t&&t!=="All"));this.router.navigate(["/search"],{queryParams:n})}filtersFromParams(e){return{title:e.title??"",hero:e.hero??"All",publisher:e.publisher??"All",collection:e.collection??"All",availability:e.availability??"All"}}resetFilter(e){e.reset()}decorateComics(e,n,t){let c=new Map(n.filter(f=>f.pageIndex>0).map(f=>[f.id,f])),m=new Set(t.map(f=>f.comicId));return e.map(f=>{let $=f.id,de=$===void 0?void 0:c.get($);return L(F({},f),{readingProgress:de?{pageIndex:de.pageIndex,totalPages:de.totalPages}:void 0,bookmarked:$!==void 0&&m.has($)})})}filterOptions(e,n){let t=n.trim().toLowerCase();return t?e.filter(c=>c.toLowerCase().includes(t)):e}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275cmp=I({type:i,selectors:[["app-search"]],decls:128,vars:70,consts:[[1,"page","search-page"],[1,"search-form",3,"ngSubmit","formGroup"],[1,"search-field","search-title"],["for","search-title"],["appearance","outline",1,"search-title-input"],["matInput","","id","search-title","type","search","formControlName","title",3,"placeholder"],[1,"search-field"],["for","search-hero"],["appearance","outline",1,"search-select"],["id","search-hero","formControlName","hero","panelClass","search-dropdown-panel",3,"opened","closed"],[3,"formControl","placeholderLabel","noEntriesFoundLabel"],["value","All"],["for","search-publisher"],["id","search-publisher","formControlName","publisher","panelClass","search-dropdown-panel",3,"opened","closed"],["for","search-collection"],["id","search-collection","formControlName","collection","panelClass","search-dropdown-panel",3,"opened","closed"],["for","search-availability"],["id","search-availability","formControlName","availability","panelClass","search-dropdown-panel",3,"opened","closed"],["value","Available"],["value","Missing"],["mat-flat-button","","color","primary","type","submit"],[3,"value"],[1,"search-state"],[1,"results-heading"],[3,"comicsInput","displayPublisher"],[1,"search-paginator",3,"page","length","pageIndex","pageSize","pageSizeOptions","showFirstLastButtons"]],template:function(n,t){n&1&&(r(0,"div",0),o(1,`
  `),r(2,"form",1),g("ngSubmit",function(){return t.searchComics()}),o(3,`
    `),r(4,"div",2),o(5,`
      `),r(6,"label",3),o(7),s(8,"translate"),a(),o(9,`
      `),r(10,"mat-form-field",4),o(11,`
        `),b(12,"input",5),s(13,"translate"),o(14,`
      `),a(),o(15,`
    `),a(),o(16,`

    `),r(17,"div",6),o(18,`
      `),r(19,"label",7),o(20),s(21,"translate"),a(),o(22,`
      `),r(23,"mat-form-field",8),o(24,`
        `),r(25,"mat-select",9),g("opened",function(){return t.setOpenSelect("hero")})("closed",function(){return t.clearOpenSelect("hero"),t.resetFilter(t.heroFilterControl)}),o(26,`
          `),r(27,"mat-option"),o(28,`
            `),b(29,"ngx-mat-select-search",10),s(30,"translate"),s(31,"translate"),o(32,`
          `),a(),o(33,`
          `),r(34,"mat-option",11),o(35),s(36,"translate"),a(),o(37,`
          `),Y(38,Ut,4,2,null,null,Q),a(),o(40,`
      `),a(),o(41,`
    `),a(),o(42,`

    `),r(43,"div",6),o(44,`
      `),r(45,"label",12),o(46),s(47,"translate"),a(),o(48,`
      `),r(49,"mat-form-field",8),o(50,`
        `),r(51,"mat-select",13),g("opened",function(){return t.setOpenSelect("publisher")})("closed",function(){return t.clearOpenSelect("publisher"),t.resetFilter(t.publisherFilterControl)}),o(52,`
          `),r(53,"mat-option"),o(54,`
            `),b(55,"ngx-mat-select-search",10),s(56,"translate"),s(57,"translate"),o(58,`
          `),a(),o(59,`
          `),r(60,"mat-option",11),o(61),s(62,"translate"),a(),o(63,`
          `),Y(64,qt,4,2,null,null,Q),a(),o(66,`
      `),a(),o(67,`
    `),a(),o(68,`

    `),r(69,"div",6),o(70,`
      `),r(71,"label",14),o(72),s(73,"translate"),a(),o(74,`
      `),r(75,"mat-form-field",8),o(76,`
        `),r(77,"mat-select",15),g("opened",function(){return t.setOpenSelect("collection")})("closed",function(){return t.clearOpenSelect("collection"),t.resetFilter(t.collectionFilterControl)}),o(78,`
          `),r(79,"mat-option"),o(80,`
            `),b(81,"ngx-mat-select-search",10),s(82,"translate"),s(83,"translate"),o(84,`
          `),a(),o(85,`
          `),r(86,"mat-option",11),o(87),s(88,"translate"),a(),o(89,`
          `),Y(90,Gt,4,2,null,null,Q),a(),o(92,`
      `),a(),o(93,`
    `),a(),o(94,`

    `),r(95,"div",6),o(96,`
      `),r(97,"label",16),o(98),s(99,"translate"),a(),o(100,`
      `),r(101,"mat-form-field",8),o(102,`
        `),r(103,"mat-select",17),g("opened",function(){return t.setOpenSelect("availability")})("closed",function(){return t.clearOpenSelect("availability")}),o(104,`
          `),r(105,"mat-option",11),o(106),s(107,"translate"),a(),o(108,`
          `),r(109,"mat-option",18),o(110),s(111,"translate"),a(),o(112,`
          `),r(113,"mat-option",19),o(114),s(115,"translate"),a(),o(116,`
        `),a(),o(117,`
      `),a(),o(118,`
    `),a(),o(119,`

    `),r(120,"button",20),o(121),s(122,"translate"),a(),o(123,`
  `),a(),o(124,`

  `),y(125,Kt,5,3)(126,Yt,14,8),a(),o(127,`
`)),n&2&&(l(2),h("formGroup",t.form),l(5),p(d(8,32,"Comic title")),l(5),h("placeholder",d(13,34,"Title or filename")),l(8),p(d(21,36,"Hero")),l(3),v("search-control-focused",t.openSelect()==="hero"),l(6),h("formControl",t.heroFilterControl)("placeholderLabel",d(30,38,"Search heroes"))("noEntriesFoundLabel",d(31,40,"No heroes found")),l(6),p(d(36,42,"All heroes")),l(3),X(t.filteredHeroes()),l(8),p(d(47,44,"Publisher")),l(3),v("search-control-focused",t.openSelect()==="publisher"),l(6),h("formControl",t.publisherFilterControl)("placeholderLabel",d(56,46,"Search publishers"))("noEntriesFoundLabel",d(57,48,"No publishers found")),l(6),p(d(62,50,"All publishers")),l(3),X(t.filteredPublishers()),l(8),p(d(73,52,"Collection")),l(3),v("search-control-focused",t.openSelect()==="collection"),l(6),h("formControl",t.collectionFilterControl)("placeholderLabel",d(82,54,"Search collections"))("noEntriesFoundLabel",d(83,56,"No collections found")),l(6),p(d(88,58,"All collections")),l(3),X(t.filteredCollections()),l(8),p(d(99,60,"Availability")),l(3),v("search-control-focused",t.openSelect()==="availability"),l(5),p(d(107,62,"All comics")),l(4),p(d(111,64,"Available")),l(4),p(d(115,66,"Missing")),l(7),p(d(122,68,"Search")),l(4),M(t.isLoading()?125:126))},dependencies:[ae,at,ie,oe,ot,ce,lt,rt,qe,pt,le,mt,Je,_t,ut,se,H,kt,ke,Ue],styles:[".search-form[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(220px,2fr) repeat(4,minmax(130px,1fr)) auto;gap:12px;align-items:end;margin-bottom:28px;padding:16px;border:1px solid rgba(255,255,255,.12);background:#ffffff0d}.search-field[_ngcontent-%COMP%]{display:grid;gap:6px}.search-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#ffffffbf;font-size:.75rem;font-weight:600}.search-field[_ngcontent-%COMP%]:focus-within > label[_ngcontent-%COMP%]{color:#2196f3}.search-field[_ngcontent-%COMP%]:has(.search-control-focused) > label[_ngcontent-%COMP%]{color:#2196f3}.search-field[_ngcontent-%COMP%]   .search-title-input[_ngcontent-%COMP%], .search-field[_ngcontent-%COMP%]   .search-select[_ngcontent-%COMP%]{width:100%;min-width:0;box-sizing:border-box}.search-title-input[_ngcontent-%COMP%]{height:39px;min-height:39px;margin:0}.search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper, .search-title-input[_ngcontent-%COMP%]     .mdc-text-field{height:39px;min-height:39px;background-color:#252525!important}.search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field-infix{min-height:39px;padding-top:0!important;padding-bottom:0!important}.search-title-input[_ngcontent-%COMP%]     .mat-mdc-input-element{color:#fff!important;-webkit-text-fill-color:white;caret-color:#fff;font-size:14px}.search-title-input[_ngcontent-%COMP%]     .mat-mdc-input-element::placeholder{color:#ffffffa6}[_nghost-%COMP%]     .search-title-input .mat-mdc-input-element::placeholder{color:#ffffffa6!important}.search-title-input[_ngcontent-%COMP%]     .mdc-notched-outline__leading, .search-title-input[_ngcontent-%COMP%]     .mdc-notched-outline__notch, .search-title-input[_ngcontent-%COMP%]     .mdc-notched-outline__trailing{border-width:1px!important;border-color:#ffffff73!important}.search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper{display:none}.search-title-input[_ngcontent-%COMP%]     input{height:39px}.search-select[_ngcontent-%COMP%]{height:39px;min-height:39px;margin:0}.search-select[_ngcontent-%COMP%]     .mat-mdc-form-field, .search-select[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper{height:39px;min-height:39px;padding:0 10px;background-color:#252525!important}.search-select[_ngcontent-%COMP%]     .mdc-text-field{min-height:39px;background-color:#252525!important}.search-select[_ngcontent-%COMP%]     .mat-mdc-form-field-flex, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field-infix, .search-select[_ngcontent-%COMP%]     .mat-mdc-select-trigger{height:39px;min-height:39px}.search-select[_ngcontent-%COMP%]     .mat-mdc-form-field-infix{display:flex;align-items:center;padding:0}.search-select[_ngcontent-%COMP%]     .mat-mdc-select-trigger{color:#fff;font:inherit;font-weight:400}.search-select[_ngcontent-%COMP%]     .mat-mdc-select-arrow{color:#fff}.search-select[_ngcontent-%COMP%]     .mat-mdc-select-arrow svg{fill:#fff}.search-select[_ngcontent-%COMP%]     .mdc-notched-outline__leading, .search-select[_ngcontent-%COMP%]     .mdc-notched-outline__notch, .search-select[_ngcontent-%COMP%]     .mdc-notched-outline__trailing{border-width:1px!important;border-color:#ffffff73!important}.search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__leading, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__notch, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__trailing, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__leading, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__notch, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__trailing{border-width:1px!important;border-color:#ffffff73!important}.search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__leading, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__trailing, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field.search-control-focused .mdc-notched-outline__leading, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field.search-control-focused .mdc-notched-outline__notch, .search-title-input[_ngcontent-%COMP%]     .mat-mdc-form-field.search-control-focused .mdc-notched-outline__trailing, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__leading, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__trailing, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field.search-control-focused .mdc-notched-outline__leading, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field.search-control-focused .mdc-notched-outline__notch, .search-select[_ngcontent-%COMP%]     .mat-mdc-form-field.search-control-focused .mdc-notched-outline__trailing{border-width:1px!important;border-color:#2196f3!important}[_nghost-%COMP%]     .search-title-input.mat-focused .mdc-notched-outline__leading, [_nghost-%COMP%]     .search-title-input.mat-focused .mdc-notched-outline__notch, [_nghost-%COMP%]     .search-title-input.mat-focused .mdc-notched-outline__trailing, [_nghost-%COMP%]     .search-select.search-control-focused .mdc-notched-outline__leading, [_nghost-%COMP%]     .search-select.search-control-focused .mdc-notched-outline__notch, [_nghost-%COMP%]     .search-select.search-control-focused .mdc-notched-outline__trailing{border-width:1px!important;border-color:#2196f3!important}[_nghost-%COMP%]     .search-select:focus-within .mdc-notched-outline__leading, [_nghost-%COMP%]     .search-select:focus-within .mdc-notched-outline__notch, [_nghost-%COMP%]     .search-select:focus-within .mdc-notched-outline__trailing{border-width:1px!important;border-color:#2196f3!important}[_nghost-%COMP%]     .search-select:focus-within .mat-mdc-select-arrow, [_nghost-%COMP%]     .search-select:focus-within .mat-mdc-select-arrow svg, [_nghost-%COMP%]     .search-select.search-control-focused .mat-mdc-select-arrow, [_nghost-%COMP%]     .search-select.search-control-focused .mat-mdc-select-arrow svg{color:#2196f3!important;fill:#2196f3!important}  .mat-mdc-select-panel{background-color:#252525}  .mat-mdc-option{color:#fff}  .mat-mdc-option:hover:not(.mdc-list-item--disabled){background-color:transparent!important}  .search-dropdown-panel .mat-mdc-option.mat-mdc-option-active.mdc-list-item:not(.contains-mat-select-search),   .search-dropdown-panel .mat-mdc-option:focus.mdc-list-item:not(.contains-mat-select-search){--mat-option-focus-state-layer-color: #1976d2;background-color:#1976d2!important}  .search-dropdown-panel .mat-mdc-option.mat-mdc-option-active.mdc-list-item:not(.contains-mat-select-search) .mdc-list-item__primary-text,   .search-dropdown-panel .mat-mdc-option:focus.mdc-list-item:not(.contains-mat-select-search) .mdc-list-item__primary-text{color:#fff!important}.search-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-height:39px;color:#111;font-weight:700}.results-heading[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:8px;color:#fff}.results-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:1.4rem;font-weight:500}.results-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ffffffa6;font-size:.85rem}.search-state[_ngcontent-%COMP%]{padding:64px 16px;color:#ffffffb3;text-align:center}.search-paginator[_ngcontent-%COMP%]{--mat-paginator-container-background-color: transparent;--mat-paginator-container-text-color: #b0bec5;--mat-paginator-enabled-icon-color: #b0bec5;--mat-paginator-disabled-icon-color: rgb(176 190 197 / 35%);margin-top:20px;color:#b0bec5;background:transparent}.search-paginator[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%]{--mat-icon-button-icon-color: #b0bec5;--mdc-icon-button-icon-color: #b0bec5;--mat-ripple-color: #f1c40f;color:#b0bec5}.search-paginator[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%]:hover:not(:disabled){--mat-icon-button-icon-color: #111;--mdc-icon-button-icon-color: #111;color:#111;background:#f1c40f}.search-paginator[_ngcontent-%COMP%]   .mat-mdc-icon-button[_ngcontent-%COMP%]:hover:not(:disabled)   .mat-icon[_ngcontent-%COMP%]{color:#111}@media(max-width:900px){.search-form[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}.search-title[_ngcontent-%COMP%], .search-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{grid-column:1/-1}}"],changeDetection:0})}}return i})();export{_i as SearchComponent};
