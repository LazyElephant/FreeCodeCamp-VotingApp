import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export default function makeProtectedRoute(C: any) {
  class ProtectedRoute extends React.Component<{ isAuthenticated: any }, any> {
    render() {
      if (!this.props.isAuthenticated) {
        return <Redirect to="/signin" />
      }

      return <C />
    }
  }

  return connect(
    (state: any) => ({isAuthenticated: state.user.isAuthenticated})
  )(ProtectedRoute)
}