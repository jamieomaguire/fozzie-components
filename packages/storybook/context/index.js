import i18nContext from './i18n.context';
import cookieContext from './cookie.context';
import loggerContext from './logger.context';
import dataLayer from './dataLayer.context';
import httpContext from './http.context';
import analyticsContext from './analytics.context';

const initialise = () => {
    i18nContext();
    cookieContext();
    loggerContext();
    dataLayer();
    httpContext();
    analyticsContext();
};

export default initialise;
