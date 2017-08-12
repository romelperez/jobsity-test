export const ATTRIBUTES_ADD = 'ATTRIBUTES_ADD';
export const ATTRIBUTES_SAVE = 'ATTRIBUTES_SAVE';
export const ATTRIBUTES_REMOVE = 'ATTRIBUTES_REMOVE';

export const add = (props) => {
  return {
    type: ATTRIBUTES_ADD,
    payload: props
  };
};

export const save = (item) => {
  return {
    type: ATTRIBUTES_SAVE,
    payload: item
  };
};

export const remove = (id) => {
  return {
    type: ATTRIBUTES_REMOVE,
    payload: id
  };
};
