import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import NewsForm from '../components/NewsForm/index';
import SignUp from '../components/SignUp/index';
import SignIn from '../components/SignIn/index';
import News from '../components/News/index';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/news" component={News} isPrivate />
    <Route path="/registerNews" component={NewsForm} isPrivate exact />
    <Route path="/registerNews/:id" component={NewsForm} isPrivate />
    {/* <Route path="/dashboard" component={Dashboard} isPrivate /> */}
  </Switch>
);

export default Routes;
