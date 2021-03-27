/* eslint-disable import/no-anonymous-default-export */
import { request, gql } from 'graphql-request';

let initialState = {
  customBand: [],
  showCustomizer: false,
  bandPreference: [
    'Blackpink',
    'Red Velvet',
    'BTS',
    'TWICE',
    '(G)I-DLE',
    'Exo',
  ],
  genderPreference: ['male', 'female'],
  preferredQTY: 8,
  bandName:''
};


const query = (limit, gender, bandPreference) => gql`
  query{
    performersCustom(
      gender:${JSON.stringify(gender)},
      limit:${limit},
      group:${JSON.stringify(bandPreference)}
     )
    {
    name
      gender
      group
      photo
      specialty
      bio
    }
  }
  `;

export const getNewData = (limit, gender, bandPreference) => dispatch => {
  console.log(
    'This is being passed to getData: ',
    limit,
    gender,
    bandPreference
  );
  request(
    'https://k-pop-api-v2.herokuapp.com/graphql',
    query(limit, gender, bandPreference)
  )
    .then(data => {
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

export const generateName = () => {
  let nameArray = ['Meow', 'Pink', 'Love', 'Heart', 'Puppy', 'Cuddle', 'Glitter', 'Sparkle', 'Glam', 'Squad', 'Glitzy', 'Bubbles', 'Power', 'Queen'];
  let randomItem = nameArray[Math.floor(Math.random()*nameArray.length)];
  let randomItem2 = nameArray[Math.floor(Math.random()*nameArray.length)];
  return { type: 'NAME' , payload:`${randomItem} ${randomItem2}`};
};

export const updateShowCustomizer = () => {
  return { type: 'CUSTOM' };
};

export const updateMakeAPICall = () => {
  return { type: 'NEED-DATA' };
};

export const updateBandPreference = preferenceArray => {
  return { type: 'CUSTOM-BAND-PREFERENCE', payload: preferenceArray };
};

export const updateQTYPreference = preferredQTY => {
  return { type: 'CUSTOM-QTY-PREFERENCE', payload: +preferredQTY };
};

export const updateGenderPreference = preference => {
  console.log(`You are updating gender to: ${preference}`);
  return { type: 'CUSTOM-GENDER-PREFERENCE', payload: preference };
};

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'DATA':
      return { ...state, customBand: payload.performersCustom };
    case 'NEED-DATA':
      return { ...state, makeAPICall: !state.makeAPICall };
    case 'CUSTOM':
      return { ...state, showCustomizer: !state.showCustomizer };
    case 'CUSTOM-BAND-PREFERENCE':
      return { ...state, bandPreference: payload };
    case 'CUSTOM-GENDER-PREFERENCE':
      return { ...state, genderPreference: payload };
    case 'CUSTOM-QTY-PREFERENCE':
      return { ...state, preferredQTY: payload };
      case 'NAME':
        console.log('name payload: ',payload)
        return { ...state, bandName: payload };
    default:
      return state;
  }
};
