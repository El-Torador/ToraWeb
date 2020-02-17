import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../Containers/Login'
import User from '../Containers/User'
import Instance from '../Containers/Instance'
import EditInstance from '../Components/Instance/EditInstance'
import Training from '../Containers/Training'
import Certifiant from '../Containers/Certifiant'
import Qualifiant from '../Containers/Qualifiant'
import Learner from '../Containers/Learner'
import Former from '../Containers/Former'
import EditLearner from '../Components/Learner/EditLearner'

/**
 * ROUTER COMPONENT
 */
class AppRouter extends Component{
    render(){
        return (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/learner/edit/:id" component={EditLearner} />
            <Route path="/instance/edit/:id" component={EditInstance} />
            <Route path="/instance" component={Instance} />
            <Route path="/users" component={User} />
            <Route path="/training/certifying" component={Certifiant} />
            <Route path="/training/qualifying" component={Qualifiant} />
            <Route path="/training" component={Training} />
            <Route path="/learner" component={Learner} />
            <Route path="/former" component={Former} />
            
          </Switch>
        );
    }
}
export default AppRouter
