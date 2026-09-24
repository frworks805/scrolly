(() => {
'use strict';
const glass=typeof THEMES!=='undefined', key=KEY+'_palettes';
const style=document.createElement('style');style.textContent='.palette-grid{display:flex;flex-wrap:wrap;gap:8px}.palette-swatch{min-width:44px;min-height:36px;font-weight:700}.palette-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px}.palette-row input{flex:1;min-width:80px;width:100%;min-height:34px;background:var(--fw-field);color:var(--fw-text);border:1px solid var(--fw-control-line);border-radius:6px;padding:6px}.palette-tools{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}#paletteStatus{font-size:12px;margin-top:8px;color:var(--fw-muted)}#cornerNumber{background:var(--fw-field);border:1px solid var(--fw-control-line);border-radius:6px;min-height:34px;padding:4px}';document.head.append(style);
const slider=document.getElementById('cornerSlider'),number=document.getElementById('cornerNumber');
function cornerUI(){const h=Math.max(44,Math.round(state.fontSize*3.2));const pct=Number.isFinite(state.cornerPct)?state.cornerPct:(state.shape==='round'?100:1600/h);slider.value=pct;number.value=Math.round(pct*100)/100;}
const prior=updatePreview;updatePreview=function(){prior();cornerUI();};
function change(el){const v=Number(el.value);if(el.value.trim()===''||!Number.isFinite(v)||v<0||v>100){el.setAttribute('aria-invalid','true');return;}el.removeAttribute('aria-invalid');state.cornerPct=v;updatePreview();}
slider.addEventListener('input',()=>change(slider));number.addEventListener('input',()=>change(number));cornerUI();
const box=document.createElement('div');box.className='section';box.innerHTML='<div class="field-label">配色</div><div id="paletteDefaults" class="palette-grid"></div><div class="palette-tools"><button id="paletteSave">配色を保存</button><button id="paletteExport">書き出す</button><button id="paletteImport">読み込む</button></div><div id="paletteSaved"></div><p id="paletteStatus" role="status"></p>';
document.getElementById('swapBtn').after(box);
const status=t=>document.getElementById('paletteStatus').textContent=t;
const hex=v=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
function valid(v){return v&&typeof v.name==='string'&&v.name.trim().length>0&&v.name.length<=60&&hex(v.bg)&&hex(v.fg);}
let saved=[];try{const v=JSON.parse(localStorage.getItem(key));if(Array.isArray(v)&&v.length<=100&&v.every(valid))saved=v;}catch(e){status('保存した配色を読み込めませんでした。');}
function store(next){try{localStorage.setItem(key,JSON.stringify(next));saved=next;draw();return true;}catch(e){status('配色を保存できませんでした。ブラウザーの保存領域を確認してください。');return false;}}
function apply(c){state.bg=c.bg;state.fg=c.fg;syncColor('bg');syncColor('fg');updatePreview();}
function swatch(c){const b=document.createElement('button');b.className='palette-swatch';b.textContent='Aa';b.style.background=c.bg;b.style.color=c.fg;b.title=c.name;b.setAttribute('aria-label',c.name+'：背景 '+c.bg+'、文字 '+c.fg);b.addEventListener('click',()=>apply(c));return b;}
const defaults=glass?THEMES.map(t=>({name:t.label,bg:t.tintHex,fg:t.fg})):[{name:'ライト',bg:'#ffffff',fg:'#1e1c19'},{name:'ダーク',bg:'#1a1a1a',fg:'#ffffff'},{name:'グリーン',bg:'#ffffff',fg:'#4a7c6f'},{name:'ブルー',bg:'#1e2130',fg:'#a0c4ff'}];
if(glass){const theme=document.getElementById('themeGrid');theme.closest('.section').remove(); // updatePreview still queries an empty matching list safely.
}
for(const c of defaults)document.getElementById('paletteDefaults').append(swatch(c));
function draw(){const el=document.getElementById('paletteSaved');el.replaceChildren();saved.forEach((c,i)=>{const row=document.createElement('div');row.className='palette-row';const input=document.createElement('input');input.value=c.name;input.maxLength=60;input.setAttribute('aria-label','配色名');input.addEventListener('change',()=>{if(!input.value.trim()){input.value=c.name;return;}const next=saved.map(x=>({...x}));next[i].name=input.value.trim();store(next);});const del=document.createElement('button');del.textContent='削除';del.setAttribute('aria-label',c.name+'を削除');del.addEventListener('click',()=>{if(confirm('配色「'+c.name+'」を削除しますか？'))store(saved.filter((_,j)=>i!==j));});row.append(swatch(c),input,del);el.append(row);});}
document.getElementById('paletteSave').onclick=()=>{if(saved.length>=100){status('保存できる配色は100件までです。');return;}if(store([...saved,{name:'配色 '+(saved.length+1),bg:state.bg,fg:state.fg}]))status('現在の2色を保存しました。');};
const transfer=document.createElement('section');transfer.hidden=true;transfer.className='section';transfer.innerHTML='<label class="field-label" for="paletteData">配色データ</label><textarea id="paletteData" aria-describedby="paletteHelp" spellcheck="false" style="width:100%;min-height:140px;resize:vertical;background:var(--fw-field);color:var(--fw-text);border:1px solid var(--fw-control-line);border-radius:6px;padding:8px"></textarea><p id="paletteHelp" style="font-size:12px">コピーしたデータは、別のDockの「読み込む」に貼り付けられます。</p><div class="palette-tools"><button id="paletteCopy">コピー</button><button id="paletteApply">データを読み込む</button><button id="paletteClose">閉じる</button></div><p id="paletteTransferStatus" role="status" style="font-size:12px;margin-top:8px"></p>';
box.append(transfer);
const dataField=document.getElementById('paletteData'),message=t=>document.getElementById('paletteTransferStatus').textContent=t;
let origin=null;
function show(mode){origin=document.activeElement;transfer.hidden=false;dataField.readOnly=mode==='export';dataField.value=mode==='export'?JSON.stringify({format:'scrolly-palettes',version:1,palettes:saved},null,2):'';document.getElementById('paletteCopy').hidden=mode!=='export';document.getElementById('paletteApply').hidden=mode!=='import';message(mode==='export'?'このデータをコピーして保存できます。':'配色データを貼り付けて「データを読み込む」を押してください。');dataField.focus();if(mode==='export')dataField.select();}
function close(){transfer.hidden=true;if(origin)origin.focus();}
document.getElementById('paletteExport').onclick=()=>show('export');
document.getElementById('paletteImport').onclick=()=>show('import');
document.getElementById('paletteClose').onclick=close;
transfer.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});
document.getElementById('paletteCopy').onclick=async()=>{dataField.focus();dataField.select();try{await navigator.clipboard.writeText(dataField.value);message('配色データをコピーしました。');}catch(e){message('データを選択しました。Ctrl+C（MacはCommand+C）でコピーしてください。');}};
function readData(text){try{if(text.length>100000)throw Error();const doc=JSON.parse(text);if(doc.format!=='scrolly-palettes'||doc.version!==1||!Array.isArray(doc.palettes)||!doc.palettes.every(valid))throw Error();const next=saved.map(x=>({...x}));for(const c of doc.palettes)if(!next.some(x=>x.name===c.name&&x.bg===c.bg&&x.fg===c.fg))next.push({name:c.name,bg:c.bg,fg:c.fg});if(next.length>100)throw Error();if(store(next)){status('配色を読み込みました。');message('配色を読み込みました。');}else message('保存できませんでした。元の配色は変更していません。');}catch(err){message('読み込めませんでした。Scrollyの配色データ（100件以内）を確認してください。');}}
document.getElementById('paletteApply').onclick=()=>readData(dataField.value);

draw();
})();
