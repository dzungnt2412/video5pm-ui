(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shop-list"],{"1fec":function(t,e,r){t.exports=r.p+"img/notfound.005bfa2e.svg"},"3f86":function(t,e,r){"use strict";var n=r("45ba"),i=r("54d7");function s(t){return s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}e["a"]={data:function(){return{filter:{}}},methods:{toBack:function(){return this.$router.go(-1)},getRouteQuery:function(){var t=this,e={};Object.keys(this.filter).forEach((function(r){if("undefined"!==typeof t.$route.query[r]){var n=t.$route.query[r];switch(s(t.filter[r])){case"number":n=Number(n);break;case"boolean":n=!!n;break}e[r]=n}else e[r]=t.filter[r]}));var r=i["d"];return e.limit=e.limit<=r?e.limit:r,Object.assign({},this.$route.query,e)},handleUpdateRouteQuery:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=Object(n["d"])(this.$route.query);e=Object.assign(e,this.filter,t),e.page||(e.page=1);var r={};for(var i in e)e.hasOwnProperty(i)&&e[i]&&(r[i]=e[i]);this.$router.push({query:r,path:this.$route.path}).catch((function(){}))}},watch:{$route:function(){var t=this.getRouteQuery();Object(n["f"])(t,this.filter)&&(this.filter=t)}}}},"54bc":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"page"},[r("div",{staticClass:"page-content container-fluid"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-xl-12"},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-body"},[t.isFetching?r("VclTable",{staticClass:"my-20"}):t.shops.length?[r("div",{staticClass:"table-responsive"},[r("table",{staticClass:"table table-hover"},[r("thead",[r("tr",[r("th",{attrs:{width:"80"}},[t._v("ID")]),r("th",[t._v("Tên shop")]),r("th",[t._v("Domain")]),r("th",[t._v("Ngày")]),r("th",{staticClass:"text-right"})])]),r("tbody",t._l(t.shops,(function(e,n){return r("tr",{key:n},[r("td",[t._v(t._s(e.id))]),r("td",[t._v(t._s(e.name))]),r("td",[t._v(t._s(e.domain))]),r("td",[t._v(t._s(t._f("date")(e.created_at)))]),r("td",{staticClass:"text-right"},[r("p-popover",{staticClass:"mx-10",attrs:{placement:"top",trigger:"hover",type:"dark",content:"Sao chép API key",compact:""}},[r("a",{attrs:{slot:"reference",href:"#"},on:{click:function(r){return r.preventDefault(),t.handleCopyApiKey(e.api_key)}},slot:"reference"},[r("p-icon",{attrs:{name:"copy",iconPack:"md"}})],1)]),r("p-popover",{staticClass:"mx-10",attrs:{placement:"top",trigger:"hover",type:"dark",content:"Sửa thông tin",compact:""}},[r("router-link",{attrs:{slot:"reference",to:{name:"shop-edit",params:{id:e.id}}},slot:"reference"},[r("p-icon",{attrs:{name:"edit",iconPack:"md"}})],1)],1)],1)])})),0)])]),r("div",{staticClass:"d-flex justify-content-between align-items-center"},[r("span",[t._v("\n                  "+t._s(t.paginationLabel)+"\n                ")]),r("p-pagination",{attrs:{total:t.count,perPage:t.filter.limit,current:t.filter.page,size:"sm"},on:{"update:current":function(e){return t.$set(t.filter,"page",e)}}})],1)]:r("EmptySearchResult",{attrs:{title:"No shops found"}})],2)])])])])])},i=[],s=r("a34a"),a=r.n(s),o=r("68ee"),c=r("2f62"),u=r("3f86"),h=r("808f"),l=r("fc25"),d=r("b60e");function f(t,e,r,n,i,s,a){try{var o=t[s](a),c=o.value}catch(u){return void r(u)}o.done?e(c):Promise.resolve(c).then(n,i)}function p(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var s=t.apply(e,r);function a(t){f(s,n,i,a,o,"next",t)}function o(t){f(s,n,i,a,o,"throw",t)}a(void 0)}))}}function y(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?y(Object(r),!0).forEach((function(e){g(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function g(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var m={name:"ShopList",mixins:[u["a"],h["a"]],components:{VclTable:o["VclTable"],EmptySearchResult:l["a"]},computed:v(v({},Object(c["d"])("shop",{shops:function(t){return t.shops}})),Object(c["d"])("shared",{shopList:function(t){return t.shops},count:function(t){return t.countShop}})),data:function(){return{isFetching:!1,result:{}}},created:function(){this.filter=this.getRouteQuery()},methods:v(v(v({},Object(c["b"])("shop",[d["FETCH_SHOPS"]])),Object(c["b"])("shared",{fetchShopList:d["FETCH_SHOPS"]})),{},{init:function(){var t=p(a.a.mark((function t(){return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.isFetching=!0,this.handleUpdateRouteQuery(),t.next=4,this.fetchShops(this.filter);case 4:this.result=t.sent,this.isFetching=!1;case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handleCopyApiKey:function(){var t=p(a.a.mark((function t(e){return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$copyText(e);case 3:this.$toast.open("Copied"),t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),this.$toast.open({type:"error",text:"Có lỗi xảy ra. Vui lòng thử lại."});case 9:case"end":return t.stop()}}),t,this,[[0,6]])})));function e(e){return t.apply(this,arguments)}return e}(),handleActionItem:function(){}}),watch:{filter:{handler:function(){this.init()},deep:!0}}},_=m,x=r("2877"),b=Object(x["a"])(_,n,i,!1,null,null,null);e["default"]=b.exports},"68ee":function(t,e,r){!function(e,r){t.exports=r()}("undefined"!=typeof self&&self,(function(){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=11)}([function(t,e){t.exports=function(t,e,r,n,i,s){var a,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(a=t,o=t.default);var u,h="function"==typeof o?o.options:o;if(e&&(h.render=e.render,h.staticRenderFns=e.staticRenderFns,h._compiled=!0),r&&(h.functional=!0),i&&(h._scopeId=i),s?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},h._ssrRegister=u):n&&(u=n),u){var l=h.functional,d=l?h.render:h.beforeCreate;l?(h._injectStyles=u,h.render=function(t,e){return u.call(e),d(t,e)}):h.beforeCreate=d?[].concat(d,u):[u]}return{esModule:a,exports:o,options:h}}},function(t,e,r){"use strict";var n=r(2),i=r(12),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(t){return/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(t)};e.a={name:"VueContentLoading",props:{rtl:{default:!1,type:Boolean},speed:{default:2,type:Number},width:{default:400,type:Number},height:{default:130,type:Number},primary:{type:String,default:"#f0f0f0",validator:n},secondary:{type:String,default:"#e0e0e0",validator:n}},computed:{viewbox:function(){return"0 0 "+this.width+" "+this.height},formatedSpeed:function(){return this.speed+"s"},gradientId:function(){return"gradient-"+this._uid},clipPathId:function(){return"clipPath-"+this._uid},svg:function(){if(this.rtl)return{transform:"rotateY(180deg)"}},rect:function(){return{style:{fill:"url(#"+this.gradientId+")"},clipPath:"url(#"+this.clipPathId+")"}}}}},function(t,e,r){"use strict";var n=r(1);e.a={components:{VueContentLoading:n.a}}},function(t,e,r){"use strict";var n=r(1);e.a={components:{VueContentLoading:n.a}}},function(t,e,r){"use strict";var n=r(1);e.a={components:{VueContentLoading:n.a}}},function(t,e,r){"use strict";var n=r(1);e.a={components:{VueContentLoading:n.a}}},function(t,e,r){"use strict";var n=r(1);e.a={components:{VueContentLoading:n.a}}},function(t,e,r){"use strict";var n=r(1);e.a={components:{VueContentLoading:n.a},props:{rows:{default:5,type:Number}},computed:{height:function(){return 21*this.rows}},methods:{getYPos:function(t,e){return e+22*(t-1)}}}},function(t,e,r){"use strict";var n=r(1);e.a={components:{VueContentLoading:n.a},props:{header:{default:!0,type:Boolean},rows:{default:5,type:Number},columns:{default:4,type:Number}},computed:{height:function(){return 30*this.rows-20},width:function(){return 20*(this.columns-1)+10+100*this.columns}},methods:{getXPos:function(t){return 5+100*(t-1)+20*(t-1)},getYPos:function(t){return 30*(t-1)}}}},,function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1),i=r(13),s=r(15),a=r(17),o=r(19),c=r(21),u=r(23),h=r(25);r.d(e,"VclCode",(function(){return i.a})),r.d(e,"VclList",(function(){return s.a})),r.d(e,"VclTwitch",(function(){return a.a})),r.d(e,"VclFacebook",(function(){return o.a})),r.d(e,"VclInstagram",(function(){return c.a})),r.d(e,"VclBulletList",(function(){return u.a})),r.d(e,"VclTable",(function(){return h.a})),r.d(e,"VueContentLoading",(function(){return n.a})),e.default=n.a},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("svg",{style:t.svg,attrs:{viewBox:t.viewbox,preserveAspectRatio:"xMidYMid meet"}},[r("rect",{style:t.rect.style,attrs:{"clip-path":t.rect.clipPath,x:"0",y:"0",width:t.width,height:t.height}}),t._v(" "),r("defs",[r("clipPath",{attrs:{id:t.clipPathId}},[t._t("default",[r("rect",{attrs:{x:"0",y:"0",rx:"5",ry:"5",width:"70",height:"70"}}),t._v(" "),r("rect",{attrs:{x:"80",y:"17",rx:"4",ry:"4",width:"300",height:"13"}}),t._v(" "),r("rect",{attrs:{x:"80",y:"40",rx:"3",ry:"3",width:"250",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"80",rx:"3",ry:"3",width:"350",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"100",rx:"3",ry:"3",width:"400",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"120",rx:"3",ry:"3",width:"360",height:"10"}})])],2),t._v(" "),r("linearGradient",{attrs:{id:t.gradientId}},[r("stop",{attrs:{offset:"0%","stop-color":t.primary}},[r("animate",{attrs:{attributeName:"offset",values:"-2; 1",dur:t.formatedSpeed,repeatCount:"indefinite"}})]),t._v(" "),r("stop",{attrs:{offset:"50%","stop-color":t.secondary}},[r("animate",{attrs:{attributeName:"offset",values:"-1.5; 1.5",dur:t.formatedSpeed,repeatCount:"indefinite"}})]),t._v(" "),r("stop",{attrs:{offset:"100%","stop-color":t.primary}},[r("animate",{attrs:{attributeName:"offset",values:"-1; 2",dur:t.formatedSpeed,repeatCount:"indefinite"}})])],1)],1)])},i=[],s={render:n,staticRenderFns:i};e.a=s},function(t,e,r){"use strict";var n=r(3),i=r(14),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-content-loading",t._b({attrs:{width:300,height:80}},"vue-content-loading",t.$attrs,!1),[r("rect",{attrs:{x:"0",y:"0",rx:"3",ry:"3",width:"70",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"80",y:"0",rx:"3",ry:"3",width:"100",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"190",y:"0",rx:"3",ry:"3",width:"10",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"15",y:"20",rx:"3",ry:"3",width:"130",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"155",y:"20",rx:"3",ry:"3",width:"130",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"15",y:"40",rx:"3",ry:"3",width:"90",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"115",y:"40",rx:"3",ry:"3",width:"60",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"185",y:"40",rx:"3",ry:"3",width:"60",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"60",rx:"3",ry:"3",width:"30",height:"10"}})])},i=[],s={render:n,staticRenderFns:i};e.a=s},function(t,e,r){"use strict";var n=r(4),i=r(16),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-content-loading",t._b({attrs:{width:300,height:120}},"vue-content-loading",t.$attrs,!1),[r("rect",{attrs:{x:"0",y:"0",rx:"3",ry:"3",width:"250",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"20",y:"20",rx:"3",ry:"3",width:"220",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"20",y:"40",rx:"3",ry:"3",width:"170",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"60",rx:"3",ry:"3",width:"250",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"20",y:"80",rx:"3",ry:"3",width:"200",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"20",y:"100",rx:"3",ry:"3",width:"80",height:"10"}})])},i=[],s={render:n,staticRenderFns:i};e.a=s},function(t,e,r){"use strict";var n=r(5),i=r(18),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-content-loading",t._b({attrs:{width:300,height:225}},"vue-content-loading",t.$attrs,!1),[r("rect",{attrs:{x:"0",y:"0",rx:"3",ry:"3",width:"300",height:"170"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"180",rx:"2",ry:"2",width:"35",height:"45"}}),t._v(" "),r("rect",{attrs:{x:"45",y:"180",rx:"2",ry:"2",width:"150",height:"15"}}),t._v(" "),r("rect",{attrs:{x:"45",y:"203",rx:"2",ry:"2",width:"100",height:"10"}})])},i=[],s={render:n,staticRenderFns:i};e.a=s},function(t,e,r){"use strict";var n=r(6),i=r(20),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-content-loading",t._b({},"vue-content-loading",t.$attrs,!1),[r("rect",{attrs:{x:"0",y:"0",rx:"5",ry:"5",width:"70",height:"70"}}),t._v(" "),r("rect",{attrs:{x:"80",y:"17",rx:"4",ry:"4",width:"300",height:"13"}}),t._v(" "),r("rect",{attrs:{x:"80",y:"40",rx:"3",ry:"3",width:"250",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"80",rx:"3",ry:"3",width:"350",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"100",rx:"3",ry:"3",width:"400",height:"10"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"120",rx:"3",ry:"3",width:"360",height:"10"}})])},i=[],s={render:n,staticRenderFns:i};e.a=s},function(t,e,r){"use strict";var n=r(7),i=r(22),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-content-loading",t._b({attrs:{height:480}},"vue-content-loading",t.$attrs,!1),[r("circle",{attrs:{cx:"30",cy:"30",r:"30"}}),t._v(" "),r("rect",{attrs:{x:"75",y:"13",rx:"4",ry:"4",width:"100",height:"13"}}),t._v(" "),r("rect",{attrs:{x:"75",y:"37",rx:"4",ry:"4",width:"50",height:"8"}}),t._v(" "),r("rect",{attrs:{x:"0",y:"70",rx:"5",ry:"5",width:"400",height:"400"}})])},i=[],s={render:n,staticRenderFns:i};e.a=s},function(t,e,r){"use strict";var n=r(8),i=r(24),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-content-loading",t._b({attrs:{width:230,height:t.height}},"vue-content-loading",t.$attrs,!1),[t._l(t.rows,(function(e){return[r("circle",{key:e+"_c",attrs:{cx:"8",cy:t.getYPos(e,8),r:"8"}}),t._v(" "),r("rect",{key:e+"_r",attrs:{x:"22",y:t.getYPos(e,3),rx:"3",ry:"3",width:"200",height:"9"}})]}))],2)},i=[],s={render:n,staticRenderFns:i};e.a=s},function(t,e,r){"use strict";var n=r(9),i=r(26),s=r(0),a=s(n.a,i.a,!1,null,null,null);e.a=a.exports},function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-content-loading",t._b({attrs:{width:t.width,height:t.height}},"vue-content-loading",t.$attrs,!1),[t._l(t.rows,(function(e){return[t._l(t.columns,(function(n){return[r("rect",{key:e+"_"+n,attrs:{x:t.getXPos(n),y:t.getYPos(e),rx:"3",ry:"3",width:100,height:"10"}})]})),t._v(" "),e<t.rows?r("rect",{key:e+"_l",attrs:{x:"0",y:t.getYPos(e)+20,width:t.width,height:"1"}}):t._e()]}))],2)},i=[],s={render:n,staticRenderFns:i};e.a=s}])}))},"808f":function(t,e,r){"use strict";var n=r("45ba");e["a"]={computed:{totalSelected:function(){return this.action&&this.action.selected?this.action.selected.length:0},paginationLabel:function(){var t=this.filter.page?this.filter.page:0,e=(t-1)*this.filter.limit||1,r=Math.ceil(this.count/this.filter.limit);if(r<this.filter.page||!e)return"";var n=this.count>=this.filter.limit?t*this.filter.limit:this.count;return n>this.count&&(n=this.count),n>e?"Hiển thị ".concat(e,"-").concat(n," trong tổng ").concat(this.count," kết quả"):""},selectedIds:function(){return this.action&&this.action.selected&&this.action.selected.length?this.action.selected.map((function(t){var e=t.id;return e})):[]},items:function(){return[]},isAllChecked:function(){return this.action.selected&&this.items.length===this.action.selected.length&&this.totalSelected>0},isIndeterminate:function(){return!!this.action.selected&&(this.action.selected.length>0&&this.action.selected.length<this.items.length)},selectionCountText:function(){return"".concat(this.totalSelected," đơn hàng đã được chọn")}},data:function(){return{filter:{page:1,limit:20,search:""},action:{current:"",selected:[],visibleConfirm:!1},actions:{}}},methods:{onMultipleSelect:function(t){this.$set(this.action,"selected",t)},handleActionItem:function(){},handleAction:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.action.current=t,this.action.item=r,this.actions&&this.actions[t]&&this.actions[t].isNeedConfirm?this.$dialog.confirm({title:"Are you sure you want to do this?",onConfirm:function(){return e.handleActionItem()}}):this.handleActionItem()},handleSearch:function(t){this.filter.page=1,this.$set(this.filter,"search",t.target.value)},clearSearch:function(){this.$set(this.filter,"search","")},onActionConfirm:function(){this.handleActionItem()},toggleSelectAll:function(){var t=[];t=this.isAllChecked?[]:Object(n["d"])(this.items),this.$set(this.action,"selected",t)}},watch:{$route:function(){this.action.selected&&this.$set(this.action,"selected",[])}}}},fc25:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"empty-search-result"},[r("img",{staticClass:"empty-search-result__image",attrs:{src:t.notFoundImage,alt:"Empty search results"}}),t.title?r("p",{staticClass:"empty-search-result__title"},[t._v(t._s(t.title))]):t._e(),t.subtitle?r("p",{staticClass:"empty-search-result__subtitle"},[t._v(t._s(t.subtitle))]):t._e()])},i=[],s={name:"EmptySearchResult",props:{title:{type:String,default:""},subtitle:{type:String,default:"Thay đổi bộ lọc hoặc cụm từ tìm kiếm"}},computed:{notFoundImage:function(){return r("1fec")}}},a=s,o=r("2877"),c=Object(o["a"])(a,n,i,!1,null,null,null);e["a"]=c.exports}}]);