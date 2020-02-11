import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../Containers/Login'
import User from '../Containers/User'
import Instance from '../Containers/Instance'
import EditInstance from '../Components/Instance/EditInstance'
class AppRouter extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/users" component={User} />
                <Route path="/instance/edit/:id" component={EditInstance} />
                <Route path="/instance" component={Instance} />
                
            </Switch>
        )
    }
}
export default AppRouter
