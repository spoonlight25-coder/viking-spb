(function () {
  'use strict';

  const S = window.SITE;
  if (!S) {
    document.body.textContent = 'Не найден config.js — он должен лежать рядом с index.html.';
    return;
  }

  /* ---------- Значения по умолчанию: config.js может их не указывать ---------- */

  const DEFAULT_TEXTS = {
    headerButton: 'Записаться',
    heroCall: 'или позвоните:',
    bookingTitle: 'Онлайн-запись',
    bookingSubtitle: 'Выберите услугу, день и время',
    bookingButton: 'Записаться',
    stepService: 'Услуга',
    stepDay: 'День',
    stepTime: 'Время',
    stepContacts: 'Контакты',
    consent: 'Нажимая кнопку, вы соглашаетесь на обработку персональных данных',
    privacyLabel: 'Политика конфиденциальности',
    doneTitle: 'Заявка отправлена!',
    doneAgain: 'Записаться ещё раз',
    contactCardTitle: 'Свяжитесь с нами',
    contactCardText: 'Позвоните — ответим на вопросы и подберём удобное время.',
    callButton: 'Позвонить',
    servicesEyebrow: 'Услуги и цены',
    servicesTitle: 'Услуги',
    servicesLead: '',
    whyEyebrow: 'Почему мы',
    whyTitle: 'Почему выбирают нас',
    stepsEyebrow: 'Как это работает',
    stepsTitle: 'Как записаться',
    worksEyebrow: 'Фото',
    worksTitle: 'Наши работы',
    worksLead: '',
    reviewsEyebrow: 'Отзывы',
    reviewsTitle: 'Отзывы о нас',
    reviewsLead: '',
    reviewsButton: 'Читать отзывы',
    contactsEyebrow: 'Контакты',
    contactsTitle: 'Как нас найти',
    ctaTitle: 'Запишитесь на удобное время',
    ctaText: '',
    ctaButton: 'Записаться онлайн',
    nav: {
      services: 'Услуги', why: 'Почему мы', steps: 'Как записаться',
      works: 'Работы', reviews: 'Отзывы', contacts: 'Контакты',
    },
  };
  const DEFAULT_STEPS = [
    { title: 'Выберите услугу', text: 'В форме записи или в списке услуг.' },
    { title: 'Выберите время', text: 'В форме видно свободные окна.' },
    { title: 'Оставьте телефон', text: 'Мы свяжемся с вами, чтобы подтвердить запись.' },
    { title: 'Приходите', text: 'Ждём вас в назначенное время.' },
  ];
  const SECTION_IDS = ['services', 'why', 'steps', 'works', 'reviews', 'contacts'];

  // Пары шрифтов (все с кириллицей на Google Fonts)
  const FONT_PRESETS = {
    tech: { head: 'Unbounded', body: 'Manrope', q: 'family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;600;700', upper: true },
    strict: { head: 'Oswald', body: 'Roboto', q: 'family=Oswald:wght@500;600;700&family=Roboto:wght@400;500;700', upper: true },
    bold: { head: 'Russo One', body: 'Rubik', q: 'family=Russo+One&family=Rubik:wght@400;500;600;700', upper: false },
    modern: { head: 'Montserrat', body: 'Inter', q: 'family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600;700', upper: false },
    classic: { head: 'Playfair Display', body: 'Inter', q: 'family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700', upper: false },
    elegant: { head: 'Cormorant Garamond', body: 'Montserrat', q: 'family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@400;500;600;700', upper: false },
    soft: { head: 'Comfortaa', body: 'Nunito', q: 'family=Comfortaa:wght@500;600;700&family=Nunito:wght@400;500;600;700;800', upper: false },
  };

  S.texts = Object.assign({}, DEFAULT_TEXTS, S.texts || {});
  S.texts.nav = Object.assign({}, DEFAULT_TEXTS.nav, (S.texts && S.texts.nav) || {});
  S.theme = Object.assign({ mode: 'dark', fonts: 'tech', shape: 'round', accent: S.accentColor || '#4cc9f0' }, S.theme || {});
  S.layout = Object.assign({ hero: 'split', services: 'list', sections: SECTION_IDS }, S.layout || {});
  S.hero = S.hero || {};
  S.hours = S.hours || {};
  S.services = (S.services || []).filter((s) => s && s.name);
  if (!Array.isArray(S.steps)) S.steps = DEFAULT_STEPS;
  if (!S.hero.image && S.layout.hero !== 'minimal') S.layout.hero = 'minimal';

  const svg = (body) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';

  // Иконки для преимуществ: shield, clock, star, drop, sparkle, gem, car, calendar, scissors, heart,
  // leaf, coffee, wrench, users, award, smile, home, card, parking, wifi, pin, phone, check
  const ICONS = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    pin: svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'),
    star: svg('<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'),
    drop: svg('<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.3 0z"/>'),
    sparkle: svg('<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/><path d="M19 3v4M17 5h4"/>'),
    gem: svg('<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21L8 9l4-6 4 6z"/>'),
    calendar: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    check: svg('<path d="M20 6L9 17l-5-5"/>'),
    car: svg('<path d="M5 17H3v-4.5l2-4.5a2 2 0 0 1 1.8-1h10.4a2 2 0 0 1 1.8 1l2 4.5V17h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M9.5 17h5M4 12h16"/>'),
    scissors: svg('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>'),
    heart: svg('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>'),
    leaf: svg('<path d="M11 20A7 7 0 0 1 4 13c0-6 6-10 16-10 0 10-4 16-10 16"/><path d="M4 21c3-6 7-9 12-12"/>'),
    coffee: svg('<path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v3M10 2v3M14 2v3"/>'),
    wrench: svg('<path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L2 10l8-8z"/>'),
    users: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
    award: svg('<circle cx="12" cy="8" r="6"/><path d="M8.2 13.9L7 23l5-3 5 3-1.2-9.1"/>'),
    smile: svg('<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>'),
    home: svg('<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'),
    card: svg('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
    parking: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>'),
    wifi: svg('<path d="M5 12.6a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 20 0M12 20h.01"/>'),
    globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    telegram: svg('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>'),
    whatsapp: svg('<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z"/>'),
    vk: '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="12" y="16" text-anchor="middle" font-size="10" ' +
      'font-weight="800" fill="currentColor" font-family="sans-serif">VK</text></svg>',
  };
  ICONS.website = ICONS.globe;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const get = (path) => path.split('.').reduce((obj, key) => (obj == null ? undefined : obj[key]), S);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function icon(name, className) {
    const node = el('span', className || 'icon');
    node.innerHTML = ICONS[name] || ICONS.sparkle;
    return node;
  }

  const pad = (n) => String(n).padStart(2, '0');
  const toMinutes = (hhmm) => {
    const [h, m] = String(hhmm).split(':').map(Number);
    return h * 60 + (m || 0);
  };
  const fromMinutes = (m) => pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  const dayKey = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const shortDate = (d) => d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
  const longDate = (d) => d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });

  function formatDuration(min) {
    if (!min) return '';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (!h) return m + ' мин';
    return m ? `${h} ч ${m} мин` : `${h} ч`;
  }

  /* ---------- Цвета: автоматическая проверка контраста ---------- */

  const hexToRgb = (hex) => {
    let h = String(hex).replace('#', '').trim();
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const rgbToHex = (rgb) => '#' + rgb.map((v) => pad(Math.round(v).toString(16))).join('');
  const luminance = (rgb) => {
    const [r, g, b] = rgb.map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a, b) => {
    const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };
  const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);

  const BG = { dark: [10, 12, 15], light: [247, 246, 242] };
  const SURFACE = { dark: [17, 21, 26], light: [255, 255, 255] };
  const SURFACE2 = { dark: [22, 27, 34], light: [240, 238, 233] };

  function setupTheme() {
    const T = S.theme;
    const root = document.documentElement;
    const mode = T.mode === 'light' ? 'light' : 'dark';
    root.dataset.mode = mode;
    root.dataset.shape = ['round', 'soft', 'sharp'].includes(T.shape) ? T.shape : 'round';
    root.dataset.hero = ['split', 'centered', 'minimal'].includes(S.layout.hero) ? S.layout.hero : 'split';

    // акцент: если цвет логотипа сливается с фоном, осветляем/затемняем его до читаемого
    const bg = BG[mode];
    let accent = hexToRgb(T.accent || '#4cc9f0');
    const target = mode === 'dark' ? [255, 255, 255] : [0, 0, 0];
    for (let i = 0; i < 20 && contrast(accent, bg) < 3; i++) accent = mix(accent, target, 0.08);
    root.style.setProperty('--accent', rgbToHex(accent));
    const ink = contrast(accent, [255, 255, 255]) >= contrast(accent, [8, 10, 14]) ? '#ffffff' : '#080a0e';
    root.style.setProperty('--accent-ink', ink);
    // второй цвет палитры — только для фоновых переливов, текст им не пишем
    root.style.setProperty('--accent-2', T.accent2 ? rgbToHex(hexToRgb(T.accent2)) : 'var(--accent)');

    // оттенок фона из палитры клиента: фон и плашки чуть уходят в этот цвет, у каждого сайта своя подложка
    if (T.tint) {
      const tint = hexToRgb(T.tint);
      const share = mode === 'dark' ? [0.07, 0.09, 0.11] : [0.05, 0.03, 0.07];
      const [tbg, tsurface, tsurface2] = [BG[mode], SURFACE[mode], SURFACE2[mode]].map((c, i) => mix(c, tint, share[i]));
      const rgba = (c, a) => `rgba(${c.map(Math.round).join(', ')}, ${a})`;
      root.style.setProperty('--bg', rgbToHex(tbg));
      root.style.setProperty('--surface', rgbToHex(tsurface));
      root.style.setProperty('--surface-2', rgbToHex(tsurface2));
      root.style.setProperty('--header-bg', rgba(tbg, mode === 'dark' ? 0.85 : 0.9));
      root.style.setProperty('--hero-fade', rgba(tbg, mode === 'dark' ? 0.86 : 0.9));
      root.style.setProperty('--hero-fade-2', rgba(tbg, mode === 'dark' ? 0.35 : 0.45));
      root.style.setProperty('--glass', rgba(tsurface, mode === 'dark' ? 0.6 : 0.75));
      root.style.setProperty('--glass-strong', rgba(tsurface, mode === 'dark' ? 0.9 : 0.94));
    }

    const font = FONT_PRESETS[T.fonts] || FONT_PRESETS.tech;
    const link = el('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${font.q}&display=swap`;
    document.head.append(link);
    root.style.setProperty('--font-head', `'${font.head}', system-ui, sans-serif`);
    root.style.setProperty('--font', `'${font.body}', system-ui, -apple-system, 'Segoe UI', sans-serif`);
    root.style.setProperty('--head-transform', font.upper ? 'uppercase' : 'none');
  }

  /* ---------- Порядок секций и меню ---------- */

  function hideSection(id) {
    const node = $('#' + id);
    if (node) node.hidden = true;
    $$(`a[href="#${id}"]`).forEach((a) => { if (!a.classList.contains('btn')) a.hidden = true; });
  }

  function setupSections() {
    const order = (S.layout.sections || SECTION_IDS).filter((id) => SECTION_IDS.includes(id));
    const main = $('main');
    order.forEach((id) => main.append($('#' + id)));
    SECTION_IDS.filter((id) => !order.includes(id)).forEach((id) => $('#' + id).remove());

    const nav = $('#nav');
    order.forEach((id) => {
      const a = el('a', null, S.texts.nav[id] || id);
      a.href = '#' + id;
      nav.append(a);
    });

    // чередуем подложку секций, чтобы при любом порядке не было двух одинаковых подряд
    $$('main > .section').forEach((s, i) => s.classList.toggle('section--tint', i % 2 === 1));
  }

  /* ---------- Общие данные ---------- */

  const categoryOf = (s) => s.category || 'Услуги';
  const categories = [...new Set(S.services.map(categoryOf))];

  // Ряд кнопок-вкладок; возвращает функцию, которая переключает вкладку
  function makeTabs(container, onSelect) {
    if (categories.length < 2) container.hidden = true;
    const buttons = categories.map((cat) => {
      const btn = el('button', 'tab');
      btn.type = 'button';
      btn.append(cat, el('span', 'tab__count', String(S.services.filter((s) => categoryOf(s) === cat).length)));
      btn.addEventListener('click', () => select(cat));
      container.append(btn);
      return btn;
    });
    function select(cat) {
      buttons.forEach((btn, i) => {
        const active = categories[i] === cat;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      onSelect(cat);
    }
    if (categories.length) select(categories[0]);
    return select;
  }

  const phoneDigitsOf = (p) => String(p || '').replace(/\D/g, '').replace(/^8(?=\d{10}$)/, '7');
  const phoneHref = S.phone ? 'tel:+' + phoneDigitsOf(S.phone) : '';
  const mapUrl = S.mapUrl || (S.address ? 'https://yandex.ru/maps/?text=' + encodeURIComponent(S.address) : '');
  const hoursText = S.hours.text || (S.hours.open ? `${S.hours.label || ''} ${S.hours.open}–${S.hours.close}`.trim() : '');

  function setupBasics() {
    const seo = S.seo || {};
    document.title = seo.title || [S.name, S.tagline].filter(Boolean).join(' — ');
    const description = seo.description || S.hero.text || '';
    $('meta[name="description"]').content = description;
    $('meta[property="og:title"]').content = document.title;
    $('meta[property="og:description"]').content = description;

    $$('[data-text]').forEach((node) => {
      const value = get(node.dataset.text);
      if (value == null || value === '') node.hidden = true;
      else node.textContent = value;
    });
    $$('[data-icon]').forEach((node) => {
      node.innerHTML = ICONS[node.dataset.icon] || '';
      node.classList.add('icon');
    });
    $$('[data-phone]').forEach((node) => {
      if (phoneHref) node.href = phoneHref;
      else node.hidden = true;
    });

    if (S.logo) {
      const img = $('#logo-img');
      img.src = S.logo;
      img.alt = S.name || '';
      img.hidden = false;
    }
    if (S.hero.image) $('#hero-bg').style.backgroundImage = `url(${JSON.stringify(S.hero.image)})`;
    $('#copyright').textContent = `© ${new Date().getFullYear()} ${S.name}`;

    if (S.privacyUrl) {
      const link = $('#privacy-link');
      link.href = S.privacyUrl;
      link.hidden = false;
    }
    const note = $('#booking-note');
    note.textContent = S.texts.consent;
    if (S.privacyUrl) {
      const a = el('a', null, ' (' + S.texts.privacyLabel.toLowerCase() + ')');
      a.href = S.privacyUrl;
      a.target = '_blank';
      note.append(a);
    }

    const stats = $('#hero-stats');
    // рейтинги карт — сразу на первом экране: первым идёт тот, у кого больше оценок, при равенстве — выше рейтинг
    const num = (v) => parseFloat(String(v || '').replace(/\s/g, '').replace(',', '.')) || 0;
    const rated = (S.reviewLinks || []).filter((r) => r && r.rating)
      .sort((a, b) => num(b.count) - num(a.count) || num(b.rating) - num(a.rating))
      .map((r) => ({ value: r.rating + ' ★', label: r.name + (r.count ? ' · ' + r.count : '') }));
    const list = [...rated, ...(S.hero.stats || []).filter((s) => s && s.value)];
    if (!list.length) stats.hidden = true;
    list.forEach((s) => {
      const item = el('li', 'stat');
      item.append(el('div', 'stat__value', s.value), el('div', 'stat__label', s.label || ''));
      stats.append(item);
    });
  }

  /* ---------- Запись ---------- */

  function setupContactCard() {
    $('#booking-form').hidden = true;
    $('#booking-contact').hidden = false;
    const list = $('#booking-contact-list');
    [
      { icon: 'pin', value: S.address },
      { icon: 'clock', value: hoursText },
      { icon: 'phone', value: S.phone },
    ].filter((c) => c.value).forEach((c) => {
      const row = el('div', 'mini-contact');
      row.append(icon(c.icon), el('span', null, c.value));
      list.append(row);
    });
    // ссылки «Записаться» ведут к карточке — меняем подписи на «Связаться»
    $$('a[href="#booking"]').forEach((a) => {
      const label = a.querySelector('[data-text]') || a;
      if (label.dataset.text === 'texts.headerButton' || label.dataset.text === 'texts.ctaButton') {
        label.textContent = S.texts.callButton;
      }
    });
    hideSection('steps');
    return function pickService() {
      $('#booking').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    };
  }

  function setupBooking() {
    const B = Object.assign(
      { enabled: true, daysAhead: 14, slotStep: 30, leadMinutes: 30, closedWeekdays: [], sendTo: '', busyUrl: '' },
      S.booking
    );
    if (!B.enabled || !S.services.length || !S.hours.open || !S.hours.close) return setupContactCard();
    // сайт открыт двойным кликом (без сервера) — запись работает в демо-режиме, а не падает с ошибкой
    if (location.protocol === 'file:') Object.assign(B, { sendTo: '', busyUrl: '' });

    const open = toMinutes(S.hours.open);
    const close = toMinutes(S.hours.close);
    // если длительность услуги неизвестна — слот занимает один шаг сетки
    const durationOf = (s) => (s && s.duration) || B.slotStep;
    const minDuration = Math.min(...S.services.map(durationOf));
    const state = { serviceId: null, day: null, time: null };

    const form = $('#booking-form');
    const done = $('#booking-done');
    const card = $('#booking');
    const serviceBox = $('#service-options');
    const dayBox = $('#day-options');
    const slotBox = $('#slot-options');
    const summary = $('#booking-summary');
    const errorBox = $('#booking-error');
    const submit = $('#booking-submit');
    const submitHtml = submit.innerHTML;
    const phoneInput = form.elements.phone;
    let phoneDigits = '';

    const currentService = () => S.services.find((s) => s.id === state.serviceId);

    function option(name, value, className, children, onPick) {
      const label = el('label', 'opt ' + className);
      const input = el('input');
      input.type = 'radio';
      input.name = name;
      input.value = value;
      input.addEventListener('change', onPick);
      const box = el('span', 'opt__box');
      box.append(...children);
      label.append(input, box);
      return label;
    }

    function slotsFor(day, duration) {
      const now = new Date();
      const earliest = dayKey(day) === dayKey(now) ? now.getHours() * 60 + now.getMinutes() + B.leadMinutes : 0;
      const list = [];
      for (let t = open; t + duration <= close; t += B.slotStep) {
        if (t >= earliest) list.push(t);
      }
      return list;
    }

    S.services.forEach((s, i) => {
      if (!s.id) s.id = 'service-' + (i + 1);
      const children = [el('span', 'opt__title', s.name)];
      if (s.price) children.push(el('span', 'opt__meta', s.price));
      const node = option('service', s.id, 'opt--service', children,
        () => { state.serviceId = s.id; renderSlots(); update(); });
      node.dataset.category = categoryOf(s);
      serviceBox.append(node);
    });
    const showFormCategory = makeTabs($('#service-tabs'), (cat) => {
      serviceBox.querySelectorAll('.opt').forEach((node) => { node.hidden = node.dataset.category !== cat; });
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];
    for (let i = 0; i < B.daysAhead; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (B.closedWeekdays.includes(d.getDay())) continue;
      if (i === 0 && !slotsFor(d, minDuration).length) continue;
      days.push(d);
    }

    const weekdayLabel = (d) => {
      const diff = Math.round((d - today) / 864e5);
      if (diff === 0) return 'сегодня';
      if (diff === 1) return 'завтра';
      return d.toLocaleDateString('ru-RU', { weekday: 'short' });
    };

    days.forEach((d) => {
      dayBox.append(option('day', dayKey(d), 'opt--day', [
        el('span', 'day__week', weekdayLabel(d)),
        el('span', 'day__num', String(d.getDate())),
        el('span', 'day__month', d.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', '')),
      ], () => { state.day = d; renderSlots(); update(); }));
    });

    function selectFirstDay() {
      const first = dayBox.querySelector('input');
      if (!first) return;
      first.checked = true;
      state.day = days[0];
    }

    // Занятость по дням: { boxes, busy: [[начало, конец], ...] } в минутах от полуночи
    const busyCache = {};
    let renderToken = 0;

    async function loadBusy(day, force) {
      if (!B.busyUrl) return null;
      const key = dayKey(day);
      const cached = busyCache[key];
      if (!force && cached && Date.now() - cached.at < 30000) return cached;
      try {
        const res = await fetch(`${B.busyUrl}?date=${key}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        busyCache[key] = { boxes: data.boxes, busy: data.busy, at: Date.now() };
      } catch (err) {
        delete busyCache[key];
        return null;
      }
      return busyCache[key];
    }

    function isFree(info, start, end) {
      if (!info) return true;
      const moments = [start, ...info.busy.map(([s]) => s).filter((s) => s > start && s < end)];
      return moments.every((m) => info.busy.filter(([s, e]) => s <= m && m < e).length < info.boxes);
    }

    async function renderSlots(force) {
      const token = ++renderToken;
      if (!state.day) {
        slotBox.replaceChildren(el('p', 'slots__empty', 'Свободных дней для записи нет — позвоните нам.'));
        return;
      }
      const day = state.day;
      if (B.busyUrl && (force || !busyCache[dayKey(day)])) {
        slotBox.replaceChildren(el('p', 'slots__empty', 'Смотрим свободное время…'));
      }
      const info = await loadBusy(day, force);
      if (token !== renderToken) return;

      const service = currentService();
      const duration = service ? durationOf(service) : minDuration;
      const list = slotsFor(day, duration).filter((t) => isFree(info, t, t + duration));
      if (!list.includes(state.time)) state.time = null;
      slotBox.replaceChildren();
      if (!list.length) {
        slotBox.append(el('p', 'slots__empty', 'На этот день свободного времени нет — выберите другой.'));
      }
      list.forEach((t) => {
        const node = option('time', String(t), 'opt--slot', [document.createTextNode(fromMinutes(t))],
          () => { state.time = t; update(); });
        node.querySelector('input').checked = t === state.time;
        slotBox.append(node);
      });
      update();
    }

    function formatPhone(d) {
      if (!d) return '';
      let out = '+7';
      if (d.length > 1) out += ' (' + d.slice(1, 4);
      if (d.length > 4) out += ') ' + d.slice(4, 7);
      if (d.length > 7) out += '-' + d.slice(7, 9);
      if (d.length > 9) out += '-' + d.slice(9, 11);
      return out;
    }

    phoneInput.addEventListener('input', (e) => {
      let digits = phoneInput.value.replace(/\D/g, '');
      const deleting = (e.inputType || '').startsWith('delete');
      // удалили скобку или дефис — убираем и цифру перед ним, иначе маска вернёт символ обратно
      if (deleting && digits === phoneDigits) digits = digits.slice(0, -1);
      if (digits[0] === '8') digits = '7' + digits.slice(1);
      if (digits && digits[0] !== '7') digits = '7' + digits;
      digits = digits.slice(0, 11);
      if (deleting && digits.length <= 1) digits = '';
      phoneDigits = digits;
      phoneInput.value = formatPhone(digits);
      update();
    });

    function update() {
      const service = currentService();
      const ready = Boolean(service && state.day && state.time != null && phoneDigits.length === 11);
      submit.disabled = !ready;
      summary.replaceChildren();
      if (!service) {
        summary.textContent = 'Выберите услугу — и сразу увидите свободное время.';
        return;
      }
      if (state.time == null) {
        summary.textContent = 'Выберите удобное время.';
        return;
      }
      summary.append(el('b', null, service.name),
        ` · ${shortDate(state.day)}, ${fromMinutes(state.time)}` + (service.price ? ` · ${service.price}` : ''));
      if (phoneDigits.length !== 11) summary.append(el('span', 'booking__hint', 'Осталось оставить телефон'));
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submit.disabled) return;
      const service = currentService();
      const payload = {
        service: service.name,
        price: service.price || '',
        duration: durationOf(service),
        date: dayKey(state.day),
        time: fromMinutes(state.time),
        name: form.elements.name.value.trim(),
        phone: phoneInput.value,
        createdAt: new Date().toISOString(),
      };

      submit.disabled = true;
      submit.textContent = 'Отправляем…';
      errorBox.hidden = true;
      try {
        if (B.sendTo) {
          const res = await fetch(B.sendTo, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.status === 409) {
            errorBox.textContent = 'Это время только что заняли — выберите, пожалуйста, другое.';
            errorBox.hidden = false;
            state.time = null;
            renderSlots(true);
            return;
          }
          if (res.status === 429) {
            errorBox.textContent = 'Слишком частые заявки — подождите несколько секунд и попробуйте снова.';
            errorBox.hidden = false;
            return;
          }
          if (!res.ok) throw new Error('HTTP ' + res.status);
          delete busyCache[payload.date];
        } else {
          console.info('Демо-режим: заявка никуда не отправлена (заполни booking.sendTo в config.js)', payload);
        }
        showDone(payload, service);
      } catch (err) {
        errorBox.textContent = 'Не получилось отправить заявку. Позвоните нам: ' + S.phone;
        errorBox.hidden = false;
      } finally {
        submit.innerHTML = submitHtml;
        update();
      }
    });

    function showDone(payload, service) {
      const details = $('#done-details');
      details.replaceChildren();
      [
        ['Услуга', service.name],
        ['Когда', `${longDate(state.day)}, ${payload.time}`],
        ['Стоимость', service.price],
        ['Телефон', payload.phone],
      ].filter(([, value]) => value).forEach(([label, value]) => {
        const row = el('div', 'done__row');
        row.append(el('dt', null, label), el('dd', null, value));
        details.append(row);
      });
      form.hidden = true;
      done.hidden = false;
    }

    $('#booking-again').addEventListener('click', () => {
      form.reset();
      phoneDigits = '';
      state.serviceId = null;
      state.time = null;
      selectFirstDay();
      renderSlots();
      update();
      done.hidden = true;
      form.hidden = false;
    });

    selectFirstDay();
    renderSlots();
    update();

    return function pickService(id) {
      const input = serviceBox.querySelector(`input[value="${CSS.escape(id)}"]`);
      if (input && !form.hidden) {
        showFormCategory(categoryOf(S.services.find((s) => s.id === id)));
        input.checked = true;
        input.dispatchEvent(new Event('change'));
      }
      card.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      card.classList.remove('is-flash');
      void card.offsetWidth;
      card.classList.add('is-flash');
    };
  }

  /* ---------- Секции ---------- */

  function renderServices(pickService) {
    if (!$('#services')) return;
    if (!S.services.length) return hideSection('services');
    const list = $('#services-list');
    const variant = ['list', 'cards', 'menu'].includes(S.layout.services) ? S.layout.services : 'list';
    list.classList.add('pricelist--' + variant);
    const row = (s) => {
      const item = el('div', 'price-row');
      const info = el('div', 'price-row__info');
      info.append(el('h3', 'price-row__name', s.name));
      if (s.description) info.append(el('p', 'price-row__desc', s.description));
      const side = el('div', 'price-row__side');
      if (s.price) side.append(el('span', 'price-row__price', s.price));
      if (s.duration) {
        const time = el('span', 'price-row__time');
        time.append(icon('clock'), formatDuration(s.duration));
        side.append(time);
      }
      const btn = el('button', 'price-row__btn');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Записаться: ' + s.name);
      btn.append(icon('arrow'));
      item.append(info, side, btn);
      item.addEventListener('click', () => pickService(s.id));
      return item;
    };
    makeTabs($('#services-tabs'), (cat) => {
      list.replaceChildren(...S.services.filter((s) => categoryOf(s) === cat).map(row));
    });
  }

  function renderWhy() {
    if (!$('#why')) return;
    const items = (S.advantages || []).filter((a) => a && a.title);
    if (!items.length) return hideSection('why');
    const list = $('#why-list');
    list.style.setProperty('--why-cols', String(Math.min(4, items.length)));
    items.forEach((a) => {
      const item = el('div', 'why__item');
      item.append(icon(a.icon, 'why__icon'), el('h3', 'why__title', a.title));
      if (a.text) item.append(el('p', 'why__text', a.text));
      list.append(item);
    });
  }

  function renderSteps() {
    if (!$('#steps')) return;
    if (!S.steps.length) return hideSection('steps');
    const list = $('#steps-list');
    S.steps.forEach((s, i) => {
      const item = el('li', 'step');
      item.append(el('span', 'step__num', pad(i + 1)), el('h3', 'step__title', s.title), el('p', 'step__text', s.text || ''));
      list.append(item);
    });
  }

  function renderReviews() {
    if (!$('#reviews')) return;
    const links = (S.reviewLinks || []).filter((r) => r && r.url);
    if (!links.length) return hideSection('reviews');
    const list = $('#reviews-list');
    links.forEach((r) => {
      const item = el('a', 'review-link');
      item.href = r.url;
      item.target = '_blank';
      item.rel = 'noopener';
      item.style.setProperty('--brand', r.color || 'var(--accent)');

      const badge = el('span', 'review-link__badge', r.badge || r.name.charAt(0));
      const info = el('span', 'review-link__info');
      info.append(el('span', 'review-link__name', r.name));
      if (r.rating || r.count) {
        const meta = el('span', 'review-link__meta');
        if (r.rating) meta.append(el('b', null, '★ ' + r.rating), r.count ? ' · ' : '');
        if (r.count) meta.append(r.count);
        info.append(meta);
      }
      const action = el('span', 'review-link__action');
      action.append(S.texts.reviewsButton, icon('arrow'));
      item.append(badge, info, action);
      list.append(item);
    });
  }

  function renderWorks() {
    if (!$('#works')) return;
    const works = (S.works || []).filter((w) => w && w.image);
    if (!works.length) return hideSection('works');
    const track = $('#works-track');
    const caption = (w) => {
      if (!w.services) return w.text || '';
      return w.services.map((id) => {
        const service = S.services.find((s) => s.id === id);
        if (!service) console.warn(`Примеры работ: услуги с кодом «${id}» нет в списке услуг`);
        return service && service.name;
      }).filter(Boolean).join(' · ');
    };
    const makeItem = (w, duplicate) => {
      const fig = el('figure', 'work');
      if (duplicate) fig.setAttribute('aria-hidden', 'true');
      const img = el('img');
      img.src = w.image;
      img.alt = duplicate ? '' : (w.title || S.name);
      img.loading = 'lazy';
      fig.append(img);
      const text = caption(w);
      if (w.title || text) {
        const figcaption = el('figcaption');
        if (w.title) figcaption.append(el('span', 'work__title', w.title));
        if (text) figcaption.append(el('span', 'work__text', text));
        fig.append(figcaption);
      }
      return fig;
    };
    // лента из двух одинаковых половин: когда первая уезжает, вторая встаёт на её место — бесконечная прокрутка
    works.forEach((w) => track.append(makeItem(w, false)));
    works.forEach((w) => track.append(makeItem(w, true)));
    track.style.setProperty('--marquee-duration', (S.worksSpeed || 7) * works.length + 's');

    if (reducedMotion) return;
    let frame;
    const easeSpeedTo = (target) => {
      const animation = track.getAnimations()[0];
      if (!animation) return;
      cancelAnimationFrame(frame);
      const from = animation.playbackRate;
      const startedAt = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - startedAt) / 500);
        animation.playbackRate = from + (target - from) * k;
        if (k < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    track.parentElement.addEventListener('mouseenter', () => easeSpeedTo(S.worksHoverSpeed ?? 0.4));
    track.parentElement.addEventListener('mouseleave', () => easeSpeedTo(1));
  }

  function renderContacts() {
    if (!$('#contacts')) return;
    const list = $('#contacts-list');
    const rows = [
      { icon: 'pin', label: 'Адрес', value: S.address, href: mapUrl, external: true },
      { icon: 'clock', label: 'Режим работы', value: hoursText },
      { icon: 'phone', label: 'Телефон', value: S.phone, href: phoneHref },
    ].filter((c) => c.value);
    if (!rows.length) return hideSection('contacts');
    rows.forEach((c) => {
      const row = el(c.href ? 'a' : 'div', 'contact');
      if (c.href) row.href = c.href;
      if (c.external) {
        row.target = '_blank';
        row.rel = 'noopener';
      }
      const text = el('div');
      text.append(el('div', 'contact__label', c.label), el('div', 'contact__value', c.value));
      row.append(icon(c.icon, 'contact__icon'), text);
      list.append(row);
    });

    const socials = $('#socials');
    Object.entries(S.socials || {}).filter(([, url]) => url).forEach(([key, url]) => {
      const a = el('a', 'social');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', key);
      a.innerHTML = ICONS[key] || ICONS.globe;
      socials.append(a);
    });
  }

  function setupHeader() {
    const header = $('#header');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function setupReveal() {
    if (reducedMotion || !('IntersectionObserver' in window)) return;
    const targets = $$('.section__head, .pricelist, .why__item, .step, .review-link, .contacts > *');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        node.classList.add('is-visible');
        observer.unobserve(node);
        node.addEventListener('transitionend', () => {
          node.classList.remove('reveal', 'is-visible');
          node.style.transitionDelay = '';
        }, { once: true });
      });
    }, { threshold: 0.12 });
    targets.forEach((node) => {
      const index = Array.prototype.indexOf.call(node.parentNode.children, node);
      node.style.transitionDelay = (index % 4) * 80 + 'ms';
      node.classList.add('reveal');
      observer.observe(node);
    });
  }

  setupTheme();
  setupSections();
  setupBasics();
  const pickService = setupBooking();
  renderServices(pickService);
  renderWhy();
  renderSteps();
  renderReviews();
  renderWorks();
  renderContacts();
  setupHeader();
  setupReveal();
})();
