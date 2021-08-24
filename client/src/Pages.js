import React from "react";
import { BrowserRouter as Router,Switch, Route, Link as RouterLink, Redirect } from "react-router-dom";
import SignIn from './components/auth/SingIn';
import SignUp from './components/auth/SignUp';
import Home from './components/mainpages/Home';
import Sortinghat from './components/mainpages/Sortinghat';

import NotFound from './components/utilities/NotFound'
import ChangeHouse from './components/mainpages/Changehouse';
import Profile from './components/mainpages/Profile';
import Tasks from './components/mainpages/Tasks';
import ForgotPassword from './components/auth/ForgotPassword';



export default function Pages() {
    return(
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/register" component={SignUp}/>              
                    <Route path="/sortinghat" component={Sortinghat}/>
                    <Route path="/changehouse" component={ChangeHouse}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/tasks" component={Tasks}/>
                    <Route path="/forgotpassword" component={ForgotPassword}/>
                    <Route path="*" exact component={NotFound} />
                </Switch>
            </div>
        </Router>
    )
}

