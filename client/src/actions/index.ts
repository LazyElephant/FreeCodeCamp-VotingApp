export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const REDIRECTED = 'REDIRECTED'

export interface Action {
  type: string
  payload?: any
}

export function logIn(email: string) {
  return {
    type: LOGGED_IN,
    payload: email
  }
}

export function logOut() {
  return {
    type: LOGGED_OUT,
  }
}

// might be better to move this to a routing specific file
// but for now, it's staying since it's the only one
export function redirected(path: string) {
  return {
    type: REDIRECTED,
    payload: path
  }
}