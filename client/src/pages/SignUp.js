import * as React from 'react'
import { connect } from 'react-redux'
import { 
  clearRedirect, 
  fetch as apiFetch,
} from '../actions'

class SignUp extends React.Component {

  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  async submit(e) {
    e.preventDefault()
    // TODO: validate form data
    const username = this.username.value
    const password = this.password.value
    const confirmPassword = this.confirmPassword.value
    this.props.apiFetch('register', { username, password }, )
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.username)
      return
    
    let { 
      redirectPath, 
      clearRedirect,
      history,
    } = this.props
    redirectPath = redirectPath || '/'

    clearRedirect()
    history.push(redirectPath)
  }

  render() {
    return (
      <div className="container mt-5">
        <h2 className="mb-4">Sign Up</h2>
        <form 
          onSubmit={this.submit} 
          name="loginForm"
        >
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              className="form-control"
              type="text"  
              name="username" 
              ref={r => this.username = r}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              className="form-control"
              type="password"
              name="password" 
              ref={r => this.password = r} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password" className="form-label">Password</label>
            <input 
              className="form-control"
              type="password"
              name="confirm-password" 
              ref={r => this.confirmPassword = r} 
            />
          </div>
          <button 
            className="btn btn-primary"
            type="submit"
          >
            Sign Up
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)