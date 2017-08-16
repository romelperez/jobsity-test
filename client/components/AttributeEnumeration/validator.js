import vulcanval from 'vulcanval';

export default vulcanval({
  fields: [{
    name: 'enumeration',
    required: true,
    validators: {
      isAlphanumeric: true,
      isLength: { min: 1, max: 64 },
    },
  }]
});
