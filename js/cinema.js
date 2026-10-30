(()=>{const S=[...document.querySelectorAll('.s')],P=document.querySelector('#prog i'),N=document.getElementById('num'),B=document.getElementById('snd');
let i=0,sound=false,lock=0;
const vid=s=>s.querySelector('video');
function go(n,dir){n=Math.max(0,Math.min(S.length-1,n));if(n===i&&S[i].classList.contains('on'))return;
 const old=S[i];old.classList.remove('on','wipe','wipeb');const ov=vid(old);if(ov)ov.pause();
 i=n;const s=S[i];const isV=!!s.querySelector('video.bg:not([data-loop])');
 if(isV||dir===undefined){}else if(i%3===0)s.classList.add(dir>0?'wipe':'wipeb');
 s.classList.add('on');const v=vid(s);
 if(v){v.muted=!sound;if(!v.hasAttribute('data-loop'))v.currentTime=0;const p=v.play();if(p)p.catch(()=>{v.muted=true;v.play().catch(()=>{})});}
 B.classList.toggle('show',!!v);B.textContent=sound?'🔊 SONIDO':'🔇 SONIDO';
 const nx=S[i+1]&&vid(S[i+1]);if(nx)nx.preload='auto';
 P.style.width=((i+1)/S.length*100)+'%';N.textContent=String(i+1).padStart(2,'0')+' / '+S.length+' · '+(s.dataset.title||'');
 history.replaceState(null,'','#'+(i+1));}
const step=d=>{const t=Date.now();if(t-lock<450)return;lock=t;go(i+d,d)};
addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();step(1)}
 else if(['ArrowLeft','ArrowUp','PageUp','Backspace'].includes(e.key)){e.preventDefault();step(-1)}
 else if(e.key==='Home')go(0,-1);else if(e.key==='End')go(S.length-1,1);else if(e.key==='m')B.click();});
document.getElementById('next').onclick=()=>step(1);document.getElementById('prev').onclick=()=>step(-1);
B.onclick=()=>{sound=!sound;const v=vid(S[i]);if(v){v.muted=!sound;v.play().catch(()=>{})}B.textContent=sound?'🔊 SONIDO':'🔇 SONIDO'};
let x0=null,y0=null;addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;
 if(Math.max(Math.abs(dx),Math.abs(dy))>45)step((Math.abs(dx)>Math.abs(dy)?-dx:-dy)>0?1:-1);x0=null},{passive:true});
let wt=0;addEventListener('wheel',e=>{const t=Date.now();if(t-wt<900||Math.abs(e.deltaY)<25)return;wt=t;step(e.deltaY>0?1:-1)},{passive:true});
S.forEach(s=>{const v=vid(s);if(v&&!v.hasAttribute('data-loop'))v.addEventListener('ended',()=>{})});
const h=parseInt(location.hash.slice(1));i=h>0&&h<=S.length?h-1:0;go(i);})();
