import { DEFAULT_LOCALE, CHANGE_LOCALE } from '../actions/localeActions';

export default (initialLocale = DEFAULT_LOCALE) => (
    (previousLocale = initialLocale, { type, payload }) => {
        switch (type) {
        case CHANGE_LOCALE:
            return payload;
        default:
            return previousLocale;
        }
    }
);
