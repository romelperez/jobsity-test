import { CATEGORIES_SAVE } from './types';

export const save = (list) => {
  return {
    type: CATEGORIES_SAVE,
    payload: list || [],
  };
};
