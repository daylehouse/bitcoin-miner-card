function t(t,e,s,i){var r,n=arguments.length,a=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(n<3?r(a):n>3?r(e,s,a):r(e,s))||a);return n>3&&a&&Object.defineProperty(e,s,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!o(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??_)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,f?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,O=`<${k}>`,U=document,P=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,z=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,F=U.createTreeWalker(U,129);function J(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",a=H;for(let e=0;e<s;e++){const s=t[e];let o,l,h=-1,c=0;for(;c<s.length&&(a.lastIndex=c,l=a.exec(s),null!==l);)c=a.lastIndex,a===H?"!--"===l[1]?a=T:void 0!==l[1]?a=z:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=L):void 0!==l[3]&&(a=L):a===L?">"===l[0]?(a=r??H,h=-1):void 0===l[1]?h=-2:(h=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?L:'"'===l[3]?D:j):a===D||a===j?a=L:a===T||a===z?a=H:(a=L,r=void 0);const d=a===L&&t[e+1].startsWith("/>")?" ":"";n+=a===H?s+O:h>=0?(i.push(o),s.slice(0,h)+S+s.slice(h)+C+d):s+C+(-2===h?e:d)}return[J(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const a=t.length-1,o=this.parts,[l,h]=K(t,e);if(this.el=Z.createElement(l,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=h[n++],s=i.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?st:X}),i.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:r}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),F.nextNode(),o.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===k)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)o.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=M(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);F.currentNode=i;let r=F.nextNode(),n=0,a=0,o=s[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Q(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new it(r,this,t)),this._$AV.push(e),o=s[++a]}n!==o?.index&&(r=F.nextNode(),n++)}return F.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Z(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Q(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=G(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let a,o;for(t=r[0],a=0;a<r.length-1;a++)o=G(this,i[s+a],e,a),o===W&&(o=this._$AH[a]),n||=!M(o)||o!==this._$AH[a],o===q?t=q:t!==q&&(t+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends X{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(Z,Q),(x.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Q(e.insertBefore(P(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ot=nt.litElementPolyfillSupport;ot?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:_},ht=(t=lt,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}let dt=class extends at{static getStubConfig(){return{title:"Crypto Miner Stats",miner_name:"Rig-01"}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"miner_name",selector:{text:{}}},{name:"miner_name_entity",selector:{entity:{}}},{name:"hashrate_entity",selector:{entity:{}}},{name:"temperature_entity",selector:{entity:{}}},{name:"power_entity",selector:{entity:{}}},{name:"model_entity",selector:{entity:{}}},{type:"grid",name:"",flatten:!0,column_min_width:"180px",schema:[{name:"overheat_threshold",selector:{number:{min:0,max:140,step:1,mode:"box",unit_of_measurement:"°C"}}},{name:"show_overheat",selector:{boolean:{}}}]},{type:"expandable",name:"",title:"Asset URL Overrides",flatten:!0,schema:[{name:"background_image",selector:{text:{}}},{name:"overheat_image",selector:{text:{}}},{name:"stats_image",selector:{text:{}}}]}],computeLabel:t=>{switch(t.name){case"title":return"Card Title";case"miner_name":return"Miner Name";case"miner_name_entity":return"Miner Name Entity";case"hashrate_entity":return"Hashrate Entity";case"temperature_entity":return"Temperature Entity";case"power_entity":return"Power Entity";case"model_entity":return"Model Entity";case"overheat_threshold":return"Overheat Threshold";case"show_overheat":return"Show Overheat Overlay";case"background_image":return"Background Image URL";case"overheat_image":return"Overheat Image URL";case"stats_image":return"Stats Panel Image URL";default:return}},computeHelper:t=>{switch(t.name){case"miner_name_entity":return"Optional sensor. Its state overrides Miner Name text when available.";case"temperature_entity":return"Used to trigger overheat mode when the threshold is reached.";case"overheat_threshold":return"Warning overlay appears when temperature is equal to or above this value.";case"background_image":return"Optional path or URL. Leave blank to use bundled background.png.";case"overheat_image":return"Optional path or URL. Leave blank to use bundled overheat.png.";case"stats_image":return"Optional path or URL. Leave blank to use bundled stats.png.";default:return}},assertConfig:t=>{if(void 0!==t.overheat_threshold&&(!Number.isFinite(t.overheat_threshold)||t.overheat_threshold<-50))throw new Error("overheat_threshold must be a valid number")}}}setConfig(t){if(!t)throw new Error("Invalid configuration for bitcoin-miner-card");if(void 0!==t.overheat_threshold&&(!Number.isFinite(t.overheat_threshold)||t.overheat_threshold<-50))throw new Error("overheat_threshold must be a valid number");this.config={title:"Crypto Miner Stats",miner_name:"Rig-01",overheat_threshold:85,show_overheat:!0,...t}}getCardSize(){return 4}getGridOptions(){return{rows:5,columns:9,min_rows:4,min_columns:6}}render(){if(!this.config)return q;const t=this.readState(this.config.hashrate_entity,"MH/s"),e=this.readState(this.config.temperature_entity,"°C"),s=this.readState(this.config.power_entity,"W"),i=this.readState(this.config.miner_name_entity,""),r=this.readState(this.config.model_entity,""),n="-"!==i.value?i.value:this.config.miner_name??"Unknown",a=this.config.overheat_threshold??85,o=this.parseNumericState(e.value),l=(this.config.show_overheat??!0)&&null!==o&&o>=a,h=this.resolveAssetUrl(this.config.background_image,"background.png"),c=this.resolveAssetUrl(this.config.overheat_image,"overheat.png"),d=l?"value accent-danger":"value accent-pink",p=`--bm-stats-image: url('${this.resolveAssetUrl(this.config.stats_image,"stats.png")}')`;return B`
      <ha-card>
        <section class="scene" style=${`--bm-bg-image: url('${h}')`}>
          <div class="scene-glow"></div>
          <header class="title-row">
            <h2>${this.config.title}</h2>
          </header>

          <div class="content-grid">
            <section class="chart-panel">
              <div class="legend-row">
                <span class="legend-item cyan">Hashrate</span>
                <span class="legend-item pink">Temperature</span>
              </div>
              <div class="chart-shell">
                <div class="left-scale">
                  <span>900</span>
                  <span>600</span>
                  <span>300</span>
                  <span>0</span>
                </div>
                <svg class="chart" viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Miner trend lines">
                  <g class="chart-grid">
                    <line x1="0" y1="40" x2="600" y2="40"></line>
                    <line x1="0" y1="100" x2="600" y2="100"></line>
                    <line x1="0" y1="160" x2="600" y2="160"></line>
                    <line x1="120" y1="0" x2="120" y2="220"></line>
                    <line x1="240" y1="0" x2="240" y2="220"></line>
                    <line x1="360" y1="0" x2="360" y2="220"></line>
                    <line x1="480" y1="0" x2="480" y2="220"></line>
                  </g>
                  <polyline
                    class="line-hashrate"
                    points="0,135 45,118 90,126 135,116 180,120 225,98 270,108 315,126 360,112 405,133 450,142 495,126 540,129 600,116"
                  ></polyline>
                  <polyline
                    class="line-temp"
                    points="0,170 45,164 90,145 135,152 180,139 225,129 270,142 315,123 360,109 405,114 450,87 495,102 540,95 600,81"
                  ></polyline>
                </svg>
                <div class="right-scale">
                  <span>90</span>
                  <span>70</span>
                  <span>50</span>
                  <span>30</span>
                </div>
              </div>
              <div class="axis-row">
                <span>12:00</span>
                <span>12:30</span>
                <span>1:00</span>
                <span>1:30</span>
              </div>
              <div class="current-row">
                <span class="current cyan">${t.value} ${t.unit}</span>
                <span class="current pink">${e.value} ${e.unit}</span>
              </div>
            </section>

            <aside class="miner-panel">
              <div class="sun-zone">
                <div class="sun-core"></div>
                ${l?B`<img class="overheat-image" src=${c} alt="Overheat warning" />`:q}
              </div>

              <div class="stat-stack" style=${p}>
                <div class="stats-art" role="img" aria-label="Miner stats template"></div>
                <div class="stat-values">
                  <span class="stat-value">${n}</span>
                  <span class="stat-value">${r.value||"Unavailable"}</span>
                  <span class=${`stat-value ${d}`}>${e.value}${e.unit}</span>
                  <span class="stat-value accent-cyan">${s.value} ${s.unit}</span>
                </div>
              </div>

              ${l?B`<div class="warning-chip">Overheat active (${a}${e.unit||"°C"})</div>`:q}
            </aside>
          </div>
        </section>
      </ha-card>
    `}parseNumericState(t){const e=t.match(/-?\d+(\.\d+)?/);if(!e)return null;const s=Number(e[0]);return Number.isFinite(s)?s:null}resolveAssetUrl(t,e){return t&&t.trim().length>0?t:new URL(`./${e}`,import.meta.url).toString()}readState(t,e=""){if(!this.hass||!t)return{value:"-",unit:e};const s=this.hass.states[t];if(!s)return{value:"-",unit:e};const i=s.attributes?.unit_of_measurement??e;return{value:s.state,unit:i}}};dt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)})`
    :host {
      --bm-edge: #ff43ba;
      --bm-edge-alt: #42d3ff;
      --bm-danger: #ff8b3d;
      --bm-text: #ffe9fa;
      --bm-panel: rgba(6, 3, 23, 0.78);
      --bm-bg-image: none;
      --bm-stats-image: none;
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 34px;
      background: #0a0818;
      color: var(--bm-text);
      border: 1px solid rgba(255, 103, 205, 0.58);
      box-shadow: 0 0 30px rgba(255, 58, 171, 0.38), inset 0 0 26px rgba(60, 160, 255, 0.13);
    }

    .scene {
      position: relative;
      padding: 26px 26px 28px;
      min-height: 430px;
      background-image:
        linear-gradient(160deg, rgba(4, 0, 17, 0.53), rgba(8, 1, 22, 0.62)),
        var(--bm-bg-image);
      background-size: cover;
      background-position: center;
      isolation: isolate;
    }

    .scene-glow {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 20% 75%, rgba(23, 235, 255, 0.16), transparent 42%),
        radial-gradient(circle at 85% 16%, rgba(255, 78, 147, 0.32), transparent 38%);
      z-index: -1;
    }

    .title-row {
      margin-bottom: 12px;
      border-bottom: 2px solid rgba(255, 76, 182, 0.72);
      padding-bottom: 10px;
    }

    h2 {
      margin: 0;
      font-size: clamp(1.65rem, 3.8vw, 3rem);
      font-weight: 800;
      letter-spacing: 0.08em;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-transform: uppercase;
      color: #ffc8f0;
      text-shadow: 0 0 10px rgba(255, 61, 184, 0.7);
    }

    .content-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.62fr) minmax(290px, 0.9fr);
      gap: 18px;
      align-items: stretch;
    }

    .chart-panel {
      border: 1px solid rgba(255, 124, 214, 0.44);
      border-radius: 22px;
      background: var(--bm-panel);
      padding: 18px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      backdrop-filter: blur(1px);
      box-shadow: inset 0 0 18px rgba(255, 74, 181, 0.13);
    }

    .legend-row {
      display: flex;
      gap: 22px;
      font-size: 1.04rem;
      font-weight: 700;
      padding-left: 4px;
      font-family: "Exo 2", sans-serif;
    }

    .legend-item::before {
      content: "";
      display: inline-block;
      width: 34px;
      height: 5px;
      border-radius: 999px;
      margin-right: 8px;
      vertical-align: middle;
      box-shadow: 0 0 8px currentColor;
    }

    .chart-shell {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 10px;
      align-items: stretch;
    }

    .left-scale,
    .right-scale {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      color: rgba(255, 207, 245, 0.85);
      padding: 2px 0;
    }

    .legend-item.cyan::before {
      background: var(--bm-edge-alt);
    }

    .legend-item.pink::before {
      background: var(--bm-edge);
    }

    .chart {
      width: 100%;
      height: 264px;
      border: 1px solid rgba(255, 95, 193, 0.44);
      border-radius: 12px;
      background: rgba(8, 6, 20, 0.65);
    }

    .chart-grid line {
      stroke: rgba(105, 128, 255, 0.32);
      stroke-width: 1;
    }

    .line-hashrate,
    .line-temp {
      fill: none;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 3px currentColor);
    }

    .line-hashrate {
      stroke: var(--bm-edge-alt);
      color: var(--bm-edge-alt);
    }

    .line-temp {
      stroke: var(--bm-edge);
      color: var(--bm-edge);
    }

    .axis-row {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      font-weight: 700;
      color: rgba(255, 204, 236, 0.92);
      font-family: "Exo 2", sans-serif;
      padding: 0 2px;
    }

    .current-row {
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: 2rem;
      font-weight: 700;
    }

    .current {
      white-space: nowrap;
      text-shadow: 0 0 8px currentColor;
    }

    .miner-panel {
      border: 1px solid rgba(255, 124, 214, 0.44);
      border-radius: 22px;
      background: rgba(8, 6, 27, 0.85);
      padding: 14px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 0 18px rgba(255, 74, 181, 0.11);
    }

    .sun-zone {
      position: relative;
      height: 140px;
      display: grid;
      place-items: center;
      margin-bottom: 0;
    }

    .sun-core {
      width: 188px;
      height: 112px;
      border-radius: 118px 118px 0 0;
      background: radial-gradient(circle at 50% 35%, #ffd09a 0%, #ff8044 65%, #cb3e19 100%);
      box-shadow: 0 0 30px rgba(255, 120, 52, 0.7);
      border: 1px solid rgba(255, 186, 112, 0.7);
      transform: translateY(20px);
      opacity: 0.78;
    }

    .overheat-image {
      position: absolute;
      top: 8px;
      right: 0;
      left: 0;
      margin: 0 auto;
      max-width: 96%;
      max-height: 122px;
      object-fit: contain;
      filter: drop-shadow(0 0 12px rgba(255, 123, 60, 0.8));
      animation: alarmPulse 1.2s ease-in-out infinite;
    }

    .stat-stack {
      position: relative;
      width: 100%;
      aspect-ratio: 596 / 464;
      border-radius: 12px;
      overflow: hidden;
    }

    .stats-art {
      position: absolute;
      inset: 0;
      background-image: var(--bm-stats-image);
      background-size: cover;
      background-position: center;
      filter: drop-shadow(0 0 10px rgba(255, 81, 202, 0.38));
    }

    .stat-values {
      position: absolute;
      inset: 0;
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      padding: 4.2% 5.5% 4% 52.5%;
      pointer-events: none;
    }

    .stat-value {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(1.02rem, 1.75vw, 2.05rem);
      font-weight: 700;
      line-height: 1;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-shadow: 0 0 8px rgba(255, 236, 248, 0.3);
      text-align: center;
      color: var(--bm-text);
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      min-height: 58px;
      border-bottom: 1px solid rgba(255, 117, 208, 0.34);
      padding: 0 2px;
    }

    .label {
      font-size: 1.08rem;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: rgba(255, 181, 227, 0.82);
      font-weight: 700;
      font-family: "Exo 2", sans-serif;
    }

    .value {
      font-size: 2.05rem;
      font-weight: 700;
      line-height: 1.1;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-shadow: 0 0 8px rgba(255, 236, 248, 0.3);
      text-align: right;
    }

    .accent-cyan {
      color: var(--bm-edge-alt);
      text-shadow: 0 0 8px rgba(79, 211, 255, 0.45);
    }

    .accent-pink {
      color: #ff66cb;
      text-shadow: 0 0 8px rgba(255, 102, 203, 0.45);
    }

    .accent-danger {
      color: var(--bm-danger);
      text-shadow: 0 0 10px rgba(255, 139, 61, 0.95);
      animation: tempAlert 0.9s ease-in-out infinite;
    }

    .warning-chip {
      margin-top: auto;
      text-align: center;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      color: #ffd8b2;
      border: 1px solid rgba(255, 163, 94, 0.7);
      border-radius: 999px;
      padding: 6px 8px;
      background: linear-gradient(90deg, rgba(255, 78, 49, 0.35), rgba(255, 131, 39, 0.26));
      box-shadow: 0 0 12px rgba(255, 102, 45, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @keyframes alarmPulse {
      0%,
      100% {
        opacity: 0.84;
        transform: scale(0.98);
      }

      50% {
        opacity: 1;
        transform: scale(1.02);
      }
    }

    @keyframes tempAlert {
      0%,
      100% {
        opacity: 1;
      }

      50% {
        opacity: 0.62;
      }
    }

    @media (max-width: 900px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .sun-zone {
        height: 120px;
      }

      .value {
        font-size: 1.4rem;
      }

      .current-row {
        font-size: 1.5rem;
      }

      .stat-values {
        padding-left: 53.5%;
      }
    }

    @media (max-width: 540px) {
      .scene {
        padding: 12px;
      }

      .value {
        font-size: 1rem;
      }

      .label {
        font-size: 0.82rem;
      }

      .axis-row {
        font-size: 0.9rem;
      }

      .current-row {
        font-size: 1rem;
      }

      .chart {
        height: 200px;
      }

      .left-scale,
      .right-scale {
        font-size: 0.72rem;
      }

      .stat-values {
        padding-left: 54.5%;
      }
    }
  `,t([ct({attribute:!1})],dt.prototype,"hass",void 0),t([ct({attribute:!1})],dt.prototype,"config",void 0),dt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("bitcoin-miner-card")],dt),window.customCards=window.customCards||[],window.customCards.push({type:"bitcoin-miner-card",name:"Bitcoin Miner Card",preview:!1,description:"A custom card for monitoring Bitcoin miner stats.",documentationURL:"https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/"});export{dt as BitcoinMinerCard};
//# sourceMappingURL=bitcoin-miner-card.js.map
