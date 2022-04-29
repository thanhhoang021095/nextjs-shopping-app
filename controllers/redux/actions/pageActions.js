
import { SET_LOADING } from "../contanst"
export default class PageReduxAction {
  static setInternet(payload) {
    return {
      type: 'SET_INTERNET',
      payload,
    }
  }
  
  static setLoading(payload) {
    console.log('set loading....');
    return {
      type: SET_LOADING,
      payload
    }
  }

}
