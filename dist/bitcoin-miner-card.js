function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",g=u.reactiveElementPolyfillSupport,_=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??v)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,g?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,U=`<${P}>`,O=document,M=()=>O.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,z=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,Y=O.createTreeWalker(O,129);function F(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===N?"!--"===l[1]?o=T:void 0!==l[1]?o=z:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=r??N,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?D:L):o===D||o===L?o=j:o===T||o===z?o=N:(o=j,r=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===N?s+U:h>=0?(i.push(a),s.slice(0,h)+x+s.slice(h)+C+d):s+C+(-2===h?e:d)}return[F(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,h]=J(t,e);if(this.el=K.createElement(l,s),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(x)){const e=h[n++],s=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:X}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),Y.nextNode(),a.push({type:2,index:++r});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=k(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);Y.currentNode=i;let r=Y.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=Y.nextNode(),n++)}return Y.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),k(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Q(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Z(this,i[s+o],e,o),a===W&&(a=this._$AH[o]),n||=!k(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends X{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(K,Q),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Q(e.insertBefore(M(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},ht=(t=lt,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}let dt=class extends ot{static getStubConfig(){return{title:"Crypto Miner Stats",miner_name:"Rig-01"}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"miner_name",selector:{text:{}}},{name:"miner_name_entity",selector:{entity:{}}},{name:"hashrate_entity",selector:{entity:{}}},{name:"temperature_entity",selector:{entity:{}}},{name:"power_entity",selector:{entity:{}}},{name:"model_entity",selector:{entity:{}}},{type:"grid",name:"",flatten:!0,column_min_width:"180px",schema:[{name:"overheat_threshold",selector:{number:{min:0,max:140,step:1,mode:"box",unit_of_measurement:"°C"}}},{name:"base_image",selector:{text:{}}}]}],computeLabel:t=>{switch(t.name){case"title":return"Card Title";case"miner_name":return"Miner Name";case"miner_name_entity":return"Miner Name Entity";case"hashrate_entity":return"Hashrate Entity";case"temperature_entity":return"Temperature Entity";case"power_entity":return"Power Entity";case"model_entity":return"Model Entity";case"overheat_threshold":return"Overheat Threshold";case"base_image":return"Base Image URL";default:return}},computeHelper:t=>{switch(t.name){case"miner_name_entity":return"Optional sensor. Its state overrides Miner Name text.";case"base_image":return"Optional path/URL. Defaults to bundled background-v2.png.";default:return}}}}setConfig(t){if(!t)throw new Error("Invalid configuration for bitcoin-miner-card");this.config={title:"Crypto Miner Stats",miner_name:"Rig-01",overheat_threshold:85,...t}}getCardSize(){return 3}getGridOptions(){return{rows:4,columns:6,min_rows:3,min_columns:6}}render(){if(!this.config)return q;const t=this.readState(this.config.hashrate_entity,"MH/s"),e=this.readState(this.config.temperature_entity,"°C"),s=this.readState(this.config.power_entity,"W"),i=this.readState(this.config.model_entity,""),r=this.readState(this.config.miner_name_entity,""),n="-"!==r.value?r.value:this.config.miner_name??"Unknown",o=this.config.overheat_threshold??85,a=this.parseNumericState(e.value),l=null!==a&&a>=o?"stat-value accent-danger":"stat-value",h=this.resolveAssetUrl(this.config.base_image,"background-v2.png");return I`
      <ha-card>
        <section class="stage" style=${`--bm-base-image: url('${h}')`}>
          <div class="legend-row">
            <span class="legend-item cyan">Hashrate</span>
            <span class="legend-item pink">Temperature</span>
          </div>

          <div class="chart-area">
            <div class="left-scale"><span>900</span><span>600</span><span>300</span><span>0</span></div>
            <svg class="chart" viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Miner trend lines">
              <polyline class="line-hashrate" points="0,135 45,118 90,126 135,116 180,120 225,98 270,108 315,126 360,112 405,133 450,142 495,126 540,129 600,116"></polyline>
              <polyline class="line-temp" points="0,170 45,164 90,145 135,152 180,139 225,129 270,142 315,123 360,109 405,114 450,87 495,102 540,95 600,81"></polyline>
            </svg>
            <div class="right-scale"><span>90</span><span>70</span><span>50</span><span>30</span></div>
          </div>

          <div class="axis-row"><span>12:00</span><span>12:30</span><span>1:00</span><span>1:30</span></div>

          <div class="current-row">
            <span class="current cyan">${t.value} ${t.unit}</span>
            <span class="current pink">${e.value} ${e.unit}</span>
          </div>

          <div class="device-values">
            <span class="stat-value">${n}</span>
            <span class="stat-value">${i.value||"Unavailable"}</span>
            <span class=${l}>${e.value}${e.unit}</span>
            <span class="stat-value accent-cyan">${s.value} ${s.unit}</span>
          </div>
        </section>
      </ha-card>
    `}parseNumericState(t){const e=t.match(/-?\d+(\.\d+)?/);if(!e)return null;const s=Number(e[0]);return Number.isFinite(s)?s:null}resolveAssetUrl(t,e){return t&&t.trim().length>0?t:new URL(`./${e}`,import.meta.url).toString()}readState(t,e=""){if(!this.hass||!t)return{value:"-",unit:e};const s=this.hass.states[t];if(!s)return{value:"-",unit:e};const i=s.attributes?.unit_of_measurement??e;return{value:s.state,unit:i}}};dt.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)})`
    :host {
      --bm-edge: #ff43ba;
      --bm-edge-alt: #42d3ff;
      --bm-danger: #ff8b3d;
      --bm-text: #ffe9fa;
      --bm-base-image: none;
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 24px;
      background: #090615;
      color: var(--bm-text);
      border: 1px solid rgba(255, 103, 205, 0.4);
    }

    .stage {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 2;
      background-image: var(--bm-base-image);
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }

    .legend-row {
      position: absolute;
      left: 12.8%;
      top: 18.5%;
      display: inline-flex;
      gap: 5%;
      width: 33%;
      font-size: clamp(0.45rem, 1.05vw, 0.9rem);
      font-weight: 700;
      font-family: "Exo 2", sans-serif;
    }

    .legend-item::before {
      content: "";
      display: inline-block;
      width: 1.8em;
      height: 0.28em;
      border-radius: 999px;
      margin-right: 0.48em;
      vertical-align: middle;
      box-shadow: 0 0 8px currentColor;
    }

    .legend-item.cyan::before { background: var(--bm-edge-alt); }
    .legend-item.pink::before { background: var(--bm-edge); }

    .chart-area {
      position: absolute;
      left: 10.9%;
      top: 29.4%;
      width: 47.6%;
      height: 40.8%;
      display: grid;
      grid-template-columns: 11% 78% 11%;
      align-items: stretch;
    }

    .left-scale,
    .right-scale {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: clamp(0.45rem, 0.86vw, 0.73rem);
      font-weight: 700;
      color: rgba(255, 207, 245, 0.85);
      padding: 4% 0;
    }

    .chart {
      width: 100%;
      height: 100%;
      background: transparent;
    }

    .line-hashrate,
    .line-temp {
      fill: none;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 3px currentColor);
    }

    .line-hashrate { stroke: var(--bm-edge-alt); color: var(--bm-edge-alt); }
    .line-temp { stroke: var(--bm-edge); color: var(--bm-edge); }

    .axis-row {
      position: absolute;
      left: 12%;
      top: 70.6%;
      width: 45%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      font-size: clamp(0.5rem, 0.98vw, 0.86rem);
      font-weight: 700;
      color: rgba(255, 204, 236, 0.92);
      font-family: "Exo 2", sans-serif;
      text-align: center;
    }

    .current-row {
      position: absolute;
      left: 11.9%;
      top: 79.8%;
      width: 45.6%;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2%;
      font-family: "Orbitron", "Exo 2", sans-serif;
      font-size: clamp(0.62rem, 1.7vw, 1.5rem);
      font-weight: 700;
    }

    .current {
      white-space: nowrap;
      text-shadow: 0 0 8px currentColor;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .device-values {
      position: absolute;
      left: 70.7%;
      top: 45.1%;
      width: 21%;
      height: 25.1%;
      display: grid;
      grid-template-rows: repeat(4, 1fr);
    }

    .stat-value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: clamp(0.45rem, 0.98vw, 0.88rem);
      font-weight: 700;
      line-height: 1;
      font-family: "Orbitron", "Exo 2", sans-serif;
      text-shadow: 0 0 8px rgba(255, 236, 248, 0.3);
      color: var(--bm-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 3%;
    }

    .stat-value:nth-child(1),
    .stat-value:nth-child(2) {
      font-size: clamp(0.42rem, 0.9vw, 0.78rem);
    }

    .stat-value:nth-child(3),
    .stat-value:nth-child(4) {
      font-size: clamp(0.46rem, 1.05vw, 0.92rem);
    }

    .stat-value:nth-child(1) { transform: translateY(-2%); }
    .stat-value:nth-child(2) { transform: translateY(-1%); }
    .stat-value:nth-child(3) { transform: translateY(1%); }
    .stat-value:nth-child(4) { transform: translateY(2%); }

    .accent-cyan { color: var(--bm-edge-alt); }
    .accent-danger {
      color: var(--bm-danger);
      text-shadow: 0 0 10px rgba(255, 139, 61, 0.95);
      animation: tempAlert 0.9s ease-in-out infinite;
    }

    @keyframes tempAlert {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.62; }
    }

    @media (max-width: 1100px) {
      .legend-row { top: 18.8%; width: 34%; }
      .device-values { left: 70.3%; width: 21.7%; }
    }

    @media (max-width: 540px) {
      .legend-row { font-size: clamp(0.4rem, 1.35vw, 0.68rem); width: 36%; }
      .chart-area { left: 10.4%; width: 48.6%; }
      .axis-row { font-size: clamp(0.4rem, 1.25vw, 0.6rem); }
      .current-row { font-size: clamp(0.46rem, 1.44vw, 0.75rem); }
      .left-scale, .right-scale { font-size: clamp(0.36rem, 1.05vw, 0.56rem); }
      .device-values { left: 70.3%; top: 45.3%; width: 21.7%; height: 24.8%; }
      .stat-value { font-size: clamp(0.38rem, 1.22vw, 0.6rem); }
      .stat-value:nth-child(1),
      .stat-value:nth-child(2) { font-size: clamp(0.35rem, 1.08vw, 0.54rem); }
      .stat-value:nth-child(3),
      .stat-value:nth-child(4) { font-size: clamp(0.38rem, 1.22vw, 0.6rem); }
    }
  `,t([ct({attribute:!1})],dt.prototype,"hass",void 0),t([ct({attribute:!1})],dt.prototype,"config",void 0),dt=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("bitcoin-miner-card")],dt),window.customCards=window.customCards||[],window.customCards.push({type:"bitcoin-miner-card",name:"Bitcoin Miner Card",preview:!1,description:"A custom card for monitoring Bitcoin miner stats.",documentationURL:"https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/"});export{dt as BitcoinMinerCard};
//# sourceMappingURL=bitcoin-miner-card.js.map
