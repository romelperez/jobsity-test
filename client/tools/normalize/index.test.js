import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';
import normalize from './';

describe('Normalize', function () {

  it('It is a function', function () {
    expect(normalize).to.be.a('function');
  });

  it('When no type STRING and format NONE, enum is empty', function () {
    const params = {
      type: ATTRIBUTES_TYPES.STRING,
      format: ATTRIBUTES_STRING_FORMATS.BOOLEAN,
      enum: ['1', '2'],
    };
    const actual = normalize(params);
    expect(actual).to.have.property('enum').to.eql([]);
  });

  it('When type STRING and format NONE, enum should be maintained', function () {
    const params = {
      type: ATTRIBUTES_TYPES.STRING,
      format: ATTRIBUTES_STRING_FORMATS.NONE,
      enum: ['1', '2'],
    };
    const actual = normalize(params);
    expect(actual).to.have.property('enum').to.eql(['1', '2']);
  });

  it('When no type STRING and format NUMBER, numeric props should be empty', function () {
    const params = {
      type: ATTRIBUTES_TYPES.STRING,
      format: ATTRIBUTES_STRING_FORMATS.NONE,
      unitsOfMeasurement: '10',
      rangeMin: '10',
      rangeMax: '10',
      precision: '10',
      accuracy: '10',
    };
    const actual = normalize(params);
    const expected = {
      unitsOfMeasurement: '',
      rangeMin: '',
      rangeMax: '',
      precision: '',
      accuracy: '',
    };
    expect(actual).to.contain(expected);
  });

  it('When type STRING and format NUMBER, numeric props should be maintained', function () {
    const params = {
      type: ATTRIBUTES_TYPES.STRING,
      format: ATTRIBUTES_STRING_FORMATS.NUMBER,
      unitsOfMeasurement: '10',
      rangeMin: '10',
      rangeMax: '10',
      precision: '10',
      accuracy: '10',
    };
    const actual = normalize(params);
    const expected = {
      unitsOfMeasurement: '10',
      rangeMin: '10',
      rangeMax: '10',
      precision: '10',
      accuracy: '10',
    };
    expect(actual).to.contain(expected);
  });

  it('When no type OBJECT, default and format should be maintained', function () {
    const params = {
      type: ATTRIBUTES_TYPES.STRING,
      format: ATTRIBUTES_STRING_FORMATS.BOOLEAN,
      defaultValue: 'true',
    };
    const actual = normalize(params);
    const expected = {
      type: ATTRIBUTES_TYPES.STRING,
      format: ATTRIBUTES_STRING_FORMATS.BOOLEAN,
      defaultValue: 'true',
    };
    expect(actual).to.contain(expected);
  });

  it('When type is OBJECT, default and format are empty', function () {
    const params = {
      type: ATTRIBUTES_TYPES.OBJECT,
      format: ATTRIBUTES_STRING_FORMATS.BOOLEAN,
      defaultValue: 'true',
    };
    const actual = normalize(params);
    const expected = {
      format: '',
      defaultValue: '',
    };
    expect(actual).to.contain(expected);
  });

});
