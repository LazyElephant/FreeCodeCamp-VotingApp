import { Observable } from 'rxjs/Observable'
import { 
  FETCH, 
  FETCH_COMPLETE, 
 } from '../actions';

export const fetchMiddleware = (action$) => {
  return action$.ofType(FETCH)
    .switchMap(({ endpoint, data }) => endpoints[endpoint](data))
    .map(response => ({type: FETCH_COMPLETE, response}))
}

const sharedParams = {
  headers: [
    ['Accept', 'application/json'],
    ['Content-Type', 'application/json']
  ],
  credentials: 'same-origin',
}     

function fetchJsonObservable(url, params) {
  return Observable.from(fetch(url, params).then(res => res.json()))
}

// request creators
const endpoints = {
  create: function({title, options}) {
    const url = '/api/polls/create'
    const params = {
      ...sharedParams,
      method: 'POST',
      body: JSON.stringify({title, options})
    }
    return fetchJsonObservable(url, params)
  },

  index: function() {
    const url = '/api/polls'
    const params = sharedParams
    return fetchJsonObservable(url, params)
  },

  detail: function({id}) {
    const url = `/api/polls/${id}`
    const params = sharedParams
    return fetchJsonObservable(url, params)
  },

  login: function({username, password}) {
    const url='/api/login'
    const params = {
      ...sharedParams,
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    return fetchJsonObservable(url, params)
  }
}