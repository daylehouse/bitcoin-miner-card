function t(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const o=t=>new r("string"==typeof t?t:t+"",void 0,i),a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return o(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,m=f.trustedTypes,_=m?m.emptyScript:"",v=f.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},g=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:g};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??g)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,v?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,S=t=>t,E=A.trustedTypes,x=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,U="?"+P,M=`<${U}>`,O=document,k=()=>O.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,L=/>/g,B=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,q=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,J=O.createTreeWalker(O,129);function K(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=T;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===T?"!--"===l[1]?o=z:void 0!==l[1]?o=L:void 0!==l[2]?(q.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=B):void 0!==l[3]&&(o=B):o===B?">"===l[0]?(o=n??T,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?B:'"'===l[3]?j:D):o===j||o===D?o=B:o===z||o===L?o=T:(o=B,n=void 0);const d=o===B&&t[e+1].startsWith("/>")?" ":"";r+=o===T?s+M:h>=0?(i.push(a),s.slice(0,h)+C+s.slice(h)+P+d):s+P+(-2===h?e:d)}return[K(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,h]=Z(t,e);if(this.el=G.createElement(l,s),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=h[r++],s=i.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(q.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],k()),J.nextNode(),a.push({type:2,index:++n});i.append(t[e],k())}}}else if(8===i.nodeType)if(i.data===U)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:n}),t+=P.length-1}n++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===F)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=R(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);J.currentNode=i;let n=J.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=J.nextNode(),r++)}return J.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),R(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Y(this.O(k()),this.O(k()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=Q(this,t,e,0),r=!R(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Q(this,i[s+o],e,o),a===F&&(a=this._$AH[o]),r||=!R(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends tt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===F)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(G,Y),(A.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new Y(e.insertBefore(k(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:g},ct=(t=ht,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(e,s)=>"object"==typeof s?ct(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}const pt=new URL("Alien-Encounters-Regular.ttf".toLowerCase(),import.meta.url).toString(),ut=new URL("Alien-Encounters-Bold.ttf".toLowerCase(),import.meta.url).toString(),ft=new URL("base-layer.png",import.meta.url).toString(),mt="bitcoin-miner-card-fonts";let _t=class extends at{connectedCallback(){super.connectedCallback(),function(){if("undefined"!=typeof document){if(!document.getElementById(mt)){const t=document.createElement("style");t.id=mt,t.textContent=`\n      @font-face {\n        font-family: "Bitcoin Miner Alien Local";\n        src: url("${pt}") format("truetype");\n        font-weight: 400;\n        font-style: normal;\n        font-display: block;\n      }\n\n      @font-face {\n        font-family: "Bitcoin Miner Alien Local";\n        src: url("${ut}") format("truetype");\n        font-weight: 700;\n        font-style: normal;\n        font-display: block;\n      }\n    `,document.head.appendChild(t)}"fonts"in document&&(document.fonts.load('400 1em "Bitcoin Miner Alien Local"'),document.fonts.load('700 1em "Bitcoin Miner Alien Local"'))}}()}static getStubConfig(){return{}}static getConfigForm(){return{schema:[{name:"title_entity",selector:{entity:{}}},{name:"miner_name_entity",selector:{entity:{}}},{name:"hashrate_entity",selector:{entity:{}}},{name:"temperature_entity",selector:{entity:{}}},{name:"overheat_entity",selector:{entity:{}}},{name:"fan_entity",selector:{entity:{}}},{name:"power_entity",selector:{entity:{}}},{name:"model_entity",selector:{entity:{}}}],computeLabel:t=>{switch(t.name){case"title_entity":return"Title Entity";case"miner_name_entity":return"IP Address";case"hashrate_entity":return"Hashrate Entity";case"temperature_entity":return"Temperature Entity";case"overheat_entity":return"Overheat Entity (0/1)";case"fan_entity":return"Fan Entity";case"power_entity":return"Power Entity";case"model_entity":return"Model Entity";default:return}},computeHelper:t=>{switch(t.name){case"title_entity":return"Sensor used for the title line.";case"miner_name_entity":return"Sensor used for the IP address line.";case"overheat_entity":return"Binary overheat sensor: 0 = normal, 1 = overheat.";case"fan_entity":return"Fan speed sensor shown as percent.";default:return}}}}setConfig(t){if(!t)throw new Error("Invalid configuration for bitcoin-miner-card");this.config={overheat_threshold:85,...t}}getCardSize(){return 3}getGridOptions(){return{rows:5,columns:"full",min_rows:5,min_columns:12,max_columns:12}}render(){if(!this.config)return W;const t=this.readState(this.config.title_entity,""),e=this.normalizeForDisplay(t.value||""),s=this.readState(this.config.hashrate_entity,"MH/s"),i=this.readState(this.config.temperature_entity,"°C"),n=this.readState(this.config.power_entity,"W"),r=this.readState(this.config.model_entity,""),o=this.readState(this.config.miner_name_entity,""),a=this.normalizeForDisplay(o.value),l=this.readState(this.config.overheat_entity,""),h=this.readState(this.config.fan_entity,"%"),c=this.config.overheat_threshold??85,d=this.parseNumericState(i.value),p=this.parseOverheatState(l.value)??(null!==d&&d>=c);return I`
      <ha-card>
        <section class="stage" style=${`background-image: url('${ft}')`}>
          <div class="title-value">${e}</div>
          <div class="fan-indicator">
            <span class="fan-icon" aria-hidden="true"></span>
            <span class="fan-value">${this.formatState(h)}</span>
          </div>
          <div class="hashrate-row">
            <span class="hashrate-value">${this.formatState(s)}</span>
          </div>

          <div class="device-values">
            <span class="stat-value value-ip val-white">${a}</span>
            <span class="stat-value value-model val-pink">${this.normalizeForDisplay(r.value)}</span>
            <span class="stat-value value-temp ${p?"val-danger":"val-amber"}">${this.formatState(i)}</span>
            <span class="stat-value value-power val-cyan">${this.formatState(n)}</span>
          </div>
        </section>
      </ha-card>
    `}normalizeForDisplay(t){return t.trim().toUpperCase()}formatState(t){const e=this.normalizeForDisplay(t.value);if(!e)return"";const s=this.normalizeForDisplay(t.unit);return s?`${e} ${s}`:e}parseNumericState(t){const e=t.match(/-?\d+(\.\d+)?/);if(!e)return null;const s=Number(e[0]);return Number.isFinite(s)?s:null}parseOverheatState(t){const e=this.parseNumericState(t);return null===e?null:e>=1}readState(t,e=""){if(!this.hass||!t)return{value:"",unit:""};const s=this.hass.states[t];if(!s)return{value:"",unit:""};const i=s.attributes?.unit_of_measurement??e;return{value:s.state,unit:i}}};_t.styles=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)})`
    @font-face {
      font-family: "Bitcoin Miner Alien Local";
      src: url(${o(pt)}) format("truetype");
      font-weight: 400;
      font-style: normal;
      font-display: block;
    }

    @font-face {
      font-family: "Bitcoin Miner Alien Local";
      src: url(${o(ut)}) format("truetype");
      font-weight: 700;
      font-style: normal;
      font-display: block;
    }

    :host {
      --bm-danger: #ff8b3d;
      --bm-text: #ffe9fa;
      --bm-font-stack: "Bitcoin Miner Alien Local", "Bitcoin Miner Alien", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      --bm-title-left: 7%;
      --bm-title-top: 11%;
      --bm-title-width: 47%;
      --bm-fan-top: 11.5%;
      --bm-fan-left: 86%;
      --bm-hashrate-left: 10%;
      --bm-hashrate-top: 75.65%;
      --bm-hashrate-width: 69%;
      --bm-hashrate-value-width: 100%;
      --bm-panel-left: 73%;
      --bm-panel-width: 24%;
      --bm-ip-top: 56.9%;
      --bm-model-top: 66.85%;
      --bm-temp-top: 76%;
      --bm-power-top: 86.5%;
      display: block;
      font-family: var(--bm-font-stack) !important;
    }

    :host *,
    ha-card,
    ha-card * {
      font-family: var(--bm-font-stack) !important;
    }

    ha-card {
      overflow: hidden;
      border-radius: 24px;
      background: #090615;
      color: var(--bm-text);
      border: 1px solid rgba(255, 103, 205, 0.4);
      container-type: inline-size;
      font-synthesis: none;
    }

    .stage {
      position: relative;
      width: 100%;
      aspect-ratio: 3 / 2;
      background-size: 100% 100%;
      background-position: center;
      overflow: hidden;
    }

    .title-value {
      position: absolute;
      left: var(--bm-title-left);
      top: var(--bm-title-top);
      width: var(--bm-title-width);
      color: #ffffff;
      font-size: clamp(1.28rem, 4.26cqw, 2.4rem);
      font-weight: 700;
      letter-spacing: 0.11em;
      line-height: 1;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: none;
    }

    .fan-indicator {
      position: absolute;
      left: var(--bm-fan-left);
      top: var(--bm-fan-top);
      transform: translate(-50%, -50%);
      display: inline-flex;
      align-items: center;
      gap: 0.32rem;
      color: #9ffbff;
      pointer-events: none;
      max-width: 24%;
    }

    .fan-icon {
      width: clamp(1.13rem, 3.75cqw, 2.11rem);
      height: clamp(1.13rem, 3.75cqw, 2.11rem);
      border-radius: 50%;
      border: 2px solid #fffbfa;
      background: conic-gradient(
        from 0deg,
        transparent 0deg 28deg,
        #9ffbff 28deg 72deg,
        transparent 72deg 148deg,
        #9ffbff 148deg 192deg,
        transparent 192deg 268deg,
        #9ffbff 268deg 312deg,
        transparent 312deg 360deg
      );
      animation: fanSpin 1s linear infinite;
      flex: 0 0 auto;
      margin-top: -0.15rem;
    }

    .fan-value {
      font-size: clamp(1.22rem, 3.08cqw, 1.79rem);
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;
      text-shadow: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hashrate-row {
      position: absolute;
      left: var(--bm-hashrate-left);
      top: var(--bm-hashrate-top);
      width: var(--bm-hashrate-width);
      font-size: clamp(0.61rem, 1.98cqw, 1.21rem);
      font-weight: 700;
      letter-spacing: 0.01em;
      text-align: left;
    }

    .hashrate-value {
      color: #ffffff;
      display: block;
      width: var(--bm-hashrate-value-width);
      text-align: left;
      font-size: clamp(1.82rem, 5.7cqw, 3.32rem);
      transform: translate(0, 0.12em);
      -webkit-text-stroke: 0.7px #15ff00;
      white-space: nowrap;
      text-shadow: none;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
    }

    .device-values {
      position: absolute;
      top: 0;
      left: var(--bm-panel-left);
      width: var(--bm-panel-width);
      height: 100%;
      pointer-events: none;
    }

    .stat-value {
      position: absolute;
      left: 0;
      width: 100%;
      transform: translate(0, -50%);
      text-align: left;
      font-size: clamp(1.01rem, 3.19cqw, 1.85rem);
      font-weight: 700;
      line-height: 1.02;
      text-shadow: none;
      color: var(--bm-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      text-transform: uppercase;
    }
    .val-cyan   { color: #9ffbff; text-shadow: none; }
    .val-white  { color: #ffffff; text-shadow: none; }
    .val-pink   { color: #ff86da; text-shadow: none; }
    .val-amber  { color: #ffd86f; text-shadow: none; }
    .val-danger { color: var(--bm-danger); text-shadow: none; animation: tempAlert 0.9s ease-in-out infinite; }

    .device-values > .value-ip { top: var(--bm-ip-top); }
    .device-values > .value-model { top: var(--bm-model-top); }
    .device-values > .value-temp { top: var(--bm-temp-top); }
    .device-values > .value-power { top: var(--bm-power-top); }

    @keyframes tempAlert {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.62; }
    }

    @keyframes fanSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (max-width: 540px) {
      .title-value { font-size: clamp(1.07rem, 3.73cqw, 1.6rem); }
      .hashrate-row {
        left: 18%;
        right: auto;
        top: 80.5%;
        width: 70%;
        font-size: clamp(0.55rem, 2.09cqw, 0.94rem);
      }
      .hashrate-value {
        font-size: clamp(1.51rem, 4.75cqw, 2.3rem);
        transform: translate(0, 0.12em);
        -webkit-text-stroke: 0.45px #15ff00;
      }
      .stat-value { font-size: clamp(0.83rem, 2.86cqw, 1.23rem); }
    }
  `,t([dt({attribute:!1})],_t.prototype,"hass",void 0),t([dt({attribute:!1})],_t.prototype,"config",void 0),_t=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("bitcoin-miner-card")],_t),window.customCards=window.customCards||[],window.customCards.push({type:"bitcoin-miner-card",name:"Bitcoin Miner Card",preview:!1,description:"A custom card for monitoring Bitcoin miner stats.",documentationURL:"https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/"});export{_t as BitcoinMinerCard};
//# sourceMappingURL=bitcoin-miner-card.js.map
