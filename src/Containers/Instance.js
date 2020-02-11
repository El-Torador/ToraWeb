import React, { Component } from 'react';
import Head from '../Components/Header/Header'
import RowInstance from '../Components/Instance/RowInstance'
import { Loader, Modal, Icon, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getInstance, addInstance } from "../Controllers/instances/CRUD_instance";
import {
  DateInput
} from "semantic-ui-calendar-react";

import './Instance.css'
class Instance extends Component {
    constructor(props){
        super(props)
        this.state = {
            instance: [],
            value: '',
            isLoading: true,
            modalOpen: false,
            addInstance: false,
            date: null
        }
    }
    componentDidMount(){
        getInstance()
        .then((instance)=>{
            if(instance){
                this.setState({instance}, ()=>{
                      this.setState({ isLoading: false }, ()=>{
                        if(window.localStorage.getItem('flash')){
                          toast.success('✔️'+window.localStorage.getItem('flash'), {position: 'bottom-left', hideProgressBar: true, onClose: ()=>window.localStorage.clear()})
                        }
                      });
                })
            }else{
                toast.warn(`Pas d'instance pour le moment.`, {position: 'bottom-left', hideProgressBar: true})
            }
        })
        .catch((err)=>{
            console.log(err)
              this.setState({ isLoading: false });
        })
        
    }
    /**
     * PERMET DE METTRE A JOUR LA VALEUR DE LA RECHERCHE
     * @param {Event} event
     */
    handleChange = event =>{
        const {value} = event.target
        this.setState({value})
    }
    /**
     * PERMET DE METTREA JOUR LA DATE 
     * @param { Event } e
     */
     handleDate = (e, {name, value}) => {
       if (this.state.hasOwnProperty(name)) {
         this.setState({ [name]: value });
       }
    }
    /**
     * ENREGISTRER UNE INSTANCE
     * @param { Event } e
     */
    handlePostInstance = (e) =>{
      e.preventDefault()
      const instance = {
        name: e.target[0].value,
        city: e.target[1].value,
        address: e.target[2].value,
        responsable: e.target[3].value,
        phone_number: e.target[4].value.split('-'),
        inauguration: this.state.date
      }
      if(instance.name){
        if(instance.city){
          if(instance.address){
            if(instance.responsable){
              if(instance.phone_number){
                if(instance.inauguration){
                  addInstance(instance)
                  .then((message)=>{
                    const i = [...this.state.instance, instance]
                    this.setState({instance: i}, ()=>{
                      toast.success('✔️'+message, {position: 'bottom-left', hideProgressBar: true})
                    })
                  })
                  .catch((err)=>{
                    console.log(err)
                  })
                }else{
                  toast.error('❌La date d\'inauguration est requise.', { position: 'bottom-left', hideProgressBar: true })
                }
              }else{
                toast.error('❌ Le numéro de téléphone est requis.', { position: 'bottom-left', hideProgressBar: true })
              }
            }else{
              toast.error('❌ Le nom du responsable est requis.', { position: 'bottom-left', hideProgressBar: true })
            }
          }else{
            toast.error('❌ L\'adresse est requise.', { position: 'bottom-left', hideProgressBar: true })
          }
        }else{
          toast.error('❌ La ville est requise.', { position: 'bottom-left', hideProgressBar: true })
        }
      }else{
        toast.error('❌ Le nom de l\'instance est requis.', { position: 'bottom-left', hideProgressBar: true })
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
    handleAddInstance = () => this.setState({addInstance: true})
    exit = () => this.setState({addInstance: false})
    render() { 
        if(this.state.isLoading){
            return (
              <div>
                <Head location="/instance" handleOpen={this.handleOpen} />
                <Loader active={true} />
              </div>
            );
        }else{
            return (
              <div>
                <Head location="/instance" handleOpen={this.handleOpen} />
                <br />
                <div className="ui container padding">
                  <h1>
                    <i className="icon globe large"></i>Gestion des Instances
                  </h1>
                  <br /> <br />
                  <div className="ui search">
                    <div className="ui left icon input">
                      <i className="icon search"></i>
                      <input
                        className="prompt"
                        type="text"
                        placeholder="Rechercher une instance..."
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="ui grid">
                    <RowInstance
                      instance={this.state.instance}
                      entries={this.state.value}
                    />
                  </div>
                </div>
                <button
                  className="circular ui icon massive button is_fix"
                  title="Ajouter une instance"
                  onClick={this.handleAddInstance}
                >
                  <i className="icon plus"></i>
                </button>
                <Modal
                  dimmer="blurring"
                  closeIcon
                  onClose={this.exit}
                  closeOnDimmerClick={false}
                  open={this.state.addInstance}
                  size="large"
                >
                  <Header icon="plus" content="Ajouter une instance" />
                  <Modal.Content>
                      <form className="ui form" onSubmit={this.handlePostInstance}>
                        <div className="field">
                          <div className="ui left icon input">
                            <i className="icon globe"></i>
                            <input type="text" name="name" id="instance_name" placeholder="Nom" title="Nom" autoComplete="off" required/>
                          </div>
                        </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="icon home"></i>
                          <input type="text" name="city" id="instance_city" placeholder="Ville" title="Ville" autoComplete="off" required/>
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="icon map pin"></i>
                          <input type="text" name="address" id="instance_address" placeholder="Adresse" title="Adresse" autoComplete="off" required/>
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="icon user secret"></i>
                          <input type="text" name="responsable" id="instance_responsable" placeholder="Responsable ou Chef de centre" title="Responsable ou Chef de centre" autoComplete="off" required/>
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="icon phone"></i>
                          <input type="text" name="phone_number" id="instance_phone_numbers" placeholder="Téléphone" title="Téléphone" autoComplete="off" required />
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
                      <Button color="yellow" inverted type="submit">
                          <Icon name="checkmark" /> Ajouter
                      </Button>
                      <Button
                        inverted
                        color="red"
                        onClick={this.exit}
                      >
                        <Icon name="remove" /> Annuler
                      </Button>
                        
                      </form>
                  </Modal.Content>
                </Modal>
                <Modal
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  basic
                  closeOnDimmerClick={false}
                  size="small"
                >
                  <Header icon="log out" content="Déconnection" />
                  <Modal.Content>
                    <h3>Voulez-vous vraiment vous déconnecter ?</h3>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      basic
                      color="yellow"
                      onClick={this.handleClose}
                      inverted
                    >
                      <Icon name="remove" /> Non
                    </Button>
                    <Link to="/">
                      <Button color="red" inverted>
                        <Icon name="checkmark" /> Oui
                      </Button>
                    </Link>
                  </Modal.Actions>
                </Modal>
              </div>
            );
        }
    }
}
 
export default Instance;
