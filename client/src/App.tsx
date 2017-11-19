import * as React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Redirect,
  Switch,  } from 'react-router-dom';

import Home from './pages/Home';
import SinglePoll from './pages/SinglePoll';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/polls/create" component={NotImplemented} />
      <Route path="/polls/mine" component={NotImplemented} />
      <Route path="/polls/:id" component={SinglePoll} />  
      <Route path="/polls" component={() => <Redirect to="/" />} />
      <Route exact={true} path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

// const Home = () => <div>Home</div>;
const NotImplemented = () => <div>Coming Soon...</div>;
const NotFound = () => <div>Uh Oh</div>;

export default App;