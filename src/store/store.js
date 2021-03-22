/* eslint-disable import/no-anonymous-default-export */
import superagent from 'superagent';

let initialState = {
  stars: [],
  showCustomizer: false,
};

export const updateShowCustomizer = () => {
  console.log('is this working??');
  return{ type: 'CUSTOM'} 
};

export const get = () => dispatch => {
  return superagent
    .get('https://k-pop-api.herokuapp.com/kpop')
    .then(response => {
      dispatch(getAction(response.body));
    });
};

export const getAction = payload => {
  return {
    type: 'GET',
    payload: payload,
  };
};

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'GET':
      return { ...state, results: payload };
    case 'CUSTOM':
      return { ...state, showCustomizer:!state.showCustomizer };
    default:
      return state;
  }
};
