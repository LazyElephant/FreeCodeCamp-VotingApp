import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetch as apiFetch } from '../actions'

class Home extends Component {
  
  _renderPoll = (poll) => {
    const {title, _id} = poll
    return (
      <div  key={_id} className="poll-list row">
        <Link to={{ pathname: `/polls/${_id}`, state: {poll}}}>
              <h3 className="offset-sm-2 col-sm-8 text-center">
                {title}
              </h3>
        </Link>
      </div>
    )
  }

  componentDidMount() {
    this.props.apiFetch('index')
  }

  render() {
    const polls = this.props.polls || []

    // TODO: create a component to represent a small poll element
    return [
      (
        <div className="jumbotron">
          <div className="row">
            <h1 className="offset-1 col-sm-11">Pollster</h1>
            <h4 className="offset-2">Where Your Vote Counts</h4>
          </div>
        </div>
      ),
      (
        <div className="container">
          {polls.map(this._renderPoll)}
        </div>
      )
    ]
  }
}

const mapStateToProps = ({fetch}) => {
  return {polls: fetch.polls}
}

const mapDispatchToProps = {
  apiFetch
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)