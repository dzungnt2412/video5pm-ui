(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["forgot"],{2081:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page vertical-align"},[r("div",{staticClass:"vertical-align-middle"},[e._m(0),r("form",{on:{submit:function(t){return t.preventDefault(),e.onForgot(t)}}},[r("label",{staticClass:" font-weight-bold mb-4  "},[e._v("Email")]),r("p-input",{staticClass:"mb-20",attrs:{type:"email",name:"email",placeholder:"you@example.com",validate:"on",required:e.requiredEmail},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("div",{staticClass:"captcha mb-40 mt-40"},[r("vue-recaptcha",{ref:"recapcha",attrs:{sitekey:""+e.recapchaKey,loadRecaptchaScript:!0},on:{verify:e.onVerify,expired:e.onCaptchaExpired}}),0==e.check?r("span",{staticClass:"invalid-error"},[e._v("\n          Please check the captcha\n        ")]):e._e()],1),r("button",{staticClass:"btn btn-special btn-primary mb-20 "},[e._v("Reset Password")]),r("p",{staticClass:"text-center"},[r("router-link",{staticClass:"backSignin",attrs:{to:{name:"sign-in"}}},[e._v("\n          Back to Sign in\n        ")])],1)],1)])])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-center mb-40"},[r("h2",{staticClass:"header-2 mb-24"},[e._v("Forgot your password?")]),r("div",{staticClass:"text"},[r("p",[e._v("Don't worry! Enter the email address you used when you joined and\n          we’ll send you instructions to reset your password.")])])])}],i=r("a34a"),s=r.n(i),c=r("2f62"),o=r("e096");function u(e,t,r,n,a,i,s){try{var c=e[i](s),o=c.value}catch(u){return void r(u)}c.done?t(o):Promise.resolve(o).then(n,a)}function p(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function s(e){u(i,n,a,s,c,"next",e)}function c(e){u(i,n,a,s,c,"throw",e)}s(void 0)}))}}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f={name:"forgot",components:{VueRecaptcha:o["a"]},data:function(){return{email:null,form:{checkCaptcha:!1},requiredEmail:!1,check:!0}},methods:h(h({},Object(c["b"])("auth",["forgotPassword"])),{},{checkRequired:function(){var e=!0;return this.email?this.requiredEmail=!1:(this.requiredEmail=!0,e=!1),e},onForgot:function(){var e=p(s.a.mark((function e(){var t,r;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.checkRequired()){e.next=2;break}return e.abrupt("return");case 2:if(this.form.checkCaptcha){e.next=5;break}return this.check=!1,e.abrupt("return");case 5:return t={email:this.email},e.next=8,this.forgotPassword(t);case 8:r=e.sent,r.success?(this.$refs.recapcha.reset(),this.form.checkCaptcha=!1,this.$toast.open({type:"success",message:r.message})):(this.$refs.recapcha.reset(),this.form.checkCaptcha=!1,this.$toast.open({type:"error",message:r.error}));case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onVerify:function(e){e&&(this.form.checkCaptcha=!0),this.check=!0},onCaptchaExpired:function(){this.form.checkCaptcha=!1}}),computed:{recapchaKey:function(){return"".concat(Object({VUE_APP_BASE_API_ENDPOINT:"https://api-stag.lionnix.com/v1",VUE_APP_DOMAIN:"https://seller-stag.lionnix.com",VUE_APP_WEBSOCKET_URL:"wss://ws.lionnix.com/ws",VUE_APP_BASE_IMAGE_URL:"https://img-stag.lionnix.com/thumbnails",VUE_APP_ASSETS:"https://static.lionnix.com/file-templates",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_RECAPCHA_KEY)}}},m=f,w=r("2877"),b=Object(w["a"])(m,n,a,!1,null,null,null);t["default"]=b.exports},"6e0b":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"page vertical-align"},[r("div",{staticClass:"vertical-align-middle"},[e._m(0),r("form",{on:{submit:function(t){return t.preventDefault(),e.onReset(t)}}},[r("label",{staticClass:" font-weight-bold mb-4  "},[e._v("New password")]),r("p-input",{staticClass:"mb-20",attrs:{type:"password",validate:"on",name:"password",hiddenPass:"on",required:e.requiredPassword,placeholder:"New password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("button",{staticClass:"btn btn-special btn-primary mb-20 "},[e._v("Reset Password")])],1)])])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-center mb-60"},[r("h2",{staticClass:"header-2 mb-24"},[e._v("Reset your password")])])}],i=r("a34a"),s=r.n(i),c=r("2f62");function o(e,t,r,n,a,i,s){try{var c=e[i](s),o=c.value}catch(u){return void r(u)}c.done?t(o):Promise.resolve(o).then(n,a)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function s(e){o(i,n,a,s,c,"next",e)}function c(e){o(i,n,a,s,c,"throw",e)}s(void 0)}))}}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){h(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function h(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var d={data:function(){return{result:"",password:null,requiredPassword:!1}},methods:l(l({},Object(c["b"])("auth",["resetPassword"])),{},{checkRequired:function(){var e=!0;return this.password?this.requiredPassword=!1:(this.requiredPassword=!0,e=!1),e},onReset:function(){var e=u(s.a.mark((function e(){var t,r,n,a,i=this;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.checkRequired()){e.next=2;break}return e.abrupt("return");case 2:return t=new URL(window.location.href),r=t.searchParams.get("code"),n=this.password,a={code:r,password:n},e.next=8,this.resetPassword(a);case 8:this.result=e.sent,this.result.user?(this.$toast.open({type:"success",message:"Password successfully updated."}),setTimeout((function(){return i.$router.push("/sign-in")}),2e3)):this.$toast.open({type:"error",message:this.result.errorMessage});case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()})},f=d,m=r("2877"),w=Object(m["a"])(f,n,a,!1,null,null,null);t["default"]=w.exports},e096:function(e,t,r){"use strict";function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},n.apply(this,arguments)}var a=function(){var e=!1,t=[],r=function(r){if(!e){e=!0;for(var n=0,a=t.length;n<a;n++)t[n](r)}},n=function(r){e?r():t.push(r)},a={resolved:function(){return e},resolve:r,promise:{then:n}};return a},i=Object.prototype.hasOwnProperty;function s(){var e=a();return{notify:function(){e.resolve()},wait:function(){return e.promise},render:function(e,t,r){this.wait().then((function(){r(window.grecaptcha.render(e,t))}))},reset:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.reset(e)})))},execute:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.execute(e)})))},checkRecaptchaLoad:function(){i.call(window,"grecaptcha")&&i.call(window.grecaptcha,"render")&&this.notify()},assertLoaded:function(){if(!e.resolved())throw new Error("ReCAPTCHA has not been loaded")}}}var c=s();"undefined"!==typeof window&&(window.vueRecaptchaApiLoaded=c.notify);var o={name:"VueRecaptcha",props:{sitekey:{type:String,required:!0},theme:{type:String},badge:{type:String},type:{type:String},size:{type:String},tabindex:{type:String},loadRecaptchaScript:{type:Boolean,default:!1},recaptchaScriptId:{type:String,default:"__RECAPTCHA_SCRIPT"},recaptchaHost:{type:String,default:"www.google.com"},language:{type:String,default:""}},beforeMount:function(){if(this.loadRecaptchaScript&&!document.getElementById(this.recaptchaScriptId)){var e=document.createElement("script");e.id=this.recaptchaScriptId,e.src="https://"+this.recaptchaHost+"/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl="+this.language,e.async=!0,e.defer=!0,document.head.appendChild(e)}},mounted:function(){var e=this;c.checkRecaptchaLoad();var t=n({},this.$props,{callback:this.emitVerify,"expired-callback":this.emitExpired,"error-callback":this.emitError}),r=this.$slots["default"]?this.$el.children[0]:this.$el;c.render(r,t,(function(t){e.$widgetId=t,e.$emit("render",t)}))},methods:{reset:function(){c.reset(this.$widgetId)},execute:function(){c.execute(this.$widgetId)},emitVerify:function(e){this.$emit("verify",e)},emitExpired:function(){this.$emit("expired")},emitError:function(){this.$emit("error")}},render:function(e){return e("div",{},this.$slots["default"])}};t["a"]=o}}]);