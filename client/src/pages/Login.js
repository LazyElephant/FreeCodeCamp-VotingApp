import * as React from 'react'
import { connect } from 'react-redux'
import { clearRedirect, logIn } from '../actions'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.username = ''
    this.password = ''
    this.submit = this.submit.bind(this)
  }

  async callLogInApi(username, password) {
    const res = await fetch('/api/login', {
      headers: [
        ['Accept', 'application/json'],
        ['Content-Type', 'application/json']
      ],
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    const json = await res.json()

    if (res.status !== 200) {
      return {error: res.status, message: json.message}
    } else {
      return json
    }
  }

  async submit(e) {
    e.preventDefault()
    // TODO: validate form data
    const username = this.username.value
    const password = this.password.value
  
    const res = await this.callLogInApi(username, password)
      
    if (res.error) {
      // console.error("something didn't go right: ", res.message)
    } 
    
    // save user info to redux store and redirect to their intended path
    // if they were previously redirected here
    let redirectPath = this.props.redirectPath || '/'

    this.props.logIn(username)
    this.props.history.push(redirectPath)
    this.props.clearRedirect()
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
  redirectPath: state.router.redirectPath
})

export default connect(mapStateToProps, {clearRedirect, logIn})(Login)