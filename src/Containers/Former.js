import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Former.css'
/**
 * FORMER CONTAINER
 */
class Former extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            modalOpen: false
        }
    }

    /**
     * PERMET D'OUVRIR OU DE FERMER LA MODAL DE DECONNEXION
     */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    render() { 
        if(this.state.isLoading){
            return ( 
                <div>
                    <Head location="/formateur" handleOpen={this.toggleModal} />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon user secret large"></i> Gestion des Formateurs
                        </h1>
                        <br /> <br />
                        <Loader active={true} />
                    </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
         )
        }else{
            return ( 
                <div>
                    <Head location="/formateur" handleOpen={this.toggleModal} />
                    <br />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon user secret large"></i> Gestion des Formateurs
                        </h1>
                        <br /> <br />
                    </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal}/>
                </div>
         )
        }
    }
}
 
export default Former;