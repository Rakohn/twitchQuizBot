import getText from "i18next";
import I18NexFsBackend from "i18next-fs-backend";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

getText
    .use(I18NexFsBackend)
    .init({
        lng: process.env.APP_LANGUAGE,
        fallbackLng:process.env.APP_FALLBACK_LANGUAGE,
        backend: {
            loadPath: __dirname + '../../../locales/{{lng}}/translation.json',
        },
    });

export default getText;

export function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
