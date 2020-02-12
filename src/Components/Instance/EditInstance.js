import React, { Component } from 'react';
import { getInstanceById, editInstance } from '../../Controllers/instances/CRUD_instance'
import Head from '../Header/Header'
import { Loader, Button, Icon } from 'semantic-ui-react'
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
    handleOpen = () => this.setState({ modalOpen: true })
    /**
     * PERMET DE FERMER LA MODAL
     */
    handleClose = () => this.setState({ modalOpen: false })

    /**
     * PERMET DE SOUMMETTRE LES DONNEES
     * @param { Event } e
     */
    handleSubmit = (e) => {
      e.preventDefault()
      console.log(e.target)
      let newInstance = null
      if(this.state.instance.phone_number.length > 1){
         newInstance = {
          name: e.target[0].value,
          city: e.target[1].value,
          address: e.target[2].value,
          responsable: e.target[3].value,
          phone_number: [e.target[4].value, e.target[5].value],
          inauguration: this.state.date
        }
      }else{
        newInstance = {
          name: e.target[0].value,
          city: e.target[1].value,
          address: e.target[2].value,
          responsable: e.target[3].value,
          phone_number: [e.target[4].value],
          inauguration: this.state.date
        }
      }
      editInstance(newInstance, this.instaceId)
      .then((message)=>{
        window.localStorage.setItem('flash', message)
        this.props.history.push('/instance')
      })
      .catch((err)=>{
        console.log(err)
      })
      

    }
    
    render() { 
        const { instance } = this.state
        if(this.state.isLoading){
            return <div>
            <Head location="/instance" handleOpen={this.handleOpen}  />
              <Loader active={true} />
            </div>
        }else{
            return (
              <div>
                <Head location="/instance" handleOpen={this.handleOpen} />
                <div className="ui container">
                  <br />
                  <br />
                  <h2 className="ui title">
                    <i className="icon edit large"></i> Editer une instance
                  </h2>
                  <form className="ui form large" onSubmit={this.handleSubmit}>
                    <div className="ui raised segment">
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="icon globe"></i>
                          <input
                            type="text"
                            name="name"
                            minLength="4"
                            autoCapitalize
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
                            pattern="[0-9]{9}"
                            name="phone_number"
                            placeholder="Téléphone"
                            title="Téléphone"
                            defaultValue={instance.phone_number.join('-')}
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
                        <Button color="yellow" inverted>
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
                </div>
                <ModalLogout modalOpen={this.state.modalOpen} onClose={this.handleClose} />
              </div>
            );
        }
    }
}
 
export default EditInstance;