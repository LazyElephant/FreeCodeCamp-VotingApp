import * as React  from 'react'
import { Link } from 'react-router-dom'

interface HomeStateType {
  polls: string[]
}

class Home extends React.Component<{}, HomeStateType> {
  constructor(props: any) {
    super(props)

    this.state = {
      polls: []
    }
  }
  _renderPoll = (poll: any) => {
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
    fetch('/api/polls')
      .then(res => res.json())
      .then(json => {
        this.setState({polls: json.polls})
      })
  }

  render() {
    const {polls} = this.state
    
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

export default Home