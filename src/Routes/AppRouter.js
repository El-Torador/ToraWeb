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

/**
 * ROUTER COMPONENT
 */
class AppRouter extends Component{
    render(){
        return (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/instance/edit/:id" component={EditInstance} />
            <Route path="/instance" component={Instance} />
            <Route path="/users" component={User} />
            <Route path="/formation/certifiante" component={Certifiant} />
            <Route path="/formation/qualifiante" component={Qualifiant} />
            <Route path="/formation" component={Training} />
            <Route path="/apprenant" component={Learner} />
            <Route path="/formateur" component={Former} />
            
          </Switch>
        );
    }
}
export default AppRouter
