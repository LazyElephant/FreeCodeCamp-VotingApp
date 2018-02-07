import * as React from 'react'
import Chart from '../components/Chart'
import PollForm from '../components/PollForm'

class SinglePoll extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      owner: '',
      title: '',
      options: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    const { poll } = this.props.location.state
    
    if (poll) {
      this.setState({...poll})
    } else {
      const {id} = this.props.match.params
  
      const res = await fetch(`/api/polls/${id}`)
      const json = await res.json()
      if (json.poll) {
        this.setState({...json.poll})
      }
    }
  }

  onSubmit(option) {
    // send vote to the api
  }

  render() {
    const {title, owner, options} = this.state
    const optionsArray = Object.keys(options).map(name => ({name, value: options[name]}))
    return (
      <div className="container">
        <h1 className="mt-5">{title}</h1>
        <p>by {owner}</p>
        <hr />
        <div className="row align-items-center mt-5" >
          <PollForm options={optionsArray} onSubmit={this.onSubmit} />
          <Chart data={optionsArray} />
        </div>
      </div>
    )
  }
}

export default SinglePoll