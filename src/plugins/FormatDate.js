/*
  $formatdate(dateObj, 'HH:MM dd.mm.yyyy')
*/

import dateFormat from 'dateformat';

export default {
  install: (app, options = { format: 'dd.mm.yyyy "at" HH:MM' }) => {
    const application = app;
    application.config.globalProperties.$formatdate = (date,
      format = options.format) => dateFormat(date, format);
  },
};
