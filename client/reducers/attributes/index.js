import mergeCollection from 'prhone-tools/merge-collections';
import uuid from 'uuid';

import {
  ATTRIBUTES_ADD,
  ATTRIBUTES_SAVE,
  ATTRIBUTES_REMOVE
} from 'client/actions/attributes';
import {
  ATTRIBUTES_TYPES,
  ATTRIBUTES_STRING_FORMATS
} from 'client/consts';

const initial = {
  list: [],
};

export default function reducer (state = initial, { type, payload } = {}) {
  switch (type) {

    case ATTRIBUTES_ADD: {

      if (!payload || !payload.categoryId) {
        throw new Error('A categoryId is required.');
      }

      const attribute = {
        _id: uuid.v4(),
        isValid: false,
        params: {
          name: '',
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
          ...payload,
        }
      };
      const list = [ ...state.list, attribute ];

      return { ...state, list };
    }

    case ATTRIBUTES_SAVE: {

      const attribute = { params: {}, ...payload };

      const list = mergeCollection(
        state.list,
        Array.isArray(attribute) ? attribute : [attribute],
        { id: '_id', shallow: true }
      );

      return { ...state, list };
    }

    case ATTRIBUTES_REMOVE: {
      const list = state.list.filter(el => el._id !== payload);
      return { ...state, list };
    }

    default:
      return state;
  }
}
