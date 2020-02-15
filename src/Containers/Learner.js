import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Learner.css'
/**
 * LEARNER CONTAINER
 */
class Learner extends Component {
    constructor(props) {
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
        if (this.state.isLoading) {
            return (
                <div>
                    <Head location="/apprenant" handleOpen={this.toggleModal} />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon user secret large"></i> Gestion des Apprenants
                        </h1>
                        <br /> <br />
                        <Loader active={true} />
                    </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
            )
        } else {
            return (
                <div>
                    <Head location="/apprenant" handleOpen={this.toggleModal} />
                    <br />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon student large"></i> Gestion des Apprenants
                        </h1>
                        <br /> <br />
                    </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
            )
        }
    }
}
 
export default Learner;