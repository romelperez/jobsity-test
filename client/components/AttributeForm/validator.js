import vulcanval from 'vulcanval';
import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';

export default function ({ getNames }) {
  return vulcanval({
    fieldsets: [{
      name: 'stringNumber',
      fields: ['rangeMin', 'rangeMax', 'unitsOfMeasurement', 'precision', 'accuracy'],
      required: true,
      onlyIf () {
        return this.get('type') === ATTRIBUTES_TYPES.STRING
        && this.get('format') === ATTRIBUTES_STRING_FORMATS.NUMBER;
      },
    }],
    fields: [{
      name: 'name',
      required: true,
      validators: {
        isAlphanumeric: true,
        isLength: { min: 1, max: 64 },
        isValueDuplicated: { getValues: getNames }
      },
    }, {
      name: 'description',
      required: true,
      validators: {
        isLength: { min: 2, max: 64 },
      },
    }, {
      name: 'defaultValue',
      validators: {
        isLength: { max: 64 },
      },
    }, {
      name: 'type',
      required: true,
    }, {
      name: 'rangeMin',
      validators: {
        isFloat: true,
        isRangeMin: { max: 'rangeMax' },
      },
    }, {
      name: 'rangeMax',
      validators: {
        isFloat: true,
        isRangeMax: { min: 'rangeMin' },
      },
    }, {
      name: 'unitsOfMeasurement',
      validators: {
        isLength: { min: 1, max: 12 },
      },
    }, {
      name: 'precision',
      validators: {
        isFloat: true,
        isRangePrecise: { min: 'rangeMin', max: 'rangeMax' }
      }
    }, {
      name: 'accuracy',
      validators: {
        isFloat: true,
        isRangePrecise: { min: 'rangeMin', max: 'rangeMax' }
      }
    }]
  });
}
