import { CATEGORIES_SAVE } from 'client/actions/types';
import reducer from './';

describe('Reducers', function () {
  describe('Categories', function () {

    it('Default state', function () {
      const actual = reducer();
      const expected = { list: [] };
      expect(actual).to.eql(expected);
    });

    it('CATEGORIES_SAVE', function () {
      const action = {
        type: CATEGORIES_SAVE,
        payload: [
          { _id: '1', name: 'settings' },
          { _id: '2', name: 'commands' }
        ],
      };
      const actual = reducer(void 0, action);
      const expectedList = [
        { _id: '1', name: 'settings' },
        { _id: '2', name: 'commands' }
      ];
      expect(actual).to.have.property('list').to.eql(expectedList);
    });

  });
});
