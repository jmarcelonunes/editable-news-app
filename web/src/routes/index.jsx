import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';
import NewsForm from '../components/NewsForm/NewsForm';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import News from '../components/News';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/news" component={News} isPrivate />
      <Route path="/registerNews" component={NewsForm} isPrivate />
      {/* <Route path="/dashboard" component={Dashboard} isPrivate /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
