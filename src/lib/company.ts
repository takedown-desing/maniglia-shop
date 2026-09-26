// Вымышленная компания для демо-магазина. Все данные — заглушки, помечены как демо.
export const COMPANY = {
  brand: 'MANIGLIA',
  legalName: 'ООО «Манилья Трейд»',
  inn: '7700000000',
  kpp: '770001001',
  ogrn: '1227700000000',
  since: 2022,
  phoneMain: '+7 (495) 000-00-00',
  phoneMainNote: 'многоканальный',
  phoneMobile: '+7 (900) 000-00-00',
  phoneMobileNote: 'WhatsApp, Telegram',
  email: 'zakaz@maniglia.example',
  emailOpt: 'opt@maniglia.example',
  city: 'Москва',
  address: 'Москва, ул. Складочная, д. 1, стр. 18, офис 214',
  showroom: 'Шоурум: 2 этаж, вход со стороны парковки',
  metro: 'м. Савёловская, 7 минут пешком',
  geo: { lat: 55.8069, lon: 37.5926 },
  hours: [
    { d: 'Пн–Пт', t: '09:00–20:00' },
    { d: 'Сб', t: '10:00–18:00' },
    { d: 'Вс', t: 'выходной' },
  ],
  hoursSchema: ['Mo-Fr 09:00-20:00', 'Sa 10:00-18:00'],
  bank: 'АО «Демо-Банк», р/с 40702810000000000000, БИК 044500000',
};
export const tel = (s: string) => 'tel:' + s.replace(/[^+\d]/g, '');
export const mapSrc = (z = 16) => `https://yandex.ru/map-widget/v1/?ll=${COMPANY.geo.lon}%2C${COMPANY.geo.lat}&z=${z}&pt=${COMPANY.geo.lon},${COMPANY.geo.lat},pm2rdm`;
