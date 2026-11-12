/* Gün Teknik — ana sayfa hareket motoru. Kaynak: _build/ana/b.js (assets/gt/ana.js bu dosyadan üretilir). */
(function(){
'use strict';
const D=document,W=window,R=D.documentElement,$=s=>D.querySelector(s),$$=(s,r=D)=>[...r.querySelectorAll(s)];
const AZ=W.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=W.matchMedia('(pointer:fine)').matches;
const TOUCH=W.matchMedia('(pointer:coarse)').matches;
const MOB=W.matchMedia('(max-width:760px)').matches;
const SCRUB=1.25;
const clamp=(a,b,v)=>Math.min(b,Math.max(a,v));
const NS='http://www.w3.org/2000/svg';
const sv=(tag,attrs={},parent)=>{const e=D.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;};
if(TOUCH)R.classList.add('touch');
const FD=W.FD={M:{x:.5,y:.5},E:0,mouse:{x:.5,y:.4},heroP:0,off:false,az:AZ,mob:MOB,scratch:0,mv:0,heroVis:true};
const railX0=()=>(MOB?1:8)+5.5;
const marginX=()=>Math.max(48,innerWidth*.07)+.75;
const railEnd=()=>MOB?railX0():marginX();

/* ════════ DÖNÜŞEN AMBLEM ŞEKİLLERİ ════════ */
const P=(a,r)=>{const t=a*Math.PI/180;return (100+Math.cos(t)*r).toFixed(1)+' '+(100+Math.sin(t)*r).toFixed(1);};
const snowA=(()=>{let d='';for(let k=0;k<6;k++){const t=k*60-90;d+=(k?'L':'M')+P(t-30,22)+' L'+P(t-6,76)+' L'+P(t,90)+' L'+P(t+6,76)+' ';}return d+'Z';})();
const snowB=(()=>{let d='';for(let k=0;k<6;k++){const t=k*60-90;d+='M'+P(t-16,66)+' L'+P(t,50)+' L'+P(t+16,66)+' ';}return d.trim();})();
const SH=[
 {a:'M103 19 L68.5 97 L89.5 97 L77.5 181 L103 119.5 L122.5 181 L131.5 97 L110.5 97 Z',b:'M103 19 L103 119.5 M36 64 L50 70 M164 132 L150 126',c:'#E9FF3B',l:'CH1 · Elektrik'},
 {a:snowA,b:snowB,c:'#3FF2DF',l:'CH2 · Klima'},
 {a:'M30 58 C34 132 104 170 172 136 C148 120 70 84 30 58 Z',b:'M62 96 L146 52 M140 44 L156 60 M104 140 L98 184 M78 184 H120',c:'#E6F2E8',l:'CH3 · Uydu çanak'},
 {a:'M24 70 L148 50 L158 100 L34 120 Z',b:'M158 74 L178 70 M96 112 L102 152 M76 156 L126 156 M42 86 L50 85',c:'#E0541A',l:'CH4 · Güvenlik'},
 {a:'M66 22 L134 22 L128 42 L110 42 L104 176 L100 188 L96 176 L90 42 L72 42 Z',b:'M90 62 L112 56 M91 82 L111 76 M92 102 L109 96 M93 122 L108 116 M94 142 L106 138 M58 66 V156 L74 168 M142 66 V156 L126 168',c:'#E9FF3B',l:'CH5 · Montaj'}
];
(function(){const r=$('#embR');for(let i=4;i>=0;i--){const s=sv('svg',{class:'emb-l'+(i?'':' f'),viewBox:'0 0 200 200'},r);s.style.transform=`translateZ(${-i*5}px)`;sv('path',{class:'ea',d:SH[0].a},s);sv('path',{class:'eb',d:SH[0].b},s);}})();

/* ════════ İÇERİK ════════ */
const words=['ELEKTRİK','KLİMA','UYDU','KAMERA','ALARM','MONTAJ','TESİSAT','PANO','ŞOFBEN','KORNİŞ'];
const mk=a=>{const s=a.map(w=>`${w}<i>/</i>`).join('');return `<span>${s}</span><span>${s}</span>`;};
$('#mqA').innerHTML=mk(words);$('#mqB').innerHTML=mk([...words].reverse());
$('#fisNo').textContent='GT-'+String(Date.now()%10000).padStart(4,'0');

/* Voltmetre */
(function(){
  const g=$('#gauge'),cx=200,cy=210,Rr=170;let h=`<path class="arc" d="M${cx-Rr} ${cy} A${Rr} ${Rr} 0 0 1 ${cx+Rr} ${cy}"/>`;
  const a2xy=(v,r)=>{const a=Math.PI*(1-v/250);return [cx+r*Math.cos(a),cy-r*Math.sin(a)];};
  for(let v=0;v<=250;v+=10){const m=v%50===0;const [x1,y1]=a2xy(v,Rr-(m?22:12)),[x2,y2]=a2xy(v,Rr);h+=`<line class="tk${m?' m':''}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;if(m){const [tx,ty]=a2xy(v,Rr-40);h+=`<text x="${tx.toFixed(1)}" y="${(ty+4).toFixed(1)}" text-anchor="middle">${v}</text>`;}}
  const [r1x,r1y]=a2xy(220,Rr+10),[r2x,r2y]=a2xy(240,Rr+10);h+=`<path class="red" d="M${r1x.toFixed(1)} ${r1y.toFixed(1)} A${Rr+10} ${Rr+10} 0 0 1 ${r2x.toFixed(1)} ${r2y.toFixed(1)}"/>`;
  h+=`<text x="${cx}" y="${cy-60}" text-anchor="middle" style="font-size:28px;fill:#E6F2E8;font-weight:700" id="gV">0 V</text><text x="${cx}" y="${cy-36}" text-anchor="middle">AC · 50 Hz</text>`;
  h+=`<g id="ndl" style="transform-origin:${cx}px ${cy}px;transform:rotate(-90deg)"><line class="ndl" x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-Rr+18}"/></g><circle class="hub" cx="${cx}" cy="${cy}" r="7"/>`;
  h+=`<circle class="term" id="gT1" cx="150" cy="246" r="6"/><circle class="term" cx="250" cy="246" r="6"/><text x="150" y="262" text-anchor="middle" style="font-size:10px">COM</text><text x="250" y="262" text-anchor="middle" style="font-size:10px">V</text>`;
  g.innerHTML=h;
})();

/* Şematik harita: radar haritanın ortasında */
const ZN=[['Dalyan',134,185,'~1 saat'],['Ortaca',300,181,'~1 saat'],['Dalaman',352,254,'~2 saat'],['Köyceğiz',193,52,'~2 saat']];
const MC=[240,180];
(function(){
  const COAST='M0 262 C22 255 44 246 60 236 L66 233 C90 231 116 232 140 238 C160 248 178 270 196 290 C210 304 226 310 248 309 C280 307 310 312 336 313 C352 313 362 318 372 316 C400 310 430 300 480 296';
  let h=`<defs><pattern id="seaP" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3 H6" stroke="rgba(63,242,223,.16)" stroke-width="1"/></pattern>
  <linearGradient id="rG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E9FF3B" stop-opacity="0"/><stop offset="1" stop-color="#E9FF3B" stop-opacity=".28"/></linearGradient>
  <clipPath id="mapC"><rect x="0" y="0" width="480" height="360"/></clipPath></defs>
  <g clip-path="url(#mapC)">
  <path class="sea" id="mSea" d="${COAST} L480 360 L0 360 Z"/>
  <g id="mRadar">${[70,140,210,280].map(r=>`<circle class="rr" cx="${MC[0]}" cy="${MC[1]}" r="${r}"/>`).join('')}
  <g id="mSweep"><path class="rw" d="M${MC[0]} ${MC[1]} L${MC[0]+300} ${MC[1]} A300 300 0 0 0 ${(MC[0]+300*Math.cos(-.6)).toFixed(1)} ${(MC[1]+300*Math.sin(-.6)).toFixed(1)} Z"/></g><circle class="rc" cx="${MC[0]}" cy="${MC[1]}" r="3"/></g>
  <path class="coast" id="mCoast" d="${COAST}"/>
  <path class="lake" id="mLake" d="M92 70 C120 54 170 52 196 66 C212 78 206 104 192 118 C176 134 150 142 126 140 C100 138 80 124 78 104 C76 88 80 78 92 70 Z"/>
  <path class="riv" d="M122 140 C128 156 118 166 128 176 C138 186 126 198 120 210 C114 222 110 228 104 233"/>
  <path class="riv" d="M452 40 C430 90 400 130 380 170 C366 200 356 230 358 262 C360 290 364 304 366 314"/>
  <path class="road" d="M193 52 C230 90 270 150 300 181 C320 205 340 232 352 254"/><path class="road" d="M300 181 C250 180 180 186 134 185"/>
  <text class="lbl" x="104" y="104">KÖYCEĞİZ G.</text><text class="lbl" x="250" y="345">AKDENİZ</text><text class="lbl" x="66" y="252">İZTUZU</text>
  <path class="wire" id="mWire" pathLength="1" d="M-30 150 C80 150 180 162 ${MC[0]} ${MC[1]}"/>
  <path class="bolt" id="mBolt" pathLength="1" d="M0 0" style="opacity:0"/>
  </g>`;
  ZN.forEach((z,i)=>{const [n,x,y,t]=z,l=i===0;h+=`<g class="node" data-z="${i}" tabindex="0" role="button" aria-label="${n}, ${t}"><circle class="p" cx="${x}" cy="${y}" r="9"/><circle class="c" cx="${x}" cy="${y}" r="6"/><text x="${l?x-14:x+14}" y="${y-4}" text-anchor="${l?'end':'start'}">${n.toUpperCase()}</text><text class="t" x="${l?x-14:x+14}" y="${y+14}" text-anchor="${l?'end':'start'}">${t}</text></g>`;});
  $('#map').innerHTML=h;
})();

/* ════════ DEFTER ════════ */
const fig={
 ankara:`<svg viewBox="0 0 300 300" aria-hidden="true"><circle class="ink" cx="95" cy="130" r="64"/><circle class="ink" cx="95" cy="130" r="20"/><path class="ink t" d="M95 66 V110 M95 150 V194 M31 130 H75 M115 130 H159"/><path class="ink cu" d="M95 194 C120 240 180 250 210 220 C230 200 236 186 230 170"/><path class="ink" d="M190 80 C194 130 228 158 268 142 C250 130 220 106 190 80 Z"/><path class="ink" d="M212 116 L252 92 M228 150 L224 186 M208 186 H244"/><text x="150" y="285" text-anchor="middle">makara, çanak · 2010</text></svg>`,
 antalya:`<svg viewBox="0 0 300 300" aria-hidden="true"><circle class="ink cu" cx="232" cy="58" r="26"/><path class="ink cu" d="M232 18 v-12 M232 98 v12 M192 58 h-12 M272 58 h12 M204 30 l-8 -8 M260 86 l8 8 M260 30 l8 -8 M204 86 l-8 8"/><rect class="ink" x="36" y="118" width="196" height="122" rx="8"/><circle class="ink" cx="102" cy="179" r="44"/><path class="ink t" d="M102 135 v88 M58 179 h88 M71 148 l62 62 M133 148 l-62 62"/><path class="ink" d="M168 140 h46 M168 156 h46 M168 172 h46 M168 188 h46 M168 204 h46"/><path class="ink" d="M58 240 v18 M210 240 v18"/><text x="150" y="292" text-anchor="middle">kırk derece, dış ünite</text></svg>`,
 mugla:(()=>{const pp=(x,s)=>`<circle class="ink" cx="${x}" cy="${200-62*s}" r="${11*s}"/><path class="ink" d="M${x-20*s} 200 C${x-20*s} ${200-28*s} ${x-14*s} ${200-44*s} ${x} ${200-46*s} C${x+14*s} ${200-44*s} ${x+20*s} ${200-28*s} ${x+20*s} 200"/>`;
   return `<svg viewBox="0 0 300 300" aria-hidden="true">${pp(44,.7)}${pp(104,.85)}${pp(170,1)}${pp(240,1.15)}<path class="ink cu" d="M20 226 C90 222 170 214 280 196 M280 196 l-14 -6 M280 196 l-10 10"/><path class="ink t" d="M20 210 H282"/><text x="150" y="282" text-anchor="middle">ekip büyüyor</text></svg>`;})(),
 bugun:(()=>{let s='';SH.forEach((x,i)=>{const a=(i*72-90)*Math.PI/180,cx=150+Math.cos(a)*92,cy=138+Math.sin(a)*92;s+=`<g transform="translate(${(cx-26).toFixed(1)} ${(cy-26).toFixed(1)}) scale(.26)"><path class="ink${i===0?' cu':''}" d="${x.a}" style="stroke-width:8"/></g><path class="ink t" d="M150 138 L${(150+Math.cos(a)*62).toFixed(1)} ${(138+Math.sin(a)*62).toFixed(1)}"/>`;});
   return `<svg viewBox="0 0 300 300" aria-hidden="true"><circle class="ink" cx="150" cy="138" r="14"/><circle class="ink t" cx="150" cy="138" r="122"/>${s}<text x="150" y="290" text-anchor="middle">beş kanal, tek ekip</text></svg>`;})()
};
const DD={
  v220:{w:110,h:40,s:`<svg viewBox="0 0 110 40"><text x="0" y="30">220 V ~</text></svg>`,txt:1},
  star:{w:40,h:40,s:`<svg viewBox="0 0 40 40"><path class="ink cu" d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z"/></svg>`},
  arrow:{w:90,h:50,s:`<svg viewBox="0 0 90 50"><path class="ink" d="M4 40 C30 44 60 30 80 8 M80 8 l-12 2 M80 8 l-2 12"/></svg>`},
  flake:{w:56,h:56,s:`<svg viewBox="0 0 200 200"><path class="ink" style="stroke-width:7" d="${snowB}"/><path class="ink" style="stroke-width:7" d="M100 14 V186 M26 57 L174 143 M26 143 L174 57"/></svg>`},
  pvi:{w:120,h:40,s:`<svg viewBox="0 0 120 40"><text x="0" y="30">P = V · I</text></svg>`,txt:1}
};
const PAGES=[
 {run:"Gün Teknik'in defteri · I",
  ents:[{date:'Ankara · 2010–2016',h:'Çıraklık',p:"Hikâyemiz Ankara'da çıraklıkla başladı. Tesisat çektik, çatılara çanak kurduk, ilk kamera sistemlerini bağladık, montajlara gittik. *Ölçmeden dokunmamayı* ve işi bulduğumuzdan temiz bırakmayı o yıllarda öğrendik.",fig:fig.ankara},
        {date:'Antalya · 2016–2020',h:'Kalfalık',p:"Kalfalık yıllarımızı Antalya'nın sıcağında, sahada geçirdik. Elektriğin yanına *klimayı ekledik:* montaj, bakım, gaz, arıza. Bir sorunun tek bir parçada değil, bütün sistemde arandığını orada öğrendik.",fig:fig.antalya}],
  dd:[['v220','right:4%;top:8%'],['star','left:calc(var(--mg)/2 - 20px);top:34%'],['arrow','right:4%;bottom:7%']],
  blots:[['62%','46%',1.0,.38],['calc(var(--mg)/2 - 8px)','70%',.7,.82]]},
 {run:"Gün Teknik'in defteri · II",
  ents:[{date:"Muğla · 2020'den bugüne",h:'Ustalık',p:"2020'de Muğla'ya geldik ve Gün Teknik'i burada büyüttük. Önce küçük bir ekiptik; işler çoğaldıkça *ekibimiz de giderek kalabalıklaştı.* Bugün Ortaca'dan Dalyan'a, Dalaman'dan Köyceğiz'e beş alanda tek ekip olarak çalışıyoruz.",fig:fig.mugla},
        {date:'Bugün',h:'Yolumuz sürüyor',p:"Sözlerimiz ilk günkü gibi: arızayı bulmadan parça değiştirmiyor, net fiyat vermeden işe başlamıyor, çalıştığımız yeri temiz bırakıyoruz. *Ve hâlâ öğreniyor, gelişiyor, geliştiriyoruz.*",fig:fig.bugun}],
  dd:[['flake','right:5%;top:8%'],['pvi','right:6%;bottom:8%'],['star','left:calc(var(--mg)/2 - 20px);top:58%']],
  blots:[['48%','12%',.8,.5]]}
];
const blotSvg=seed=>{let r=()=>{seed=(seed*9301+49297)%233280;return seed/233280;};let d='';const n=16;for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,rr=16+r()*8;d+=(i?'L':'M')+(30+Math.cos(a)*rr).toFixed(1)+' '+(30+Math.sin(a)*rr).toFixed(1);}
  let drops='';for(let i=0;i<4;i++){const a=r()*Math.PI*2,dd=30+r()*16;drops+=`<circle cx="${(30+Math.cos(a)*dd).toFixed(1)}" cy="${(30+Math.sin(a)*dd).toFixed(1)}" r="${(1.5+r()*3).toFixed(1)}"/>`;}
  return `<svg viewBox="-10 -10 80 80" width="70" height="70"><path d="${d}Z"/>${drops}</svg>`;};
const stage=$('#bookStage');
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const md=t=>esc(t).replace(/\*([^*]+)\*/g,'<span class="k">$1</span>');
stage.innerHTML=`<div class="stack" id="stack"></div>`+PAGES.map((p,i)=>`<article class="page" data-i="${i}" style="z-index:${PAGES.length-i+5}">
  <div class="run">${p.run}</div>
  <div class="ents">${p.ents.map((e,j)=>`<section class="ent${j?' r':''}"><div class="hw"><div class="hd"><span class="date">${esc(e.date)}</span><h3>${esc(e.h)}</h3></div><p>${md(e.p)}</p></div><div class="fig">${e.fig}</div></section>`).join('')}</div>
  ${p.dd.map(([k,pos])=>`<div class="dd${DD[k].txt?' tx':''}" style="${pos};width:${DD[k].w}px;height:${DD[k].h}px">${DD[k].s}</div>`).join('')}
  ${p.blots.map((b,j)=>`<div class="blt" style="left:${b[0]};top:${b[1]};transform:scale(0)" data-s="${b[2]}" data-at="${b[3]}">${blotSvg(7+i*13+j*5)}</div>`).join('')}
  <div class="no">s. ${i+1}</div></article>`).join('')+
  `<svg id="flap" aria-hidden="true"><defs><linearGradient id="flg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3E5C2"/><stop offset=".55" stop-color="#E2CC98"/><stop offset="1" stop-color="#C8AE76"/></linearGradient><filter id="fls" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="-6" dy="8" stdDeviation="10" flood-color="#3C2A0A" flood-opacity=".38"/></filter></defs><polygon id="shade" fill="rgba(60,42,10,.22)"/><polygon id="flapP" fill="url(#flg)" filter="url(#fls)"/><line id="crease" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/></svg>
  <div class="inkwell" id="inkwell"><svg viewBox="0 0 48 56"><path d="M8 20 h32 l4 30 a4 4 0 0 1 -4 4 h-32 a4 4 0 0 1 -4 -4 z" fill="#2b2a30" stroke="#14151A" stroke-width="1.5"/><rect x="16" y="10" width="16" height="10" rx="2" fill="#3a3830" stroke="#14151A" stroke-width="1.5"/><rect id="inkLv" x="9" y="30" width="30" height="22" fill="#0b0b10"/><path d="M12 26 q2 12 0 22" stroke="rgba(255,255,255,.25)" stroke-width="2" fill="none"/><ellipse cx="24" cy="11" rx="7" ry="2.4" fill="#0b0b10"/><circle id="inkRp" cx="24" cy="11" r="2" fill="none" stroke="#8a88a0" stroke-width="1" opacity="0"/></svg></div>
  <div class="blot" id="blot"></div><div class="nib" id="nib">${$('.t-quill').outerHTML.replace('class="t-quill"','')}</div>
  <div class="bk-hud"><span id="bkN">Sayfa 1 / ${PAGES.length}</span><span class="bar"><i id="bkBar"></i></span></div>`;

/* Kanal arka yüzü (tüm liste) */
$$('.ch').forEach(c=>$$('.flip',c).forEach(b=>b.addEventListener('click',()=>{const on=!c.classList.contains('on');c.classList.toggle('on',on);
  const f=c.querySelector('.front'),bk=c.querySelector('.back');f&&f.setAttribute('aria-hidden',on);bk&&bk.setAttribute('aria-hidden',!on);
  const fb=c.querySelector('.front .flip');fb&&fb.setAttribute('aria-expanded',on);const t=on?bk&&bk.querySelector('.flip'):fb;t&&t.focus({preventScroll:true});})));

/* ════════ KÜTÜPHANE YOKSA SADE HAL ════════ */
if(!(W.gsap&&W.ScrollTrigger&&W.SplitText)||AZ){R.classList.add('booted');$$('.steps li').forEach(l=>l.classList.add('on'));FD.az=true;return;}
let started=false;const go=()=>{if(started)return;started=true;main();};
if(D.fonts&&D.fonts.ready){D.fonts.ready.then(go);setTimeout(go,2800);}else go();
function main(){
gsap.registerPlugin(ScrollTrigger,DrawSVGPlugin,SplitText);
const MORPH=!!W.MorphSVGPlugin;if(MORPH)gsap.registerPlugin(MorphSVGPlugin);
R.classList.add('fx');
gsap.defaults({ease:'power3.out'});
ScrollTrigger.config({ignoreMobileResize:true});

/* ════════ YUMUŞAK KAYDIRMA ════════ */
let lenis=null;
if(W.Lenis){
  lenis=new Lenis({lerp:.075,wheelMultiplier:.9,touchMultiplier:1.2,smoothWheel:true,syncTouch:true,syncTouchLerp:.075,touchInertiaMultiplier:30});
  // hız tavanı: hedef, o anki konumun en fazla G piksel önünde tutulur (lerp ile ≈ 3000 px/sn); kalan mesafe kaybolmaz, sırayla verilir
  const VMAX=2500,G=VMAX/(.075*60),sTo=lenis.scrollTo.bind(lenis);let want=null,lastNT=null;
  lenis.scrollTo=(t,o={})=>{if(o.programmatic===false&&typeof t==='number'){const base=want??lenis.targetScroll;want=clamp(0,lenis.limit,base+(t-lenis.targetScroll));const c=lenis.animatedScroll;const r=sTo(c+clamp(-G,G,want-c),o);lastNT=lenis.targetScroll;return r;}want=null;lastNT=null;return sTo(t,o);};
  gsap.ticker.add(()=>{if(want===null)return;
    // kaydırma çubuğu, klavye ya da bağlantıyla dışarıdan atlanırsa bekleyen hedefi bırak
    if(lastNT!==null&&Math.abs(lenis.targetScroll-lastNT)>2){want=null;lastNT=null;return;}
    const c=lenis.animatedScroll;if(Math.abs(want-c)<1){want=null;lastNT=null;return;}const nt=c+clamp(-G,G,want-c);if(Math.abs(nt-lenis.targetScroll)>.5){sTo(nt,{programmatic:false,lerp:.075});lastNT=lenis.targetScroll;}});
  ['touchstart','mousedown','keydown'].forEach(ev=>addEventListener(ev,()=>{want=null;lastNT=null;},{passive:true}));
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  $$('a[data-scr], #brand').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');if(h&&h[0]==='#'){e.preventDefault();lenis.scrollTo(h==='#bas'?0:h,{offset:-20,duration:2,easing:t=>1-Math.pow(1-t,4)});}}));
}
const vel=()=>lenis?lenis.velocity:0;

/* ════════ TİTREŞİM VE SES ════════ */
const hz=ms=>{try{if(navigator.vibrate&&(!navigator.userActivation||navigator.userActivation.hasBeenActive))navigator.vibrate(ms);}catch(e){}};
const paperOn=()=>R.classList.contains('paper-on');
const S=(function(){
  /* Tek ses: koyu bölümlerde 160 Hz'lik saf bir sinüs, kaydırınca 240 Hz'e kadar yükselir.
     Defterde 110 Hz'lik, daha kısık ve yumuşak bir sinüs, kaydırınca 150 Hz'e kadar. Harmonik, bas, filtre yok.
     Glitch'te aynı ton kesik kesik bozulur. Küçük düğme sesleri kısa ve hafiftir. */
  let ac=null,master,chop,dk,dkG,pp,ppG,on=false,spd=0,lastFlk=0,bootT=-9;
  const gain=v=>{const g=ac.createGain();g.gain.value=v;return g;};
  function init(){
    ac=new (W.AudioContext||W.webkitAudioContext)();
    const lim=ac.createDynamicsCompressor();lim.threshold.value=-3;lim.knee.value=0;lim.ratio.value=8;lim.attack.value=.003;lim.release.value=.15;
    master=gain(0);master.connect(lim);lim.connect(ac.destination);
    chop=gain(1);chop.connect(master);
    dk=ac.createOscillator();dk.type='sine';dk.frequency.value=160;dkG=gain(0);dk.connect(dkG).connect(chop);dk.start();
    pp=ac.createOscillator();pp.type='sine';pp.frequency.value=110;ppG=gain(0);pp.connect(ppG).connect(master);pp.start();
  }
  function tone(f1,f2,type,peak,dur,a){const o=ac.createOscillator(),g=gain(0),t=ac.currentTime;o.type=type;o.frequency.setValueAtTime(f1,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+(a||.004));g.gain.exponentialRampToValueAtTime(.0001,t+(a||.004)+dur);o.connect(g).connect(master);o.start();o.stop(t+dur+.1);}
  const ok=()=>on&&!FD.off;
  return {
    toggle(){if(!ac)init();on=!on;if(on)ac.resume();master.gain.setTargetAtTime(on?1:0,ac.currentTime,.25);return on;},
    tick(){if(!on)return;const t=ac.currentTime,v=Math.min(1,Math.abs(vel())/35),mob=TOUCH?1.5:1,pap=paperOn(),E=FD.E;spd+=(v-spd)*.05;
      const live=!FD.off,bf=Math.min(1,Math.max(0,(t-bootT-1.1)/1.3));
      dkG.gain.setTargetAtTime(live&&!pap?.15*mob*bf:0,t,.35);
      const wob=E>.02?1+(Math.random()-.5)*E*.3:1;
      dk.frequency.setTargetAtTime(160*(1+spd*.5)*wob,t,E>.02?.006:.2);
      chop.gain.setTargetAtTime(E>.03&&Math.random()<E*.5?.05:1,t,.004);
      ppG.gain.setTargetAtTime(live&&pap?.085*mob*bf:0,t,.6);
      pp.frequency.setTargetAtTime(110*(1+spd*.36),t,.35);},
    hover(){if(!ok())return;paperOn()?tone(440,0,'sine',.02,.14,.01):tone(1800+Math.random()*400,0,'triangle',.028,.03);},
    click(){if(!ok())return;paperOn()?tone(330,0,'sine',.045,.25,.01):tone(150,70,'sine',.16,.12);},
    flick(){if(!ok())return;const n=performance.now();if(n-lastFlk<40)return;lastFlk=n;tone(2600+Math.random()*700,0,'square',.018,.015);tone(160,0,'sine',.05,.05);},
    thump(){if(ok()&&!paperOn())tone(90,45,'sine',.18,.3);},
    swish(){if(ok())tone(110,150,'sine',.05,.5,.08);},
    zap(){if(ok())tone(320,160,'triangle',.05,.1);},
    lock(){if(ok()){tone(1320,0,'sine',.04,.08);setTimeout(()=>tone(1760,0,'sine',.04,.1),90);}},
    off(){if(on)tone(160,40,'sine',.18,.6);},
    pwr(){if(!on)return;[0,.12,.2,.34].forEach(d=>setTimeout(()=>tone(160,0,'sine',.1,.05),d*1000));},
    /* ışık geri gelince: röle tıkı, kısa cızırtılar, 40 Hz'den ana tona yükselen dalga; ana ton arkasından yavaşça girer */
    boot(){if(!on)return;const t=ac.currentTime,f=paperOn()?110:160;bootT=t;
      [0,.06,.55].forEach(d=>setTimeout(()=>{tone(2400,0,'square',.022,.012);tone(120,60,'sine',.12,.08);},d*1000));
      for(let i=0;i<7;i++)setTimeout(()=>tone(1700+Math.random()*1600,0,'square',.012,.01),90+Math.random()*700);
      const o=ac.createOscillator(),g=gain(0);o.type='sine';o.frequency.setValueAtTime(40,t);o.frequency.exponentialRampToValueAtTime(f,t+1.5);
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.15,t+1.3);g.gain.linearRampToValueAtTime(0,t+2.5);o.connect(g).connect(master);o.start(t);o.stop(t+2.6);
      setTimeout(()=>tone(f*2,0,'sine',.035,.4,.02),1450);}
  };
})();
$('#snd').addEventListener('click',()=>{const b=$('#snd');const on=S.toggle();b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Sesi kapat':'Sesi aç');hz(8);});
D.addEventListener('pointerover',e=>{if(e.target.closest&&e.target.closest('a,button,summary,.node'))S.hover();});
D.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('a,button,summary,.node')){S.click();hz(8);}});

/* ════════ YARDIMCILAR ════════ */
const rel=(el,base)=>{const a=el.getBoundingClientRect(),b=base.getBoundingClientRect();return {x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height,r:a.right-b.left,b:a.bottom-b.top};};
// Her öğenin tek zaman çizelgesi: gir → dur → çık. Aşağıda alttan, yukarıda üstten kurulur.
function life(trig,enter,exit,o={}){
  const horiz=!!o.ca,vp=horiz?innerWidth:innerHeight,br=trig.getBoundingClientRect(),sz=Math.max(1,(horiz?(trig.offsetWidth??br.width):(trig.offsetHeight??br.height))||0),tot=vp+sz;
  const s0=(o.s0??.04)*vp/tot,ein=Math.min(.48,(o.ein??.42)*vp/tot),eout=Math.min(.45,(o.eout??.34)*vp/tot);
  const st={trigger:trig,start:horiz?'left right':'top bottom',end:horiz?'right left':'bottom top',scrub:o.scrub??SCRUB};
  if(o.ca)st.containerAnimation=o.ca;
  const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:st});
  tl.to({},{duration:1},0);
  enter(tl,s0,ein);
  if(exit)exit(tl,1-eout,eout);
  return tl;
}
const GL='01<>/\\|=+~#%$*';
const SCR=[];
function scrambler(el){
  const nodes=[];const walk=n=>n.childNodes.forEach(c=>{if(c.nodeType===3&&c.nodeValue.trim())nodes.push([c,c.nodeValue]);else if(c.nodeType===1)walk(c);});walk(el);
  const total=nodes.reduce((a,[,t])=>a+t.length,0);
  const full=()=>nodes.forEach(([n,t])=>{n.nodeValue=t;});SCR.push({el,full});
  return p=>{const k=p*total;let used=0;
    nodes.forEach(([n,t])=>{let s='';for(let i=0;i<t.length;i++){const g=used+i,ch=t[i];s+=(ch===' '||g<k-.5)?ch:(g<k+5&&p>0?GL[(Math.random()*GL.length)|0]:' ');}n.nodeValue=s;used+=t.length;});
    el.style.opacity=p>0?1:0;};
}

const FX={
  chars(el){const s=new SplitText(el,{type:'lines,chars',mask:'lines',linesClass:'ln',charsClass:'cx'});
    return {enter:(tl,a,d)=>tl.fromTo(s.chars,{yPercent:118,rotation:7},{yPercent:0,rotation:0,duration:d*.55,stagger:{amount:d*.45},ease:'power2.out'},a),
            exit:(tl,a,d)=>tl.to(s.chars,{yPercent:-118,rotation:-5,duration:d*.55,stagger:{amount:d*.45},ease:'power1.in'},a)};},
  rise(el){const s=new SplitText(el,{type:'lines',mask:'lines',linesClass:'lm'});
    return {enter:(tl,a,d)=>tl.fromTo(s.lines,{yPercent:110,opacity:0,filter:'blur(6px)'},{yPercent:0,opacity:1,filter:'blur(0px)',duration:d*.6,stagger:{amount:d*.4},ease:'power2.out'},a),
            exit:(tl,a,d)=>tl.to(s.lines,{yPercent:-110,opacity:0,filter:'blur(6px)',duration:d*.6,stagger:{amount:d*.4},ease:'power1.in'},a)};},
  decode(el){const f=scrambler(el);f(0);
    return {enter:(tl,a,d)=>{const o={p:0};tl.to(o,{p:1,duration:d,ease:'none',onUpdate:()=>f(o.p)},a);},
            exit:(tl,a,d)=>{const o={p:1};tl.to(o,{p:0,duration:d,ease:'none',onUpdate:()=>f(o.p),immediateRender:false},a);}};},
  clip(el){return {enter:(tl,a,d)=>tl.fromTo(el,{clipPath:'inset(0% 0% 100% 0%)',y:40,opacity:.2},{clipPath:'inset(0% 0% 0% 0%)',y:0,opacity:1,duration:d,ease:'power2.out'},a),
            exit:(tl,a,d)=>tl.to(el,{clipPath:'inset(100% 0% 0% 0%)',y:-30,opacity:.2,duration:d,ease:'power1.in'},a)};}
};
function autoFx(root,o={}){$$('[data-fx]',root).forEach(el=>{const f=FX[el.dataset.fx](el);life(el,f.enter,o.noExit?null:f.exit);});}
const pills=[];
function pill(btn){let svg=btn.querySelector('.bo');if(!svg){svg=sv('svg',{class:'bo','aria-hidden':'true'});sv('path',{pathLength:'1','stroke-dasharray':'1 1'},svg);btn.prepend(svg);pills.push(btn);}
  const w=btn.offsetWidth,h=btn.offsetHeight,r=h/2,p=svg.querySelector('path');
  if(w&&h)p.setAttribute('d',`M${r} .75 H${w-r} A${r-.75} ${r-.75} 0 0 1 ${w-r} ${h-.75} H${r} A${r-.75} ${r-.75} 0 0 1 ${r} .75 Z`);
  return p;}
const FLK_ON=[0,1,0,0,.9,0,.25,0,0,1,.1,1,0,.6,1,.3,1,.85,1,1],FLK_OFF=[1,.3,1,0,.7,0,.2,0];
const samp=(arr,t)=>{const n=arr.length-1,x=clamp(0,1,t)*n,i=Math.min(n-1,Math.floor(x));return arr[i]+(arr[i+1]-arr[i])*(x-i);};
const step=(arr,t)=>arr[Math.min(arr.length-1,Math.floor(clamp(0,1,t)*arr.length))];
const setOn=(b,v)=>{const o=+b.style.getPropertyValue('--on')||0;if(v>.5&&o<=.5)S.flick();b.style.setProperty('--on',v.toFixed(3));};
function fluoIn(tl,btn,a,d){const p=pill(btn);setOn(btn,0);const o={t:0};tl.fromTo(p,{strokeDashoffset:1},{strokeDashoffset:0,duration:d*.55,ease:'power2.inOut'},a).fromTo(o,{t:0},{t:1,duration:d*.5,onUpdate:()=>setOn(btn,o.t>=1?1:step(FLK_ON,o.t))},a+d*.45);}
function fluoOut(tl,btn,a,d){const p=pill(btn);const o={t:0};tl.fromTo(o,{t:0},{t:1,duration:d*.45,immediateRender:false,onUpdate:()=>setOn(btn,o.t>=1?0:step(FLK_OFF,o.t))},a).fromTo(p,{strokeDashoffset:0},{strokeDashoffset:-1,duration:d*.55,ease:'power2.inOut',immediateRender:false},a+d*.4);}
function fluoLife(btns,trig,o={}){life(trig,(tl,a,d)=>btns.forEach((b,i)=>fluoIn(tl,b,a+i*d*.15,d*.85)),o.noExit?null:(tl,a,d)=>btns.forEach((b,i)=>fluoOut(tl,b,a+(btns.length-1-i)*d*.15,d*.85)),o);}
const taps=[];
function tap(sec,geo,o={}){
  const svg=sv('svg',{class:'tap'+(o.ink?' ink':''),'aria-hidden':'true'});sec.prepend(svg);
  const p=sv('path',{class:'t',pathLength:'1','stroke-dasharray':'1 1','stroke-dashoffset':'1'},svg),f=sv('path',{class:'tf'},svg);
  const n1=sv('circle',{r:4.5},svg),n2=sv('circle',{r:4},svg);
  const t={svg,p,f,upd(){const g=geo(sec.getBoundingClientRect());if(!g)return;p.setAttribute('d',g.d);f.setAttribute('d',g.d);n1.setAttribute('cx',g.x1);n1.setAttribute('cy',g.y1);n2.setAttribute('cx',g.x2);n2.setAttribute('cy',g.y2);}};
  t.upd();taps.push(t);
  t.inTl=(tl,a,d)=>{tl.fromTo(p,{strokeDashoffset:1},{strokeDashoffset:0,duration:d,ease:'power2.inOut'},a).fromTo([n1,n2],{scale:0,transformOrigin:'50% 50%'},{scale:1,duration:d*.3,stagger:d*.7,ease:'back.out(3)'},a).fromTo(f,{opacity:0},{opacity:.85,duration:d*.3},a+d*.7);};
  t.outTl=(tl,a,d)=>{tl.to(f,{opacity:0,duration:d*.2,immediateRender:false},a).to(p,{strokeDashoffset:-1,duration:d,ease:'power2.inOut',immediateRender:false},a).to([n2,n1],{scale:0,duration:d*.3,stagger:d*.6,immediateRender:false},a);};
  return t;
}
const hline=(rx,y,x2)=>({d:`M${rx} ${y} H${x2}`,x1:rx,y1:y,x2,y2:y});

/* ════════ ÜST ÇUBUK ════════ */
const top=$('#top'),rail=$('#rail'),brand=$('#brand');
let docked=false;
function dock(on){if(on===docked)return;docked=on;top.classList.toggle('dock',on);}

/* ════════ ENERJİ: glitch yalnızca gerçekten hızlı kaydırmada ════════ */
// Kaydırma en fazla 2500 px/sn. Glitch 2300 px/sn'nin üstünde en az 0,1 sn sürerse başlar; 2500'de tam güç.
const crt=$('#crt'),roll=$('#crtRoll'),nz=$('#crtNoise');let rollY=0,lastE=-1,fastT=0;
gsap.ticker.add((time,dt)=>{
  const dr=gsap.ticker.deltaRatio(60)||1,pxs=Math.abs(vel())*60/dr;
  if(pxs>2300)fastT+=dt/1000;else fastT=Math.max(0,fastT-dt/500);
  const tg=fastT>.1?clamp(0,1,(pxs-2300)/180):0;
  FD.E=FD.off?0:(tg>FD.E?FD.E+(tg-FD.E)*.3:FD.E*.985);if(FD.E<.004)FD.E=0;
  const e=FD.E*FD.E*(3-2*FD.E);
  if(Math.abs(e-lastE)>.004){R.style.setProperty('--e',e.toFixed(3));crt.style.opacity=Math.min(1,e*1.2).toFixed(3);lastE=e;}
  if(e>.01){rollY=(rollY+4+e*52)%(innerHeight*1.4);roll.style.transform=`translate3d(0,${(rollY-innerHeight*.2)|0}px,0)`;nz.style.transform=`translate3d(${(Math.random()*60-30)|0}px,${(Math.random()*60-30)|0}px,0)`;}
  FD.scratch*=.86;FD.mv*=.9;
  S.tick();
});
function flash(){if(FD.E<.3)return;gsap.timeline().set('#flash',{opacity:0}).to('#flash',{opacity:.24,duration:.04}).to('#flash',{opacity:.05,duration:.05}).to('#flash',{opacity:.18,duration:.04}).to('#flash',{opacity:0,duration:.4});
  gsap.fromTo('#flash i',{top:'0%',opacity:1},{top:'100%',opacity:0,duration:.45,ease:'power2.in'});S.thump();hz(6);}

/* ════════ ALAN ÇİZGİLERİ (2B, sakin) ════════ */
const M={x:0,y:0,on:0};
(function(){
  const cv=$('#field'),cx=cv.getContext('2d');let w=0,h=0,run=true,t=0,amp=0;
  const m={x:0,y:0,tx:0,ty:0,act:0,ta:0,last:-9e9};
  const N=MOB?18:30,STEP=MOB?16:12;
  function size(){const dpr=Math.min(W.devicePixelRatio||1,MOB?1.5:1.75);w=cv.clientWidth;h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;cx.setTransform(dpr,0,0,dpr,0,0);if(!m.x){m.x=m.tx=w*.68;m.y=m.ty=h*.42;}}
  size();addEventListener('resize',size);
  const sec=$('.hero');
  sec.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();m.tx=e.clientX-r.left;m.ty=e.clientY-r.top;m.ta=1;m.last=performance.now();},{passive:true});
  sec.addEventListener('pointerleave',()=>{m.ta=0;});
  new IntersectionObserver(es=>{run=es[0].isIntersecting;FD.heroVis=run;},{threshold:0}).observe(cv);
  function frame(){
    if(run&&!FD.off){
      t+=.01;
      if(performance.now()-m.last>2200){m.tx=w*(.5+.3*Math.sin(t*.5));m.ty=h*(.42+.18*Math.sin(t*.7+1.2));m.ta=.6;}
      m.x+=(m.tx-m.x)*.07;m.y+=(m.ty-m.y)*.07;m.act+=(m.ta-m.act)*.05;
      amp+=(Math.min(Math.abs(vel())*.7,18)-amp)*.06;
      M.x=m.x;M.y=m.y;M.on=m.act;FD.M.x=m.x/w;FD.M.y=m.y/h;
      cx.clearRect(0,0,w,h);
      const Rr=Math.max(w,h)*(MOB?.32:.24),R2=Rr*Rr;
      for(let i=0;i<N;i++){
        const y0=(i+.5)/N*h;let near=0;cx.beginPath();
        for(let x=-STEP;x<=w+STEP;x+=STEP){
          const dx=x-m.x,dy=y0-m.y,d2=dx*dx+dy*dy,f=Math.exp(-d2/R2)*m.act;
          const y=y0+(m.y-y0)*f*.8+Math.sin(x*.011+t*2+i*.55)*(2+amp)*(1-f*.7)+Math.sign(dy||1)*Math.exp(-d2/(R2*.25))*m.act*dx*.07;
          if(f>near)near=f;x===-STEP?cx.moveTo(x,y):cx.lineTo(x,y);
        }
        const a=.07+near*.55;cx.strokeStyle=near>.35?`rgba(233,255,59,${a})`:`rgba(63,242,223,${a})`;cx.lineWidth=near>.35?1.3:1;cx.stroke();
      }
      if(((t*100)|0)%6===0){$('#hv').textContent=(230+(m.x/w-.5)*6+Math.sin(t*3)*.3).toFixed(1)+' V';$('#hz').textContent=(50+(m.y/h-.5)*.3).toFixed(2)+' Hz';}
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ════════ AMBLEM: şimşek → kar tanesi → çanak → kamera → dübel-vida ════════ */
const emb=$('#emb'),embT=$('#embT'),embR=$('#embR'),embL=$('#embL'),mini=$('#mini'),miniP=mini.querySelector('path');
let ei=0,miniI=0,heroCycle=true;
function setMini(k,force){if(k===miniI&&!force)return;miniI=k;mini.style.setProperty('--mc',SH[k].c);
  gsap.timeline().to(mini,{scaleX:0,duration:.18,ease:'power2.in'}).add(()=>{if(MORPH)gsap.set(miniP,{morphSVG:SH[k].a});else miniP.setAttribute('d',SH[k].a);}).to(mini,{scaleX:1,duration:.3,ease:'back.out(2)'});}
function embStep(){
  const k=(ei+1)%SH.length;
  if(FD.heroVis&&!FD.off){
    const A=$$('.ea',embR),B=$$('.eb',embR);
    const tl=gsap.timeline();
    tl.to(embR,{rotationY:90,duration:.5,ease:'power2.in'})
      .to(embR,{'--ec':SH[k].c,duration:.4},.3)
      .add(()=>{embL.textContent=SH[k].l;embL.style.color=SH[k].c;},.5)
      .set(embR,{rotationY:-90},.5)
      .to(embR,{rotationY:0,duration:.6,ease:'power2.out'},.5);
    if(MORPH){tl.to(A,{morphSVG:SH[k].a,duration:.45,ease:'power1.inOut'},.28).to(B,{morphSVG:SH[k].b,duration:.45,ease:'power1.inOut'},.28);}
    else tl.add(()=>{A.forEach(p=>p.setAttribute('d',SH[k].a));B.forEach(p=>p.setAttribute('d',SH[k].b));},.5);
    ei=k;if(heroCycle)setMini(k);
  }
  gsap.delayedCall(2.6,embStep);
}
// fare ve eğim amblemi çevirir
const eX=gsap.quickTo(embT,'rotationY',{duration:.9,ease:'power3'}),eY=gsap.quickTo(embT,'rotationX',{duration:.9,ease:'power3'});
gsap.ticker.add(()=>{if(!FD.heroVis)return;if(FINE){eX((FD.mouse.x-.5)*40);eY(-(FD.mouse.y-.45)*30);}else{const t=performance.now()/1000;eX(Math.sin(t*.6)*22);eY(Math.sin(t*.45)*10);}});

/* ════════ İMLEÇ ════════ */
let setMode=()=>{};
const inst={temp:32,sig:0,lock:false,bub:0,card:0,mode:'def'};
if(FINE){
  const c=$('#cur'),ring=c.querySelector('.ring'),hl=c.querySelector('.h'),vl=c.querySelector('.v'),rd=c.querySelector('.rd'),rdT=$('#rdT'),rdW=$('#rdW'),tool=$('#tool'),sbs=$$('.t-sat .sb'),bubC=$('#bubC'),thermo=$('.t-thermo');
  const xR=gsap.quickTo(ring,'x',{duration:.4,ease:'power3'}),yR=gsap.quickTo(ring,'y',{duration:.4,ease:'power3'});
  const xD=gsap.quickTo(rd,'x',{duration:.55,ease:'power3'}),yD=gsap.quickTo(rd,'y',{duration:.55,ease:'power3'});
  const xT=gsap.quickTo(tool,'x',{duration:.16,ease:'power2'}),yT=gsap.quickTo(tool,'y',{duration:.16,ease:'power2'}),rT=gsap.quickTo(tool,'rotation',{duration:.5,ease:'power2'});
  const ink=$('#ink'),ic=ink.getContext('2d');let lx=null,ly=null,px=-99,py=-99,frame=0,vx=0,schC=null;const parts=[];
  const isz=()=>{const d=Math.min(devicePixelRatio||1,2);ink.width=innerWidth*d;ink.height=innerHeight*d;ic.setTransform(d,0,0,d,0,0);};isz();addEventListener('resize',isz);
  setMode=m=>{if(m===inst.mode)return;inst.mode=m;c.dataset.m=m;lx=ly=null;ink.classList.toggle('on',m==='quill'||m==='thermo');};
  const pick=()=>{if(px<0)return;const el=D.elementFromPoint(px,py);const h=el&&el.closest?el.closest('[data-cur]'):null;let m=h?h.dataset.cur:'def';
    if(m==='def'&&paperOn())m='quill';if(FD.off)m='def';setMode(m);
    const cd=el&&el.closest&&el.closest('.ch');inst.card=cd?+cd.dataset.i:0;schC=cd?cd.querySelector('.sch'):null;c.classList.toggle('hot',!!(el&&el.closest&&el.closest('a,button,summary,.node,input,select,textarea')));};
  addEventListener('pointermove',e=>{const X=e.clientX,Y=e.clientY;FD.mv+=Math.hypot(X-px,Y-py)*.15;const dx=X-px;vx+=(dx-vx)*.2;px=X;py=Y;FD.mouse.x=X/innerWidth;FD.mouse.y=Y/innerHeight;
    xR(X);yR(Y);xD(X);yD(Y);xT(X);yT(Y);hl.style.transform=`translateY(${Y}px)`;vl.style.transform=`translateX(${X}px)`;pick();
    const m=inst.mode;
    if(m==='quill')rT(gsap.utils.clamp(-14,14,dx*.6));else rT(0);
    if(m==='quill'){if(lx!==null){const sp=Math.hypot(X-lx,Y-ly);ic.strokeStyle='rgba(20,21,26,.55)';ic.lineWidth=Math.max(.6,2.4-sp*.04);ic.lineCap='round';ic.beginPath();ic.moveTo(lx,ly);ic.lineTo(X,Y);ic.stroke();}lx=X;ly=Y;}
    if(m==='thermo'&&Math.random()<.7)parts.push({x:X+(Math.random()-.5)*18,y:Y+6,vx:(Math.random()-.5)*.6,vy:.4+Math.random()*.9,l:1});
  },{passive:true});
  gsap.ticker.add(()=>{
    if(FD.off)return;
    if(++frame%8===0&&Math.abs(vel())>.1)pick();
    const m=inst.mode;
    if(ink.classList.contains('on')){ic.globalCompositeOperation='destination-out';ic.fillStyle=m==='thermo'?'rgba(0,0,0,.12)':'rgba(0,0,0,.045)';ic.fillRect(0,0,innerWidth,innerHeight);ic.globalCompositeOperation='source-over';}
    if(parts.length){for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.x+=p.vx;p.y+=p.vy;p.l-=.02;if(p.l<=0){parts.splice(i,1);continue;}ic.fillStyle=`rgba(63,242,223,${(p.l*.55).toFixed(2)})`;ic.beginPath();ic.arc(p.x,p.y,1.2+p.l*1.6,0,7);ic.fill();}}
    if(m==='def')rdT.textContent=`${(px/innerWidth*10-5).toFixed(2)} ms · ${(230+(.5-py/innerHeight)*12).toFixed(1)} V`;
    else if(m==='probe'){const t=performance.now()/1000;let pts='';for(let x=0;x<=96;x+=3)pts+=`${x},${(13-Math.sin(x*.16+t*8)*10).toFixed(1)} `;rdW.setAttribute('points',pts);rdT.textContent=`CH 01 · ${(229.5+Math.random()).toFixed(1)} V`;}
    else if(m==='thermo'){thermo.style.setProperty('--tq',clamp(.1,1,(inst.temp-14)/20).toFixed(2));rdT.textContent=`${inst.temp.toFixed(1)}°C · serinliyor`;}
    else if(m==='sat'){let s=0;if(schC){const r=schC.getBoundingClientRect(),d=Math.hypot(px-(r.left+r.width*.35),py-(r.top+r.height*.5));s=clamp(0,1,1-d/420);}inst.sig+=(s-inst.sig)*.15;
      const n=Math.round(inst.sig*5);sbs.forEach((b,i)=>b.classList.toggle('on',i<n));if(inst.sig>.9&&!inst.lock){inst.lock=true;S.lock();}if(inst.sig<.8)inst.lock=false;
      rdT.textContent=inst.lock?'TÜRKSAT 42°D · KİLİTLENDİ':`TÜRKSAT 42°D · %${Math.round(inst.sig*100)}`;}
    else if(m==='cam'){const d=new Date();rdT.textContent=`● REC ${d.toTimeString().slice(0,8)}${FD.mv>8?' · HAREKET':''}`;}
    else if(m==='level'){inst.bub+=(clamp(-1,1,vx/14)-inst.bub)*.1;bubC.setAttribute('cx',(36+inst.bub*8).toFixed(1));rdT.textContent=`${(inst.bub*4).toFixed(1)}°`;}
  });
  D.documentElement.addEventListener('pointerleave',()=>gsap.to(c,{opacity:0,duration:.3}));D.documentElement.addEventListener('pointerenter',()=>gsap.to(c,{opacity:1,duration:.3}));
  $$('[data-magnet]').forEach(b=>{const qx=gsap.quickTo(b,'x',{duration:.8,ease:'elastic.out(1,.4)'}),qy=gsap.quickTo(b,'y',{duration:.8,ease:'elastic.out(1,.4)'});
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();qx((e.clientX-r.left-r.width/2)*.35);qy((e.clientY-r.top-r.height/2)*.45);});
    b.addEventListener('pointerleave',()=>{qx(0);qy(0);});});
  $$('.nav a').forEach(a=>{const o=a.textContent;a.addEventListener('mouseenter',()=>{let f=0;const id=setInterval(()=>{a.textContent=o.split('').map((ch,i)=>i<f/2?o[i]:GL[(Math.random()*GL.length)|0]).join('');if(++f>o.length*2){clearInterval(id);a.textContent=o;}},28);});});
}
// kanal aletleri (dokunmatikte eğimle, fareyle imleçle)
const kTemp=$('#kTemp'),bub=$('#bub'),bars=$$('#hizmetler .ch[data-i="3"] .bar');let svcAct=false,liveI=0;
let autoSig=0,liveT=0,lastLive=0;
gsap.ticker.add(()=>{if(!svcAct)return;const now=performance.now()/1000;if(liveI!==lastLive){lastLive=liveI;liveT=now;}
  const cool=inst.mode==='thermo'||(!FINE&&liveI===2);inst.temp+=((cool?22:32)-inst.temp)*.02;if(kTemp)kTemp.textContent=Math.round(inst.temp)+'°';
  autoSig+=(((!FINE&&liveI===3)?1:0)-autoSig)*.025;const s=FINE?inst.sig:autoSig;
  const n=Math.round(s*5);bars.forEach((b,i)=>b.classList.toggle('on',i<n));
  const bo=FINE?inst.bub:(liveI===5?Math.sin((now-liveT)*3.2)*Math.exp(-(now-liveT)*.7):0);if(bub)bub.setAttribute('cx',(90+clamp(-1,1,bo)*12).toFixed(1));});

/* ════════ KARARTMA ════════ */
const DESK=FINE&&innerWidth>760;
const torch=$('#torch');
addEventListener('pointermove',e=>{if(!FD.off||!DESK)return;torch.style.setProperty('--tx',e.clientX+'px');torch.style.setProperty('--ty',e.clientY+'px');},{passive:true});
let frozen=[];
// sayfa düzeni değişirken ekrandaki içerik yerinde kalsın
const anchor=()=>{let el=D.elementFromPoint(innerWidth/2,innerHeight*.45);if(!el||el===torch)el=$('main');return {el,top:el.getBoundingClientRect().top};};
const keep=a=>{const dy=a.el.getBoundingClientRect().top-a.top;if(Math.abs(dy)<1)return;const y=scrollY+dy;W.scrollTo(0,y);if(lenis){lenis.resize();lenis.scrollTo(y,{immediate:true,force:true});}};
const relit=$('#relit');
/* Işık geri gelir: önce tüp gibi birkaç kez çakar, sonra ışık bastığın yerden ekrana yayılır.
   Işık ulaştıkça butonlar sırayla pır pır yanar, altta şebeke 0'dan 230 V'a çıkar. */
function relight(ox,oy){
  const far=Math.hypot(Math.max(ox,innerWidth-ox),Math.max(oy,innerHeight-oy))+140,T0=.75,TR=1.7;
  const hv=$('#relV'),hh=$('#relHz'),o={v:0};
  const tl=gsap.timeline({onComplete:()=>{R.classList.remove('relit');gsap.set(relit,{'--r':'0px',opacity:1});gsap.set('#relitH',{opacity:1});}});
  tl.set(relit,{'--r':'150px'},.05).set(relit,{opacity:.15},.12).set(relit,{opacity:1},.17).set(relit,{opacity:.4},.3).set(relit,{opacity:1},.36)
    .set(relit,{opacity:.25},.5).set(relit,{opacity:.9},.56).set(relit,{opacity:1},.64)
    .to(relit,{'--r':far+'px',duration:TR,ease:'power2.in'},T0)
    .to(o,{v:1,duration:T0+TR*.9,ease:'power3.out',onUpdate:()=>{hv.textContent=Math.round(o.v*230);hh.textContent=Math.round(o.v*50);}},0)
    .to('#relitH',{opacity:0,duration:.5},T0+TR-.2);
  // ekrandaki butonlar ışık ulaşınca sırayla yansın
  pills.forEach(b=>{const r=b.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||(+b.style.getPropertyValue('--on')||0)<.5)return;
    const d=Math.hypot(r.left+r.width/2-ox,r.top+r.height/2-oy),rr=Math.max(0,d-60),p=Math.sqrt(Math.min(1,rr/far)),at=T0+TR*p;
    setOn(b,0);const q={t:0};tl.to(q,{t:1,duration:1.1,ease:'none',onUpdate:()=>setOn(b,q.t>=1?1:step(FLK_ON,q.t))},at);});
}
function power(off){
  if(off===FD.off)return;
  $$('[data-sw]').forEach(b=>b.setAttribute('aria-label',off?'Işıkları aç':'Işıkları kapat'));$('#msw').setAttribute('aria-pressed',off);$('#msw').setAttribute('aria-label',off?'Işıkları aç':'Işıkları kapat');
  if(DESK){
    if(off){S.off();hz(40);FD.off=true;
      const a=anchor();
      gsap.globalTimeline.pause();
      frozen=ScrollTrigger.getAll().filter(t=>t.pin);frozen.forEach(t=>t.disable(true));
      SCR.forEach(x=>x.full());
      R.classList.add('dark');torch.classList.remove('fl');
      keep(a);
    }else{S.boot();hz([10,40,10,30]);
      const ox=parseFloat(torch.style.getPropertyValue('--tx'))||innerWidth/2,oy=parseFloat(torch.style.getPropertyValue('--ty'))||innerHeight/2;
      gsap.set(relit,{'--x':ox+'px','--y':oy+'px','--r':'0px',opacity:1});R.classList.add('relit');
      const a=anchor();R.classList.remove('dark');
      frozen.forEach(t=>t.enable(false,false));frozen=[];ScrollTrigger.refresh();keep(a);
      FD.off=false;gsap.globalTimeline.resume();ScrollTrigger.update();
      relight(ox,oy);
    }
    return;
  }
  FD.off=off;
  if(off){R.classList.add('off');S.off();hz(40);lenis&&lenis.stop();setMode('def');
    gsap.timeline().set('#off',{opacity:1}).set('#offCv',{opacity:1,scaleX:1,scaleY:1}).set('#off .box',{opacity:0})
      .to('#offCv',{scaleY:.004,duration:.2,ease:'power2.in'}).to('#offCv',{scaleX:0,duration:.24,ease:'power2.in'}).set('#offCv',{opacity:0})
      .to('#off .box',{opacity:1,duration:.9,ease:'power2.out'},'+=.25');
    setTimeout(()=>{const b=$('#off .bigsw');b&&b.focus({preventScroll:true});},700);
  }else{S.boot();hz([10,40,10,30]);
    const sb=$('#off .bigsw svg'),r=sb?sb.getBoundingClientRect():null,ox=r?r.left+r.width/2:innerWidth/2,oy=r?r.top+r.height/2:innerHeight/2;
    gsap.set(relit,{'--x':ox+'px','--y':oy+'px','--r':'0px',opacity:1});R.classList.add('relit');
    R.classList.remove('off');gsap.set('#off',{opacity:1});lenis&&lenis.start();
    relight(ox,oy);
  }
}
$$('[data-sw]').forEach(b=>b.addEventListener('click',()=>power(!FD.off)));
$('#msw').addEventListener('click',()=>power(!FD.off));
addEventListener('keydown',e=>{if(e.key==='Escape'&&FD.off)power(false);});

/* ════════ KAHRAMAN ════════ */
const heroBtns=$$('#hCta .btn');
heroBtns.forEach(b=>{pill(b);setOn(b,0);gsap.set(b.querySelector('.bo path'),{strokeDashoffset:1});});
gsap.set(emb,{opacity:0,scale:.8});
let heroChars=[],titleSplit=null;
function fitTitle(){const h=$('#hTitle'),w=h.querySelector('.w'),hi=$('#heroIn');h.style.fontSize='';const cs=parseFloat(getComputedStyle(h).fontSize),st=getComputedStyle(hi);
  const avail=hi.clientWidth-parseFloat(st.paddingLeft)-parseFloat(st.paddingRight),ww=w.getBoundingClientRect().width;if(ww>0)h.style.fontSize=Math.min(cs*avail/ww*.975,cs*1.6)+'px';}
function intro(){
  R.classList.add('hb');
  titleSplit=new SplitText('#hTitle .w',{type:'chars',mask:'chars',charsClass:'hc'});heroChars=titleSplit.chars;fitTitle();
  const leadF=scrambler($('#hLead')),hudF=scrambler($('#hHud')),eF=scrambler($('#hE'));leadF(0);hudF(0);eF(0);
  const o={l:0,h:0,e:0};
  const tl=gsap.timeline({defaults:{ease:'expo.out'}});
  tl.from(heroChars,{yPercent:118,rotation:8,duration:1.8,stagger:.06})
    .to(emb,{opacity:1,scale:1,duration:1.6},.3)
    .to(o,{e:1,duration:1.4,ease:'none',onUpdate:()=>eF(o.e)},'-=1.4')
    .to(o,{h:1,duration:1.2,ease:'none',onUpdate:()=>hudF(o.h)},'-=1.5')
    .to(o,{l:1,duration:1.6,ease:'none',onUpdate:()=>leadF(o.l)},'-=1.3');
  const bt0=tl.duration()-1.3;
  heroBtns.forEach((b,i)=>{const p=b.querySelector('.bo path'),q={t:0},at=bt0+i*.75;tl.to(p,{strokeDashoffset:0,duration:.8,ease:'power2.inOut'},at).to(q,{t:1,duration:1.6,ease:'none',onUpdate:()=>setOn(b,q.t>=1?1:step(FLK_ON,q.t))},at+.55);});
  tl.from('.top .in>*',{opacity:0,y:-18,stagger:.1,duration:1.4},.4).add(()=>{leadF(1);heroScroll();gsap.delayedCall(1.4,embStep);});
}
function heroScroll(){
  const masks=heroChars.map(c=>c.parentElement),fld=$('#field');
  const qs=masks.map(m=>[gsap.quickTo(m,'x',{duration:.9,ease:'power3'}),gsap.quickTo(m,'y',{duration:.9,ease:'power3'})]);
  gsap.ticker.add(()=>{if(!M.on||!FD.heroVis)return;const hr=fld.getBoundingClientRect();masks.forEach((m,i)=>{const r=m.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const dx=M.x+hr.left-cx,dy=M.y+hr.top-cy,d=Math.hypot(dx,dy)||1,f=FD.heroP>.002?0:Math.exp(-(d*d)/(260*260))*M.on;qs[i][0](dx/d*f*14);qs[i][1](dy/d*f*11);});});
  const lead=new SplitText('#hLead',{type:'lines',mask:'lines',linesClass:'lm'});
  const hudF=scrambler($('#hHud')),eF=scrambler($('#hE'));
  const rnd=gsap.utils.random;
  const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:SCRUB,onUpdate:s=>{FD.heroP=s.progress;heroCycle=s.progress<.6;}}});
  // isim: kahramandan topbara uçuş. Uçarken asıl başlık gizlenir, sabit bir kopyası küçülerek topbardaki yerine gider.
  const h1=$('#hTitle'),hw=h1.querySelector('.w'),bb=$('#brand b');
  const fly=D.createElement('div');fly.className='h-big h-fly';fly.setAttribute('aria-hidden','true');fly.textContent=hw.textContent;D.body.appendChild(fly);
  R.classList.add('hb');
  const fo={k:0};let fsH=0,fsB=0;const fsz=()=>{fsH=parseFloat(getComputedStyle(h1).fontSize);fsB=parseFloat(getComputedStyle(bb).fontSize);fly.style.fontSize=fsH+'px';};fsz();addEventListener('resize',()=>{fsz();place();});
  function place(){if(FD.off)return;const k=fo.k;
    if(k<=.001){fly.style.visibility='hidden';hw.style.visibility='';R.classList.remove('hb-on');return;}
    if(k>=.999){fly.style.visibility='hidden';hw.style.visibility='hidden';R.classList.add('hb-on');return;}
    R.classList.remove('hb-on');hw.style.visibility='hidden';fly.style.visibility='visible';
    const n=h1.getBoundingClientRect(),t=bb.getBoundingClientRect(),sc=Math.pow(fsB/fsH,k);
    const x=n.left+(t.left-n.left)*k,y=n.top+(t.top+.1*fsB-n.top)*k;
    fly.style.transform=`translate3d(${x}px,${y}px,0) scale(${sc})`;
    fly.style.letterSpacing=(-.02+.05*k).toFixed(4)+'em';fly.style.fontStretch=(125-3*k).toFixed(2)+'%';}
  gsap.ticker.add(()=>{if(fo.k>.001&&fo.k<.999)place();});
  tl.to({},{duration:1},0)
    .to(fo,{k:1,duration:.5,ease:'power2.inOut',onUpdate:place},0)
    .to(emb,{yPercent:-40,scale:.6,opacity:0,filter:'blur(6px)',duration:.5,ease:'power2.in'},.05)
    .to({p:1},{p:0,duration:.45,onUpdate(){eF(this.targets()[0].p);}},.04)
    .to({p:1},{p:0,duration:.4,onUpdate(){hudF(this.targets()[0].p);}},0)
    .to(lead.lines,{yPercent:-110,opacity:0,filter:'blur(6px)',duration:.4,stagger:.06,ease:'power1.in'},.05);
  heroBtns.forEach((b,i)=>fluoOut(tl,b,.12+i*.08,.5));
  place();
}
let seen=false;try{seen=sessionStorage.getItem('gt-boot')==='1';sessionStorage.setItem('gt-boot','1');}catch(e){}
if(seen){R.classList.add('booted');intro();}
else{
  const bl=$('#bootLine'),bv=$('#bootV'),bc=$('#bootC'),o={v:0,a:0};
  const draw=()=>{let d='M0 80';for(let x=0;x<=560;x+=4){const y=80-Math.sin(x/560*Math.PI*6+o.v*.05)*o.a*Math.sin(x/560*Math.PI);d+=` L${x} ${y.toFixed(1)}`;}bl.setAttribute('d',d);bv.textContent=o.v.toFixed(1);bc.textContent='CH'+Math.min(5,1+Math.floor(o.v/46));};
  gsap.set('#boot',{clipPath:'inset(0 0 0% 0)',animation:'none'});gsap.set(bl,{drawSVG:'50% 50%'});
  gsap.timeline({onComplete:()=>R.classList.add('booted')})
    .to(bl,{drawSVG:'0% 100%',duration:.8,ease:'expo.inOut'})
    .to(o,{v:230,a:46,duration:1.1,ease:'power2.out',onUpdate:draw})
    .to(o,{a:0,duration:.45,ease:'power2.inOut',onUpdate:draw})
    .to('#boot',{clipPath:'inset(0 0 100% 0)',duration:1.1,ease:'expo.inOut'},'-=.1')
    .add(intro,'-=.8');
}

/* ════════ KANALLAR ════════ */
(function(){
  const sec=$('#hizmetler'),st=$('#svcStage'),track=$('#track'),cards=$$('.ch',track);
  autoFx(sec.querySelector('.sh'));
  const bus=sv('svg',{class:'bus','aria-hidden':'true'});track.prepend(bus);
  const drops=cards.map(()=>{const g=sv('g',{},bus);const p=sv('path',{class:'dr',pathLength:'1','stroke-dasharray':'1 1','stroke-dashoffset':'1'},g);const c=sv('circle',{r:4},g);return {p,c};});
  const busY=()=>track.offsetHeight-22;
  const layDrops=()=>{const y=busY();cards.forEach((c,i)=>{const x=c.offsetLeft+c.offsetWidth/2;drops[i].p.setAttribute('d',`M${x} ${c.offsetTop+c.offsetHeight} V${y}`);drops[i].c.setAttribute('cx',x);drops[i].c.setAttribute('cy',y);});};
  layDrops();
  const bt=tap(st,s=>{const tr=track.getBoundingClientRect(),y=tr.top-s.top+busY();return hline(railX0()-s.left,y,s.width-2);});
  // ilk kutuda yarım ekran, son kutuda bir ekran boyu bekleme; çubuk bütün süre boyunca dolar
  const dist=()=>track.scrollWidth-innerWidth,HS=()=>innerHeight*.5,HE=()=>innerHeight;
  const pinST=ScrollTrigger.create({trigger:st,start:'top top',end:()=>'+='+(dist()+HS()+HE()),pin:true,anticipatePin:1,onRefresh:layDrops,
    onToggle:s=>{svcAct=s.isActive;},onUpdate:s=>gsap.set('#chBar',{scaleX:s.progress})});
  const hz2=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:st,start:()=>pinST.start+HS(),end:()=>pinST.start+HS()+dist(),scrub:SCRUB,invalidateOnRefresh:true,
    onUpdate:s=>{const n=Math.min(cards.length,1+Math.floor(s.progress*cards.length*.999));$('#chN').textContent='CH '+String(n).padStart(2,'0');skew(s.getVelocity());if(n<=5){setMini(n-1);liveI=n;}else liveI=6;}}});
  hz2.to(track,{x:()=>-dist(),duration:1},0);
  const qs=cards.map(c=>gsap.quickTo(c,'skewX',{duration:.7,ease:'power3'}));let lastSk=0,skOn=false;
  function skew(v){const k=gsap.utils.clamp(-5,5,-v/700);qs.forEach(q=>q(k));lastSk=performance.now();skOn=true;}
  gsap.ticker.add(()=>{if(skOn&&performance.now()-lastSk>140){skOn=false;qs.forEach(q=>q(0));}});
  life(sec,(tl,a,d)=>{tl.fromTo(track,{y:90,opacity:0},{y:0,opacity:1,duration:d,ease:'power2.out'},a);bt.inTl(tl,a,d*.9);},
          (tl,a,d)=>{tl.to(track,{y:-70,opacity:0,duration:d,ease:'power1.in'},a);bt.outTl(tl,a,d);},{s0:st.offsetTop/innerHeight*.75,eout:.4});
  cards.forEach((c,i)=>{
    const ps=$$('.sch .d',c),txt=$$('.front .top-r,.front h3,.front p,.front .tags span,.front .ch-f,.face>.hud,.face>h3,.face>p',c),dr=drops[i],bb=$$('.ctas .btn',c);
    life(c,(tl,a,d)=>{tl.fromTo(c,{rotationY:MOB?-18:-36,transformPerspective:1200,transformOrigin:'50% 50%',opacity:.15},{rotationY:0,opacity:1,duration:d,ease:'power2.out'},a)
        .fromTo(dr.p,{strokeDashoffset:1},{strokeDashoffset:0,duration:d*.5},a)
        .fromTo(dr.c,{scale:0,transformOrigin:'50% 50%'},{scale:1,duration:d*.3,ease:'back.out(3)'},a+d*.4);
      if(ps.length)tl.fromTo(ps,{drawSVG:'0%'},{drawSVG:'100%',duration:d*.7,stagger:{amount:d*.25},ease:'power1.inOut'},a+d*.1);
      tl.fromTo(txt,{opacity:0,y:24},{opacity:1,y:0,duration:d*.5,stagger:{amount:d*.35},ease:'power2.out'},a+d*.2);bb.forEach((b,k)=>fluoIn(tl,b,a+d*.15+k*d*.1,d*.7));},
      (tl,a,d)=>{if(ps.length)tl.to(ps,{drawSVG:'100% 100%',duration:d*.6,stagger:{amount:d*.2},ease:'power1.in'},a);
        bb.forEach((b,k)=>fluoOut(tl,b,a+k*d*.05,d*.5));tl.to(txt,{opacity:0,y:-20,duration:d*.5,stagger:{amount:d*.3},ease:'power1.in'},a)
        .to(c,{rotationY:MOB?14:28,opacity:.15,duration:d,ease:'power1.in'},a)
        .to(dr.p,{strokeDashoffset:-1,duration:d*.5},a+d*.5).to(dr.c,{scale:0,duration:d*.3},a+d*.6);},
      c.classList.contains('fin')?{ca:hz2,ein:.32,eout:.38,s0:0}:{ca:hz2,ein:.45,eout:.38,s0:.02});
    if(!FINE)ScrollTrigger.create({trigger:c,containerAnimation:hz2,start:'left 60%',end:'right 40%',toggleClass:'live',onToggle:s=>{if(s.isActive)liveI=+c.dataset.i;}});
  });
})();

/* ════════ SÜREÇ: devre ════════ */
(function(){
  const sec=$('#surec'),pin=$('#procPin'),steps=$('#steps'),lis=$$('li',steps),big=$('#pBig'),bl=$('#pBigL'),ok=$('#pOk'),pd=$('#pDesc'),L=['Arayın','Keşif','Net fiyat','İşçilik','Garanti'];
  const svg=sv('svg',{class:'cir','aria-hidden':'true'});steps.prepend(svg);
  let seg=[],flw=[],cmp=[],lever,halo,meterN;const X=MOB?40:46,XR=6;
  const cur={P:0,i:-1};
  function build(){
    svg.innerHTML='';seg=[];flw=[];cmp=[];
    const ys=lis.map(li=>{const h=li.querySelector('h4');return li.offsetTop+h.offsetTop+h.offsetHeight/2;});
    const T=ys[0]-46,B=ys[4]+46;
    const S0=[`M${XR} ${T} H${(XR+X)/2-5} M${(XR+X)/2+5} ${T} H${X} V${ys[0]-14}`,`M${X} ${ys[0]+14} V${ys[1]-13}`,`M${X} ${ys[1]+13} V${ys[2]-16}`,`M${X} ${ys[2]+16} V${ys[3]-16}`,`M${X} ${ys[3]+16} V${ys[4]-13}`,`M${X} ${ys[4]+13} V${B} H${XR} V${T}`];
    sv('path',{class:'wb',d:S0.join(' ')+` M${X} ${ys[0]-14} V${ys[0]+14} M${X} ${ys[1]-13} V${ys[1]+13} M${X} ${ys[2]-16} V${ys[2]+16} M${X} ${ys[3]-16} V${ys[3]+16} M${X} ${ys[4]-13} V${ys[4]+13}`},svg);
    halo=sv('circle',{class:'halo',cx:X,cy:ys[4],r:34},svg);
    S0.forEach(d=>{seg.push(sv('path',{class:'wd',d,pathLength:'1','stroke-dasharray':'1 1','stroke-dashoffset':'1'},svg));flw.push(sv('path',{class:'wf',d},svg));});
    const bx=(XR+X)/2;
    cmp.push(sv('path',{class:'cp',d:`M${bx-5} ${T-12} V${T+12} M${bx+5} ${T-7} V${T+7}`},svg));
    const g0=sv('g',{class:'cp'},svg);sv('circle',{cx:X,cy:ys[0]+14,r:2.5},g0);sv('circle',{cx:X,cy:ys[0]-14,r:2.5},g0);
    lever=sv('line',{class:'lever',x1:X,y1:ys[0]+14,x2:X,y2:ys[0]-14,style:`transform-origin:${X}px ${ys[0]+14}px;transform-box:view-box;transform:rotate(-38deg)`},g0);cmp.push(g0);
    const g1=sv('g',{class:'cp'},svg);sv('circle',{cx:X,cy:ys[1],r:13},g1);meterN=sv('line',{x1:X,y1:ys[1]+6,x2:X-7,y2:ys[1]-7,style:`transform-origin:${X}px ${ys[1]+6}px;transform-box:view-box`},g1);sv('text',{x:X+17,y:ys[1]+4},g1).textContent='V';cmp.push(g1);
    cmp.push(sv('path',{class:'cp',d:`M${X} ${ys[2]-16} l7 4 l-14 6 l14 6 l-14 6 l14 6 l-7 4`},svg));
    cmp.push(sv('path',{class:'cp',d:`M${X} ${ys[3]-16} a4 4 0 0 1 0 8 a4 4 0 0 1 0 8 a4 4 0 0 1 0 8 a4 4 0 0 1 0 8`},svg));
    const g4=sv('g',{class:'cp'},svg);sv('circle',{cx:X,cy:ys[4],r:13},g4);sv('path',{d:`M${X-9} ${ys[4]-9} L${X+9} ${ys[4]+9} M${X+9} ${ys[4]-9} L${X-9} ${ys[4]+9}`},g4);cmp.push(g4);
    render(cur.P);
  }
  function render(P){
    cur.P=P;
    seg.forEach((s,i)=>{const pr=i<5?clamp(0,1,(P-i)/.5):clamp(0,1,(P-5)/.7);s.style.strokeDashoffset=1-pr;flw[i].classList.toggle('on',pr>=1);});
    cmp.forEach((c,i)=>c.classList.toggle('on',i===0?P>.05:P>=(i-1)+.5));
    if(lever)lever.style.transform=`rotate(${P>=.5?0:-38}deg)`;
    if(meterN)meterN.style.transform=`rotate(${P>=1.5?62:0}deg)`;
    if(halo)gsap.set(halo,{opacity:P>=4.5?.25+.75*clamp(0,1,(P-5)/.7):0});
    ok.style.opacity=P>=5.7?1:0;
    const i=Math.min(4,Math.max(0,Math.floor(P)));
    lis.forEach((l,k)=>l.classList.toggle('on',k<=i));
    if(i!==cur.i){const dn=i>cur.i;const first=cur.i<0;cur.i=i;gsap.fromTo(pd,{opacity:0,y:dn?10:-10},{opacity:1,y:0,duration:.6,overwrite:true,onStart:()=>{pd.textContent=lis[i].querySelector('p').textContent;}});if(first){big.textContent='01';return;}
      gsap.to(big,{yPercent:dn?-100:100,opacity:0,duration:.4,ease:'power2.in',overwrite:true,onComplete:()=>{big.textContent=String(i+1).padStart(2,'0');bl.textContent=L[i];gsap.fromTo(big,{yPercent:dn?100:-100,opacity:0},{yPercent:0,opacity:1,duration:.9,ease:'expo.out'});}});}
  }
  build();
  const tp=tap(pin,s=>{const r=steps.getBoundingClientRect(),h=lis[0].querySelector('h4');const y=r.top-s.top+lis[0].offsetTop+h.offsetTop+h.offsetHeight/2-46;return hline(railX0()-s.left,y,r.left-s.left+XR);});
  const o={P:0};
  const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:pin,start:'top top',end:'+=380%',pin:true,scrub:SCRUB,onRefresh:()=>{build();tp.upd();}}});
  tl.to({},{duration:10},0);
  tp.inTl(tl,0,.8);
  tl.fromTo(o,{P:0},{P:6,duration:8.6,onUpdate:()=>render(o.P)},.8);
  const left=pin.firstElementChild;
  life(sec,(tl2,a,d)=>tl2.fromTo(left,{opacity:0,y:60,filter:'blur(8px)'},{opacity:1,y:0,filter:'blur(0px)',duration:d,ease:'power2.out'},a).fromTo(steps,{opacity:0,x:40},{opacity:1,x:0,duration:d,ease:'power2.out'},a+d*.15),
          (tl2,a,d)=>tl2.to(left,{opacity:0,y:-60,filter:'blur(8px)',duration:d,ease:'power1.in'},a).to(steps,{opacity:0,x:-30,duration:d,ease:'power1.in'},a),{ein:.5,eout:.4});
})();

/* ════════ ÖLÇÜM ════════ */
(function(){
  const sec=$('#olcum');
  autoFx(sec.querySelector('.sh'));autoFx(sec.querySelector('.wrap'));
  const g=$('#gauge'),o={v:0},gV=$('#gV'),n=$('#ndl');
  const set=()=>{n.style.transform=`rotate(${-90+o.v/250*180+Math.sin(o.v*.2)*.6}deg)`;gV.textContent=Math.round(o.v)+' V';};
  const tp=tap(sec,s=>{const t=$('#gT1').getBoundingClientRect();return {d:`M${railX0()-s.left} ${t.top-s.top+70} H${t.left-s.left-30} C${t.left-s.left+t.width/2} ${t.top-s.top+70} ${t.left-s.left+t.width/2} ${t.top-s.top+40} ${t.left-s.left+t.width/2} ${t.bottom-s.top}`,x1:railX0()-s.left,y1:t.top-s.top+70,x2:t.left-s.left+t.width/2,y2:t.bottom-s.top};});
  life(g,(tl,a,d)=>{tl.fromTo(g,{opacity:0,scale:.9,y:60,transformOrigin:'50% 80%'},{opacity:1,scale:1,y:0,duration:d*.8,ease:'power2.out'},a);tp.inTl(tl,a,d*.6);},
    (tl,a,d)=>{tl.to(g,{opacity:0,scale:.92,y:-50,duration:d*.6,ease:'power1.in'},a+d*.4);tp.outTl(tl,a,d*.7);});
  // ibre: voltmetre ekrana tam girdiğinde 0, ekranın tepesine vardığında 230
  gsap.fromTo(o,{v:0},{v:230,ease:'power1.inOut',onUpdate:set,scrollTrigger:{trigger:g,start:'bottom bottom',end:'top top',scrub:SCRUB}});
  const stats=$$('.stat'),bs=stats.map(s=>s.querySelector('b'));
  const put=(b,v)=>{if('dec' in b.dataset){b.textContent=v.toFixed(1).replace('.',',');return;}const k='k' in b.dataset,pre=b.dataset.pre||'',suf=b.dataset.suf||'';v=Math.round(v);b.textContent=pre+(k&&v>=1000?Math.floor(v/1000)+'K':v)+suf;};
  const cs=bs.map(b=>({n:0,b}));
  life($('#stats'),(tl,a,d)=>{tl.fromTo(stats,{opacity:0,y:70,rotationX:-50,transformPerspective:900,transformOrigin:'50% 0%'},{opacity:1,y:0,rotationX:0,duration:d*.6,stagger:{amount:d*.35},ease:'power2.out'},a);
      cs.forEach((c,i)=>{tl.fromTo(c,{n:0},{n:()=>+c.b.dataset.to,duration:d*.55,ease:'power2.out',onUpdate:()=>put(c.b,c.n)},a+d*.1+i*d*.08);});},
    (tl,a,d)=>{tl.to(stats,{opacity:0,y:-60,rotationX:50,transformOrigin:'50% 100%',duration:d*.6,stagger:{amount:d*.35,from:'end'},ease:'power1.in'},a);
      cs.forEach((c,i)=>{tl.to(c,{n:0,duration:d*.5,ease:'power1.in',onUpdate:()=>put(c.b,c.n),immediateRender:false},a+(3-i)*d*.08);});});
})();

/* ════════ YORUMLAR ════════ */
(function(){
  const sec=$('#yorumlar'),box=$('#yorumKutu');
  autoFx(sec.querySelector('.sh'));
  const f=FX.clip(box);life(box,f.enter,f.exit);
  // site.js yorumları çizince: puanı ölçüme yaz, sayfayı yeniden ölç
  let rt;new MutationObserver(()=>{const pu=box.querySelector('.gt-yorum-puan');if(pu){const v=parseFloat(pu.textContent.replace(',','.'));if(v>0)$('#gPuan').dataset.to=v;}
    clearTimeout(rt);rt=setTimeout(()=>ScrollTrigger.refresh(),250);}).observe(box,{childList:true});
})();

/* ════════ BÖLGELER: radar ortada, şimşek ════════ */
(function(){
  const sec=$('#bolgeler'),map=$('#map'),lis=$$('#zlist li');
  autoFx(sec.querySelector('.sh'));autoFx(sec.querySelector('.wrap>div'));
  const nodes=$$('.node',map),bolt=$('#mBolt'),wire=$('#mWire'),sweep=$('#mSweep');
  const pt=(x,y)=>{const m=map.getScreenCTM();if(!m)return {x:0,y:0};const p=map.createSVGPoint();p.x=x;p.y=y;return p.matrixTransform(m);};
  const tp=tap(sec,s=>{const a=pt(-30,150);return hline(railX0()-s.left,a.y-s.top,a.x-s.left);});
  life(map,(tl,a,d)=>{tp.inTl(tl,a,d*.5);
      tl.fromTo('#mSea',{opacity:0},{opacity:1,duration:d*.5},a).fromTo('#mCoast,#mLake,.map .riv,.map .road',{drawSVG:'0%'},{drawSVG:'100%',duration:d*.7,stagger:{amount:d*.2},ease:'power1.inOut'},a)
        .fromTo('#mRadar',{scale:.2,opacity:0,transformOrigin:`${MC[0]}px ${MC[1]}px`},{scale:1,opacity:1,duration:d*.6,ease:'expo.out'},a+d*.2)
        .fromTo(wire,{strokeDashoffset:1,strokeDasharray:'1 1'},{strokeDashoffset:0,duration:d*.4},a+d*.45)
        .fromTo(nodes,{scale:0,transformOrigin:'50% 50%'},{scale:1,duration:d*.3,stagger:{amount:d*.25},ease:'back.out(2.5)'},a+d*.5)
        .fromTo('.map .lbl',{opacity:0},{opacity:1,duration:d*.3},a+d*.6);},
    (tl,a,d)=>{tl.to(nodes,{scale:0,duration:d*.3,stagger:{amount:d*.2,from:'end'},immediateRender:false},a).to(wire,{strokeDashoffset:-1,duration:d*.4,immediateRender:false},a)
        .to('#mRadar',{scale:.2,opacity:0,duration:d*.5,immediateRender:false},a+d*.2).to('#mCoast,#mLake,.map .riv,.map .road',{drawSVG:'100% 100%',duration:d*.6,immediateRender:false},a+d*.3).to('#mSea,.map .lbl',{opacity:0,duration:d*.4,immediateRender:false},a+d*.5);tp.outTl(tl,a,d*.6);});
  life($('#zlist'),(tl,a,d)=>{tl.fromTo(lis,{opacity:0,x:60,clipPath:'inset(0% 100% 0% 0%)'},{opacity:1,x:0,clipPath:'inset(0% 0% 0% 0%)',duration:d*.6,stagger:{amount:d*.35},ease:'power2.out'},a);},
    (tl,a,d)=>{tl.to(lis,{opacity:0,x:-40,clipPath:'inset(0% 0% 0% 100%)',duration:d*.6,stagger:{amount:d*.35,from:'end'},ease:'power1.in'},a);});
  const on=i=>lis.forEach(l=>l.classList.toggle('on',+l.dataset.z===i));
  function strike(i){const [,x2,y2]=ZN[i],[x1,y1]=MC,n=9;let d=`M${x1} ${y1}`;for(let k=1;k<n;k++){const t=k/n,px=-(y2-y1),py=x2-x1,l=Math.hypot(px,py)||1,j=(Math.random()-.5)*24;d+=` L${(x1+(x2-x1)*t+px/l*j).toFixed(1)} ${(y1+(y2-y1)*t+py/l*j).toFixed(1)}`;}d+=` L${x2} ${y2}`;
    bolt.setAttribute('d',d);gsap.timeline().set(bolt,{opacity:1,strokeDasharray:'1 1',strokeDashoffset:1}).to(bolt,{strokeDashoffset:0,duration:.18,ease:'power2.in'}).to(bolt,{opacity:0,duration:.6,ease:'power2.out'},'+=.08');
    gsap.fromTo(nodes[i].querySelector('.p'),{scale:.4,opacity:.9},{scale:6,opacity:0,duration:1.2,ease:'power2.out',delay:.18});S.zap();}
  nodes.forEach(n=>['mouseenter','focus','click'].forEach(e=>n.addEventListener(e,()=>{on(+n.dataset.z);strike(+n.dataset.z);})));
  lis.forEach(l=>l.addEventListener('mouseenter',()=>{on(+l.dataset.z);strike(+l.dataset.z);}));
  let act=false,ang=0;const ANG=ZN.map(z=>Math.atan2(z[2]-MC[1],z[1]-MC[0]));
  ScrollTrigger.create({trigger:map,start:'top bottom',end:'bottom top',onToggle:s=>act=s.isActive});
  gsap.ticker.add((t,dt)=>{if(!act||FD.off)return;const prev=ang;ang+=dt*.0014;sweep.setAttribute('transform',`rotate(${(ang*180/Math.PI)%360} ${MC[0]} ${MC[1]})`);
    const norm=a=>((a%(Math.PI*2))+Math.PI*2)%(Math.PI*2);ANG.forEach((a,i)=>{const pa=norm(prev-.3),na=norm(ang-.3),ta=norm(a);if(pa<=na?ta>pa&&ta<=na:(ta>pa||ta<=na)){strike(i);on(i);}});});
})();

/* ════════ TEKLİF FORMU ════════ */
(function(){
  const sec=$('#teklif'),fis=$('#fis');
  autoFx(sec.querySelector('.sh'));
  const f=FX.clip(fis);
  life(fis,(tl,a,d)=>{f.enter(tl,a,d*.7);fluoIn(tl,fis.querySelector('[data-gt-gonder]'),a+d*.4,d*.6);},f.exit);
})();

/* ════════ ARIZA KAYDININ YANINDAKİ ANAHTAR ════════ */
(function(){
  const sec=$('#teklif'),sw=$('#sw1b'),parts=$$('svg .pl,svg .sc,svg .rk path',sw);
  const tp=tap(sec,s=>{const r=sw.querySelector('svg').getBoundingClientRect();return hline(railX0()-s.left,r.top-s.top+r.height/2,r.left-s.left+4);});
  life(sw,(tl,a,d)=>{tp.inTl(tl,a,d*.6);tl.fromTo(parts,{drawSVG:'0%',fillOpacity:0},{drawSVG:'100%',duration:d*.6,stagger:{amount:d*.2}},a+d*.2).to(parts,{fillOpacity:1,duration:d*.2},a+d*.75).fromTo(sw.querySelector('small'),{opacity:0,y:12},{opacity:1,y:0,duration:d*.3},a+d*.7).fromTo(sw.querySelector('.led'),{opacity:0},{opacity:1,duration:d*.1},a+d*.85);},
    (tl,a,d)=>{tl.to(parts,{fillOpacity:0,drawSVG:'100% 100%',duration:d*.6,immediateRender:false},a+d*.2).to(sw.querySelector('small'),{opacity:0,duration:d*.3,immediateRender:false},a).to(sw.querySelector('.led'),{opacity:0,duration:d*.1,immediateRender:false},a);tp.outTl(tl,a,d*.7);});
})();

/* ════════ MANİFESTO: akım satırların üzerinden geçer ════════ */
(function(){
  const sec=$('#maniSec'),p=$('#mani'),sp=$('#spark'),hud=sec.querySelector('.hud');
  const split=new SplitText(p,{type:'lines,words',linesClass:'ml',wordsClass:'w'});
  const lines=split.lines,lw=lines.map(l=>$$('.w',l));
  const gzW=$$('.gz .w',p),okW=$('.ok .w',p)||$('.ok',p);
  const hudF=scrambler(hud);hudF(0);
  let geo=[];
  const measure=()=>{geo=lines.map((l,i)=>{const r=rel(l,sec);return {x0:r.x,x1:r.x+Math.max(...lw[i].map(w=>rel(w,sec).r))-r.x,y:r.y+r.h*.55,ws:lw[i].map(w=>{const q=rel(w,sec);return [q.x,q.w];})};});};
  const tp=tap(sec,()=>{measure();const g=geo[0];return g?hline(railX0()-sec.getBoundingClientRect().left,g.y,g.x0-6):null;});
  const DIM='rgba(230,242,232,0.12)',LIT='rgba(230,242,232,1)',GREY='rgba(110,124,116,1)';
  const ip=gsap.utils.interpolate(DIM,LIT);
  const kwC=w=>{const k=w.closest('.kw');return k?k.dataset.c:null;};
  const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:sec,start:'top top',end:'+=170%',pin:true,scrub:SCRUB,onRefresh:measure}});
  tl.to({},{duration:10},0);
  tl.to({p:0},{p:1,duration:.8,onUpdate(){hudF(this.targets()[0].p);}},0);
  tp.inTl(tl,.3,.9);
  const L=lines.length,span=6/L;
  lines.forEach((l,i)=>{
    const o={x:0};const a=1.2+i*span;
    tl.fromTo(o,{x:0},{x:1,duration:span*.92,onUpdate:()=>{const g=geo[i];if(!g)return;const sx=g.x0+(g.x1-g.x0+20)*o.x;
      gsap.set(sp,{x:sx,y:g.y,opacity:o.x>0&&o.x<1?1:0});
      lw[i].forEach((w,k)=>{const [wx,ww]=g.ws[k];const lit=clamp(0,1,(sx-wx)/Math.max(ww,1));const c=kwC(w);
        if(c){w.style.color=gsap.utils.interpolate(DIM,c,lit);w.style.textShadow=lit>0?`0 0 ${(lit*22).toFixed(1)}px ${c}`:'';}else w.style.color=ip(lit);});}},a);
  });
  // "görünmez:" yanar, lamba gibi pır pır eder ve griye döner
  const lineOf=w=>lines.findIndex(l=>l.contains(w));
  const FL=[1,.1,.85,.05,.6,.15,.4,0];
  gzW.forEach(w=>{const li=lineOf(w),o={t:0};tl.fromTo(o,{t:0},{t:1,duration:.9,immediateRender:false,onUpdate:()=>{if(o.t<=0){w.style.textShadow='';return;}const I=samp(FL,o.t);w.style.color=gsap.utils.interpolate(GREY,LIT,I*(1-o.t*.6));w.style.textShadow=I>.3?`0 0 ${(I*18).toFixed(1)}px rgba(230,242,232,.6)`:'';}},1.2+(li+1)*span+.15);});
  // "çalışır." ampul gibi yanar; kontrol kalemi yaklaşınca daha da parlar
  const okI=[0,1,.15,1,.85],okO={t:0},yel=gsap.utils.interpolate(LIT,'rgba(233,255,59,1)');
  const okLine=lineOf(okW);
  tl.fromTo(okO,{t:0},{t:1,duration:.9,immediateRender:false,onUpdate:()=>{const I=samp(okI,okO.t);if(okO.t<=0){okW.style.textShadow='';return;}okW.style.color=yel(Math.min(1,okO.t*3)*(.4+.6*I));okW.style.textShadow=`0 0 calc(${(I*46).toFixed(1)}px + var(--n,0)*40px) rgba(233,255,59,${(I*.95).toFixed(2)})`;}},1.2+(okLine+1)*span-.1);
  tl.to(lines,{yPercent:-60,opacity:0,filter:'blur(8px)',duration:1.2,stagger:.15,ease:'power1.in'},8.5).to({p:1},{p:0,duration:.8,onUpdate(){hudF(this.targets()[0].p);}},8.6);
  tp.outTl(tl,8.4,1.2);
  if(FINE){const ws=split.words;let raf=0,ex=0,ey=0;
    sec.addEventListener('pointermove',e=>{ex=e.clientX;ey=e.clientY;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;ws.forEach(w=>{const r=w.getBoundingClientRect(),d=Math.hypot(ex-(r.left+r.width/2),ey-(r.top+r.height/2)),n=clamp(0,1,1-d/170);w.style.setProperty('--n',n.toFixed(2));});});});
    sec.addEventListener('pointerleave',()=>{ws.forEach(w=>w.style.setProperty('--n',0));});}
})();

/* ════════ ŞERİT ════════ */
(function(){
  const rows=[[$('#mqA'),-1],[$('#mqB'),1]],st=rows.map(()=>({x:0,s:0}));
  gsap.ticker.add(()=>{if(FD.off)return;const v=vel();rows.forEach(([el,dir],i)=>{const half=el.scrollWidth/2;st[i].x+=dir*(1.1+Math.abs(v)*.35)*(v<0?-1:1);if(st[i].x<=-half)st[i].x+=half;if(st[i].x>0)st[i].x-=half;st[i].s+=(gsap.utils.clamp(-12,12,-v*.5)-st[i].s)*.1;el.style.transform=`translate3d(${st[i].x}px,0,0) skewX(${st[i].s.toFixed(2)}deg)`;});});
  const mq=$('#mq');
  life(mq,(tl,a,d)=>tl.fromTo(mq,{clipPath:'inset(50% 0% 50% 0%)',filter:'brightness(3)'},{clipPath:'inset(0% 0% 0% 0%)',filter:'brightness(1)',duration:d,ease:'expo.out'},a),
          (tl,a,d)=>tl.to(mq,{clipPath:'inset(50% 0% 50% 0%)',filter:'brightness(3)',duration:d,ease:'expo.in'},a));
})();

/* ════════ SSS ════════ */
(function(){
  const sec=$('#sss');autoFx(sec);
  $$('#faqList details').forEach(d=>{const f=FX.clip(d);life(d,f.enter,f.exit);});
})();

/* ════════ GEÇİŞ: kablo mürekkebe döner ════════ */
(function(){
  const sec=$('#shift'),h=$('#shiftT'),sub=$('#shiftS'),wv=$('#wave');
  const sp=new SplitText(h,{type:'words,chars',charsClass:'sc',wordsClass:'sw'});const chs=sp.chars.filter(c=>!sub.contains(c));
  const subF=scrambler(sub);subF(0);
  const o={draw:0,a:46,f:7,p:0,mix:0,w:2.5};
  const draw=()=>{const W2=innerWidth,H=innerHeight,y0=H*.74,x0=railX0(),x1=x0+(W2+20-x0)*o.draw;let d=`M${x0} ${y0}`;
    for(let x=x0;x<=x1;x+=6){const env=Math.sin(clamp(0,1,(x-x0)/(W2-x0))*Math.PI);d+=` L${x.toFixed(0)} ${(y0-Math.sin((x-x0)/(W2-x0)*Math.PI*o.f+o.p)*o.a*env).toFixed(1)}`;}
    wv.setAttribute('d',d);const c=gsap.utils.interpolate('#E9FF3B','#E0541A',o.mix);wv.style.stroke=o.mix>.98?'#14151A':c;wv.style.strokeWidth=o.w;wv.style.filter=`drop-shadow(0 0 ${(7*(1-o.mix)).toFixed(1)}px ${c})`;};
  let vis=false;ScrollTrigger.create({trigger:sec,start:'top bottom',end:'bottom top',onToggle:s=>vis=s.isActive});
  gsap.ticker.add(()=>{if(!vis||FD.off)return;o.p+=.035*(1-o.mix*.8);draw();});
  const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:sec,start:'top bottom',end:'bottom bottom',scrub:SCRUB}});
  tl.to({},{duration:1},0)
    .fromTo(chs,{opacity:0,yPercent:60,filter:'blur(10px)'},{opacity:1,yPercent:0,filter:'blur(0px)',duration:.2,stagger:{amount:.12},ease:'power2.out'},.12)
    .to({p:0},{p:1,duration:.15,onUpdate(){subF(this.targets()[0].p);}},.3)
    .to(o,{draw:1,duration:.28,ease:'power2.inOut'},.08)
    .to(o,{a:0,f:2,mix:1,w:1.4,duration:.5,ease:'power1.inOut'},.38)
    .to(h,{color:'#14151A',duration:.3},.42).to(sub,{color:'#4A4536',duration:.3},.42)
    .to(rail,{x:()=>railEnd()-railX0(),duration:.35,ease:'power2.inOut'},.62)
    .to('#railTip',{opacity:0,duration:.1},.6);
})();

/* ════════ DEFTER ════════ */
(function(){
  const pages=$$('.page',stage),flapP=$('#flapP'),shade=$('#shade'),crease=$('#crease'),flapSvg=$('#flap'),blot=$('#blot'),nib=$('#nib'),stack=$('#stack'),well=$('#inkwell'),lv=$('#inkLv'),rp=$('#inkRp');
  const writer=FINE?blot:nib;
  let SW=1,SH2=1;
  const rs=()=>{SW=pages[0].offsetWidth;SH2=pages[0].offsetHeight;flapSvg.setAttribute('viewBox',`0 0 ${stage.clientWidth} ${stage.clientHeight}`);};rs();addEventListener('resize',rs);
  const setStack=n=>{let s=[];for(let i=1;i<=n;i++)s.push(`${i}px ${(i*.8).toFixed(1)}px 0 ${i%2?'#E2CC98':'#b99d62'}`);stack.style.boxShadow=s.join(',');};
  const ENT=pages.map(pg=>$$('.ent',pg).map(en=>{const sp=new SplitText(en.querySelectorAll('.date,h3,p'),{type:'words,chars',charsClass:'c'});return {en,chars:sp.chars,k:0,draws:$$('.fig .ink',en),txt:$$('.fig text',en)};}));
  const DDs=pages.map(pg=>$$('.dd',pg)),BL=pages.map(pg=>$$('.blt',pg));
  ENT.flat().forEach(e=>{gsap.set(e.draws,{drawSVG:'0%'});gsap.set(e.txt,{opacity:0});});
  DDs.flat().forEach(d=>{if(d.classList.contains('tx'))gsap.set(d,{clipPath:'inset(0% 100% 0% 0%)'});else gsap.set($$('.ink',d),{drawSVG:'0%'});});
  const wr={x:0,y:0,tx:0,ty:0,o:0,to:0};
  gsap.ticker.add(()=>{wr.x+=(wr.tx-wr.x)*.4;wr.y+=(wr.ty-wr.y)*.4;wr.o+=(wr.to-wr.o)*.25;writer.style.transform=`translate(${wr.x.toFixed(1)}px,${wr.y.toFixed(1)}px)`;writer.style.opacity=wr.o.toFixed(2);});
  const sr=()=>stage.getBoundingClientRect();
  const charPos=(e,idx)=>{const c=e.chars[clamp(0,e.chars.length-1,idx)],r=c.getBoundingClientRect(),s=sr();return [r.right-s.left,r.bottom-s.top-r.height*.25];};
  const wellPos=()=>{const r=well.getBoundingClientRect(),s=sr();return [r.left-s.left+r.width/2,r.top-s.top+r.height*.18];};
  function write(e,v){
    const n=e.chars.length,k=v*n,lo=Math.max(0,Math.floor(Math.min(e.k,k))-3),hi=Math.min(n,Math.ceil(Math.max(e.k,k))+3);
    for(let i=lo;i<hi;i++){const o=clamp(0,1,k-i),c=e.chars[i];c.style.opacity=o;c.style.transform=o<1?`translateY(${((1-o)*5).toFixed(1)}px) scale(${(.85+o*.15).toFixed(3)})`:'';c.style.filter=o>0&&o<1?`blur(${((1-o)*1.2).toFixed(2)}px)`:'';}
    e.k=k;
    if(v>0&&v<1){const [x,y]=charPos(e,Math.floor(k));wr.tx=x;wr.ty=y;wr.to=1;}else wr.to=0;
  }
  function dip(e,prev,d){
    if(d<=0||d>=1){if(d>=1){const [x,y]=charPos(e,0);wr.tx=x;wr.ty=y;}return;}
    wr.to=1;const [wx,wy]=wellPos();let a,b,t;
    if(d<.5){a=prev?charPos(prev,prev.chars.length-1):[wx+80,wy-160];b=[wx,wy];t=d/.5;}else{a=[wx,wy];b=charPos(e,0);t=(d-.5)/.5;}
    const et=t*t*(3-2*t);wr.tx=a[0]+(b[0]-a[0])*et;wr.ty=a[1]+(b[1]-a[1])*et-Math.sin(et*Math.PI)*60;
  }
  const side=(A,B,p)=>(B[0]-A[0])*(p[1]-A[1])-(B[1]-A[1])*(p[0]-A[0]);
  function clipPoly(poly,A,B,sg){const out=[];for(let i=0;i<poly.length;i++){const P1=poly[i],P2=poly[(i+1)%poly.length],s1=side(A,B,P1)*sg,s2=side(A,B,P2)*sg;if(s1>=0)out.push(P1);if((s1>=0)!==(s2>=0)){const t=s1/(s1-s2);out.push([P1[0]+(P2[0]-P1[0])*t,P1[1]+(P2[1]-P1[1])*t]);}}return out;}
  function refl(p,A,B){const dx=B[0]-A[0],dy=B[1]-A[1],l2=dx*dx+dy*dy,t=((p[0]-A[0])*dx+(p[1]-A[1])*dy)/l2,fx=A[0]+t*dx,fy=A[1]+t*dy;return [2*fx-p[0],2*fy-p[1]];}
  const str=pts=>pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const clear=()=>{flapP.setAttribute('points','');shade.setAttribute('points','');['x1','y1','x2','y2'].forEach(a=>crease.setAttribute(a,0));};
  let swished=[];
  function turn(i,s){
    const pg=pages[i];setStack(3*(pages.length-i)+3-Math.round(3*s));
    if(s>.06&&!swished[i]){swished[i]=1;S.swish();}if(s<.02)swished[i]=0;
    if(s<=.001){pg.style.clipPath='';pg.style.visibility='';clear();return;}
    if(s>=.999){if(pg.style.visibility!=='hidden')hz(12);pg.style.visibility='hidden';clear();return;}
    pg.style.visibility='';
    const k=2.15*s,A=[SW-k*SW,SH2],B=[SW,SH2-k*SH2*.82];
    const rect=[[0,0],[SW,0],[SW,SH2],[0,SH2]],cs=Math.sign(side(A,B,[SW,SH2]));
    const keep=clipPoly(rect,A,B,-cs),cut=clipPoly(rect,A,B,cs);
    pg.style.clipPath=keep.length>2?`polygon(${keep.map(p=>p[0].toFixed(1)+'px '+p[1].toFixed(1)+'px').join(',')})`:'polygon(0 0,0 0,0 0)';
    flapP.setAttribute('points',str(cut.map(p=>refl(p,A,B))));
    const dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy)||1,nx=-dy/L*cs,ny=dx/L*cs,w=30+40*Math.sin(s*Math.PI);
    shade.setAttribute('points',str([[A[0]-dx,A[1]-dy],[B[0]+dx,B[1]+dy],[B[0]+dx-nx*w,B[1]+dy-ny*w],[A[0]-dx-nx*w,A[1]-dy-ny*w]]));
    crease.setAttribute('x1',A[0]);crease.setAttribute('y1',A[1]);crease.setAttribute('x2',B[0]);crease.setAttribute('y2',B[1]);
  }
  setStack(3*pages.length+3);
  const tl=gsap.timeline({defaults:{ease:'none'}});
  let pos=0,inkUsed=0;const UNIT=MOB?3.4:3.6,TOT=ENT.flat().reduce((a,e)=>a+e.chars.length,0);
  ENT.forEach((ents,i)=>{
    const pStart=pos;
    ents.forEach((e,j)=>{
      const prev=j?ents[j-1]:(i?ENT[i-1][ENT[i-1].length-1]:null),dd={d:0};
      tl.to(dd,{d:1,duration:240,onUpdate:()=>dip(e,prev,dd.d)},pos);
      tl.fromTo(rp,{attr:{r:2},opacity:.9},{attr:{r:10},opacity:0,duration:140,immediateRender:false},pos+110);
      const lvl0=22*(1-inkUsed/TOT*.6),lvl1=22*(1-(inkUsed+e.chars.length)/TOT*.6);inkUsed+=e.chars.length;
      pos+=240;
      const wlen=Math.max(520,e.chars.length*UNIT),o={v:0};
      tl.to(o,{v:1,duration:wlen,onUpdate:()=>write(e,o.v),onStart:()=>{$('#bkN').textContent=`Sayfa ${i+1} / ${pages.length}`;},onReverseComplete:()=>write(e,0)},pos);
      tl.fromTo(lv,{attr:{y:52-lvl0,height:lvl0}},{attr:{y:52-lvl1,height:lvl1},duration:wlen,immediateRender:false},pos);
      tl.to(e.draws,{drawSVG:'100%',duration:wlen*.85,stagger:wlen*.5/Math.max(1,e.draws.length),ease:'power1.inOut'},pos+wlen*.1);
      tl.to(e.txt,{opacity:1,duration:wlen*.2},pos+wlen*.78);
      pos+=wlen+80;
    });
    DDs[i].forEach((d,k)=>{if(d.classList.contains('tx'))tl.to(d,{clipPath:'inset(0% 0% 0% 0%)',duration:220,ease:'power1.inOut'},pos+k*90);else tl.to($$('.ink',d),{drawSVG:'100%',duration:220,stagger:40,ease:'power1.inOut'},pos+k*90);});
    BL[i].forEach(b=>{tl.fromTo(b,{scale:0,opacity:0},{scale:+b.dataset.s,opacity:.9,duration:90,ease:'back.out(2)'},pStart+(pos-pStart)*+b.dataset.at);});
    pos+=DDs[i].length*90+260;
    if(i<pages.length-1){const t={s:0};tl.to(t,{s:1,duration:900,ease:'power1.inOut',onUpdate:()=>turn(i,t.s),onStart:()=>{$('#bkN').textContent=`Sayfa ${i+2} / ${pages.length}`;},onReverseComplete:()=>{turn(i,0);$('#bkN').textContent=`Sayfa ${i+1} / ${pages.length}`;}},pos);pos+=1000;}
  });
  tl.to({},{duration:300});
  ScrollTrigger.create({trigger:'#defter',start:'top top',end:()=>'+='+Math.round(tl.duration()*(MOB?.92:1)),pin:'#bookStage',scrub:SCRUB,animation:tl,anticipatePin:1,
    onUpdate:s=>gsap.set('#bkBar',{scaleX:s.progress}),onToggle:s=>{top.classList.toggle('book',s.isActive);rail.classList.toggle('hide',s.isActive);}});
})();

/* ════════ KAPANIŞ, NOTLAR, ALT BİLGİ (sayfanın sonu: çıkış yok) ════════ */
(function(){
  const sec=$('#son');autoFx(sec,{noExit:true});
  const es=new SplitText('#endH',{type:'words',mask:'words',wordsClass:'wd'});
  life($('#endH'),(tl,a,d)=>tl.fromTo(es.words,{yPercent:115},{yPercent:0,duration:d*.6,stagger:{amount:d*.4},ease:'power2.out'},a),null);
  const nf=scrambler($('#endNum'));nf(0);
  life($('#endNum'),(tl,a,d)=>{const o={p:0};tl.to(o,{p:1,duration:d,onUpdate:()=>nf(o.p)},a);},null);
  fluoLife($$('#endCta .btn'),$('#endCta'),{noExit:true});
  const sw=$('#bigSw'),parts=$$('svg .pl,svg .sc,svg .rk path',sw);
  const tp=tap(sec,s=>{const r=sw.querySelector('svg').getBoundingClientRect();const y=r.top-s.top+r.height/2;return hline(railEnd()-s.left,y,r.left-s.left+4);},{ink:true});
  life(sw,(tl,a,d)=>{tp.inTl(tl,a,d*.6);tl.fromTo(parts,{drawSVG:'0%',fillOpacity:0},{drawSVG:'100%',duration:d*.6,stagger:{amount:d*.2}},a+d*.2).to(parts,{fillOpacity:1,duration:d*.2},a+d*.75).fromTo(sw.querySelector('small'),{opacity:0,y:12},{opacity:1,y:0,duration:d*.3},a+d*.7);},null);
  $$('#notlar details').forEach(d=>{const f=FX.clip(d);life(d,f.enter,null,{ein:.3});});
  life($('#foot'),(tl,a,d)=>tl.fromTo('#foot',{opacity:0,y:20},{opacity:1,y:0,duration:d,ease:'power2.out'},a),null,{ein:.12,s0:0});
})();

/* ════════ GENEL ════════ */
ScrollTrigger.create({start:60,end:'max',onUpdate:s=>top.classList.toggle('solid',s.scroll()>60)});
ScrollTrigger.create({trigger:'#bas',start:'bottom 70px',onEnter:()=>top.classList.add('min'),onLeaveBack:()=>top.classList.remove('min')});
ScrollTrigger.create({trigger:'#surec',start:'top 70%',endTrigger:'#olcum',end:'top 55%',onToggle:s=>dock(s.isActive)});
const paper=v=>{R.classList.toggle('paper-on',v);top.classList.toggle('paper',v);rail.classList.toggle('cu',v);};
ScrollTrigger.create({trigger:'#shift',start:'64% top',onEnter:()=>paper(true),onLeaveBack:()=>paper(false)});
const rf=$('#railFill'),rfl=$('#railFlow'),rtip=$('#railTip');
ScrollTrigger.create({start:0,end:'max',onUpdate:s=>{const p=s.progress;rf.style.transform=rfl.style.transform=`scaleY(${p.toFixed(4)})`;rtip.style.transform=`translateY(${(p*innerHeight).toFixed(1)}px)`;}});
['#maniSec','#hizmetler','#mq','#surec','#olcum','#yorumlar','#bolgeler','#teklif','#sss'].forEach(s=>ScrollTrigger.create({trigger:s,start:'top 55%',end:'bottom 45%',onEnter:flash,onEnterBack:flash}));
const remeasure=()=>{if(titleSplit)fitTitle();pills.forEach(pill);ScrollTrigger.refresh();taps.forEach(t=>t.upd());};
remeasure();
addEventListener('load',remeasure);
let rz;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{if(titleSplit)fitTitle();pills.forEach(pill);taps.forEach(t=>t.upd());},200);});
ScrollTrigger.addEventListener('refresh',()=>taps.forEach(t=>t.upd()));
}
})();
