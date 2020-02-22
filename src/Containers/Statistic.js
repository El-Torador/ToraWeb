import React, { Component } from 'react'
import {  } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Statistic.css'
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
                    <br />
                    <div className="ui container">
                        <h1>
                            <i className="icon chart line large yellow"></i> Statistiques
                        </h1>
                        <br /> <br />
                        <div className="center-cog">
                            <i className="ui icon cog massive yellow rotate"></i>
                            <h3>En cours de developpement...</h3>
                        </div>
                    </div>

                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
            )
        }else{
            return (
              <div>
                <Head location="/home" handleOpen={this.toggleModal} />
                <br />
                <div className="ui container padding">
                        <h1>
                            <i className="icon chart line large yellow"></i> Statistiques
                        </h1>
                        <br /> <br />
                        <div className="center-cog">
                            <i className="ui icon cog massive yellow rotate"></i>
                            <h3>En cours de developpement...</h3>
                        </div>
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