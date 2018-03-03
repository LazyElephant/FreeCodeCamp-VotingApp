import * as React from 'react'
import { connect } from 'react-redux'
import Chart from '../components/Chart'
import PollForm from '../components/PollForm'
import { fetch as apiFetch } from '../actions'

class SinglePoll extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    if (!this.props.poll && !this.props.location.state.poll) {
      const {id} = this.props.match.params
      this.props.apiFetch('detail', { id })
    }
  }

  onSubmit(option) {
    const { id } = this.props.match.params
    this.props.apiFetch('vote', { id, option })
  }

  render() {
    const poll = this.props.poll || this.props.location.state.poll
    const {title, owner, options} = poll
    const optionsArray = Object.keys(options).map(name => ({name, value: options[name]}))
    return (
      <div className="container">
        <h1 className="mt-5">{title}</h1>
        <p>by {owner}</p>
        <hr />
        <div className="row mt-5" >
          <PollForm options={optionsArray} onSubmit={this.onSubmit} />
          <Chart data={optionsArray} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({fetch}) => {
  return {poll: fetch.poll}
}

const mapDispatchToProps = {
  apiFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoll)