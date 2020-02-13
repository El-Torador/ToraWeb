import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'

/**
 * DISCIPLINE CONTAINER
 */
class Discipline extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoading: false,
            modalOpen: false
        }
    }
    /**
  * PERMET D'OUVRIR OU FERMER LA MODAL
  */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })
    
    render(){
        if(this.state.isLoading){
            return (
                <div>
                    <Head location="/formation" handleOpen={this.toggleModal} />
                    <Loader active={true} />
                </div>
            )
        }else{
            return (
                <div>
                    <Head location="/formation" handleOpen={this.handleOpen} />
                    <br />
                    <div className="ui container">
                        <br />
                        <br />
                        <h1>
                            <i className="icon"></i> Gestion des Disciplines
                        </h1>

                    </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
            )
        }
    }
}

export default Discipline