/* eslint-disable import/no-anonymous-default-export */
import { request, gql } from 'graphql-request';

let initialState = {
  customBand: [],
  showCustomizer: false,
  bandPreference: [],
  genderPreference: '',
  preferredQTY: 8,
  makeAPICall: true,
};

const query = gql`
query{
  performersCustom (limit:${initialState.preferredQTY}) {
    name
    gender
    group
    photo
    specialty
    bio
  }
}
`;

export const getNewData = () => dispatch => {
  request('https://k-pop-api-v2.herokuapp.com/graphql', query)
    .then(data => {
      console.log('You got new data!');
      dispatch(getAction(data));
    })
    .catch(err => console.log(err));
};

export const getAction = payload => {
  return {
    type: 'DATA',
    payload: payload,
  };
};

export const updateShowCustomizer = () => {
  return { type: 'CUSTOM' };
};

export const updateMakeAPICall = () => {
  return { type: 'NEED-DATA' };
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

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'DATA':
      return { ...state, customBand: payload.performersCustom };
    case 'NEED-DATA':
      console.log(`state.makeAPICall is now ${!state.makeAPICall}`);
      return { ...state, makeAPICall: !state.makeAPICall };
    case 'CUSTOM':
      return { ...state, showCustomizer: !state.showCustomizer };
    case 'CUSTOM-BAND-PREFERENCE':
      return { ...state, bandPreference: payload };
    case 'CUSTOM-GENDER-PREFERENCE':
      return { ...state, genderPreference: payload };
    case 'CUSTOM-QTY-PREFERENCE':
      return { ...state, preferredQTY: payload };
    default:
      return state;
  }
};
