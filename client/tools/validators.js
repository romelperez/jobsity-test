window.vulcanval.extendLocale({
  id: 'en',
  msgs: {
    isRangeMin: 'A number below range max is required.',
    isRangeMax: 'A number above range min is required.',
    isRangePrecise: 'A valid step number between range min and range max is required.',
  }
});

window.vulcanval.addValidator('isRangeMin', function (value = '', opts = {}) {
  const max = this.get(opts.max);
  return +value <= +max;
});

window.vulcanval.addValidator('isRangeMax', function (value = '', opts = {}) {
  const min = this.get(opts.min);
  return +value >= +min;
});

window.vulcanval.addValidator('isRangePrecise', function (value = '', opts = {}) {
  const min = +this.get(opts.min);
  const max = +this.get(opts.max);
  return (max - min) % +value === 0;
});
