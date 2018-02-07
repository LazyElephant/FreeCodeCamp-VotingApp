import { combineReducers } from 'redux'
import userReducer from './user'
import routerReducer from './router'

export default combineReducers({
  router: routerReducer,
  user: userReducer,
})