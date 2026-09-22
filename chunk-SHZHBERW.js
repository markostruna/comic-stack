import{a as Z,b as J,e as K,g as W,i as te,n as se}from"./chunk-43TNV7AX.js";import{a as xe,b as Ce}from"./chunk-DGCDZ7MM.js";import"./chunk-I7ZJVN7A.js";import{b as U,d as $}from"./chunk-IMOSEOKP.js";import{a as ye,d as ke}from"./chunk-4Z5BSF5U.js";import{a as le,b as ce,c as me,d as x,f as ge,g as he,k as pe,m as ue,n as be,o as fe,p as _e,q as ve}from"./chunk-E534F33P.js";import"./chunk-AO3V3DRX.js";import{G as de,H as re,K as oe,e as ee,m as ie,v as ae}from"./chunk-CXUHBRWM.js";import{a as we}from"./chunk-IMAV7PGD.js";import{b as Q,d as H}from"./chunk-WNHJ4PIH.js";import{$ as I,Ba as O,Bb as L,Cb as b,Cc as Y,Fb as D,Fc as ne,Gb as R,Ib as T,Jb as F,Kb as q,La as r,O as S,Ob as A,Qb as k,Rb as N,Sb as e,Ub as V,Wa as f,Xb as B,da as P,ec as G,ga as s,jb as _,jc as X,lb as p,lc as g,mb as u,mc as j,na as z,p as M,qb as l,rb as n,sb as a,ta as w,tb as c,wa as y,ya as E}from"./chunk-WIMJFYSB.js";var Ee=["switch"],Oe=["*"];function Le(o,m){o&1&&(n(0,"span",11),z(),n(1,"svg",13),c(2,"path",14),a(),n(3,"svg",15),c(4,"path",16),a()())}var De=new P("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),v=class{source;checked;constructor(m,t){this.source=m,this.checked=t}},Me=(()=>{class o{_elementRef=s(O);_focusMonitor=s(ie);_changeDetectorRef=s(X);defaults=s(De);_onChange=t=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(t){return new v(this,t)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=ee();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(t){this._checked=t,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new w;toggleChange=new w;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){s(ne).load(re);let t=s(new G("tabindex"),{optional:!0}),d=this.defaults;this.tabIndex=t==null?0:parseInt(t)||0,this.color=d.color||"accent",this.id=this._uniqueId=s(ae).getId("mat-mdc-slide-toggle-"),this.hideIcon=d.hideIcon??!1,this.disabledInteractive=d.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t==="keyboard"||t==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(t){t.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}validate(t){return this.required&&t.value!==!0?{required:!0}:null}registerOnValidatorChange(t){this._validatorOnChange=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new v(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(d){return new(d||o)};static \u0275cmp=f({type:o,selectors:[["mat-slide-toggle"]],viewQuery:function(d,i){if(d&1&&T(Ee,5),d&2){let h;F(h=q())&&(i._switchElement=h.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(d,i){d&2&&(L("id",i.id),_("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),N(i.color?"mat-"+i.color:""),k("mat-mdc-slide-toggle-focused",i._focused)("mat-mdc-slide-toggle-checked",i.checked)("_mat-animation-noopable",i._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",g],color:"color",disabled:[2,"disabled","disabled",g],disableRipple:[2,"disableRipple","disableRipple",g],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:j(t)],checked:[2,"checked","checked",g],hideIcon:[2,"hideIcon","hideIcon",g],disabledInteractive:[2,"disabledInteractive","disabledInteractive",g]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[B([{provide:le,useExisting:I(()=>o),multi:!0},{provide:me,useExisting:o,multi:!0}]),E],ngContentSelectors:Oe,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(d,i){if(d&1&&(D(),n(0,"div",1)(1,"button",2,0),b("click",function(){return i._handleClick()}),c(3,"div",3)(4,"span",4),n(5,"span",5)(6,"span",6)(7,"span",7),c(8,"span",8),a(),n(9,"span",9),c(10,"span",10),a(),p(11,Le,5,0,"span",11),a()()(),n(12,"label",12),b("click",function(Pe){return Pe.stopPropagation()}),R(13),a()()),d&2){let h=A(2);l("labelPosition",i.labelPosition),r(),k("mdc-switch--selected",i.checked)("mdc-switch--unselected",!i.checked)("mdc-switch--checked",i.checked)("mdc-switch--disabled",i.disabled)("mat-mdc-slide-toggle-disabled-interactive",i.disabledInteractive),l("tabIndex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("disabled",i.disabled&&!i.disabledInteractive),_("id",i.buttonId)("name",i.name)("aria-label",i.ariaLabel)("aria-labelledby",i._getAriaLabelledBy())("aria-describedby",i.ariaDescribedby)("aria-required",i.required||null)("aria-checked",i.checked)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),r(9),l("matRippleTrigger",h)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",!0),r(),u(i.hideIcon?-1:11),r(),l("for",i.buttonId),_("id",i._labelId)}},dependencies:[de,Ce],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return o})();function Re(o,m){o&1&&(e(0,`
                `),n(1,"span",2),e(2,"Username is required"),a(),e(3,`
                `))}function Te(o,m){o&1&&(e(0,`
                `),n(1,"span",2),e(2,"Password is required"),a(),e(3,`
                `))}var Se=new W("Login"),Ie=class C{constructor(){this.router=s($),this.route=s(U),this.formBuilder=s(_e),this.authenticationService=s(K),this.version=Y.version,this.error=y(void 0),this.isLoading=y(!1),this.loginForm=this.createForm()}ngOnInit(){}login(){this.isLoading.set(!0),this.authenticationService.login(this.loginForm.value).pipe(S(()=>{this.loginForm.markAsPristine(),this.isLoading.set(!1)}),J(this)).subscribe(t=>{Se.debug(`${t.username} successfully logged in`),this.router.navigate([this.route.snapshot.queryParams.redirect||"/"],{replaceUrl:!0})},t=>{Se.debug(`Login error: ${t}`),this.error.set(t)})}createForm(){return this.formBuilder.group({username:["",x.required],password:["",x.required],remember:!0})}static{this.\u0275fac=function(t){return new(t||C)}}static{this.\u0275cmp=f({type:C,selectors:[["app-login"]],decls:73,vars:9,consts:[[1,"login-page","mat-typography"],[1,"login-header"],["translate",""],[1,"login-header-actions"],[1,"version"],[1,"login-container"],["appearance","outlined",1,"login-box"],["novalidate","",3,"ngSubmit","formGroup"],["translate","",1,"login-error",3,"hidden"],[1,"login-fields"],[1,"login-field"],["for","username","translate","",1,"field-label"],[3,"hideRequiredMarker"],["id","username","type","text","matInput","","formControlName","username","autocomplete","username","required",""],["for","password","translate","",1,"field-label"],["id","password","type","password","matInput","","formControlName","password","autocomplete","current-password","required",""],["color","primary","formControlName","remember","translate",""],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[1,"inline-loader",3,"isLoading"]],template:function(t,d){t&1&&(n(0,"div",0),e(1,`
  `),n(2,"div",1),e(3,`
    `),n(4,"h1",2),e(5,"APP_NAME"),a(),e(6,`
    `),n(7,"div",3),e(8,`
      `),n(9,"h4",4),e(10),a(),e(11,`
      `),c(12,"app-language-selector"),e(13,`
    `),a(),e(14,`
  `),a(),e(15,`
  `),n(16,"div",5),e(17,`
    `),n(18,"mat-card",6),e(19,`
      `),n(20,"form",7),b("ngSubmit",function(){return d.login()}),e(21,`
        `),n(22,"div",8),e(23,"Username or password incorrect."),a(),e(24,`
        `),n(25,"div",9),e(26,`
          `),n(27,"div",10),e(28,`
            `),n(29,"label",11),e(30,"Username"),a(),e(31,`
            `),n(32,"mat-form-field",12),e(33,`
              `),c(34,"input",13),e(35,`
              `),n(36,"mat-error"),e(37,`
                `),p(38,Re,4,0),a(),e(39,`
            `),a(),e(40,`
          `),a(),e(41,`
          `),n(42,"div",10),e(43,`
            `),n(44,"label",14),e(45,"Password"),a(),e(46,`
            `),n(47,"mat-form-field",12),e(48,`
              `),c(49,"input",15),e(50,`
              `),n(51,"mat-error"),e(52,`
                `),p(53,Te,4,0),a(),e(54,`
            `),a(),e(55,`
          `),a(),e(56,`
          `),n(57,"mat-slide-toggle",16),e(58,"Remember me"),a(),e(59,`
          `),n(60,"button",17),e(61,`
            `),c(62,"app-loader",18),e(63,`
            `),n(64,"span",2),e(65,"Login"),a(),e(66,`
          `),a(),e(67,`
        `),a(),e(68,`
      `),a(),e(69,`
    `),a(),e(70,`
  `),a(),e(71,`
`),a(),e(72,`
`)),t&2&&(r(10),V("v",d.version),r(10),l("formGroup",d.loginForm),r(2),l("hidden",!d.error()||d.isLoading()),r(10),l("hideRequiredMarker",!0),r(6),u(d.loginForm.controls.username.invalid&&d.loginForm.controls.username.touched?38:-1),r(9),l("hideRequiredMarker",!0),r(6),u(d.loginForm.controls.password.invalid&&d.loginForm.controls.password.touched?53:-1),r(7),l("disabled",d.loginForm.invalid||d.isLoading()),r(2),l("isLoading",d.isLoading()))},dependencies:[H,Q,se,we,ve,pe,ce,ge,he,fe,be,ue,ke,xe,ye,Me,oe,te],styles:['[_nghost-%COMP%]{display:flex;flex:1;min-height:100%;background:#3f4245 url("./media/preset-light-FP4NJBT5.png");background-attachment:fixed;background-position:center center;background-repeat:no-repeat;background-size:cover}.login-page[_ngcontent-%COMP%]{display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;gap:1.75rem;padding:3rem 1rem}.login-header[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:.5rem;text-align:center}.login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;color:#fff;font-size:clamp(2rem,5vw,2.75rem);font-weight:700;letter-spacing:-.03em;text-shadow:0 2px 8px rgba(0,0,0,.35)}.login-header-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.login-container[_ngcontent-%COMP%]{width:min(100%,33rem)}.login-box[_ngcontent-%COMP%]{width:100%;box-sizing:border-box;padding:2rem;border:1px solid rgba(32,72,125,.12);border-radius:12px;background:#fffffff5;box-shadow:0 18px 45px #20487d24}.login-fields[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.login-field[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.4rem}.field-label[_ngcontent-%COMP%]{color:#172b4d;font-size:.85rem;font-weight:600}.login-field[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%]{height:auto;min-height:56px}.login-field[_ngcontent-%COMP%]   .mat-mdc-text-field-wrapper[_ngcontent-%COMP%], .login-field[_ngcontent-%COMP%]   .mat-mdc-form-field-flex[_ngcontent-%COMP%], .login-field[_ngcontent-%COMP%]   .mat-mdc-form-field-infix[_ngcontent-%COMP%]{height:56px!important;min-height:56px!important}.login-field[_ngcontent-%COMP%]   .mat-mdc-form-field-infix[_ngcontent-%COMP%]{box-sizing:border-box;padding-top:16px!important;padding-bottom:8px!important}.login-field[_ngcontent-%COMP%]   .mat-mdc-input-element[_ngcontent-%COMP%]{font-size:1rem}.login-fields[_ngcontent-%COMP%]   mat-slide-toggle[_ngcontent-%COMP%]{margin:.25rem 0 .5rem}.login-fields[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;min-height:44px;margin-top:.25rem;font-size:.95rem}.login-error[_ngcontent-%COMP%]{margin-bottom:1rem;padding:.75rem 1rem;border:1px solid rgba(176,0,32,.2);border-radius:6px;background:#b0002012;color:#f44336;font-size:.9rem}.inline-loader[_ngcontent-%COMP%]{display:inline-block}.version[_ngcontent-%COMP%]{margin:0;color:#ffffffc7;font-size:.8rem;font-weight:600;letter-spacing:.02em;text-shadow:0 1px 4px rgba(0,0,0,.35)}@media(max-width:768px){.login-page[_ngcontent-%COMP%]{padding:2rem 1rem}.login-container[_ngcontent-%COMP%]{width:100%}.login-box[_ngcontent-%COMP%]{padding:1.5rem}}'],changeDetection:0})}};Ie=M([Z()],Ie);export{Ie as LoginComponent};
