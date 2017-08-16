import {
  ATTRIBUTES_ADD,
  ATTRIBUTES_SAVE,
  ATTRIBUTES_REMOVE
} from './types';

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
