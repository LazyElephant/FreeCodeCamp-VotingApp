import { Observable } from 'rxjs/Observable'
import { 
  FETCH, 
  FETCH_COMPLETE,
  LOG_OUT,
  error,
  logIn,
  loggedOut,
 } from '../actions';
import history from '../history'

export const fetchEpic = (action$) => {
  return action$
    .ofType(FETCH)
    .filter(({ endpoint }) => endpoint === 'index' || endpoint === 'detail' || endpoint === 'mypolls')
    .switchMap(({ endpoint, data }) => endpoints[endpoint](data))
    .map(response => ({ type: FETCH_COMPLETE, response }))
}

export const authEpic = (action$) => {
  return action$
    .ofType(FETCH)
    .filter(({ endpoint }) => endpoint === 'login' || endpoint ==='register')
    .switchMap(({ endpoint, data }) => endpoints[endpoint](data))
    .map(response => {
      if (response.username) {
        return logIn(response.username)
      }
      else {
        return error(response.message)
      }
    })
}

export const logOutEpic = (action$) => {
  return action$
    .ofType(LOG_OUT)
    .map(() => endpoints.logout())
    .map(() => loggedOut())
}

export const createUpdateEpic = (action$) => {
  return action$
    .ofType(FETCH)
    .filter(({ endpoint }) => endpoint === 'create' || endpoint === 'vote')
    .switchMap(({ endpoint, data }) => endpoints[endpoint](data))
    .map(response => {
      if (response.poll) {
        history.push(`/polls/${response.poll._id}`, { poll: response.poll })
        return { type: FETCH_COMPLETE, response }
      } else {
        return error(response.message)
      }
    })
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
  vote: function(body) {
    const url =`/api/polls/${body.id}`
    const params = {
      ...sharedParams,
      method: 'PUT',
      body: JSON.stringify(body)
    }
    return fetchJsonObservable(url, params)
  },

  create: function(body) {
    const url = '/api/polls/create'
    const params = {
      ...sharedParams,
      method: 'POST',
      body: JSON.stringify(body)
    }
    return fetchJsonObservable(url, params)
  },

  index: function() {
    const url = '/api/polls'
    const params = sharedParams
    return fetchJsonObservable(url, params)
  },

  detail: function({ id }) {
    const url = `/api/polls/${id}`
    const params = sharedParams
    return fetchJsonObservable(url, params)
  },

  login: function({ username, password }) {
    const url='/api/login'
    const params = {
      ...sharedParams,
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }
    return fetchJsonObservable(url, params)
  },

  register: function({ username, password }) {
    const url='/api/register'
    const params = {
      ...sharedParams,
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }
    return fetchJsonObservable(url, params)
  },

  logout: function() {
    const url='/api/logout'
    return fetchJsonObservable(url, sharedParams)
  }
}