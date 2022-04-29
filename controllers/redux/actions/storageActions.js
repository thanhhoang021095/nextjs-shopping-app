import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_QTY_CART, 
  SHOW_TOAST,
  REMOVE_TOAST,
  GET_USER_INFO, 
  GET_CART, 
  GET_CATEGORY,
  GET_SUB_CATEGORY,
  SHOW_MODAL
} from "../contanst/index.ts";
import { saveDataLocal } from '../lib/reducerConfig'
import api from "controllers/baseApi";
import endpoint from "src/utils/endpoints";
import { store } from 'controllers/redux/store/configureStore';

let offToastTimer, onToastTimer;
export default class StorageReduxAction {
  static addToCart(prodData, userId, option = {}) {
    function cbAction (payload) {
      return {
        type: ADD_TO_CART,
        payload: payload,
      }
    }

    if (userId) {
      return async (dispatch) => {
        const { specificQty = 0, size = {}, color = {}} = option;
        const res = await api.post(`${endpoint['cart']}/add`, {
          id: userId,
          product: prodData,
          option: {
            specificQty,
            size,
            color
          }
        })
        res?.cart && dispatch(cbAction(res.cart))
      }
    }
  }

  static removeFromCart(prodData, userId) {
    function cbAction (payload) {
      return {
        type: REMOVE_FROM_CART,
        payload: payload,
      }
    }

    if (userId) {
      return async (dispatch) => {
        const res = await api.post(`${endpoint['cart']}/remove`, {
          id: userId,
          product: prodData
        })
        res?.cart && dispatch(cbAction(res.cart));
      }
    }
  }

  static updateQtyCart(prodData, userId, action = "increase") {
    function cbAction (payload) {
      return {
        type: UPDATE_QTY_CART,
        payload: payload,
      }
    }
    if (userId) {
      return async (dispatch) => {
        const res = await api.put(`${endpoint['cart']}/update`, {
          id: userId,
          product: prodData,
          action,
        })
        res?.cart && dispatch(cbAction(res.cart));
      }
    }
  }

  static showToast(message = "", type = "default") {
    function cbAction (payload) {
      return {
        type: SHOW_TOAST,
        payload,
      }
    }

    return (dispatch) => {
      onToastTimer && clearTimeout(onToastTimer);
      offToastTimer && clearTimeout(offToastTimer);

      onToastTimer = setTimeout(() => {
        dispatch(cbAction({
          message,
          type
        }));
        clearTimeout(onToastTimer)
      }, 500);  

      offToastTimer = setTimeout(() => {
        dispatch(StorageReduxAction.removeToast())
        clearTimeout(offToastTimer)
      }, 3000);  
    }
  }

  static removeToast() {
    return {
      type: REMOVE_TOAST,
      payload: {
        message: '',
        type: ''
      },
    }
  }

  static getUserInfo(info) {
    return {
      type: GET_USER_INFO,
      payload: info
    }
  }

  static getCart(cartArr) {
    return {
      type: GET_CART,
      payload: cartArr
    }
  }

  static getCategory() {
    function cbAction (data) {
      return {
        type: GET_CATEGORY,
        payload: data
      }
    };

    const { storage: { category = [] }} = store.getState();
    return async (dispatch) => {
      if (!category.length) {
        const res = await api.get(endpoint['category']);
        dispatch(cbAction(res));
      }
    }
  }

  static getSubCategory() {
    function cbAction (data) {
      return {
        type: GET_SUB_CATEGORY,
        payload: data
      }
    };

    const { storage: { subCategory = [] }} = store.getState();
    return async (dispatch) => {
      if (!subCategory.length) {
        const res = await api.get(endpoint['subCategory']);
        dispatch(cbAction(res));
      }
    }
  }

  static showModal(status, data = null) {
    return {
      type: SHOW_MODAL,
      payload: {
        status,
        data
      }
    }
  }
}