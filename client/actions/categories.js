export const CATEGORIES_SAVE = 'CATEGORIES_SAVE';

export const save = (list) => {
  return {
    type: CATEGORIES_SAVE,
    payload: list || [],
  };
};
