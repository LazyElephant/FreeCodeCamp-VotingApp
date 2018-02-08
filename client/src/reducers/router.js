import { 
  CLEAR_REDIRECT,
  REDIRECTED ,
} from '../actions'

const initialState = {
  redirectPath: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REDIRECTED:
      return { ...state, redirectPath: action.path}

    case CLEAR_REDIRECT: 
      return { ...state, redirectPath: ''}
      
    default:
      return state
  }
}