import * as React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Switch,  } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/profile/:id" component={NotImplemented} />
      <Route path="/vote/create" component={NotImplemented} />
      <Route path="/vote/:id" component={NotImplemented} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

const Home = () => <div>Home</div>;
const NotImplemented = () => <div>Coming Soon...</div>
const NotFound = () => <div>Uh Oh</div>;

export default App;