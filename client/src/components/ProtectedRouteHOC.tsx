import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { redirected } from '../actions'

export default function makeProtectedRoute(C: any) {
  class ProtectedRoute extends React.Component<any, any> {
    render() {
      const { isAuthenticated, ...rest } = this.props
      if (!isAuthenticated) {
        const path = this.props.history.location.pathname
        this.props.redirected(path)
        return <Redirect to="/signin" />
      }

      return <C {...rest}/>
    }
  }

  return connect(
    (state: any) => ({isAuthenticated: state.user.isAuthenticated}),
    { redirected }
  )(ProtectedRoute)
}