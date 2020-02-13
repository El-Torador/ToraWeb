import React, { Component } from 'react';
import { getInstanceById, editInstance } from '../../Controllers/instances/CRUD_instance'
import Head from '../Header/Header'
import { Loader, Button, Icon, Dimmer, Segment } from 'semantic-ui-react'
import ModalLogout from '../Sections/ModalLogout'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  DateInput
} from "semantic-ui-calendar-react";

/**
 * EDIT INSTANCE COMPONENT
 */
class EditInstance extends Component {
    constructor(props){
        super(props)
        this.state ={
            instance: {},
            isLoading: true,
            loading: false,
            modalOpen:false,
            date: null
        }
        this.instaceId = this.props.match.params.id
    }

    componentDidMount(){
        getInstanceById(this.instaceId)
        .then((instance)=>{
            if(instance){
                this.setState({instance, isLoading: false, date: moment(instance.created_at).format("DD/MM/YYYY")})
            }else{
                alert('Not found !')
            }
        }).catch((err)=>{
            console.log(err)
            this.setState({isLoading: false})
        })
    }
    /**
     * PERMET DE CHANGER LA DATE
     */
    handleDate = (e, {name, value}) => {
       if (this.state.hasOwnProperty(name)) {
         this.setState({ [name]: value });
       }
    }
    /**
   * PERMET D'OUVRIR LA MODAL
   */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })
  
    /**
     * PERMET DE SOUMMETTRE LES DONNEES
     * @param { Event } e
     */
    handleSubmit = (e) => {
      e.preventDefault()
      console.log(e.target)
      this.setState({loading: true})
      const newInstance = {
          name: e.target[0].value.toUpperCase(),
          city: e.target[1].value,
          address: e.target[2].value,
          responsable: e.target[3].value,
          phone_number: e.target[4].value.split('-'),
          inauguration: this.state.date
        }
      editInstance(newInstance, this.instaceId)
      .then((message)=>{
        this.setState({ loading: false }, ()=>{
          window.localStorage.setItem('flash', message)
          this.props.history.push('/instance')
        })
       
      })
      .catch((err)=>{
        this.setState({loading: false})
        console.log(err)
      })
      

    }
    
    render() { 
        const { instance } = this.state
        if(this.state.isLoading){
            return <div>
            <Head location="/instance" handleOpen={this.toggleModal}  />
              <Loader active={true} />
            </div>
        }else{
            if(instance.name && instance.city && instance.address && instance.responsable && instance.phone_number){
              return (
                <div>
                  <Head location="/instance" handleOpen={this.toggleModal} />
                  <div className="ui container">
                    <br />
                    <br />
                    <h2 className="ui title">
                      <i className="icon edit large"></i> Editer une instance
                    </h2>
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.loading}>
                      <Dimmer active={this.state.loading} inverted>
                        <Loader>Chargement</Loader>
                      </Dimmer>
                      <form
                        className="ui form large"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="ui raised segment">
                          <div className="field">
                            <div className="ui left icon input">
                              <i className="icon globe"></i>
                              <input
                                type="text"
                                name="name"
                                pattern="^IAI-+[a-zA-Z]{2,}"
                                autoFocus
                                placeholder="Nom"
                                title="Nom"
                                defaultValue={instance.name}
                                autoComplete="off"
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui left icon input">
                              <i className="icon home"></i>
                              <input
                                type="text"
                                name="city"
                                minLength="4"
                                placeholder="Ville"
                                title="Ville"
                                defaultValue={instance.city}
                                autoComplete="off"
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui left icon input">
                              <i className="icon map pin"></i>
                              <input
                                type="text"
                                minLength="3"
                                name="address"
                                placeholder="Adresse"
                                title="Adresse"
                                defaultValue={instance.address}
                                autoComplete="off"
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui left icon input">
                              <i className="icon user secret"></i>
                              <input
                                type="text"
                                minLength="4"
                                name="chief"
                                placeholder="Responsable ou Chef de centre"
                                title="Responsable ou Chef de centre"
                                defaultValue={instance.responsable}
                                autoComplete="off"
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="ui left icon input">
                              <i className="icon phone"></i>
                              <input
                                type="tel"
                                pattern="^6+[0-9_-]{8,}"
                                name="phone_number"
                                placeholder="Téléphone"
                                title="Téléphone"
                                defaultValue={instance.phone_number && instance.phone_number.join("-")}
                                autoComplete="off"
                                required
                              />
                            </div>
                          </div>
                          <div className="field">
                            <DateInput
                              closable={true}
                              name="date"
                              placeholder="Date d'inauguration"
                              title="Date d'inauguration"
                              value={this.state.date}
                              iconPosition="left"
                              onChange={this.handleDate}
                              required
                            />
                          </div>
                          <span className="left float">
                            <Button color="yellow" inverted disabled={this.state.loading}>
                              <Icon name="checkmark" /> Editer
                          </Button>
                          </span>
                          <span className="right float">
                            <Link to="/instance">
                              <Button
                                color="red"
                                onClick={this.handleClose}
                                inverted
                              >
                                <Icon name="remove" /> Annuler
                            </Button>
                            </Link>
                          </span>
                        </div>
                      </form>
                    
                    </Dimmer.Dimmable>
                  </div>
                  <ModalLogout
                    modalOpen={this.state.modalOpen}
                    onClose={this.toggleModal}
                  />
                </div>
              );
            }else{
              return (
                <div>
                  <Head location="/instance" handleOpen={this.toggleModal} />
                  <br />
                  <div className="ui container">
                    <br />
                    <Link to="/instance" className="ui button red inverted">
                      Retour
                    </Link>
                    <br />
                    <h1 style={{ textAlign: "center" }}>
                      La ressource n'existe pas !
                    </h1>
                  </div>
                </div>
              );
            }
        }
    }
}
 
export default EditInstance;