import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import middleware from './middleware'
import { logIn, logOut } from './actions';

const store = createStore(rootReducer, applyMiddleware(middleware))

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
