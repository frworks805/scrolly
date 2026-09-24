(() => {
'use strict';
const glass=typeof THEMES!=='undefined';
const box=document.createElement('div');box.className='section';box.style.marginTop='12px';
const label=document.createElement('div');label.className='field-label';label.textContent='配色サンプル';
const grid=document.createElement('div');grid.style.cssText='display:flex;flex-wrap:wrap;gap:8px';
const defaults=glass?THEMES.map(t=>({name:t.label,bg:t.tintHex,fg:t.fg})):[{name:'ライト',bg:'#ffffff',fg:'#1e1c19'},{name:'ダーク',bg:'#1a1a1a',fg:'#ffffff'},{name:'グリーン',bg:'#ffffff',fg:'#4a7c6f'},{name:'ブルー',bg:'#1e2130',fg:'#a0c4ff'}];
for(const c of defaults){const b=document.createElement('button');b.textContent='Aa';b.style.cssText='min-width:44px;font-weight:700';b.style.background=c.bg;b.style.color=c.fg;b.title=c.name;b.setAttribute('aria-label',c.name+'：背景 '+c.bg+'、文字 '+c.fg);b.onclick=()=>{state.bg=c.bg;state.fg=c.fg;syncColor('bg');syncColor('fg');updatePreview();};grid.append(b);}
box.append(label,grid);document.getElementById('swapBtn').after(box);
if(glass)document.getElementById('themeGrid').closest('.section').remove();
})();
