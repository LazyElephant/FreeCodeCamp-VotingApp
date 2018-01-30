import { Action, LOGGED_IN, LOGGED_OUT } from '../actions'

const initialState = {
  isAuthenticated: false,
  email: ''
}

export default function reducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case LOGGED_IN:
      return { isAuthenticated: true, email: action.payload }
    
    case LOGGED_OUT:
      return { isAuthenticated: false, email: '' }

    default:
      return state
  }
}