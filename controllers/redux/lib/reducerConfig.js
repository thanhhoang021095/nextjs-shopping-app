// import { createReducer } from '@reduxjs/toolkit'

export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const checkLocalStoreToRedux = (storeRedux, keyStoreNew, action, initData) => {
  return new Promise((resolve, reject) => {
    try {
      let data = getDataLocal(keyStoreNew)
      if (data) {
        data !== initData && storeRedux.dispatch(action(data))
      }
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const saveDataLocal = (key, data) => {
  localStorage && key &&  data && localStorage.setItem(key, JSON.stringify(data));
  return;
}

export const getDataLocal = key => {
  if (localStorage && key) {
    JSON.parse(localStorage.getItem(key))
    return;
  }
}

export const clearDataLocal = key => {
  localStorage && key && localStorage.removeItem(key);
  return ;
}