import mergeCollection from 'prhone-tools/merge-collections';
import { ACTIONS } from 'client/consts';

const initial = {
  list: [],
};

export default function reducer (state = initial, { type, payload }) {
  switch (type) {

    case ACTIONS.ATTRS_SAVE: {
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
