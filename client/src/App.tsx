import * as React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch,  } from 'react-router-dom';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/match" component={DisplayPath} />
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

export default App;
