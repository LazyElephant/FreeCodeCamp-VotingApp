import { Action, LOGGED_IN, LOGGED_OUT, REDIRECTED } from '../actions'

const initialState = {
  isAuthenticated: false,
  email: '',
  redirectedFrom: '',
}

export default function reducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, isAuthenticated: true, email: action.payload }
    
    case LOGGED_OUT:
      return { ...state, isAuthenticated: false, email: '' }

    case REDIRECTED:
      return { ...state, redirectedFrom: action.payload}
    default:
      return state
  }
}