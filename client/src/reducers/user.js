import { 
  LOGGED_IN, 
  LOGGED_OUT 
} from '../actions'

const initialState = {
  isAuthenticated: false,
  username: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return { isAuthenticated: true, username: action.payload }
    
    case LOGGED_OUT:
      return { isAuthenticated: false, username: '' }

    default:
      return state
  }
}