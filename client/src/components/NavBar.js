import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions'

class NavBar extends Component {
  render() {
    const { isAuthenticated, username, logOut } = this.props

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand col-auto" href="/">Pollster</a>
        {
          isAuthenticated ?
            <AuthenticatedNav name={username} onClick={logOut}/> :
            <UnauthenticatedNav />             
        }
      </nav>
    )
  }
}

const AuthenticatedNav = ({name, onClick}) => [
  <button 
    className="navbar-toggler" 
    type="button" 
    data-toggle="collapse" 
    data-target="#navbarSupportedContent" 
    aria-controls="navbarSupportedContent" 
    aria-expanded="false" 
    aria-label="Toggle navigation"
    key="toggle-button"
  >
    <span className="navbar-toggler-icon" />
  </button>,

  <div 
    className="collapse navbar-collapse" 
    id="navbarSupportedContent"
    key="toggle-menu"
  >
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ml-auto">
        <a className="nav-link" href="/my-polls">My Polls</a>
      </li>
      <li className="nav-item ml-auto">
        <a className="nav-link" href="/polls/create">Create</a>
      </li>
    </ul>
    <span
      className="navbar-text d-none d-lg-block mr-2"
      key="nav-greeting"
    >
      Welcome, { name }
    </span>
    <button 
      className="btn d-block btn-outline-secondary ml-auto ml-lg-0" 
      key="logout-button"
      onClick={onClick}
    >
      Sign Out
    </button>
  </div>,
]

const UnauthenticatedNav = () => [
  <button 
    className="navbar-toggler" 
    type="button" 
    data-toggle="collapse" 
    data-target="#navbarSupportedContent" 
    aria-controls="navbarSupportedContent" 
    aria-expanded="false" 
    aria-label="Toggle navigation"
    key="toggle-button"
  >
    <span className="navbar-toggler-icon" />
  </button>,

  <div 
    className="collapse navbar-collapse" 
    id="navbarSupportedContent"
    key="toggle-menu"
  >
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ml-auto">
        <a className="nav-link" href="/login">Sign In</a>
      </li>
      <li className="nav-item ml-auto">
        <a className="nav-link" href="/signup">Sign Up</a>
      </li>
    </ul>
  </div>
]

const mapStateToProps = ({user: {isAuthenticated, username}}) => ({
  isAuthenticated,
  username
})

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)