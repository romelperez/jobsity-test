import mergeCollection from 'prhone-tools/merge-collections';
import { CATEGORIES_SAVE } from 'client/actions/categories';

const initial = {
  list: [],
};

export default function reducer (state = initial, { type, payload } = {}) {
  switch (type) {

    case CATEGORIES_SAVE: {
      const list = mergeCollection(
        state.list,
        Array.isArray(payload) ? payload : [payload],
        { id: '_id', shallow: true }
      );
      return { ...state, list };
    }

    default:
      return state;
  }
}
