import{a as Nt,f as At}from"./chunk-UYVPAWHM.js";import"./chunk-4Z5BSF5U.js";import"./chunk-E534F33P.js";import{a as Ft,b as Et,c as Ot,d as It}from"./chunk-UVTCIYIH.js";import{f as St,g as ye,h as kt,i as xt,l as Mt,m as Tt}from"./chunk-AO3V3DRX.js";import{H as vt,K as bt,a as pt,e as _t,k as yt,m as wt,y as Dt}from"./chunk-CXUHBRWM.js";import{c as ft,d as mt}from"./chunk-WNHJ4PIH.js";import{$a as C,Ab as lt,Ba as P,C as Ye,Cb as oe,Cc as Fe,D as Ge,Dc as gt,E as Z,Eb as b,Fb as G,Fc as Ct,Gb as O,H as Xe,Hb as Me,Ib as Te,Ic as Rt,Jb as M,Kb as T,La as f,Ma as ee,Na as B,Qa as st,Qb as $,Sa as Y,Sb as c,Tb as _e,U as Ze,Ub as re,V as Je,Vb as ct,W as U,Wa as S,Wb as dt,X as et,Xb as I,Ya as h,Zb as se,_b as ae,ab as V,da as J,ec as ut,ga as a,j as A,jb as te,jc as ge,k as W,kc as X,l as Qe,la as tt,lb as k,lc as D,m as We,ma as it,mb as x,n as qe,na as nt,nb as Se,ob as ke,pa as ot,pb as xe,qa as rt,qb as L,r as q,rb as p,sb as _,t as Ke,ta as he,tb as ie,ub as fe,vb as ne,w as ue,wa as H,wb as at,x as z,xb as me,xc as ht,ya as K,yb as pe,za as E,zb as v}from"./chunk-WIMJFYSB.js";var ni=[[["caption"]],[["colgroup"],["col"]],"*"],oi=["caption","colgroup, col","*"];function ri(i,o){i&1&&O(0,2)}function si(i,o){i&1&&(p(0,"thead",0),v(1,1),_(),p(2,"tbody",0),v(3,2)(4,3),_(),p(5,"tfoot",0),v(6,4),_())}function ai(i,o){i&1&&v(0,1)(1,2)(2,3)(3,4)}var N=new J("CDK_TABLE");var De=(()=>{class i{template=a(B);constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkCellDef",""]]})}return i})(),ve=(()=>{class i{template=a(B);constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkHeaderCellDef",""]]})}return i})(),Lt=(()=>{class i{template=a(B);constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkFooterCellDef",""]]})}return i})(),j=(()=>{class i{_table=a(N,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;constructor(){}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,"-"),this._updateColumnCssClassName())}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkColumnDef",""]],contentQueries:function(t,n,r){if(t&1&&Me(r,De,5)(r,ve,5)(r,Lt,5),t&2){let s;M(s=T())&&(n.cell=s.first),M(s=T())&&(n.headerCell=s.first),M(s=T())&&(n.footerCell=s.first)}},inputs:{name:[0,"cdkColumnDef","name"],sticky:[2,"sticky","sticky",D],stickyEnd:[2,"stickyEnd","stickyEnd",D]}})}return i})(),Ce=class{constructor(o,e){e.nativeElement.classList.add(...o._columnCssClassName)}},jt=(()=>{class i extends Ce{constructor(){super(a(j),a(P))}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["cdk-header-cell"],["th","cdk-header-cell",""]],hostAttrs:["role","columnheader",1,"cdk-header-cell"],features:[C]})}return i})();var Ut=(()=>{class i extends Ce{constructor(){let e=a(j),t=a(P);super(e,t);let n=e._table?._getCellRole();n&&t.nativeElement.setAttribute("role",n)}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["cdk-cell"],["td","cdk-cell",""]],hostAttrs:[1,"cdk-cell"],features:[C]})}return i})();var Ie=(()=>{class i{template=a(B);_differs=a(X);columns;_columnsDiffer;constructor(){}ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof ce?e.headerCell.template:this instanceof Ne?e.footerCell.template:e.cell.template}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,features:[K]})}return i})(),ce=(()=>{class i extends Ie{_table=a(N,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(a(B),a(X))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkHeaderRowDef",""]],inputs:{columns:[0,"cdkHeaderRowDef","columns"],sticky:[2,"cdkHeaderRowDefSticky","sticky",D]},features:[C,K]})}return i})(),Ne=(()=>{class i extends Ie{_table=a(N,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;constructor(){super(a(B),a(X))}ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkFooterRowDef",""]],inputs:{columns:[0,"cdkFooterRowDef","columns"],sticky:[2,"cdkFooterRowDefSticky","sticky",D]},features:[C,K]})}return i})(),be=(()=>{class i extends Ie{_table=a(N,{optional:!0});when;constructor(){super(a(B),a(X))}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkRowDef",""]],inputs:{columns:[0,"cdkRowDefColumns","columns"],when:[0,"cdkRowDefWhen","when"]},features:[C]})}return i})(),Q=(()=>{class i{_viewContainer=a(Y);cells;context;static mostRecentCellOutlet=null;constructor(){i.mostRecentCellOutlet=this}ngOnDestroy(){i.mostRecentCellOutlet===this&&(i.mostRecentCellOutlet=null)}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","cdkCellOutlet",""]]})}return i})(),Ae=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275cmp=S({type:i,selectors:[["cdk-header-row"],["tr","cdk-header-row",""]],hostAttrs:["role","row",1,"cdk-header-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,n){t&1&&v(0,0)},dependencies:[Q],encapsulation:2})}return i})();var Pe=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275cmp=S({type:i,selectors:[["cdk-row"],["tr","cdk-row",""]],hostAttrs:["role","row",1,"cdk-row"],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,n){t&1&&v(0,0)},dependencies:[Q],encapsulation:2})}return i})(),Vt=(()=>{class i{templateRef=a(B);_contentClassNames=["cdk-no-data-row","cdk-row"];_cellClassNames=["cdk-cell","cdk-no-data-cell"];_cellSelector="td, cdk-cell, [cdk-cell], .cdk-cell";constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["ng-template","cdkNoDataRow",""]]})}return i})(),Pt=["top","bottom","left","right"],Ee=class{_isNativeHtmlTable;_stickCellCss;_isBrowser;_needsPositionStickyOnElement;direction;_positionListener;_tableInjector;_elemSizeCache=new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(o=>this._updateCachedSizes(o)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(o,e,t=!0,n=!0,r,s,l){this._isNativeHtmlTable=o,this._stickCellCss=e,this._isBrowser=t,this._needsPositionStickyOnElement=n,this.direction=r,this._positionListener=s,this._tableInjector=l,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(o,e){(e.includes("left")||e.includes("right"))&&this._removeFromStickyColumnReplayQueue(o);let t=[];for(let n of o)n.nodeType===n.ELEMENT_NODE&&t.push(n,...Array.from(n.children));ee({write:()=>{for(let n of t)this._removeStickyStyle(n,e)}},{injector:this._tableInjector})}updateStickyColumns(o,e,t,n=!0,r=!0){if(!o.length||!this._isBrowser||!(e.some(F=>F)||t.some(F=>F))){this._positionListener?.stickyColumnsUpdated({sizes:[]}),this._positionListener?.stickyEndColumnsUpdated({sizes:[]});return}let s=o[0],l=s.children.length,d=this.direction==="rtl",u=d?"right":"left",m=d?"left":"right",g=e.lastIndexOf(!0),y=t.indexOf(!0),w,Ue,Ve;r&&this._updateStickyColumnReplayQueue({rows:[...o],stickyStartStates:[...e],stickyEndStates:[...t]}),ee({earlyRead:()=>{w=this._getCellWidths(s,n),Ue=this._getStickyStartColumnPositions(w,e),Ve=this._getStickyEndColumnPositions(w,t)},write:()=>{for(let F of o)for(let R=0;R<l;R++){let $e=F.children[R];e[R]&&this._addStickyStyle($e,u,Ue[R],R===g),t[R]&&this._addStickyStyle($e,m,Ve[R],R===y)}this._positionListener&&w.some(F=>!!F)&&(this._positionListener.stickyColumnsUpdated({sizes:g===-1?[]:w.slice(0,g+1).map((F,R)=>e[R]?F:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:y===-1?[]:w.slice(y).map((F,R)=>t[R+y]?F:null).reverse()}))}},{injector:this._tableInjector})}stickRows(o,e,t){if(!this._isBrowser)return;let n=t==="bottom"?o.slice().reverse():o,r=t==="bottom"?e.slice().reverse():e,s=[],l=[],d=[];ee({earlyRead:()=>{for(let u=0,m=0;u<n.length;u++){if(!r[u])continue;s[u]=m;let g=n[u];d[u]=this._isNativeHtmlTable?Array.from(g.children):[g];let y=this._retrieveElementSize(g).height;m+=y,l[u]=y}},write:()=>{let u=r.lastIndexOf(!0);for(let m=0;m<n.length;m++){if(!r[m])continue;let g=s[m],y=m===u;for(let w of d[m])this._addStickyStyle(w,t,g,y)}t==="top"?this._positionListener?.stickyHeaderRowsUpdated({sizes:l,offsets:s,elements:d}):this._positionListener?.stickyFooterRowsUpdated({sizes:l,offsets:s,elements:d})}},{injector:this._tableInjector})}updateStickyFooterContainer(o,e){this._isNativeHtmlTable&&ee({write:()=>{let t=o.querySelector("tfoot");t&&(e.some(n=>!n)?this._removeStickyStyle(t,["bottom"]):this._addStickyStyle(t,"bottom",0,!1))}},{injector:this._tableInjector})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._resizeObserver?.disconnect(),this._destroyed=!0}_removeStickyStyle(o,e){if(!o.classList.contains(this._stickCellCss))return;for(let n of e)o.style[n]="",o.classList.remove(this._borderCellCss[n]);Pt.some(n=>e.indexOf(n)===-1&&o.style[n])?o.style.zIndex=this._getCalculatedZIndex(o):(o.style.zIndex="",this._needsPositionStickyOnElement&&(o.style.position=""),o.classList.remove(this._stickCellCss))}_addStickyStyle(o,e,t,n){o.classList.add(this._stickCellCss),n&&o.classList.add(this._borderCellCss[e]),o.style[e]=`${t}px`,o.style.zIndex=this._getCalculatedZIndex(o),this._needsPositionStickyOnElement&&(o.style.cssText+="position: -webkit-sticky; position: sticky; ")}_getCalculatedZIndex(o){let e={top:100,bottom:10,left:1,right:1},t=0;for(let n of Pt)o.style[n]&&(t+=e[n]);return t?`${t}`:""}_getCellWidths(o,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],n=o.children;for(let r=0;r<n.length;r++){let s=n[r];t.push(this._retrieveElementSize(s).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(o,e){let t=[],n=0;for(let r=0;r<o.length;r++)e[r]&&(t[r]=n,n+=o[r]);return t}_getStickyEndColumnPositions(o,e){let t=[],n=0;for(let r=o.length;r>0;r--)e[r]&&(t[r]=n,n+=o[r]);return t}_retrieveElementSize(o){let e=this._elemSizeCache.get(o);if(e)return e;let t=o.getBoundingClientRect(),n={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(o,n),this._resizeObserver.observe(o,{box:"border-box"})),n}_updateStickyColumnReplayQueue(o){this._removeFromStickyColumnReplayQueue(o.rows),this._stickyColumnsReplayTimeout||this._updatedStickyColumnsParamsToReplay.push(o)}_removeFromStickyColumnReplayQueue(o){let e=new Set(o);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(n=>!e.has(n));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(o){let e=!1;for(let t of o){let n=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};n.width!==this._elemSizeCache.get(t.target)?.width&&li(t.target)&&(e=!0),this._elemSizeCache.set(t.target,n)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}};function li(i){return["cdk-cell","cdk-header-cell","cdk-footer-cell"].some(o=>i.classList.contains(o))}var le=new J("STICKY_POSITIONING_LISTENER");var He=(()=>{class i{viewContainer=a(Y);elementRef=a(P);constructor(){let e=a(N);e._rowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","rowOutlet",""]]})}return i})(),Be=(()=>{class i{viewContainer=a(Y);elementRef=a(P);constructor(){let e=a(N);e._headerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","headerRowOutlet",""]]})}return i})(),ze=(()=>{class i{viewContainer=a(Y);elementRef=a(P);constructor(){let e=a(N);e._footerRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","footerRowOutlet",""]]})}return i})(),Le=(()=>{class i{viewContainer=a(Y);elementRef=a(P);constructor(){let e=a(N);e._noDataRowOutlet=this,e._outletAssigned()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=h({type:i,selectors:[["","noDataRowOutlet",""]]})}return i})(),je=(()=>{class i{_differs=a(X);_changeDetectorRef=a(ge);_elementRef=a(P);_dir=a(gt,{optional:!0});_platform=a(pt);_viewRepeater;_viewportRuler=a(Mt);_injector=a(ot);_virtualScrollViewport=a(Tt,{optional:!0,host:!0});_positionListener=a(le,{optional:!0})||a(le,{optional:!0,skipSelf:!0});_document=a(rt);_data;_renderedRange;_onDestroy=new A;_renderRows;_renderChangeSubscription=null;_columnDefsByName=new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef=null;_customColumnDefs=new Set;_customRowDefs=new Set;_customHeaderRowDefs=new Set;_customFooterRowDefs=new Set;_customNoDataRow=null;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=new Map;_isNativeHtmlTable;_stickyStyler;stickyCssClass="cdk-table-sticky";needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_headerRowStickyUpdates=new A;_footerRowStickyUpdates=new A;_disableVirtualScrolling=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute("role");return e==="grid"||e==="treegrid"?"gridcell":"cell"}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&(this._switchDataSource(e),this._changeDetectorRef.markForCheck())}_dataSource;_dataSourceChanges=new A;_dataStream=new A;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._virtualScrollEnabled()?!0:this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;recycleRows=!1;contentChanged=new he;viewChange=new W({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;constructor(){a(new ut("role"),{optional:!0})||this._elementRef.nativeElement.setAttribute("role","table"),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName==="TABLE",this._dataDiffer=this._differs.find([]).create((t,n)=>this.trackBy?this.trackBy(n.dataIndex,n.data):n)}ngOnInit(){this._setupStickyStyler(),this._viewportRuler.change().pipe(U(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._viewRepeater=this.recycleRows||this._virtualScrollEnabled()?new xt:new Nt,this._virtualScrollEnabled()&&this._setupVirtualScrolling(this._virtualScrollViewport),this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._headerRowStickyUpdates.complete(),this._footerRowStickyUpdates.complete(),this._onDestroy.next(),this._onDestroy.complete(),ye(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(n,r,s)=>this._getEmbeddedViewArgs(n.item,s),n=>n.item.data,n=>{n.operation===kt.INSERTED&&n.context&&this._renderCellTemplateForItem(n.record.item.rowDef,n.context)}),this._updateRowIndexContext(),e.forEachIdentityChange(n=>{let r=t.get(n.currentIndex);r.context.$implicit=n.item.data}),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let n=Ht(this._headerRowOutlet,"thead");n&&(n.style.display=e.length?"":"none")}let t=this._headerRowDefs.map(n=>n.sticky);this._stickyStyler.clearStickyPositioning(e,["top"]),this._stickyStyler.stickRows(e,t,"top"),this._headerRowDefs.forEach(n=>n.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let n=Ht(this._footerRowOutlet,"tfoot");n&&(n.style.display=e.length?"":"none")}let t=this._footerRowDefs.map(n=>n.sticky);this._stickyStyler.clearStickyPositioning(e,["bottom"]),this._stickyStyler.stickRows(e,t,"bottom"),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(n=>n.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),n=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this.fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...n],["left","right"]),this._stickyColumnStylesNeedReset=!1),e.forEach((r,s)=>{this._addStickyColumnStyles([r],this._headerRowDefs[s])}),this._rowDefs.forEach(r=>{let s=[];for(let l=0;l<t.length;l++)this._renderRows[l].rowDef===r&&s.push(t[l]);this._addStickyColumnStyles(s,r)}),n.forEach((r,s)=>{this._addStickyColumnStyles([r],this._footerRowDefs[s])}),Array.from(this._columnDefsByName.values()).forEach(r=>r.resetStickyChanged())}stickyColumnsUpdated(e){this._positionListener?.stickyColumnsUpdated(e)}stickyEndColumnsUpdated(e){this._positionListener?.stickyEndColumnsUpdated(e)}stickyHeaderRowsUpdated(e){this._headerRowStickyUpdates.next(e),this._positionListener?.stickyHeaderRowsUpdated(e)}stickyFooterRowsUpdated(e){this._footerRowStickyUpdates.next(e),this._positionListener?.stickyFooterRowsUpdated(e)}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){if(!Array.isArray(this._data)||!this._renderedRange)return[];let e=[],t=Math.min(this._data.length,this._renderedRange.end),n=this._cachedRenderRowsMap;this._cachedRenderRowsMap=new Map;for(let r=this._renderedRange.start;r<t;r++){let s=this._data[r],l=this._getRenderRowsForData(s,r,n.get(s));this._cachedRenderRowsMap.has(s)||this._cachedRenderRowsMap.set(s,new WeakMap);for(let d=0;d<l.length;d++){let u=l[d],m=this._cachedRenderRowsMap.get(u.data);m.has(u.rowDef)?m.get(u.rowDef).push(u):m.set(u.rowDef,[u]),e.push(u)}}return e}_getRenderRowsForData(e,t,n){return this._getRowDefs(e,t).map(s=>{let l=n&&n.has(s)?n.get(s):[];if(l.length){let d=l.shift();return d.dataIndex=t,d}else return{data:e,rowDef:s,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),we(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=we(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=we(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=we(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(s,l)=>{let d=!!l.getColumnsDiff();return s||d},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let n=this._headerRowDefs.reduce(e,!1);n&&this._forceRenderHeaderRows();let r=this._footerRowDefs.reduce(e,!1);return r&&this._forceRenderFooterRows(),t||n||r}_switchDataSource(e){this._data=[],ye(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;ye(this.dataSource)?e=this.dataSource.connect(this):Ke(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=q(this.dataSource)),this._renderChangeSubscription=z([e,this.viewChange]).pipe(U(this._onDestroy)).subscribe(([t,n])=>{this._data=t||[],this._renderedRange=n,this._dataStream.next(t),this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let n=Array.from(t?.columns||[]).map(l=>{let d=this._columnDefsByName.get(l);return d}),r=n.map(l=>l.sticky),s=n.map(l=>l.stickyEnd);this._stickyStyler.updateStickyColumns(e,r,s,!this.fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let n=0;n<e.viewContainer.length;n++){let r=e.viewContainer.get(n);t.push(r.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length===1)return[this._rowDefs[0]];let n=[];if(this.multiTemplateDataRows)n=this._rowDefs.filter(r=>!r.when||r.when(t,e));else{let r=this._rowDefs.find(s=>s.when&&s.when(t,e))||this._defaultRowDef;r&&n.push(r)}return n.length,n}_getEmbeddedViewArgs(e,t){let n=e.rowDef,r={$implicit:e.data};return{templateRef:n.template,context:r,index:t}}_renderRow(e,t,n,r={}){let s=e.viewContainer.createEmbeddedView(t.template,r,n);return this._renderCellTemplateForItem(t,r),s}_renderCellTemplateForItem(e,t){for(let n of this._getCellTemplates(e))Q.mostRecentCellOutlet&&Q.mostRecentCellOutlet._viewContainer.createEmbeddedView(n,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,n=e.length;t<n;t++){let s=e.get(t).context;s.count=n,s.first=t===0,s.last=t===n-1,s.even=t%2===0,s.odd=!s.even,this.multiTemplateDataRows?(s.dataIndex=this._renderRows[t].dataIndex,s.renderIndex=t):s.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let n=this._columnDefsByName.get(t);return e.extractCellTemplate(n)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,n)=>t||n.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:"ltr",t=this._injector;this._stickyStyler=new Ee(this._isNativeHtmlTable,this.stickyCssClass,this._platform.isBrowser,this.needsPositionStickyOnElement,e,this,t),(this._dir?this._dir.change:q()).pipe(U(this._onDestroy)).subscribe(n=>{this._stickyStyler.direction=n,this.updateStickyColumnStyles()})}_setupVirtualScrolling(e){let t=typeof requestAnimationFrame<"u"?qe:We;this.viewChange.next({start:0,end:0}),e.renderedRangeStream.pipe(Xe(0,t),U(this._onDestroy)).subscribe(this.viewChange),e.attach({dataStream:this._dataStream,measureRangeSize:(n,r)=>this._measureRangeSize(n,r)}),z([e.renderedContentOffset,this._headerRowStickyUpdates]).pipe(U(this._onDestroy)).subscribe(([n,r])=>{if(!(!r.sizes||!r.offsets||!r.elements))for(let s=0;s<r.elements.length;s++){let l=r.elements[s];if(l){let d=r.offsets[s],u=n!==0?Math.max(n-d,d):-d;for(let m of l)m.style.top=`${-u}px`}}}),z([e.renderedContentOffset,this._footerRowStickyUpdates]).pipe(U(this._onDestroy)).subscribe(([n,r])=>{if(!(!r.sizes||!r.offsets||!r.elements))for(let s=0;s<r.elements.length;s++){let l=r.elements[s];if(l)for(let d of l)d.style.bottom=`${n+r.offsets[s]}px`}})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let n=this._noDataRowOutlet.viewContainer;if(t){let r=n.createEmbeddedView(e.templateRef),s=r.rootNodes[0];if(r.rootNodes.length===1&&s?.nodeType===this._document.ELEMENT_NODE){s.setAttribute("role","row"),s.classList.add(...e._contentClassNames);let l=s.querySelectorAll(e._cellSelector);for(let d=0;d<l.length;d++)l[d].classList.add(...e._cellClassNames)}}else n.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}_measureRangeSize(e,t){if(e.start>=e.end||t!=="vertical")return 0;let n=this.viewChange.value,r=this._rowOutlet.viewContainer;e.start<n.start||e.end>n.end;let s=e.start-n.start,l=e.end-e.start,d,u;for(let y=0;y<l;y++){let w=r.get(y+s);if(w&&w.rootNodes.length){d=u=w.rootNodes[0];break}}for(let y=l-1;y>-1;y--){let w=r.get(y+s);if(w&&w.rootNodes.length){u=w.rootNodes[w.rootNodes.length-1];break}}let m=d?.getBoundingClientRect?.(),g=u?.getBoundingClientRect?.();return m&&g?g.bottom-m.top:0}_virtualScrollEnabled(){return!this._disableVirtualScrolling&&this._virtualScrollViewport!=null}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=S({type:i,selectors:[["cdk-table"],["table","cdk-table",""]],contentQueries:function(t,n,r){if(t&1&&Me(r,Vt,5)(r,j,5)(r,be,5)(r,ce,5)(r,Ne,5),t&2){let s;M(s=T())&&(n._noDataRow=s.first),M(s=T())&&(n._contentColumnDefs=s),M(s=T())&&(n._contentRowDefs=s),M(s=T())&&(n._contentHeaderRowDefs=s),M(s=T())&&(n._contentFooterRowDefs=s)}},hostAttrs:[1,"cdk-table"],hostVars:2,hostBindings:function(t,n){t&2&&$("cdk-table-fixed-layout",n.fixedLayout)},inputs:{trackBy:"trackBy",dataSource:"dataSource",multiTemplateDataRows:[2,"multiTemplateDataRows","multiTemplateDataRows",D],fixedLayout:[2,"fixedLayout","fixedLayout",D],recycleRows:[2,"recycleRows","recycleRows",D]},outputs:{contentChanged:"contentChanged"},exportAs:["cdkTable"],features:[I([{provide:N,useExisting:i},{provide:le,useValue:null}])],ngContentSelectors:oi,decls:5,vars:2,consts:[["role","rowgroup"],["headerRowOutlet",""],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,n){t&1&&(G(ni),O(0),O(1,1),k(2,ri,1,0),k(3,si,7,0)(4,ai,4,0)),t&2&&(f(2),x(n._isServer?2:-1),f(),x(n._isNativeHtmlTable?3:4))},dependencies:[Be,He,Le,ze],styles:[`.cdk-table-fixed-layout {
  table-layout: fixed;
}
`],encapsulation:2})}return i})();function we(i,o){return i.concat(Array.from(o))}function Ht(i,o){let e=o.toUpperCase(),t=i.viewContainer.element.nativeElement;for(;t;){let n=t.nodeType===1?t.nodeName:null;if(n===e)return t;if(n==="TABLE")break;t=t.parentNode}return null}var ci=["mat-sort-header",""],di=["*",[["","matSortHeaderIcon",""]]],ui=["*","[matSortHeaderIcon]"];function hi(i,o){i&1&&(nt(),fe(0,"svg",3),at(1,"path",4),ne())}function fi(i,o){i&1&&(fe(0,"div",2),O(1,1,null,hi,2,0),ne())}var $t=new J("MAT_SORT_DEFAULT_OPTIONS"),Re=(()=>{class i{_defaultOptions;_initializedStream=new Qe(1);sortables=new Map;_stateChanges=new A;active;start="asc";get direction(){return this._direction}set direction(e){this._direction=e}_direction="";disableClear;disabled=!1;sortChange=new he;initialized=this._initializedStream;constructor(e){this._defaultOptions=e}register(e){this.sortables.set(e.id,e)}deregister(e){this.sortables.delete(e.id)}sort(e){this.active!=e.id?(this.active=e.id,this.direction=e.start?e.start:this.start):this.direction=this.getNextSortDirection(e),this.sortChange.emit({active:this.active,direction:this.direction})}getNextSortDirection(e){if(!e)return"";let t=e?.disableClear??this.disableClear??!!this._defaultOptions?.disableClear,n=mi(e.start||this.start,t),r=n.indexOf(this.direction)+1;return r>=n.length&&(r=0),n[r]}ngOnInit(){this._initializedStream.next()}ngOnChanges(){this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete(),this._initializedStream.complete()}static \u0275fac=function(t){return new(t||i)(st($t,8))};static \u0275dir=h({type:i,selectors:[["","matSort",""]],hostAttrs:[1,"mat-sort"],inputs:{active:[0,"matSortActive","active"],start:[0,"matSortStart","start"],direction:[0,"matSortDirection","direction"],disableClear:[2,"matSortDisableClear","disableClear",D],disabled:[2,"matSortDisabled","disabled",D]},outputs:{sortChange:"matSortChange"},exportAs:["matSort"],features:[K]})}return i})();function mi(i,o){let e=["asc","desc"];return i=="desc"&&e.reverse(),o||e.push(""),e}var Qt=(()=>{class i{_sort=a(Re,{optional:!0});_columnDef=a(j,{optional:!0});_changeDetectorRef=a(ge);_focusMonitor=a(wt);_elementRef=a(P);_ariaDescriber=a(Dt,{optional:!0});_renderChanges;_animationsDisabled=_t();_recentlyCleared=H(null);_sortButton;id;arrowPosition="after";start;disabled=!1;get sortActionDescription(){return this._sortActionDescription}set sortActionDescription(e){this._updateSortActionDescription(e)}_sortActionDescription="Sort";disableClear;constructor(){a(Ct).load(vt);let e=a($t,{optional:!0});this._sort,e?.arrowPosition&&(this.arrowPosition=e?.arrowPosition)}ngOnInit(){!this.id&&this._columnDef&&(this.id=this._columnDef.name),this._sort.register(this),this._renderChanges=Z(this._sort._stateChanges,this._sort.sortChange).subscribe(()=>this._changeDetectorRef.markForCheck()),this._sortButton=this._elementRef.nativeElement.querySelector(".mat-sort-header-container"),this._updateSortActionDescription(this._sortActionDescription)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(()=>{Promise.resolve().then(()=>this._recentlyCleared.set(null))})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._sort.deregister(this),this._renderChanges?.unsubscribe(),this._sortButton&&this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription)}_toggleOnInteraction(){if(!this._isDisabled()){let e=this._isSorted(),t=this._sort.direction;this._sort.sort(this),this._recentlyCleared.set(e&&!this._isSorted()?t:null)}}_handleKeydown(e){(e.keyCode===32||e.keyCode===13)&&(e.preventDefault(),this._toggleOnInteraction())}_isSorted(){return this._sort.active==this.id&&(this._sort.direction==="asc"||this._sort.direction==="desc")}_isDisabled(){return this._sort.disabled||this.disabled}_getAriaSortAttribute(){return this._isSorted()?this._sort.direction=="asc"?"ascending":"descending":"none"}_renderArrow(){return!this._isDisabled()||this._isSorted()}_updateSortActionDescription(e){this._sortButton&&(this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription),this._ariaDescriber?.describe(this._sortButton,e)),this._sortActionDescription=e}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=S({type:i,selectors:[["","mat-sort-header",""]],hostAttrs:[1,"mat-sort-header"],hostVars:3,hostBindings:function(t,n){t&1&&oe("click",function(){return n._toggleOnInteraction()})("keydown",function(s){return n._handleKeydown(s)})("mouseleave",function(){return n._recentlyCleared.set(null)}),t&2&&(te("aria-sort",n._getAriaSortAttribute()),$("mat-sort-header-disabled",n._isDisabled()))},inputs:{id:[0,"mat-sort-header","id"],arrowPosition:"arrowPosition",start:"start",disabled:[2,"disabled","disabled",D],sortActionDescription:"sortActionDescription",disableClear:[2,"disableClear","disableClear",D]},exportAs:["matSortHeader"],attrs:ci,ngContentSelectors:ui,decls:4,vars:17,consts:[[1,"mat-sort-header-container","mat-focus-indicator"],[1,"mat-sort-header-content"],[1,"mat-sort-header-arrow"],["viewBox","0 -960 960 960","focusable","false","aria-hidden","true"],["d","M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z"]],template:function(t,n){t&1&&(G(di),fe(0,"div",0)(1,"div",1),O(2),ne(),k(3,fi,3,0,"div",2),ne()),t&2&&($("mat-sort-header-sorted",n._isSorted())("mat-sort-header-position-before",n.arrowPosition==="before")("mat-sort-header-descending",n._sort.direction==="desc")("mat-sort-header-ascending",n._sort.direction==="asc")("mat-sort-header-recently-cleared-ascending",n._recentlyCleared()==="asc")("mat-sort-header-recently-cleared-descending",n._recentlyCleared()==="desc")("mat-sort-header-animations-disabled",n._animationsDisabled),te("tabindex",n._isDisabled()?null:0)("role",n._isDisabled()?null:"button"),f(3),x(n._renderArrow()?3:-1))},styles:[`.mat-sort-header {
  cursor: pointer;
}

.mat-sort-header-disabled {
  cursor: default;
}

.mat-sort-header-container {
  display: flex;
  align-items: center;
  letter-spacing: normal;
  outline: 0;
}
[mat-sort-header].cdk-keyboard-focused .mat-sort-header-container, [mat-sort-header].cdk-program-focused .mat-sort-header-container {
  border-bottom: solid 1px currentColor;
}
.mat-sort-header-container::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-sort-header-content {
  display: flex;
  align-items: center;
}

.mat-sort-header-position-before {
  flex-direction: row-reverse;
}

@keyframes _mat-sort-header-recently-cleared-ascending {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-25%);
    opacity: 0;
  }
}
@keyframes _mat-sort-header-recently-cleared-descending {
  from {
    transform: translateY(0) rotate(180deg);
    opacity: 1;
  }
  to {
    transform: translateY(25%) rotate(180deg);
    opacity: 0;
  }
}
.mat-sort-header-arrow {
  height: 12px;
  width: 12px;
  position: relative;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1), opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  overflow: visible;
  color: var(--mat-sort-arrow-color, var(--mat-sys-on-surface));
}
.mat-sort-header.cdk-keyboard-focused .mat-sort-header-arrow, .mat-sort-header.cdk-program-focused .mat-sort-header-arrow, .mat-sort-header:hover .mat-sort-header-arrow {
  opacity: 0.54;
}
.mat-sort-header .mat-sort-header-sorted .mat-sort-header-arrow {
  opacity: 1;
}
.mat-sort-header-descending .mat-sort-header-arrow {
  transform: rotate(180deg);
}
.mat-sort-header-recently-cleared-ascending .mat-sort-header-arrow {
  transform: translateY(-25%);
}
.mat-sort-header-recently-cleared-ascending .mat-sort-header-arrow {
  transition: none;
  animation: _mat-sort-header-recently-cleared-ascending 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.mat-sort-header-recently-cleared-descending .mat-sort-header-arrow {
  transition: none;
  animation: _mat-sort-header-recently-cleared-descending 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.mat-sort-header-animations-disabled .mat-sort-header-arrow {
  transition-duration: 0ms;
  animation-duration: 0ms;
}
.mat-sort-header-arrow > svg, .mat-sort-header-arrow [matSortHeaderIcon] {
  width: 24px;
  height: 24px;
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12px 0 0 -12px;
  transform: translateZ(0);
}
.mat-sort-header-arrow, [dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow {
  margin: 0 0 0 6px;
}
.mat-sort-header-position-before .mat-sort-header-arrow, [dir=rtl] .mat-sort-header-arrow {
  margin: 0 6px 0 0;
}
`],encapsulation:2,changeDetection:0})}return i})();var pi=[[["caption"]],[["colgroup"],["col"]],"*"],_i=["caption","colgroup, col","*"];function gi(i,o){i&1&&O(0,2)}function yi(i,o){i&1&&(p(0,"thead",0),v(1,1),_(),p(2,"tbody",2),v(3,3)(4,4),_(),p(5,"tfoot",0),v(6,5),_())}function wi(i,o){i&1&&v(0,1)(1,3)(2,4)(3,5)}var Wt=(()=>{class i extends je{stickyCssClass="mat-mdc-table-sticky";needsPositionStickyOnElement=!1;static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275cmp=S({type:i,selectors:[["mat-table"],["table","mat-table",""]],hostAttrs:[1,"mat-mdc-table","mdc-data-table__table"],hostVars:2,hostBindings:function(t,n){t&2&&$("mat-table-fixed-layout",n.fixedLayout)},exportAs:["matTable"],features:[I([{provide:je,useExisting:i},{provide:N,useExisting:i},{provide:le,useValue:null}]),C],ngContentSelectors:_i,decls:5,vars:2,consts:[["role","rowgroup"],["headerRowOutlet",""],["role","rowgroup",1,"mdc-data-table__content"],["rowOutlet",""],["noDataRowOutlet",""],["footerRowOutlet",""]],template:function(t,n){t&1&&(G(pi),O(0),O(1,1),k(2,gi,1,0),k(3,yi,7,0)(4,wi,4,0)),t&2&&(f(2),x(n._isServer?2:-1),f(),x(n._isNativeHtmlTable?3:4))},dependencies:[Be,He,Le,ze],styles:[`.mat-mdc-table-sticky {
  position: sticky !important;
}

mat-table {
  display: block;
}

mat-header-row {
  min-height: var(--mat-table-header-container-height, 56px);
}

mat-row {
  min-height: var(--mat-table-row-item-container-height, 52px);
}

mat-footer-row {
  min-height: var(--mat-table-footer-container-height, 52px);
}

mat-row, mat-header-row, mat-footer-row {
  display: flex;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  align-items: center;
  box-sizing: border-box;
}

mat-cell:first-of-type, mat-header-cell:first-of-type, mat-footer-cell:first-of-type {
  padding-left: 24px;
}
[dir=rtl] mat-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type) {
  padding-left: 0;
  padding-right: 24px;
}
mat-cell:last-of-type, mat-header-cell:last-of-type, mat-footer-cell:last-of-type {
  padding-right: 24px;
}
[dir=rtl] mat-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type) {
  padding-right: 0;
  padding-left: 24px;
}

mat-cell, mat-header-cell, mat-footer-cell {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-wrap: break-word;
  min-height: inherit;
}

.mat-mdc-table {
  min-width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;
  white-space: normal;
  background-color: var(--mat-table-background-color, var(--mat-sys-surface));
}

.mat-table-fixed-layout {
  table-layout: fixed;
}

.mdc-data-table__cell {
  box-sizing: border-box;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
}

.mdc-data-table__cell,
.mdc-data-table__header-cell {
  padding: 0 16px;
}

.mat-mdc-header-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--mat-table-header-container-height, 56px);
  color: var(--mat-table-header-headline-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-table-header-headline-font, var(--mat-sys-title-small-font, Roboto, sans-serif));
  line-height: var(--mat-table-header-headline-line-height, var(--mat-sys-title-small-line-height));
  font-size: var(--mat-table-header-headline-size, var(--mat-sys-title-small-size, 14px));
  font-weight: var(--mat-table-header-headline-weight, var(--mat-sys-title-small-weight, 500));
}

.mat-mdc-row {
  height: var(--mat-table-row-item-container-height, 52px);
  color: var(--mat-table-row-item-label-text-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
}

.mat-mdc-row,
.mdc-data-table__content {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-table-row-item-label-text-font, var(--mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--mat-table-row-item-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-table-row-item-label-text-size, var(--mat-sys-body-medium-size, 14px));
  font-weight: var(--mat-table-row-item-label-text-weight, var(--mat-sys-body-medium-weight));
}

.mat-mdc-footer-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--mat-table-footer-container-height, 52px);
  color: var(--mat-table-row-item-label-text-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-table-footer-supporting-text-font, var(--mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--mat-table-footer-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-table-footer-supporting-text-size, var(--mat-sys-body-medium-size, 14px));
  font-weight: var(--mat-table-footer-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-table-footer-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}

.mat-mdc-header-cell {
  border-bottom-color: var(--mat-table-row-item-outline-color, var(--mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--mat-table-header-headline-tracking, var(--mat-sys-title-small-tracking));
  font-weight: inherit;
  line-height: inherit;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  text-align: start;
}
.mdc-data-table__row:last-child > .mat-mdc-header-cell {
  border-bottom: none;
}

.mat-mdc-cell {
  border-bottom-color: var(--mat-table-row-item-outline-color, var(--mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--mat-table-row-item-label-text-tracking, var(--mat-sys-body-medium-tracking));
  line-height: inherit;
}
.mdc-data-table__row:last-child > .mat-mdc-cell {
  border-bottom: none;
}

.mat-mdc-footer-cell {
  letter-spacing: var(--mat-table-row-item-label-text-tracking, var(--mat-sys-body-medium-tracking));
}

mat-row.mat-mdc-row,
mat-header-row.mat-mdc-header-row,
mat-footer-row.mat-mdc-footer-row {
  border-bottom: none;
}

.mat-mdc-table tbody,
.mat-mdc-table tfoot,
.mat-mdc-table thead,
.mat-mdc-cell,
.mat-mdc-footer-cell,
.mat-mdc-header-row,
.mat-mdc-row,
.mat-mdc-footer-row,
.mat-mdc-table .mat-mdc-header-cell {
  background: inherit;
}

.mat-mdc-table mat-header-row.mat-mdc-header-row,
.mat-mdc-table mat-row.mat-mdc-row,
.mat-mdc-table mat-footer-row.mat-mdc-footer-cell {
  height: unset;
}

mat-header-cell.mat-mdc-header-cell,
mat-cell.mat-mdc-cell,
mat-footer-cell.mat-mdc-footer-cell {
  align-self: stretch;
}
`],encapsulation:2})}return i})(),qt=(()=>{class i extends De{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275dir=h({type:i,selectors:[["","matCellDef",""]],features:[I([{provide:De,useExisting:i}]),C]})}return i})(),Kt=(()=>{class i extends ve{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275dir=h({type:i,selectors:[["","matHeaderCellDef",""]],features:[I([{provide:ve,useExisting:i}]),C]})}return i})();var Yt=(()=>{class i extends j{get name(){return this._name}set name(e){this._setNameInput(e)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275dir=h({type:i,selectors:[["","matColumnDef",""]],inputs:{name:[0,"matColumnDef","name"]},features:[I([{provide:j,useExisting:i}]),C]})}return i})(),Gt=(()=>{class i extends jt{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275dir=h({type:i,selectors:[["mat-header-cell"],["th","mat-header-cell",""]],hostAttrs:["role","columnheader",1,"mat-mdc-header-cell","mdc-data-table__header-cell"],features:[C]})}return i})();var Xt=(()=>{class i extends Ut{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275dir=h({type:i,selectors:[["mat-cell"],["td","mat-cell",""]],hostAttrs:[1,"mat-mdc-cell","mdc-data-table__cell"],features:[C]})}return i})();var Zt=(()=>{class i extends ce{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275dir=h({type:i,selectors:[["","matHeaderRowDef",""]],inputs:{columns:[0,"matHeaderRowDef","columns"],sticky:[2,"matHeaderRowDefSticky","sticky",D]},features:[I([{provide:ce,useExisting:i}]),C]})}return i})();var Jt=(()=>{class i extends be{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275dir=h({type:i,selectors:[["","matRowDef",""]],inputs:{columns:[0,"matRowDefColumns","columns"],when:[0,"matRowDefWhen","when"]},features:[I([{provide:be,useExisting:i}]),C]})}return i})(),ei=(()=>{class i extends Ae{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275cmp=S({type:i,selectors:[["mat-header-row"],["tr","mat-header-row",""]],hostAttrs:["role","row",1,"mat-mdc-header-row","mdc-data-table__header-row"],exportAs:["matHeaderRow"],features:[I([{provide:Ae,useExisting:i}]),C],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,n){t&1&&v(0,0)},dependencies:[Q],encapsulation:2})}return i})();var ti=(()=>{class i extends Pe{static \u0275fac=(()=>{let e;return function(n){return(e||(e=E(i)))(n||i)}})();static \u0275cmp=S({type:i,selectors:[["mat-row"],["tr","mat-row",""]],hostAttrs:["role","row",1,"mat-mdc-row","mdc-data-table__row"],exportAs:["matRow"],features:[I([{provide:Pe,useExisting:i}]),C],decls:1,vars:0,consts:[["cdkCellOutlet",""]],template:function(t,n){t&1&&v(0,0)},dependencies:[Q],encapsulation:2})}return i})();var Ci=9007199254740991,de=class extends St{_data;_renderData=new W([]);_filter=new W("");_internalPageChanges=new A;_renderChangesSubscription=null;filteredData;get data(){return this._data.value}set data(o){o=Array.isArray(o)?o:[],this._data.next(o),this._renderChangesSubscription||this._filterData(o)}get filter(){return this._filter.value}set filter(o){this._filter.next(o),this._renderChangesSubscription||this._filterData(this.data)}get sort(){return this._sort}set sort(o){this._sort=o,this._updateChangeSubscription()}_sort;get paginator(){return this._paginator}set paginator(o){this._paginator=o,this._updateChangeSubscription()}_paginator;sortingDataAccessor=(o,e)=>{let t=o[e];if(yt(t)){let n=Number(t);return n<Ci?n:t}return t};sortData=(o,e)=>{let t=e.active,n=e.direction;return!t||n==""?o:o.sort((r,s)=>{let l=this.sortingDataAccessor(r,t),d=this.sortingDataAccessor(s,t),u=typeof l,m=typeof d;u!==m&&(u==="number"&&(l+=""),m==="number"&&(d+=""));let g=0;return l!=null&&d!=null?l>d?g=1:l<d&&(g=-1):l!=null?g=1:d!=null&&(g=-1),g*(n=="asc"?1:-1)})};filterPredicate=(o,e)=>{let t=e.trim().toLowerCase();return Object.values(o).some(n=>`${n}`.toLowerCase().includes(t))};constructor(o=[]){super(),this._data=new W(o),this._updateChangeSubscription()}_updateChangeSubscription(){let o=this._sort?Z(this._sort.sortChange,this._sort.initialized):q(null),e=this._paginator?Z(this._paginator.page,this._internalPageChanges,this._paginator.initialized):q(null),t=this._data,n=z([t,this._filter]).pipe(ue(([l])=>this._filterData(l))),r=z([n,o]).pipe(ue(([l])=>this._orderData(l))),s=z([r,e]).pipe(ue(([l])=>this._pageData(l)));this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=s.subscribe(l=>this._renderData.next(l))}_filterData(o){return this.filteredData=this.filter==null||this.filter===""?o:o.filter(e=>this.filterPredicate(e,this.filter)),this.paginator&&this._updatePaginator(this.filteredData.length),this.filteredData}_orderData(o){return this.sort?this.sortData(o.slice(),this.sort):o}_pageData(o){if(!this.paginator)return o;let e=this.paginator.pageIndex*this.paginator.pageSize;return o.slice(e,e+this.paginator.pageSize)}_updatePaginator(o){Promise.resolve().then(()=>{let e=this.paginator;if(e&&(e.length=o,e.pageIndex>0)){let t=Math.ceil(e.length/e.pageSize)-1||0,n=Math.min(e.pageIndex,t);n!==e.pageIndex&&(e.pageIndex=n,this._internalPageChanges.next())}})}connect(){return this._renderChangesSubscription||this._updateChangeSubscription(),this._renderData}disconnect(){this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=null}};var Di=["empTbSort"],vi=["paginator"];function bi(i,o){if(i&1&&(c(0,`
    `),p(1,"span"),c(2),_(),c(3,`
    `)),i&2){let e=b();f(2),ct("",e.scanStatus()," (",e.scanRunId(),")")}}function Ri(i,o){if(i&1&&(p(0,"th",14),c(1),se(2,"translate"),_()),i&2){let e=b().$implicit;L("mat-sort-header",dt(e)),f(),_e(ae(2,3,e))}}function Si(i,o){i&1&&(c(0,`
          `),p(1,"span"),c(2,"/"),_(),c(3,`
          `))}function ki(i,o){i&1&&(c(0,`
            `),p(1,"mat-icon"),c(2,"description"),_(),c(3,`
            `))}function xi(i,o){if(i&1&&(c(0,`
          `),p(1,"span",16),c(2,`
            `),ke(3,ki,4,0,null,null,Se),_(),c(5,`
          `)),i&2){let e=b(2).$implicit,t=b(2);f(),te("title",t.missingInformation(e).join(", ")),f(2),xe(t.missingInformation(e))}}function Mi(i,o){if(i&1&&(c(0," "),k(1,Si,4,0)(2,xi,6,1)),i&2){let e=b().$implicit,t=b(2);f(),x(t.missingInformation(e).length===0?1:2)}}function Ti(i,o){if(i&1){let e=lt();c(0,`
          `),p(1,"button",17),oe("click",function(){tt(e);let n=b().$implicit,r=b(2);return it(r.showDetails(n))}),c(2),se(3,"translate"),_(),c(4,`
          `)}i&2&&(f(2),_e(ae(3,1,"Details")))}function Fi(i,o){if(i&1&&c(0),i&2){let e=b().$implicit,t=b().$implicit;re(`
          `,e[t]??"",`
          `)}}function Ei(i,o){if(i&1&&(p(0,"td",15),c(1,`
          `),k(2,Mi,3,1)(3,Ti,5,3)(4,Fi,1,1),_()),i&2){let e=b().$implicit;f(2),x(e==="missingInformation"?2:e==="actions"?3:4)}}function Oi(i,o){if(i&1&&(c(0,`
      `),me(1,11),c(2,`
        `),V(3,Ri,3,5,"th",12),c(4,`
        `),V(5,Ei,5,1,"td",13),c(6,`
      `),pe(),c(7,`
      `)),i&2){let e=o.$implicit;f(),L("matColumnDef",e)}}function Ii(i,o){i&1&&ie(0,"tr",18)}function Ni(i,o){i&1&&ie(0,"tr",19)}var oo=(()=>{class i{constructor(){this.empTbSort=new Re,this.publishers=H([]),this.comics=H([]),this.storedColumns=["publisherResolved","numberResolved","heroesResolved","collection","titlesResolved","originalFilename","missingInformation","actions"],this.dataSource=H(new de),this.isBusy=H(!1),this.scanStatus=H(""),this.scanRunId=H(null),this.pageSizes=[5,10,25,50,100],this.catalogService=a(It),this.dialog=a(Ft),this.http=a(ht)}ngOnInit(){this.loadStoredData()}ngAfterViewInit(){this.dataSource().paginator=this.paginator,this.dataSource().sort=this.empTbSort}loadStoredData(){Ye({publishers:this.catalogService.readPublishers(),comics:this.catalogService.readComics()}).subscribe({next:e=>{this.publishers.set(e.publishers),this.setComics(e.comics)}})}importData(){this.dialog.closeAll(),this.isBusy.set(!0),this.http.post(`${Fe.apiUrl}admin/scan`,{}).subscribe({next:({scanRunId:e})=>{this.scanRunId.set(e),this.scanStatus.set("queued"),Ge(5e3).pipe(Ze(0),Je(()=>this.http.get(`${Fe.apiUrl}admin/scan/${e}`)),et(t=>t.status==="queued"||t.status==="running",!0)).subscribe({next:t=>this.scanStatus.set(t.status),complete:()=>{this.isBusy.set(!1),this.loadStoredData()},error:()=>{this.scanStatus.set("failed"),this.isBusy.set(!1)}})},error:()=>{this.scanStatus.set("failed"),this.isBusy.set(!1)}})}showDetails(e){this.dialog.open(Ot,{width:"min(900px, 96vw)",maxHeight:"90vh",panelClass:"comic-details-dialog-panel",data:e})}missingInformation(e){let t=[];return e.comicMissing===!0&&t.push("comic"),t}comicIndex(e){return this.comics().indexOf(e)}setComics(e){this.comics.set(e);let t=new de(e);t.sort=this.empTbSort,t.paginator=this.paginator,this.dataSource.set(t)}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=S({type:i,selectors:[["app-parse-folders"]],viewQuery:function(t,n){if(t&1&&Te(Di,5)(vi,5),t&2){let r;M(r=T())&&(n.empTbSort=r.first),M(r=T())&&(n.paginator=r.first)}},decls:33,vars:13,consts:[["empTbSort","matSort"],["paginator",""],[1,"page"],[1,"actions"],["mat-flat-button","","color","primary","type","button",3,"click","disabled"],[1,"table-wrapper"],["mat-table","","matSort","",1,"my-table","mat-elevation-z8",3,"dataSource"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",1,"table-paginator",3,"pageSizeOptions","pageSize"],[1,"actions","actions-bottom"],[3,"matColumnDef"],["mat-header-cell","",3,"mat-sort-header",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["mat-header-cell","",3,"mat-sort-header"],["mat-cell",""],[1,"missing-icons"],["mat-button","","type","button",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,n){t&1&&(p(0,"div",2),c(1,`
  `),p(2,"div",3),c(3,`
    `),p(4,"button",4),oe("click",function(){return n.importData()}),c(5),se(6,"translate"),_(),c(7,`
    `),k(8,bi,4,2),p(9,"span"),c(10),se(11,"translate"),_(),c(12,`
  `),_(),c(13,`
  `),p(14,"div",5),c(15,`
    `),p(16,"table",6,0),c(18,`
      `),ke(19,Oi,8,1,null,null,Se),V(21,Ii,1,0,"tr",7),c(22,`
      `),V(23,Ni,1,0,"tr",8),c(24,`
    `),_(),c(25,`
  `),_(),c(26,`
  `),ie(27,"mat-paginator",9,1),c(29,`
  `),ie(30,"div",10),c(31,`
`),_(),c(32,`
`)),t&2&&(f(4),L("disabled",n.isBusy()),f(),re(`
      `,ae(6,9,"Scan library"),`
    `),f(3),x(n.scanStatus()?8:-1),f(2),_e(ae(11,11,"Stored data")),f(6),L("dataSource",n.dataSource()),f(3),xe(n.storedColumns),f(2),L("matHeaderRowDef",n.storedColumns),f(2),L("matRowDefColumns",n.storedColumns),f(4),L("pageSizeOptions",n.pageSizes)("pageSize",10))},dependencies:[Wt,Re,Yt,Kt,Gt,Qt,qt,Xt,Zt,ei,Jt,ti,At,Et,Rt,bt,mt,ft],styles:["[_nghost-%COMP%]{display:block;min-width:0;width:100%}.page[_ngcontent-%COMP%]{box-sizing:border-box;min-width:0;width:100%}.actions[_ngcontent-%COMP%]{align-items:center;display:flex;gap:12px;padding:12px 0}.actions-bottom[_ngcontent-%COMP%]{justify-content:flex-end}.table-wrapper[_ngcontent-%COMP%]{box-sizing:border-box;display:block;max-width:100%;min-width:0;overflow-x:auto;width:100%}.my-table[_ngcontent-%COMP%]{min-width:100%;width:max-content}.table-paginator[_ngcontent-%COMP%]{box-sizing:border-box;display:block;max-width:100%;min-width:0;width:100%}.missing-icons[_ngcontent-%COMP%]{align-items:center;display:inline-flex;gap:4px}.missing-icons[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;height:18px;width:18px}input[_ngcontent-%COMP%]:not([type=checkbox]){min-width:120px}"],changeDetection:0})}}return i})();export{oo as ParseFoldersComponent};
