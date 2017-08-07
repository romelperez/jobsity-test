import mergeCollection from 'prhone-tools/merge-collections';
import moveInArray from 'prhone-tools/move-in-array';
import uuid from 'uuid';
import maxBy from 'lodash/maxBy';
import { ACTIONS, TYPES } from 'client/consts';

const initial = {
  list: [],
};

export default function reducer (state = initial, { type, payload } = {}) {
  switch (type) {

    case ACTIONS.FIELDS_ADD: {

      const { cat: catId } = payload || {};
      const catsByCat = state.list.filter(el => (el.params || {}).cat === catId);
      const maxEl = maxBy(catsByCat, el => el.params.position);
      const position = maxEl ? maxEl.params.position + 1 : 0;

      const field = {
        _id: uuid.v4(),
        isValid: false,
        params: {
          ...payload,
          position,
          name: '',
          description: '',
          defaultTo: '',
          type: TYPES.STRING,
          format: '',
          enum: [],
          min: '',
          max: '',
          units: '',
          precision: '',
          accuracy: '',
        }
      };
      const list = [ ...state.list, field ];

      return { ...state, list };
    }

    case ACTIONS.FIELDS_SAVE: {

      const field = { params: {}, ...payload };

      // Prevent position updates.
      delete field.params.position;

      const list = mergeCollection(
        state.list,
        Array.isArray(field) ? field : [field],
        { id: '_id' }
      );

      return { ...state, list };
    }

    case ACTIONS.FIELDS_MOVE: {

      const { _id, position: positionTo } = payload || {};

      const field = state.list.find(el => el._id === _id);
      const catId = field.params.cat;

      let items = state.list.
        filter(el => el.params.cat === catId).
        map(el => ({ _id: el._id, pos: el.params.position }));
      items = moveInArray(items, { id: _id, to: positionTo, key: '_id', positionKey: 'pos' });

      const list = mergeCollection(
        state.list,
        items.map(el => ({ _id: el._id, params: { position: el.pos } })),
        { id: '_id' }
      );

      return { ...state, list };
    }

    case ACTIONS.FIELDS_REMOVE: {
      const list = state.list.filter(el => el._id !== payload);
      return { ...state, list };
    }

    default:
      return state;
  }
}
