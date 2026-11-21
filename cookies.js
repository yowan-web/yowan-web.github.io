/* Bandeau cookies + chargement AdSense (après consentement). */
/* >>> Remplacez cet ID par le vôtre (AdSense > Compte > Informations sur le compte) <<< */
const ADSENSE_CLIENT="ca-pub-5739608985175147";
const CK={
fr:{t:"Nous utilisons des cookies pour afficher des annonces (Google AdSense) et mesurer l'audience. Vous pouvez accepter ou refuser les annonces personnalisées.",a:"Accepter",r:"Refuser",m:"En savoir plus",about:"À propos"},
en:{t:"We use cookies to show ads (Google AdSense) and measure audience. You can accept or refuse personalised ads.",a:"Accept",r:"Refuse",m:"Learn more",about:"About"},
es:{t:"Usamos cookies para mostrar anuncios (Google AdSense) y medir la audiencia. Puedes aceptar o rechazar los anuncios personalizados.",a:"Aceptar",r:"Rechazar",m:"Más información",about:"Acerca de"},
pt:{t:"Usamos cookies para mostrar anúncios (Google AdSense) e medir a audiência. Pode aceitar ou recusar os anúncios personalizados.",a:"Aceitar",r:"Recusar",m:"Saber mais",about:"Sobre"},
ar:{t:"نستخدم ملفات تعريف الارتباط لعرض الإعلانات (Google AdSense) وقياس الجمهور. يمكنك قبول الإعلانات المخصصة أو رفضها.",a:"قبول",r:"رفض",m:"المزيد",about:"حول"}
};
function ckL(){const l=(typeof LANG!=="undefined"&&CK[LANG])?LANG:"en";return CK[l]}
function ckGet(){try{return localStorage.getItem("cmfc_consent")}catch(e){return null}}
function ckLoadAds(personal){
  if(!ADSENSE_CLIENT||/X{6,}/.test(ADSENSE_CLIENT)||window.__adsLoaded)return;
  window.__adsLoaded=true;
  window.adsbygoogle=window.adsbygoogle||[];
  if(!personal)window.adsbygoogle.requestNonPersonalizedAds=1;
  const s=document.createElement("script");s.async=true;s.crossOrigin="anonymous";
  s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+ADSENSE_CLIENT;
  document.head.appendChild(s);
}
function ckChoose(v){
  try{localStorage.setItem("cmfc_consent",v)}catch(e){}
  const b=document.getElementById("ckbar");if(b)b.remove();
  ckLoadAds(v==="yes");
}
function ckRender(){
  const L=ckL();
  const a=document.getElementById("aboutLink");if(a)a.textContent=L.about;
  const b=document.getElementById("ckbar");
  if(b){b.dir=(typeof LANG!=="undefined"&&LANG==="ar")?"rtl":"ltr";b.querySelector("p").firstChild.textContent=L.t+" ";b.querySelector("a").textContent=L.m;b.querySelector("#ckyes").textContent=L.a;b.querySelector("#ckno").textContent=L.r}
}
function ckInit(){
  const c=ckGet();
  if(c){ckLoadAds(c==="yes")}
  else{
    const L=ckL(),d=document.createElement("div");d.id="ckbar";
    d.style.cssText="position:fixed;left:0;right:0;bottom:0;z-index:99;background:#0f2a52;color:#fff;border-top:2px solid #fbbf24;padding:12px 14px;font:13px/1.4 system-ui,Arial,sans-serif;max-width:520px;margin:0 auto";
    d.innerHTML='<p style="margin-bottom:8px">'+L.t+' <a href="privacy.html" style="color:#fbbf24">'+L.m+'</a></p><div style="display:flex;gap:8px"><button id="ckyes" style="flex:1;padding:10px;border:0;border-radius:8px;background:#fbbf24;font-weight:700">'+L.a+'</button><button id="ckno" style="flex:1;padding:10px;border:0;border-radius:8px;background:#2b4c80;color:#fff;font-weight:700">'+L.r+'</button></div>';
    document.body.appendChild(d);
    document.getElementById("ckyes").onclick=()=>ckChoose("yes");
    document.getElementById("ckno").onclick=()=>ckChoose("no");
  }
  ckRender();
  const s=document.getElementById("lang");if(s)s.addEventListener("change",()=>setTimeout(ckRender,50));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ckInit);else ckInit();
