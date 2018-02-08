import * as React from 'react'
import { connect } from 'react-redux'
import { 
  clearRedirect, 
  logIn,
  fetch as apiFetch,
} from '../actions'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.username = ''
    this.password = ''
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    e.preventDefault()
    // TODO: validate form data
    const username = this.username.value
    const password = this.password.value
  
    this.props.apiFetch('login', { username, password }, )
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    if (!nextProps.username)
      return
    
    let { 
      logIn,
      redirectPath, 
      clearRedirect,
      history,
    } = this.props
    redirectPath = redirectPath || '/'

    logIn(nextProps.username)
    history.push(redirectPath)
    clearRedirect()
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="mb-4">Log In</h2>
        <form 
          onSubmit={this.submit} 
          name="loginForm"
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              className="form-control"
              type="text"  
              name="username" 
              ref={r => this.username = r}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password form-label">Password</label>
            <input 
              className="form-control"
              type="password"
              name="password" 
              ref={r => this.password = r} 
            />
          </div>
          <button 
            className="btn btn-primary"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  redirectPath: state.router.redirectPath,
  username: state.user.username,
})

const mapDispatchToProps = {
  apiFetch,
  clearRedirect,
  logIn
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)