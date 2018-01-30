import { 
  Action, 
  CLEAR_REDIRECT,
  REDIRECTED ,
} from '../actions'

const initialState = {
  redirectPath: '',
}

export default function reducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case REDIRECTED:
      return { ...state, redirectPath: action.payload}

    case CLEAR_REDIRECT: 
      return { ...state, redirectPath: ''}
      
    default:
      return state
  }
}