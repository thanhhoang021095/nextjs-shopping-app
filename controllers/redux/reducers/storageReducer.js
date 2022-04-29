import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  SHOW_TOAST, 
  REMOVE_TOAST, 
  GET_USER_INFO, 
  GET_CART, 
  UPDATE_QTY_CART,
  GET_CATEGORY,
  GET_SUB_CATEGORY,
  SHOW_MODAL
} from '../contanst/index.ts'

const initState = {
  cart: [],
  toastInfo: {
    message: "",
    type: ""
  },
  userInfo: null,
  category: [],
  subCategory: [],
  modal: {
    status: false,
    data: null
  }
}

const storageReducers = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: action.payload }
    case REMOVE_FROM_CART:
      return { ...state, cart: action.payload }
    case UPDATE_QTY_CART:
      return { ...state, cart: action.payload  }
    case GET_CART: 
      return {...state, cart: action.payload }  
    case SHOW_TOAST:
      return {...state, toastInfo: {...action.payload}}
    case REMOVE_TOAST:
      return {...state, toastInfo: { ...action.payload}}
    case GET_USER_INFO:   
      return {...state, userInfo: action.payload }
    case GET_CATEGORY:   
      return {...state, category: action.payload }
    case GET_SUB_CATEGORY:   
      return {...state, subCategory: action.payload }
    case SHOW_MODAL:   
      return {...state, modal: {...action.payload }}
    default:
      return { ...state }
  }
}

export default storageReducers
