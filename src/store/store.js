/* eslint-disable import/no-anonymous-default-export */
import superagent from 'superagent';

let initialState = {
  stars: [],
  showCustomizer: false,
  bandPreference: [],
  genderPreference:'',
  preferredQTY:4,
};

export const updateShowCustomizer = () => {
  return { type: 'CUSTOM' };
};

export const updateBandPreference = preferenceArray => {
  console.log(`We in da store with dis array: ${preferenceArray}`);
  return { type: 'CUSTOM-BAND-PREFERENCE', payload: preferenceArray };
};

export const updateQTYPreference = preferredQTY => {
  console.log(`We in da store with this many: ${preferredQTY}`);
  return { type: 'CUSTOM-QTY-PREFERENCE', payload: preferredQTY };
};

export const updateGenderPreference = preference => {
  console.log(`We in da store with only ${preference}`);
  return { type: 'CUSTOM-GENDER-PREFERENCE', payload: preference };
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
      return { ...state, showCustomizer: !state.showCustomizer };
    case 'CUSTOM-BAND-PREFERENCE':
      return { ...state, bandPreference:payload };
      case 'CUSTOM-GENDER-PREFERENCE':
        return { ...state, genderPreference:payload };
        case 'CUSTOM-QTY-PREFERENCE':
          return { ...state, preferredQTY:payload };
    default:
      return state;
  }
};
