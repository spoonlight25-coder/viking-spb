window.SITE = {
  name: 'Викинг',
  tagline: 'автомойка на Кржижановского',
  logo: '',
  phone: '+7 (921) 946-84-74',
  address: 'Санкт-Петербург, улица Кржижановского, 16 к2',
  mapUrl: 'https://2gis.ru/spb/firm/5348552841499339',
  hours: {
    text: 'Ежедневно 09:00–22:00',
    open: '09:00',
    close: '22:00',
  },
  privacyUrl: '',
  socials: { telegram: 'https://t.me/+79219468474', whatsapp: 'https://wa.me/79219468474', vk: '', website: '' },

  seo: {
    title: 'Автомойка Викинг в Санкт-Петербурге: запись онлайн',
    description: 'Автомойка Викинг на улице Кржижановского, 16 к2: комплексная и бесконтактная мойка, химчистка салона, полировка. Запись онлайн и по телефону.',
  },

  theme: { mode: 'dark', fonts: 'strict', shape: 'sharp', accent: '#eb4d4d', accent2: '#eaa648', tint: '#a63f3f' },
  layout: {
    hero: 'minimal',
    services: 'cards',
    sections: ['why', 'services', 'works', 'steps', 'reviews', 'contacts'],
  },

  hero: {
    eyebrow: 'Автомойка в Санкт-Петербурге',
    title: 'Чистая машина',
    titleAccent: 'в Невском районе',
    text: 'Комплексная и бесконтактная мойка, химчистка салона, полировка кузова. Запишитесь онлайн на сайте или позвоните.',
    image: 'images/hero.jpg',
    stats: [],
  },

  services: [
    { id: 'complex', name: 'Комплексная мойка', description: 'Комплексный уход за машиной за один визит.', price: 'от 1600 ₽', duration: null, category: 'Мойка' },
    { id: 'body', name: 'Мойка кузова', description: 'Мойка кузова снаружи.', price: 'от 900 ₽', duration: null, category: 'Мойка' },
    { id: 'contactless', name: 'Бесконтактная мойка', description: 'Кузов моют пеной и водой, щётки краски не касаются.', price: '', duration: null, category: 'Мойка' },
    { id: 'engine', name: 'Мойка двигателя', description: 'Аккуратно очистим подкапотное пространство от грязи.', price: '', duration: null, category: 'Мойка' },
    { id: 'rinse', name: 'Облив', description: 'Быстрое ополаскивание кузова. Для легковых и паркетников 300 ₽.', price: 'от 300 ₽', duration: null, category: 'Мойка' },
    { id: 'interior', name: 'Химчистка салона', description: 'Чистка салона автомобиля внутри.', price: '', duration: null, category: 'Салон и кузов' },
    { id: 'polish', name: 'Полировка кузова', description: 'Вернём кузову гладкость и блеск после зимы и дорог.', price: '', duration: null, category: 'Салон и кузов' },
    { id: 'quartz', name: 'Кварцевое покрытие', description: 'Легковые 1300 ₽, паркетники 1500 ₽, внедорожники 1700 ₽.', price: 'от 1300 ₽', duration: null, category: 'Салон и кузов' },
  ],

  advantages: [
    { icon: 'calendar', title: 'Запись заранее', text: 'Выберите время на сайте и приезжайте не наугад.' },
    { icon: 'clock', title: 'Каждый день до 22:00', text: 'Работаем с 09:00 и без выходных.' },
    { icon: 'coffee', title: 'Зал ожидания, кофе и Wi-Fi', text: 'Пока машину моют, можно взять кофе с собой и посидеть в зале ожидания.' },
    { icon: 'card', title: 'Платите как удобно', text: 'Картой, наличными, переводом с карты или по QR-коду.' },
  ],

  reviewLinks: [
    { name: '2ГИС', badge: '2', color: '#19aa1e', url: 'https://2gis.ru/spb/firm/5348552841499339/tab/reviews', rating: '4.9', count: '155 оценок' },
    { name: 'Яндекс Карты', badge: 'Я', color: '#fc3f1d', url: 'https://yandex.ru/maps/org/viking/96142047344/reviews/', rating: '5.0', count: '345 оценок' },
  ],

  steps: [
    { title: 'Выберите услугу', text: 'Отметьте нужные услуги в списке.' },
    { title: 'Выберите день и время', text: 'Укажите удобную дату и свободное время.' },
    { title: 'Оставьте имя и телефон', text: 'Заполните форму и нажмите «Записаться».' },
    { title: 'Приезжайте на мойку', text: 'Санкт-Петербург, улица Кржижановского, 16 к2.' },
  ],

  works: [
    { image: 'images/work-1.jpg', title: '', services: [] },
    { image: 'images/work-2.jpg', title: '', services: [] },
    { image: 'images/work-3.jpg', title: '', services: [] },
    { image: 'images/work-4.jpg', title: '', services: [] },
    { image: 'images/work-5.jpg', title: '', services: [] },
    { image: 'images/work-6.jpg', title: '', services: [] },
    { image: 'images/work-7.jpg', title: '', services: [] },
  ],
  worksSpeed: 7,

  booking: {
    enabled: true,
    daysAhead: 14,
    slotStep: 30,
    leadMinutes: 30,
    closedWeekdays: [],
    sendTo: '',
    busyUrl: '',
    successText: 'Заявка отправлена. Ждём вас в выбранное время.',
  },

  texts: {
    servicesTitle: 'Услуги автомойки',
    whyTitle: 'Чем удобно у нас',
    contactsTitle: 'Как нас найти',
    worksTitle: 'Загляните к нам',
    worksLead: 'Так выглядит мойка изнутри и снаружи.',
    ctaTitle: 'Запишитесь онлайн или позвоните',
    ctaText: 'Оставьте заявку в форме записи на сайте или позвоните.',
  },
};
