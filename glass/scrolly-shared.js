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
    /* v1.2.0 で追加 */
    { id: 'headphones', label: 'ヘッドホン',   svg: svg('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/>') },
    { id: 'video',      label: 'ビデオ',       svg: svg('<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3.5v11L16 14"/>') },
    { id: 'camera',     label: 'カメラ',       svg: svg('<path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>') },
    { id: 'megaphone',  label: 'メガホン',     svg: svg('<path d="M3 10v4h3l7 4V6l-7 4z"/><path d="M16.5 9a4 4 0 0 1 0 6"/><path d="M19 6.5a7.5 7.5 0 0 1 0 11"/>') },
    { id: 'bell',       label: 'ベル',         svg: svg('<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>') },
    { id: 'info',       label: 'インフォメーション', svg: svg('<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16.5"/>' + dot(12, 7.8)) },
    { id: 'calendar',   label: 'カレンダー',   svg: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>') },
    { id: 'clock',      label: '時計',         svg: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>') },
    { id: 'coffee',     label: 'コーヒー',     svg: svg('<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2.5v2.5M12 2.5v2.5"/><line x1="4" y1="21" x2="17" y2="21"/>') },
    { id: 'book',       label: '本',           svg: svg('<path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H3z"/><path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H14a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z"/>') },
    { id: 'pen',        label: 'ペン',         svg: svg('<path d="M16.5 3.5l4 4L8 20H4v-4z"/><line x1="14" y1="6" x2="18" y2="10"/>') },
    { id: 'sun',        label: '太陽',         svg: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>') },
    { id: 'moon',       label: '月',           svg: svg('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>') },
    { id: 'sparkle',    label: 'きらめき',     svg: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>') },
    { id: 'gift',       label: 'プレゼント',   svg: svg('<rect x="3" y="9" width="18" height="4" rx="1"/><path d="M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/><line x1="12" y1="9" x2="12" y2="21"/><path d="M12 9H8.5a2.5 2.5 0 1 1 0-5C11 4 12 9 12 9zM12 9h3.5a2.5 2.5 0 1 0 0-5C13 4 12 9 12 9z"/>') },
    { id: 'link',       label: 'リンク',       svg: svg('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>') },
    { id: 'flag', label: '旗', svg: svg('<path d="M5 21V3m0 1c5-4 9 4 15 0v10c-6 4-10-4-15 0"/>') },
    { id: 'trophy', label: 'トロフィー', svg: svg('<path d="M7 3h10v6a5 5 0 0 1-10 0zM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 14v5m-4 2h8m-7-2h6v2H9z"/>') },
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

window.SCROLLY.radius = (s,h) => (Number.isFinite(s.cornerPct) ? Math.min(100,Math.max(0,s.cornerPct))*h/200 : s.shape === "round" ? h/2 : 8) + "px";
