export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

export interface Action {
  type: string
  payload: any
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