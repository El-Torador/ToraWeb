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
import Statistic from '../Containers/Statistic'
import E_Learning from '../Containers/E-Learning'
import Discipline from '../Containers/Discipline'
import EditDiscipline from '../Components/Discipline/EditDiscipline'
import EditModule from '../Components/Qualifiant/EditQualifiant'
import EditFormer from '../Components/Former/EditFormer'
import ProtectedRouter from './ProtectedRouter/ProtectedRouter'
/**
 * ROUTER COMPONENT
 */
class AppRouter extends Component{
    render(){
        return (
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRouter path="/training/qualifying/module/discipline/edit/:id" component={EditDiscipline} />
            <ProtectedRouter path="/training/qualifying/module/discipline/:id" component={Discipline} />
            <ProtectedRouter path="/training/qualifying/module/edit/:id" component={EditModule} />
            <ProtectedRouter path="/learner/edit/:id" component={EditLearner} />
            <ProtectedRouter path="/instance/edit/:id" component={EditInstance} />
            <ProtectedRouter path="/former/edit/:id" component={EditFormer} />
            <ProtectedRouter path="/instance" component={Instance} />
            <ProtectedRouter path="/users" component={User} />
            <ProtectedRouter path="/training/certifying" component={Certifiant} />
            <ProtectedRouter path="/training/qualifying/module" component={Qualifiant} />
            <ProtectedRouter path="/training/e-learning" component={E_Learning} />
            <ProtectedRouter path="/training" component={Training} />
            <ProtectedRouter path="/learner" component={Learner} />
            <ProtectedRouter path="/former" component={Former} />
            <ProtectedRouter path="/home" component={Statistic} />
            <Route component={()=><h1>404 NOT FOUND !</h1>} />
            
          </Switch>
        );
    }
}
export default AppRouter
