window.vulcanval.extendLocale({
  id: 'en',
  msgs: {
    isTime: 'A valid time is required.',
  }
});

window.vulcanval.addValidator('isTime', function (value = '') {
  return (/^\d\d\:\d\d$/).test(String(value));
});
