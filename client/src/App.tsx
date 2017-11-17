import * as React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch,  } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/match" component={DisplayPath} />
      <Route path="/test" component={ApiTest} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

const DisplayPath = (props: any) => (
  <div>DisplayPath: {props.match.url}
    <Route path={props.match.url + '/this'} component={() => <div>this</div>} />
    <Route path={props.match.url + '/that'} component={() => <div>that</div>} />
  </div>
);

const Home = () => <div>Home</div>;

const NotFound = () => <div>Uh Oh</div>;

interface ApiTestState {
  message: string,
}

class ApiTest extends React.Component<{}, ApiTestState> {
  constructor(props: any) {
    super(props);

    this.state = {
      message: 'Nothing Yet',
    };
  }
  componentDidMount() {
    fetch('/api/test')
      .then(res => res.json())
      .then(({message}) => this.setState({message}) );
  }

  render() {
    return (
      <div>message: {this.state.message}</div>
    );
  }
}

export default App;
