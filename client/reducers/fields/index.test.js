import { ACTIONS, TYPES, FORMATS } from 'client/consts';
import reducer from './';

describe('Reducers', function () {
  describe('Fields', function () {

    it('Default state', function () {
      const actual = reducer();
      const expected = { list: [] };
      expect(actual).to.eql(expected);
    });

    it('FIELDS_ADD inserts a new element by category', function () {
      const action = {
        type: ACTIONS.FIELDS_ADD,
        payload: {
          cat: 'c123',
        },
      };
      const actual = reducer(void 0, action);
      expect(actual).to.have.property('list').to.have.lengthOf(1);

      const field = actual.list[0];
      expect(field).to.have.property('_id').to.be.an('string');
      expect(field).to.have.property('isValid').to.equal(false);
      expect(field).to.have.property('params').to.be.an('object').to.eql({
        cat: 'c123',
        position: 0,
        name: '',
        description: '',
        defaultTo: '',
        type: TYPES.STRING,
        format: FORMATS.NONE,
        enum: [],
        min: '',
        max: '',
        units: '',
        precision: '',
        accuracy: '',
      });
    });

    it('FIELDS_ADD sets position properly', function () {
      const cat = 'c1';
      const state = {
        list: [{ _id: 'f1', params: { cat, position: 0, name: 'field1' } }]
      };
      const action = {
        type: ACTIONS.FIELDS_ADD,
        payload: { cat },
      };
      const actual = reducer(state, action);
      expect(actual).to.have.property('list').to.have.lengthOf(2);
      expect(actual.list[0]).to.eql({ _id: 'f1', params: { cat, position: 0, name: 'field1' }});
      expect(actual.list[1]).to.have.property('params').to.include({ name: '', position: 1 });
    });

    it('FIELDS_SAVE updates a current field', function () {
      const state = { list: [{ _id: 'f1', isValid: true, params: { name: 'asd', description: '' } }] };
      const action = {
        type: ACTIONS.FIELDS_SAVE,
        payload: { _id: 'f1', params: { name: 'qwe', description: 'awesome' } }
      };
      const actual = reducer(state, action);
      const expected = { list: [{ _id: 'f1', isValid: true, params: { name: 'qwe', description: 'awesome' } }] };
      expect(actual).to.eql(expected);
    });

    it('FIELDS_SAVE does not update position', function () {
      const state = { list: [{ _id: 'f1', isValid: true, params: { name: 'asd', description: '', position: 5 } }] };
      const action = {
        type: ACTIONS.FIELDS_SAVE,
        payload: { _id: 'f1', params: { name: 'xqs', position: 10 } }
      };
      const actual = reducer(state, action);
      const expected = { list: [{ _id: 'f1', isValid: true, params: { name: 'xqs', description: '', position: 5 } }] };
      expect(actual).to.eql(expected);
    });

    it('FIELDS_MOVE updates category fields positions up', function () {
      const state = { list: [
        { _id: 'f1', params: { name: 'field1', position: 0 } },
        { _id: 'f2', params: { name: 'field2', position: 1 } },
        { _id: 'f3', params: { name: 'field3', position: 2 } },
        { _id: 'f4', params: { name: 'field4', position: 3 } }
      ] };
      const action = {
        type: ACTIONS.FIELDS_MOVE,
        payload: { _id: 'f2', position: 0 }
      };
      const actual = reducer(state, action);
      const expected = [
        { _id: 'f1', params: { name: 'field1', position: 1 } },
        { _id: 'f2', params: { name: 'field2', position: 0 } },
        { _id: 'f3', params: { name: 'field3', position: 2 } },
        { _id: 'f4', params: { name: 'field4', position: 3 } }
      ];
      expect(actual).to.have.property('list').to.eql(expected);
    });

    it('FIELDS_MOVE updates category fields positions down', function () {
      const state = { list: [
        { _id: 'f1', params: { name: 'field1', position: 0 } },
        { _id: 'f2', params: { name: 'field2', position: 1 } },
        { _id: 'f3', params: { name: 'field3', position: 2 } },
        { _id: 'f4', params: { name: 'field4', position: 3 } }
      ] };
      const action = {
        type: ACTIONS.FIELDS_MOVE,
        payload: { _id: 'f2', position: 2 }
      };
      const actual = reducer(state, action);
      const expected = [
        { _id: 'f1', params: { name: 'field1', position: 0 } },
        { _id: 'f2', params: { name: 'field2', position: 2 } },
        { _id: 'f3', params: { name: 'field3', position: 1 } },
        { _id: 'f4', params: { name: 'field4', position: 3 } }
      ];
      expect(actual).to.have.property('list').to.eql(expected);
    });

    it('FIELDS_REMOVE deletes an item from the list by id', function () {
      const state = { list: [
        { _id: 'f1' },
        { _id: 'f2' }
      ] };
      const action = {
        type: ACTIONS.FIELDS_REMOVE,
        payload: 'f1'
      };
      const actual = reducer(state, action);
      const expected = [{ _id: 'f2' }];
      expect(actual).to.have.property('list').to.eql(expected);
    });

  });
});
