import { createReducer } from '@reduxjs/toolkit';
import { SET_LOADING } from '../contanst';

const initState = {
  isLoading: false,
}

const pageReducers = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING: 
      return {...state, isLoading: action.payload }  
    default:
      return { ...state }
  }
}

export default pageReducers;