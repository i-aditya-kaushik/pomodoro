import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import { BrowserRouter as Router,Switch, Route, Link as RouterLink } from "react-router-dom";
import SignIn from './components/auth/SingIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/navigation/Navbar';
import Home from './components/mainpages/Home';

export default function App() {
  return (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={SignIn}/>
                <Route path="/register" component={SignUp}/>
            </Switch>
        </div>
    </Router>
  );
}
