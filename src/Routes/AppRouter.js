import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../Containers/Login'
import User from '../Containers/User'
import Instance from '../Containers/Instance'
import EditInstance from '../Components/Instance/EditInstance'
import Training from '../Containers/Training'
import Certifiant from '../Containers/Certifiant'
import Qualifiant from '../Containers/Qualifiant'

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
          </Switch>
        );
    }
}
export default AppRouter
