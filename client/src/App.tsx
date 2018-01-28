import * as React from 'react';
import { 
  BrowserRouter, 
  Route, 
  Redirect,
  Switch,  } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoll from './pages/CreatePoll';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SinglePoll from './pages/SinglePoll';
import NavBar from './components/NavBar';

// TODO: make /create, /mine into protected routes so only
// logged in users can navigate to them
const App = () => (
  <div>
    <NavBar />
    <BrowserRouter>
      <Switch>
        <Route path="/polls/create" component={CreatePoll} />
        <Route path="/polls/mine" component={NotImplemented} />
        <Route path="/polls/:id" component={SinglePoll} />  
        <Route path="/polls" component={() => <Redirect to="/" />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact={true} path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
)

// const Home = () => <div>Home</div>;
const NotImplemented = () => <div>Coming Soon...</div>;
const NotFound = () => <div>Uh Oh</div>;

export default App;