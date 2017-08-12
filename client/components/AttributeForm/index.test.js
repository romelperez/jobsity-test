/*import React from 'react';
import { mount } from 'enzyme';
import extend from 'extend';

import { TYPES, FORMATS } from 'client/consts';
import Field from './';

const mountEl = function (ext) {
  const props = extend(true, {
    _id: 'u1',
    isValid: false,
    params: {
      name: 'custom-name',
      description: 'custom-description',
      defaultTo: 'custom-default-to',
      type: TYPES.STRING,
      format: '',
    }
  }, ext);
  return mount(<Field {...props} />);
};

describe('Components', function () {
  describe('Field', function () {

    it('Has class ".field"', function () {
      const el = mountEl();
      const actual = el.find('form.field');
      expect(actual).to.have.lengthOf(1);
    });

    it('Has input name', function () {
      const el = mountEl();
      const actual = el.find('form input[type="text"][name="name"]');
      expect(actual).to.have.lengthOf(1);
      expect(actual.prop('value')).to.equal('custom-name');
    });

    it('Has input description', function () {
      const el = mountEl();
      const actual = el.find('form input[type="text"][name="description"]');
      expect(actual).to.have.lengthOf(1);
      expect(actual.prop('value')).to.equal('custom-description');
    });

    it('Has input defaultTo', function () {
      const el = mountEl();
      const actual = el.find('form input[type="text"][name="defaultTo"]');
      expect(actual).to.have.lengthOf(1);
      expect(actual.prop('value')).to.equal('custom-default-to');
    });

    it('Has select type', function () {
      const el = mountEl();
      const actual = el.find('form select[name="type"]');
      expect(actual).to.have.lengthOf(1);

      const value = actual.prop('value');
      expect(value).to.equal(TYPES.STRING);

      const opts = actual.find('option');
      expect(opts).to.have.lengthOf(2 + 1);  // Materialize adds extra option

      const types = Object.keys(TYPES).map(k => TYPES[k]);
      opts.forEach(opt => {
        if (opt.prop('value')) {
          expect(types).to.include(opt.prop('value'));
        }
      });
    });

    it('Has select type value object disables default and format', function () {
      const el = mountEl({
        params: { type: TYPES.OBJECT }
      });

      const type = el.find('form select[name="type"]');
      expect(type.prop('value')).to.equal(TYPES.OBJECT);

      const defaultTo = el.find('form input[name="defaultTo"]');
      expect(defaultTo.prop('disabled'), 'defaultTo disabled').to.be.true;

      const format = el.find('form select[name="format"]');
      expect(format.prop('disabled', 'format disabled')).to.be.true;
    });

    it('Changes select type to object disables default and format', function (done) {
      const spy = sinon.spy();
      const el = mountEl({
        params: {
          defaultTo: 'true',
          format: FORMATS.BOOLEAN,
        },
        onChange: spy,
      });

      const type = el.find('form select[name="type"]');
      expect(type.prop('value')).to.equal(TYPES.STRING);

      type.simulate('change', { target: { name: 'type', value: TYPES.OBJECT } });

      setTimeout(() => {
        expect(spy.called, 'spy called').to.be.true;
        expect(spy.calledWithMatch(props => {
          expect(props).have.property('params').to.contain({
            type: TYPES.OBJECT,
            defaultTo: '',
            format: FORMATS.NONE,
          });
          return true;
        }), 'spy match').to.be.true;

        done();
      }, 10);
    });

    it('Has select format', function () {
      const el = mountEl();
      const actual = el.find('form select[name="format"]');
      expect(actual).to.have.lengthOf(1);

      const value = actual.prop('value');
      expect(value).to.equal('');

      const opts = actual.find('option');
      expect(opts).to.have.lengthOf(6 + 1);  // Materialize adds extra option

      const formats = Object.keys(FORMATS).map(k => FORMATS[k]);
      opts.forEach(opt => {
        if (opt.prop('value')) {
          expect(formats).to.include(opt.prop('value'));
        }
      });
    });

  });
});
*/
