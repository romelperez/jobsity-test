import React from 'react';
import { mount } from 'enzyme';
import extend from 'extend';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { ATTRIBUTES_TYPES, ATTRIBUTES_STRING_FORMATS } from 'client/consts';
import AttributeForm from './';

const mountEl = function (ext) {
  const props = extend(true, {
    _id: 'u1',
    isValid: false,
    params: {
      name: 'custom-name',
      description: 'custom-description',
      defaultValue: 'custom-default-to',
      type: ATTRIBUTES_TYPES.STRING,
      format: ATTRIBUTES_STRING_FORMATS.NONE,
    }
  }, ext);
  return mount(
    <MuiThemeProvider>
      <AttributeForm {...props} />
    </MuiThemeProvider>
  );
};

describe('Components', function () {
  describe('AttributeForm', function () {

    it('Has class ".attribute-form"', function () {
      const el = mountEl();
      const actual = el.find('form.attribute-form');
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

    it('Has input defaultValue', function () {
      const el = mountEl();
      const actual = el.find('form input[type="text"][name="defaultValue"]');
      expect(actual).to.have.lengthOf(1);
      expect(actual.prop('value')).to.equal('custom-default-to');
    });

    it('Has select type', function () {
      const el = mountEl();
      const actual = el.find('form select[name="type"]');
      expect(actual).to.have.lengthOf(1);

      const value = actual.prop('value');
      expect(value).to.equal(ATTRIBUTES_TYPES.STRING);

      const opts = actual.find('option');
      expect(opts).to.have.lengthOf(2);

      const types = Object.keys(ATTRIBUTES_TYPES).map(k => ATTRIBUTES_TYPES[k]);
      opts.forEach(opt => {
        expect(types).to.include(opt.prop('value'));
      });
    });

    it('Has select type value object disables default and format', function () {
      const el = mountEl({
        params: { type: ATTRIBUTES_TYPES.OBJECT }
      });

      const type = el.find('form select[name="type"]');
      expect(type.prop('value')).to.equal(ATTRIBUTES_TYPES.OBJECT);

      const defaultValue = el.find('form input[name="defaultValue"]');
      expect(defaultValue.prop('disabled'), 'defaultValue disabled').to.be.true;

      const format = el.find('form select[name="format"]');
      expect(format.prop('disabled', 'format disabled')).to.be.true;
    });

    it('Changes select type to object disables default and format', function (done) {
      const spy = sinon.spy();
      const el = mountEl({
        params: {
          defaultValue: 'true',
          format: ATTRIBUTES_STRING_FORMATS.BOOLEAN,
        },
        onChange: spy,
      });

      const type = el.find('form select[name="type"]');
      expect(type.prop('value')).to.equal(ATTRIBUTES_TYPES.STRING);

      type.simulate('change', { target: { name: 'type', value: ATTRIBUTES_TYPES.OBJECT } });

      setTimeout(() => {
        expect(spy.called, 'spy called').to.be.true;
        expect(spy.calledWithMatch(props => {
          expect(props).have.property('params').to.contain({
            type: ATTRIBUTES_TYPES.OBJECT,
            defaultValue: '',
            format: ATTRIBUTES_STRING_FORMATS.NONE,
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
      expect(opts).to.have.lengthOf(6);

      const formats = Object.keys(ATTRIBUTES_STRING_FORMATS).map(k => ATTRIBUTES_STRING_FORMATS[k]);
      opts.forEach(opt => {
        expect(formats).to.include(opt.prop('value'));
      });
    });

  });
});
