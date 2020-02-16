import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Certifiant.css'
/**
 * CERTIFIANT CONTAINER
 */
class Certifiant extends Component {
    constructor(props)
    {
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

    render(){
        if(this.state.isLoading){
            return (
            <div>
                <Head location="formation" handleOpen={this.toggleModal} />
                <div className="ui container padding">
                    <h1>
                        <i className="icon wpforms large"></i> Modules des Formations certifiantes
                    </h1>
                    <Loader active={true} />
                </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
            </div>)
        }else{
            return (
            <div>
                <Head location="/formation" handleOpen={this.toggleModal} />
                <br />
                <br />
                <div className="ui container padding">
                    <h1>
                        <i className="icon wpforms large"></i> Modules des Formations certifiantes
                    </h1>
                </div>
                <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
            </div>
            )
        }
    }
}

export default Certifiant