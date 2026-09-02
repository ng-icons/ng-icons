import{$t as e,En as t,G as n,H as r,In as i,J as a,Ln as o,Nn as s,On as c,Ot as l,Rt as u,St as d,V as f,Zn as p,_n as m,_t as h,bn as g,rt as _,tt as v,vn as y,wt as b,z as x,zt as S}from"./_router-chunk-BE_4R8PD.js";import{i as C}from"./common-DQ_4wQkv.js";var w=new m(`Ng Glyph Config`),T={size:`1em`,opticalSize:20,weight:400,grade:0,fill:!1};function E(){return c(w,{optional:!0})??T}var D=new m(`NgGlyphsToken`);function O(){let e=c(D,{optional:!0});if(!e)throw Error(`Please provide the glyphs using the provideNgGlyphs() function.`);return e}function k(e){return e==null?``:/^\d+$/.test(e)?`${e}px`:e}(class t{constructor(){this.glyphsets=O(),this.config=E(),this.name=r.required(),this.glyphset=r(this.glyphsets.defaultGlyphset),this.opticalSize=r(this.config.opticalSize,{transform:n}),this.weight=r(this.config.weight,{transform:n}),this.grade=r(this.config.grade,{transform:n}),this.fill=r(this.config.fill,{transform:f}),this.size=r(this.config.size,{transform:k}),this.color=r(this.config.color),this.glyphsetClass=a(()=>{let e=this.glyphsets.glyphsets.find(e=>e.name===this.glyphset());if(!e)throw Error(`The glyphset "${this.glyphset()}" does not exist. Please provide a valid glyphset.`);return e.baseClass}),this.fontVariationSettings=a(()=>`'FILL' ${+!!this.fill()}, 'wght' ${this.weight()}, 'GRAD' ${this.grade()}, 'opsz' ${this.opticalSize()}`)}static{this.ɵfac=function(e){return new(e||t)}}static{this.ɵcmp=d({type:t,selectors:[[`ng-glyph`]],hostVars:9,hostBindings:function(t,n){t&2&&(l(`textContent`,n.name()),h(n.glyphsetClass()),e(`--ng-glyph__size`,n.size())(`color`,n.color())(`font-variation-settings`,n.fontVariationSettings()))},inputs:{name:[1,`name`],glyphset:[1,`glyphset`],opticalSize:[1,`opticalSize`],weight:[1,`weight`],grade:[1,`grade`],fill:[1,`fill`],size:[1,`size`],color:[1,`color`]},decls:0,vars:0,template:function(e,t){},styles:[`[_nghost-%COMP%] {
  display: inline-block;
  width: var(--ng-glyph__size);
  height: var(--ng-glyph__size);
  font-size: var(--ng-glyph__size);
  overflow: hidden;
}`]})}});var A=new m(`Ng Icon Pre Processor`),j=new m(`Ng Icon Post Processor`);function M(){return c(A,{optional:!0})??(e=>e)}function N(){return c(j,{optional:!0})??(()=>{})}var P=new m(`Ng Icon Logger`),F=class{log(e){console.log(e)}warn(e){console.warn(e)}error(e){console.error(e)}};function I(){return c(P,{optional:!0})??new F}var L=new m(`Ng Icon Config`);function R(){return c(L,{optional:!0})??{}}var z=new m(`Ng Icon Loader Token`),B=new m(`Ng Icon Cache Token`);function V(){return c(z,{optional:!0})}function H(){return c(B,{optional:!0})}function U(e){return[{provide:W,useFactory:(t=c(W,{optional:!0,skipSelf:!0}))=>({...t?.reduce((e,t)=>({...e,...t}),{}),...e}),multi:!0}]}var W=new m(`Icons Token`);function G(){return c(W,{optional:!0})??[]}function K(e){return typeof e==`string`?Promise.resolve(e):p(e)?e.toPromise():e}function q(e){return e.replace(/([^a-zA-Z0-9])+(.)?/g,(e,t,n)=>n?n.toUpperCase():``).replace(/[^a-zA-Z\d]/g,``).replace(/^([A-Z])/,e=>e.toLowerCase())}var J=0,Y=class n{constructor(){this.config=R(),this.icons=G(),this.loader=V(),this.cache=H(),this.preProcessor=M(),this.postProcessor=N(),this.injector=c(y),this.renderer=c(_),this.platform=c(g),this.elementRef=c(v),this.uniqueId=J++,this.logger=I(),this.name=r(),this.svg=r(),this.size=r(this.config.size,{transform:k}),this.strokeWidth=r(this.config.strokeWidth),this.color=r(this.config.color),t(()=>this.updateIcon()),c(new x(`aria-hidden`),{optional:!0})||this.elementRef.nativeElement.setAttribute(`aria-hidden`,`true`)}ngOnDestroy(){this.svgElement=void 0}async updateIcon(){let e=this.name(),t=this.svg();if(t!==void 0){this.setSvg(t);return}if(e===void 0)return;let n=q(e);for(let e of[...this.icons].reverse())if(e[n]){this.setSvg(e[n]);return}if(this.loader){let t=await this.requestIconFromLoader(e);if(t!==null){this.setSvg(t);return}}this.logger.warn(`No icon named ${e} was found. You may need to import it using the withIcons function.`)}setSvg(e){if(C(this.platform)){this.elementRef.nativeElement.innerHTML=e,this.elementRef.nativeElement.setAttribute(`data-ng-icon-ssr`,``);return}if(this.elementRef.nativeElement.hasAttribute(`data-ng-icon-ssr`)&&(this.elementRef.nativeElement.removeAttribute(`data-ng-icon-ssr`),this.svgElement=this.elementRef.nativeElement.querySelector(`svg`)??void 0,this.elementRef.nativeElement.innerHTML===e)||(this.svgElement&&this.renderer.removeChild(this.elementRef.nativeElement,this.svgElement),e===``))return;let t=this.renderer.createElement(`template`);e=this.replaceIds(e),this.renderer.setProperty(t,`innerHTML`,this.preProcessor(e)),this.svgElement=t.content.firstElementChild,this.postProcessor(this.svgElement),this.renderer.appendChild(this.elementRef.nativeElement,this.svgElement)}replaceIds(e){if(!e.includes(`ID_PLACEHOLDER_`))return e;let t=/ID_PLACEHOLDER_(\d+)/g,n=new Map,r=new Set(e.match(t));if(r===null)return e;for(let t of r){let r=t.replace(`ID_PLACEHOLDER_`,``),i=`ng-icon-${this.uniqueId}-${n.size}`;n.set(r,i),e=e.replace(new RegExp(t,`g`),i)}return e}requestIconFromLoader(e){return new Promise(t=>{s(this.injector,async()=>{if(this.cache){let n=this.cache.get(e);if(typeof n==`string`){t(n);return}if(n instanceof Promise){t(await n);return}}let n=K(this.loader(e));this.cache?.set(e,n);let r=await n;this.cache?.set(e,r),t(r)})})}static{this.ɵfac=function(e){return new(e||n)}}static{this.ɵcmp=d({type:n,selectors:[[`ng-icon`]],hostAttrs:[`role`,`img`],hostVars:6,hostBindings:function(t,n){t&2&&e(`--ng-icon__stroke-width`,n.strokeWidth())(`--ng-icon__size`,n.size())(`--ng-icon__color`,n.color())},inputs:{name:[1,`name`],svg:[1,`svg`],size:[1,`size`],strokeWidth:[1,`strokeWidth`],color:[1,`color`]},decls:0,vars:0,template:function(e,t){},styles:[`[_nghost-%COMP%] {
  display: inline-block;
  width: var(--ng-icon__size, 1em);
  height: var(--ng-icon__size, 1em);
  line-height: initial;
  vertical-align: initial;
  overflow: hidden;
}

[_nghost-%COMP%]     svg {
  width: inherit;
  height: inherit;
  vertical-align: inherit;
}

@layer ng-icon {
  [_nghost-%COMP%] {
    color: var(--ng-icon__color, currentColor);
  }
}`]})}};(class e{constructor(e){if(Object.keys(e).length===0)throw Error(`No icons have been provided. Ensure to include some icons by importing them using NgIconsModule.withIcons({ ... }).`)}static withIcons(t){return{ngModule:e,providers:U(t)}}static{this.ɵfac=function(t){return new(t||e)(o(W))}}static{this.ɵmod=b({type:e})}static{this.ɵinj=i({})}});var X=[`*`];(class t{constructor(){this.size=r.required()}static{this.ɵfac=function(e){return new(e||t)}}static{this.ɵcmp=d({type:t,selectors:[[`ng-icon-stack`]],hostVars:2,hostBindings:function(t,n){t&2&&e(`--ng-icon__size`,n.size())},inputs:{size:[1,`size`]},ngContentSelectors:X,decls:1,vars:0,template:function(e,t){e&1&&(S(),u(0))},styles:[`[_nghost-%COMP%] {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: var(--ng-icon__size);
  height: var(--ng-icon__size);
}

[_nghost-%COMP%]     ng-icon {
  position: absolute;
}`]})}});export{U as n,Y as t};