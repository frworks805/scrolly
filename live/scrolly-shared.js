/* Scrolly Live：Dockと配信画面の両方で使う、アイコンとフォントの一覧。
   id は保存・送信に使うので変えない。並び順はDockに出す順。 */
(function () {
  const svg = body => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  const dot = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="1.2" fill="currentColor" stroke="none"/>';

  const ICONS = [
    { id: 'none',       label: 'なし',         svg: '' },
    /* v1.0.0 からあるもの（id・形は変えない。既存の図形も維持） */
    { id: 'music',      label: '音符',         svg: svg('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>') },
    { id: 'mic',        label: 'マイク',       svg: svg('<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>') },
    { id: 'radio',      label: 'ラジオ',       svg: svg('<rect x="2" y="8" width="20" height="14" rx="2"/><path d="M6 8l6-6 6 6"/><circle cx="12" cy="15" r="3"/><line x1="17" y1="11" x2="19" y2="11"/>') },
    { id: 'gamepad',    label: 'ゲーム',       svg: svg('<rect x="2" y="7" width="20" height="12" rx="4"/><path d="M8 11v4M6 13h4"/><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="14" r="1" fill="currentColor" stroke="none"/>') },
    { id: 'dice',       label: 'サイコロ',     svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' },
    { id: 'star',       label: '星',           svg: svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>') },
    { id: 'heart',      label: 'ハート',       svg: svg('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>') },
    { id: 'chat',       label: '吹き出し',     svg: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>') },
    { id: 'hash',       label: 'ハッシュタグ', svg: svg('<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>') },
  ];

  /* ボタンの名前は書体の正式名。 */
  const FONTS = [
    { id: 'noto',      label: 'Noto Sans JP',        family: "'Noto Sans JP', sans-serif" },
    { id: 'bizdp',     label: 'BIZ UDPGothic',       family: "'BIZ UDPGothic', sans-serif" },
    { id: 'zen',       label: 'Zen Kaku Gothic New', family: "'Zen Kaku Gothic New', sans-serif" },
    { id: 'mplus',     label: 'M PLUS Rounded 1c',   family: "'M PLUS Rounded 1c', sans-serif" },
    { id: 'murecho',   label: 'Murecho',             family: "'Murecho', sans-serif" },
    { id: 'zenmaru',   label: 'Zen Maru Gothic',     family: "'Zen Maru Gothic', sans-serif" },
    { id: 'kaisei',    label: 'Kaisei Decol',        family: "'Kaisei Decol', serif" },
    { id: 'dotgothic', label: 'DotGothic16',         family: "'DotGothic16', sans-serif" },
  ];

  window.SCROLLY = { ICONS, FONTS };
})();

window.SCROLLY.radius = (s,h) => (s.shape === "round" ? h/2 : 8) + "px";
