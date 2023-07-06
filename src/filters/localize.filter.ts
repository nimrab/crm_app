import store from '@/store';

const locales = {
  'RU-ru': {
    ProfileTitle: 'Профиль',
  },
  'EN-en': {
    ProfileTitle: 'Profile',
  },
};

export default function localizeFilter(key) {
  const locale = store.getters['info/userLocale'] ?? 'RU-ru';
  return locales[locale][key] || `Localize error: ${key} not found`;
}
