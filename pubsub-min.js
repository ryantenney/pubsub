// pubsub.js 0.0.1
// (c) 2011 Ryan W Tenney
// Freely distributable under the MIT license.
// https://github.com/ryantenney/pubsub
(function(){function i(e){var c={name:e,subscribers:[]};return f[g+e]=c}var k=Array.prototype.slice,g="\ufeff",a={},f={};a.subscribe=function(e){var c=k.call(arguments,1),d=c.shift(),b=null,a;typeof d!="function"&&(b=d,d=c.shift());a=c.shift()||10;a:{for(var c=(f[g+e]||i(e)).subscribers,d={fn:d,ctx:b,pri:a},b=0,h=c.length;h>b;++b)if(c[b].pri>=a){c.splice(b,0,d);break a}c.push(d)}};a.unsubscribe=function(a,c){for(var d=(f[g+a]||i(a)).subscribers,b=0,j=d.length;j>b;++b)d[b].fn===c&&d.splice(b,1)};a.publish=
function(a){for(var c=(f[g+a]||i(a)).subscribers,d=k.call(arguments,1),b=0,j=c.length;j>b;++b){var h=c[b];if(h.fn.apply(h.ctx,d)===false)break}};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=a;exports.pubsub=a}else typeof define==="function"&&define.amd?define("pubsub",function(){return a}):this.pubsub=a}).call(this);
