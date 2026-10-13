export interface ClientScriptConfig {
  slug: string;
  serviceTitle: string;
  googleAdsId: string;
  callLabel: string;
  contactLabel: string;
  metaPixelId: string;
  phone: string;
}

/**
 * Everything the plain HTML ad page needs at runtime, as one small inline script:
 * UTM capture, the Project Builder steps, spam token, zip to city, lead submit,
 * call/text tracking, and the Google tag loaded only after the page has loaded.
 *
 * Keep in sync with ProjectBuilder.tsx and submitLpLead() in src/lib/lp-lead.ts:
 * the POST body, source label, pending conversion and thank-you URL must match.
 */
export function buildClientScript(cfg: ClientScriptConfig): string {
  // "<" escaped so a config value can never close the inline <script> tag
  const C = JSON.stringify(cfg).replace(/</g, "\\u003c");
  return `(function(){var C=${C},W=window,D=document;
function ss(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}
function $(s,r){return(r||D).querySelector(s)}function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
var q=new URLSearchParams(location.search);
var utm={utm_source:q.get("utm_source")||"",utm_medium:q.get("utm_medium")||"",utm_campaign:q.get("utm_campaign")||"",fbclid:q.get("fbclid")||"",gclid:q.get("gclid")||q.get("gbraid")||q.get("wbraid")||""};
if(utm.utm_source||utm.gclid||utm.fbclid||!ss("bb_utm"))ss("bb_utm",JSON.stringify(utm));
function readUtm(){try{return JSON.parse(ss("bb_utm")||"{}")}catch(e){return{}}}
function source(u,label){var s=(u.utm_source||"").toLowerCase(),m=(u.utm_medium||"").toLowerCase(),p="";
if(s.indexOf("facebook")>-1||s.indexOf("fb")>-1||s==="ig"||s.indexOf("instagram")>-1||u.fbclid)p="facebook_ads";
else if(s.indexOf("google")>-1||m==="cpc"||m==="ppc"||u.gclid)p="google_ads";return p?p+":"+label:label}

W.dataLayer=W.dataLayer||[];if(!W.gtag)W.gtag=function(){W.dataLayer.push(arguments)};
if(C.googleAdsId){W.gtag("js",new Date());W.gtag("config",C.googleAdsId);
if(C.callLabel)W.gtag("config",C.googleAdsId+"/"+C.callLabel,{phone_conversion_number:C.phone})}
function loadTag(){if(!C.googleAdsId)return;var s=D.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+C.googleAdsId;D.head.appendChild(s)}
if(D.readyState==="complete")setTimeout(loadTag,0);else W.addEventListener("load",function(){setTimeout(loadTag,0)});
D.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("[data-contact]");if(!a)return;
if(C.contactLabel)W.gtag("event","conversion",{send_to:C.googleAdsId+"/"+C.contactLabel});
if(W.fbq)W.fbq("track","Contact",{content_name:C.serviceTitle,content_category:a.getAttribute("data-contact")})});

var token="";function getToken(){return fetch("/api/form-token").then(function(r){return r.json()}).then(function(d){token=d.token||token;return token}).catch(function(){return token})}
getToken();setInterval(getToken,1200000);

var card=$("#estimate");if(!card)return;
var sets=$$("fieldset[data-q]",card),form=$("#estimate-form"),err=$("#pb-err"),answers={},step=0,moving=false;
function visible(){return sets.filter(function(f){var c=f.getAttribute("data-showif");if(!c)return true;c=JSON.parse(c);return c.anyOf.indexOf(answers[c.questionId]||"")>-1})}
function render(){var v=visible(),onContact=step>=v.length,total=v.length+1;
sets.forEach(function(f){f.hidden=onContact||f!==v[step]});form.hidden=!onContact;
$("#pb-step").textContent=onContact?"Last step":"Step "+(step+1)+" of "+total;
$("#pb-bar").style.width=((Math.min(step,v.length)+1)/total*100)+"%";
if(!onContact)$$(".opt",v[step]).forEach(function(b){b.setAttribute("aria-pressed",String(answers[v[step].getAttribute("data-q")]===b.getAttribute("data-a")))})}
function keepInView(){var r=card.getBoundingClientRect();if(r.top<72&&card.scrollIntoView)card.scrollIntoView({behavior:"smooth",block:"start"})}
card.addEventListener("click",function(e){var t=e.target.closest&&e.target.closest("[data-a],[data-back]");if(!t)return;
if(t.hasAttribute("data-back")){err.textContent="";step=Math.max(0,Math.min(step,visible().length)-1);render();keepInView();return}
if(moving)return;moving=true;var f=t.closest("fieldset");answers[f.getAttribute("data-q")]=t.getAttribute("data-a");
$$(".opt",f).forEach(function(b){b.setAttribute("aria-pressed",String(b===t))});
setTimeout(function(){step++;moving=false;render();keepInView()},260)});

var el=form.elements,zipState="";
function zip5(){var m=el.zip.value.match(/\\d{5}/);return m?m[0]:""}
function lookup(){var z=zip5();if(!z)return Promise.resolve();return fetch("/api/zip-lookup?zip="+z).then(function(r){return r.json()}).then(function(d){
if(d.state)zipState=d.state;if(d.city&&!el.city.value.trim())el.city.value=d.city}).catch(function(){})}
el.zip.addEventListener("blur",lookup);
function loc(){var c=el.city.value.trim(),z=el.zip.value.trim(),n=Number(z.slice(0,5)),s=zipState||(n>=20600&&n<=21999?"MD":"");
if(!c)return z;return s?c+", "+s+" "+z:c+", "+z}
function timeframe(a){a=(a||"").toLowerCase();if(a.indexOf("asap")>-1||a.indexOf("emergency")>-1||a.indexOf("active leak")>-1||a.indexOf("urgent")>-1)return"ASAP";
if(a.indexOf("1 month")>-1||a.indexOf("4 to 6 weeks")>-1)return"Within 1 month";if(a.indexOf("3 month")>-1)return"Within 3 months";
if(a.indexOf("6 month")>-1)return"Within 6 months";if(a.indexOf("summer")>-1||a.indexOf("season")>-1)return"This season";
if(a.indexOf("next year")>-1||a.indexOf("later this year")>-1)return"Later this year";
if(a.indexOf("explor")>-1||a.indexOf("planning ahead")>-1||a.indexOf("flexible")>-1)return"Just exploring";return"To be discussed"}
var busy=false,btn=$('button[type="submit"]',form);
form.addEventListener("submit",function(e){e.preventDefault();if(busy)return;err.textContent="";
var val=function(n){return(el[n].value||"").trim()};
if(!val("name")||val("phone").replace(/\\D/g,"").length<10||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(val("email"))||!/^\\d{5}(-\\d{4})?$/.test(val("zip"))||val("city").length<2){
err.textContent="Please add your name, a 10 digit phone number, your email, your zip code and your city.";return}
busy=true;btn.disabled=true;btn.textContent="Sending...";
var answered=visible().filter(function(f){return answers[f.getAttribute("data-q")]}),picks=answered.map(function(f){return answers[f.getAttribute("data-q")]});
var budget=picks.filter(function(a){return a.indexOf("$")>-1})[0];
(zipState?Promise.resolve():lookup()).then(function(){return token||getToken()}).then(function(t){var u=readUtm();
return fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
name:val("name"),phone:val("phone"),email:val("email"),service:C.serviceTitle,cityOrZip:loc(),
description:answered.map(function(f){return f.getAttribute("data-question").replace("?","")+": "+answers[f.getAttribute("data-q")]}).join(" | ")||"Interested in: "+C.serviceTitle,
timeframe:timeframe(answers.timeline),budget:budget,source:source(u,"lp_builder:"+C.slug),
utmSource:u.utm_source||"",utmMedium:u.utm_medium||"",utmCampaign:u.utm_campaign||"",landingPage:location.href,_t:t||"",website_url:el.website_url.value})})
}).then(function(r){return r.json().catch(function(){return{}}).then(function(d){
if(!r.ok)throw{server:d.error||"Something went wrong. Please call or text us instead."};
if(d.accepted!==false)ss("ef_lp_pending_conversion",JSON.stringify({service:C.serviceTitle,method:"builder"}));
var url="/lp/"+C.slug+"/thanks?name="+encodeURIComponent(val("name").split(" ")[0]);(W.__lpNavigate||function(x){location.assign(x)})(url)})
}).catch(function(x){err.textContent=x&&x.server?x.server:"Something went wrong. Please call or text us at "+C.phone+".";
busy=false;btn.disabled=false;btn.textContent="Get my free estimate"})});
render()})();`;
}
