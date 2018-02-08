import { 
  FETCH_COMPLETE,
} from '../actions'

export default (state = {}, action) => {
  switch (action.type) {

  case FETCH_COMPLETE:
    return { ...action.response }

  default:
    return state
  }
}
