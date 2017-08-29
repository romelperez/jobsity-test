import vulcanval from 'vulcanval';
import './';

describe('Validators', function () {

  describe('isRangeMin', function () {

    it('Returns errors when max is below than value', function () {
      const validator = vulcanval({
        fields: [
          { name: 'min', validators: { isRangeMin: { max: 'max' } } },
          { name: 'max' },
        ]
      });
      const map = { min: '50', max: '20' };
      const actual = validator.validate(map);
      expect(actual).to.be.an('object').to.have.property('min');
    });

    it('Returns false when max is above than value', function () {
      const validator = vulcanval({
        fields: [
          { name: 'min', validators: { isRangeMin: { max: 'max' } } },
          { name: 'max' },
        ]
      });
      const map = { min: '50', max: '70' };
      const actual = validator.validate(map);
      expect(actual).to.be.false;
    });

  });

  describe('isRangeMax', function () {

    it('Returns errors when min is above than value', function () {
      const validator = vulcanval({
        fields: [
          { name: 'min' },
          { name: 'max', validators: { isRangeMax: { min: 'min' } } },
        ]
      });
      const map = { min: '50', max: '20' };
      const actual = validator.validate(map);
      expect(actual).to.be.an('object').to.have.property('max');
    });

    it('Returns false when min is below than value', function () {
      const validator = vulcanval({
        fields: [
          { name: 'min' },
          { name: 'max', validators: { isRangeMax: { min: 'min' } } },
        ]
      });
      const map = { min: '50', max: '70' };
      const actual = validator.validate(map);
      expect(actual).to.be.false;
    });

  });

  describe('isRangePrecise', function () {

    it('Return errors when value is not an step number', function () {
      const validator = vulcanval({
        fields: [
          { name: 'min' },
          { name: 'max' },
          { name: 'precise', validators: { isRangePrecise: { min: 'min', max: 'max' } } },
        ]
      });
      const map = { min: '0', max: '15' };
      expect(validator.validate({ ...map, precise: '2' }), 'value 2').to.have.property('precise');
      expect(validator.validate({ ...map, precise: '4' }), 'value 4').to.have.property('precise');
      expect(validator.validate({ ...map, precise: '6' }), 'value 6').to.have.property('precise');
      expect(validator.validate({ ...map, precise: '9' }), 'value 9').to.have.property('precise');
    });

    it('Return false when value is an step number', function () {
      const validator = vulcanval({
        fields: [
          { name: 'min' },
          { name: 'max' },
          { name: 'precise', validators: { isRangePrecise: { min: 'min', max: 'max' } } },
        ]
      });
      const map = { min: '0', max: '15' };
      expect(validator.validate({ ...map, precise: '1' })).to.be.false;
      expect(validator.validate({ ...map, precise: '5' })).to.be.false;
      expect(validator.validate({ ...map, precise: '15' })).to.be.false;
    });

  });

  describe('isValueDuplicated', function () {

    it('Throw error if no getValues property was provied', function () {
      const validator = vulcanval({
        fields: [{
          name: 'value',
          validators: { isValueDuplicated: true }
        }]
      });
      expect(function () {
        validator.validate({ value: 'val' });
      }).to.throw();
    });

    it('Return error if duplicated value', function () {
      const getValues = () => ['val1', 'val2', 'val2'];
      const validator = vulcanval({
        fields: [{
          name: 'value',
          validators: { isValueDuplicated: { getValues } }
        }]
      });
      const map = { value: 'val2' };
      const actual = validator.validate(map);
      expect(actual).to.have.property('value').to.be.a('string');
    });

    it('Return false if no duplicated value', function () {
      const getValues = () => ['val1', 'val2', 'val3'];
      const validator = vulcanval({
        fields: [{
          name: 'value',
          validators: { isValueDuplicated: { getValues } }
        }]
      });
      const map = { value: 'val2' };
      const actual = validator.validate(map);
      expect(actual).to.be.false;
    });

  });

});
