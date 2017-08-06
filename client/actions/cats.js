import axios from 'axios';
import { ACTIONS } from 'client/consts';

export const fetching = (isFetching) => {
  return {
    type: ACTIONS.CATS_FETCHING,
    payload: isFetching
  };
};

export const save = (list) => {
  return {
    type: ACTIONS.CATS_SAVE,
    payload: list
  };
};

/**
 * Fetch all categories from server.
 * @return {Promise}
 */
export const fetch = () => (dispatch) => {
  dispatch(fetching(true));

  return axios.get('/api/cats').then(res => {
    const cats = res.data;
    dispatch(save(cats));
    dispatch(fetching(false));
    return cats;
  }, () => {
    dispatch(fetching(false));
    return Promise.reject('There was an error.');
  });
};
