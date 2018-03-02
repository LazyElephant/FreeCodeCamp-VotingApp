import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import middleware from './middleware'
import { logIn, logOut } from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
))

let user = localStorage.getItem('LE-FCCVotingApp')
if (user) {
  user = JSON.parse(user)
  user.expiration < Date.now() ? 
    store.dispatch(logOut()) :
    store.dispatch(logIn(user.username))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
