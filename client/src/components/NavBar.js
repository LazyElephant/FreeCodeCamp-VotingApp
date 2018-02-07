import React, { Component } from 'react'

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand col-auto" href="/">Pollster</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto text-right">
            <li className="nav-item">
              <a className="nav-link" href="/login">Sign In</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/signup">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar