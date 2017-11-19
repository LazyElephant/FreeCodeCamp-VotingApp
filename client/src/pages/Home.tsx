import * as React  from 'react';

interface HomeStateType{
  polls: string[]
}

class Home extends React.Component<{}, HomeStateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      polls: []
    };
  }
  _renderPoll = (poll: any) => {
    const {title, options} = poll;
    return (
      <div>
        <h3>{title}</h3>
        <ul>
          {Object.keys(options).map((opt:string) => <li>{opt}</li>)}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    fetch('/api/polls')
      .then(res => res.json())
      .then(json => {
        this.setState({polls: json.polls})
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