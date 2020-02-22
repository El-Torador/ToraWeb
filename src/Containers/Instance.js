import React, { Component } from 'react';
import { toast } from 'react-toastify'
import Head from '../Components/Header/Header'
import RowInstance from '../Components/Instance/RowInstance'
import ModalLogout from '../Components/Sections/ModalLogout'
import AddInstance from '../Components/Instance/AddInstance'
import { Loader, Popup } from 'semantic-ui-react'
import { getInstance } from "../Controllers/instances/CRUD_instance";
import './Instance.css'
import * as types from '../Constants/index'

/**
 * INSTANCE CONTAINER
 */
class Instance extends Component {
    constructor(props){
        super(props)
        this.state = {
            instance: types.instance,
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
                          toast.success('✔️'+window.localStorage.getItem('flash'), {position: 'bottom-left', hideProgressBar: true, onClose: ()=>{
                            window.localStorage.clear()
                            window.localStorage.setItem('init_lauch', true)
                          }})
                        }
                      });
                })
            }else{
              toast.warn(`❌Pas d'instance pour le moment.`, {position: 'bottom-left', hideProgressBar: true})
            }
        })
        .catch((err)=>{
          this.setState({ isLoading: false }, () => toast.error('❌'+err.message, {position: 'bottom-left', hideProgressBar: true}));
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
     * AJOUTE UNE NOUVELLE INSTANCE
     */
    newInstance = instance =>{
      getInstance()
      .then((instances)=>{
        const ins = instances.filter((item)=> item.name === instance.name)
        instance.id = ins[0].id
        const i = [...this.state.instance, instance]
        this.setState({ instance: i })
      })
        .catch((err) => {
          this.setState({ isLoading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }));
        })
      
    }
    
    /**
     * PERMET D'OUVRIR OU DE FERMER LA MODAL DE DECONNEXION
     */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })
   /**
    * PERMET D'OUVRIR OU DE FERMER LA MODAL D'AJOUT D'INSTANCE
    */
    toggleModalAddInstance = () => this.setState({addInstance: !this.state.addInstance})
    render() { 
        if(this.state.isLoading){
            return (
              <div>
                <Head location="/instance" handleOpen={this.toggleModal} />
                <br />
                <div className="ui container padding">
                  <h1>
                    <i className="icon globe large yellow"></i>Gestion des Instances
                  </h1>
                  <br /> <br />
                  <div className="ui search">
                    <div className="ui left icon input">
                      <i className="icon search"></i>
                      <Popup
                        content="Rechercher une instance"
                        trigger={
                          <input
                            className="prompt"
                            type="text"
                            placeholder="Rechercher une instance..."
                            onChange={this.handleChange}
                          />
                        }
                        position="left center"
                      />
                    </div>
                  </div>
                  <Loader active={true} />
                </div>
                <button
                  className="circular ui icon disabled yellow massive button is_fix"
                  title="Ajouter une instance"
                  onClick={this.toggleModalAddInstance}
                >
                  <i className="icon plus"></i>
                </button>
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
                <div className="ui container padding">
                  <h1>
                    <i className="icon globe yellow large"></i>Gestion des Instances
                  </h1>
                  <br /> <br />
                  <div className="ui search">
                    <div className="ui left icon input">
                      <i className="icon search"></i>
                      <Popup content="Rechercher une instance" trigger={<input
                        className="prompt"
                        type="text"
                        placeholder="Rechercher une instance..."
                        onChange={this.handleChange}
                      />} 
                        position="left center"
                       />
                    </div>
                  </div>
                  <br />
                  <div className="ui grid">
                    <RowInstance
                      instance={this.state.instance}
                      entries={this.state.value}
                    />
                  </div>
                </div>
                <Popup content="Ajouter une instance" trigger={<button
                  className="circular ui icon massive button yellow is_fix"
                  onClick={this.toggleModalAddInstance}
                >
                  <i className="icon plus"></i>
                </button>}
                  position="left center"
                  />
                <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                <AddInstance addInstance={this.state.addInstance} exit={this.toggleModalAddInstance} newInstance={this.newInstance} />
              </div>
            );
        }
    }
}
 
export default Instance;
