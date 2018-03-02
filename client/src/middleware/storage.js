import { 
  LOGGED_IN,
  LOGGED_OUT,
} from '../actions'

export default store => dispatch => action => {
if (action.type === LOGGED_IN) {
    let expiration = Date.now() + 24*60*60*1000
    let value = JSON.stringify({
      username: action.username, 
      expiration
    })
    localStorage.setItem('LE-FCCVotingApp', value)    
  }

  if (action.type === LOGGED_OUT) {
    localStorage.removeItem('LE-FCCVotingApp')
  }

  dispatch(action)
}
