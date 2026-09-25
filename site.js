'use strict';
let product='live',latest={},position='bottom-left',background='#111111';
const preview=document.getElementById('preview'),stage=document.getElementById('stage');
function makeHTML(type,state){const r=SCROLLY_RENDERERS[type];const safe=JSON.stringify(state).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');return '<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>Scrolly '+(type==='live'?'Live':'Glass')+'</title><style>'+r.css+'</style></head><body>'+r.body+'<script>'+r.js+'\napplySettings('+safe+');<\/script></body></html>';}
// Scale the bar inside a full-size frame so the iframe edge cannot clip its rendering.
function layout(){preview.contentWindow?.postMessage({type:'scrolly-preview-position',position},'*');}
function makePreviewHTML(type,state){
  const extra=`<script>
  let corner=${JSON.stringify(position)};
  function fitPreview(){
    const bar=document.getElementById('bar');
    const h=bar.offsetHeight,w=bar.offsetWidth;
    const scale=Math.min(1,innerWidth*.85/w,innerHeight*.72/h);
    const left=corner.endsWith('left'),top=corner.startsWith('top');
    Object.assign(bar.style,{position:'absolute',left:left?'4%':'auto',right:left?'auto':'4%',top:top?'14%':'auto',bottom:top?'auto':'14%',transform:'scale('+scale+')',transformOrigin:(left?'left':'right')+' '+(top?'top':'bottom'),transition:'none',filter:'none',isolation:'isolate',clipPath:'inset(0 round '+getComputedStyle(bar).borderTopLeftRadius+')'});
  }
  addEventListener('message',e=>{if(e.source!==parent||e.data?.type!=='scrolly-preview-position'||!['top-left','top-right','bottom-left','bottom-right'].includes(e.data.position))return;corner=e.data.position;fitPreview();});
  new ResizeObserver(fitPreview).observe(document.documentElement);fitPreview();
  <\/script>`;
  return makeHTML(type,state).replace('</body>',extra+'</body>');
}
preview.addEventListener('load',layout);
function paint(){document.getElementById('download').disabled=!latest[product];if(!latest[product]){preview.removeAttribute('srcdoc');document.getElementById('sourceSize').textContent='読み込み中…';return;}preview.srcdoc=makePreviewHTML(product,latest[product]);const s=latest[product];document.getElementById('sourceSize').textContent=s.width+' × '+Math.max(44,Math.round(s.fontSize*3.2))+' px';}
window.addEventListener('message',e=>{const m=e.data;if(!m||!['live','glass'].includes(m.product))return;const frame=document.getElementById('editor-'+m.product);if(e.source!==frame.contentWindow)return;if(location.protocol!=='file:'&&e.origin!==location.origin)return;if(m.type==='scrolly-height'&&Number.isFinite(m.height)&&m.height>0&&m.height<20000)frame.style.height=Math.ceil(m.height)+'px';if(m.type==='scrolly-state'&&m.state&&typeof m.state==='object'){latest[m.product]=m.state;if(m.product===product)paint();}});
function select(type){product=type;for(const t of ['live','glass']){const chosen=t===type,tab=document.getElementById('tab-'+t);tab.setAttribute('aria-selected',chosen);tab.tabIndex=chosen?0:-1;document.getElementById('panel-'+t).hidden=!chosen;}const frame=document.getElementById('editor-'+type);if(!frame.getAttribute('src'))frame.src=frame.dataset.src;else frame.contentWindow.postMessage({type:'scrolly-request'},location.protocol==='file:'?'*':location.origin);const name=type==='live'?'Live':'Glass';document.getElementById('exportTitle').textContent=name+'を書き出す';document.getElementById('download').textContent=name+'のHTMLをダウンロード';document.getElementById('status').textContent='';paint();}
for(const tab of document.querySelectorAll('[role=tab]')){tab.onclick=()=>select(tab.dataset.product);tab.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const t=e.key==='Home'?'live':e.key==='End'?'glass':product==='live'?'glass':'live';select(t);document.getElementById('tab-'+t).focus();}};}
for(const b of document.querySelectorAll('[data-bg]'))b.onclick=()=>{background=b.dataset.bg;stage.style.background=background==='pattern'?'linear-gradient(125deg,#476e78,#8a646f 55%,#c4b690)':background;document.querySelectorAll('[data-bg]').forEach(x=>x.setAttribute('aria-pressed',x===b));};
for(const b of document.querySelectorAll('[data-pos]'))b.onclick=()=>{position=b.dataset.pos;document.querySelectorAll('[data-pos]').forEach(x=>x.setAttribute('aria-pressed',x===b));layout();};
new ResizeObserver(layout).observe(stage);
document.getElementById('download').onclick=()=>{if(!latest[product])return;const data=makeHTML(product,latest[product]);const u=URL.createObjectURL(new Blob([data],{type:'text/html;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='scrolly-'+product+'-overlay.html';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);document.getElementById('status').textContent='HTMLのダウンロードを開始しました。';};
window.addEventListener('load',()=>select(product));for(const frame of document.querySelectorAll('.editor-column iframe'))frame.addEventListener('load',()=>frame.contentWindow.postMessage({type:'scrolly-request'},location.protocol==='file:'?'*':location.origin));
