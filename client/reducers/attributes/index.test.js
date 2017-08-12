import {
  ATTRIBUTES_ADD,
  ATTRIBUTES_SAVE,
  ATTRIBUTES_REMOVE
} from 'client/actions/attributes';
import {
  ATTRIBUTES_TYPES,
  ATTRIBUTES_STRING_FORMATS
} from 'client/consts';
import reducer from './';

describe('Reducers', function () {
  describe('Attributes', function () {

    it('Default state', function () {
      const actual = reducer();
      const expected = { list: [] };
      expect(actual).to.eql(expected);
    });

    it('ATTRIBUTES_ADD inserts a new element by category', function () {
      const action = {
        type: ATTRIBUTES_ADD,
        payload: {
          name: 'attributeName',
          categoryId: 'c123',
        },
      };
      const actual = reducer(void 0, action);
      expect(actual).to.have.property('list').to.have.lengthOf(1);

      const attribute = actual.list[0];
      expect(attribute).to.have.property('_id').to.be.an('string');
      expect(attribute).to.have.property('isValid').to.equal(false);
      expect(attribute).to.have.property('params').to.eql({
        categoryId: 'c123',
        name: 'attributeName',
        description: '',
        defaultValue: '',
        type: ATTRIBUTES_TYPES.STRING,
        format: ATTRIBUTES_STRING_FORMATS.NONE,
        enum: [],
        rangeMin: '',
        rangeMax: '',
        unitsOfMeasurement: '',
        precision: '',
        accuracy: '',
      });
    });

    it('ATTRIBUTES_ADD without categoryId throws error', function () {
      const action = {
        type: ATTRIBUTES_ADD,
        payload: {},
      };
      expect(function () {
        reducer(void 0, action);
      }).to.throws();
    });

    it('ATTRIBUTES_SAVE updates a current attribute by id', function () {
      const state = {
        list: [{ _id: 'f1', isValid: true, params: { name: 'asd', description: '' } }]
      };
      const action = {
        type: ATTRIBUTES_SAVE,
        payload: { _id: 'f1', params: { name: 'qwe', description: 'awesome' } }
      };
      const actual = reducer(state, action);
      const expected = {
        list: [{ _id: 'f1', isValid: true, params: { name: 'qwe', description: 'awesome' } }]
      };
      expect(actual).to.eql(expected);
    });

    it('ATTRIBUTES_REMOVE deletes an item from the list by id', function () {
      const state = { list: [
        { _id: 'f1' },
        { _id: 'f2' }
      ] };
      const action = {
        type: ATTRIBUTES_REMOVE,
        payload: 'f1'
      };
      const actual = reducer(state, action);
      const expected = [{ _id: 'f2' }];
      expect(actual).to.have.property('list').to.eql(expected);
    });

  });
});
