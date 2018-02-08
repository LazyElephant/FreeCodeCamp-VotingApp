import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import middleware from './middleware'

const store = createStore(rootReducer, applyMiddleware(middleware))

store.dispatch({type: 'LOGGED_OUT'})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
