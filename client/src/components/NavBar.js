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
            <SignOutButton name={username} onClick={logOut}/> :
            <ToggleButton />             
        }
      </nav>
    )
  }
}

const SignOutButton = ({name, onClick}) => [
  <span
    className="navbar-text hidden-xs-down ml-auto mr-2"
    key="nav-greeting"
  >
    Welcome, { name }
  </span>,
  <button 
    className="btn btn-primary" 
    key="logout-button"
    onClick={onClick}
  >
    Sign Out
  </button>
]

const ToggleButton = () => [
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
    <ul className="navbar-nav mr-auto text-right">
      <li className="nav-item">
        <a className="nav-link" href="/login">Sign In</a>
      </li>
      <li className="nav-item">
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