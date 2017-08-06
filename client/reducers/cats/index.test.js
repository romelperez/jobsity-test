import { ACTIONS } from 'client/consts';
import reducer from './';

describe('Reducers', function () {
  describe('Categories', function () {

    it('Default state', function () {
      const actual = reducer();
      const expected = {
        isFetching: false,
        list: [],
      };
      expect(actual).to.eql(expected);
    });

    it('CATS_FETCHING', function () {
      const action = {
        type: ACTIONS.CATS_FETCHING,
        payload: true,
      };
      const actual = reducer(void 0, action);
      expect(actual).to.have.property('isFetching').to.be.true;
    });

    it('CATS_SAVE', function () {
      const action = {
        type: ACTIONS.CATS_SAVE,
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
