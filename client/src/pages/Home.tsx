import * as React  from 'react';
import { Link } from 'react-router-dom';

interface HomeStateType {
  polls: string[];
}

class Home extends React.Component<{}, HomeStateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      polls: []
    };
  }
  _renderPoll = (poll: any) => {
    const {title, _id} = poll;
    return (
      <div key={_id}>
        <h3>
          {title}
        </h3>
        <Link 
          to={{ pathname: `/polls/${_id}`, state: {poll}}}
        >
          click
        </Link>
      </div>
    );
  }

  componentDidMount() {
    fetch('/api/polls')
      .then(res => res.json())
      .then(json => {
        this.setState({polls: json.polls});
      });
  }

  render() {
    const {polls} = this.state;
    
    // TODO: create a component to represent a small poll element
    return (
      <div>
        <h1>Home</h1>
        {polls.map(this._renderPoll)}
      </div>
    );
  }
}

export default Home;