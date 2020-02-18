import React, { Component } from 'react'
import {  } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
/**
 * HOME CONTAINER
 */
class Statistic extends Component {
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
                    <Head location="/home" handleOpen={this.toggleModal} />

                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
            )
        }else{
            return (
              <div>
                <Head location="/home" handleOpen={this.toggleModal} />
                <br />
                <br />
                <div className="ui container">
                </div>
                <ModalLogout
                  modalOpen={this.state.modalOpen}
                  onClose={this.toggleModal}
                />
              </div>
            );
        }
    }
}
 
export default Statistic;