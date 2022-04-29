import pageReducers from './pageReducers'
import storageReducers from './storageReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  page: pageReducers,
  storage: storageReducers,
})

export default rootReducer