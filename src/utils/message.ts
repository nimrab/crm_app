import { App, Plugin } from 'vue';

export const MessagePlugin: Plugin = {
  install: (app: App, options) => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$message = (text: string) => {
      M.toast({ html: text });
    };
  },
};

export const ErrorMessagePlugin: Plugin = {
  install: (app: App, options) => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$errorMessage = (text: string) => {
      M.toast({ html: `[Ошибка]: ${text}` });
    };
  },
};
