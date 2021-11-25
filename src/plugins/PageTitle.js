export default {
  install: (app, options) => {
    const application = app;
    application.config.globalProperties.$title = (title) => {
      document.title = `${title} | ${options.titleSuffix}`;
    };
  },
};
