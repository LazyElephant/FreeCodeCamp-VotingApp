import { combineReducers } from 'redux'
import userReducer from './user'
import routerReducer from './router'
import fetchReducer from './fetch'

export default combineReducers({
  router: routerReducer,
  user: userReducer,
  fetch: fetchReducer,
})