import { ACTIONS } from 'client/consts';

export const add = (props) => {
  return {
    type: ACTIONS.FIELDS_ADD,
    payload: props
  };
};

export const save = (item) => {
  return {
    type: ACTIONS.FIELDS_SAVE,
    payload: item
  };
};

export const move = (item) => {
  return {
    type: ACTIONS.FIELDS_MOVE,
    payload: item
  };
};

export const remove = (id) => {
  return {
    type: ACTIONS.FIELDS_REMOVE,
    payload: id
  };
};
