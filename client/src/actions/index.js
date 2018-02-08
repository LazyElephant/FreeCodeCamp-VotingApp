export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const REDIRECTED = 'REDIRECTED'
export const CLEAR_REDIRECT = 'CLEAR_REDIRECT'
export const FETCH = 'FETCH'
export const FETCH_COMPLETE = 'FETCH_COMPLETE'
export const ERROR = 'ERROR'

export const error = (message) => ({
  type: ERROR,
  message
})


export function logIn(username) {
  return {
    type: LOGGED_IN,
    username
  }
}

export function logOut() {
  return {
    type: LOGGED_OUT,
  }
}

// if more router functionality is added to redux, this will move
// to a separate file
export function redirected(path) {
  return {
    type: REDIRECTED,
    path
  }
}

export function clearRedirect() {
  return {
    type: CLEAR_REDIRECT
  }
}

export const fetch = (endpoint, data) => ({
  type: FETCH,
  endpoint,
  data
})

export const fetchComplete = (response) => ({
  type: FETCH_COMPLETE,
  response
})