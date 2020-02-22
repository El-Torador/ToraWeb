import React, { Component } from 'react'
import { Loader, Breadcrumb, Header, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getTrainingByType } from '../Controllers/Training/CRUD_training'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Certifiant.css'
import RowCertifiant from '../Components/Certifiant/RowCertifiant'
/**
 * CERTIFIANT CONTAINER
 */
class Certifiant extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            types: [],
            isLoading: true,
            modalOpen: false,
            value: ''
        }
    }

    componentDidMount(){
        getTrainingByType()
        .then((types)=>{
            this.setState({
                types,
                isLoading:false
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    /**
    * PERMET DE METTRE A JOUR LA VALEUR DE LA RECHERCHE
    * @param {Event} event
    */
    handleChange = event => {
        const { value } = event.target
        this.setState({ value })
    }
    /**
     * PERMET D'OUVRIR OU DE FERMER LA MODAL DE DECONNEXION
     */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    render(){
        if(this.state.isLoading){
            return (
            <div>
                <Head location="" handleOpen={this.toggleModal} />
                <br />
                <div className="ui container padding">
                        <Header block>
                            <Breadcrumb size="large">
                                <Breadcrumb.Section><Link to="/training">Formation</Link></Breadcrumb.Section>
                                <Breadcrumb.Divider icon="right chevron" />
                                <Breadcrumb.Section active><Link to="/training/certifying" className="is-active-that">Certifiante</Link></Breadcrumb.Section>
                            </Breadcrumb>
                        </Header>
                    <h1>
                        <i className="icon certificate large yellow"></i> Types de Formation certifiante
                    </h1>
                    <br />
                        <div className="ui search">
                            <div className="ui left icon input">
                                <i className="icon search"></i>
                                <Popup
                                    content="Rechercher un type de formation"
                                    trigger={
                                        <input
                                            className="prompt"
                                            type="text"
                                            placeholder="Rechercher un type de formation..."
                                            onChange={this.handleChange}
                                        />
                                    }
                                    position="left center"
                                />
                            </div>
                        </div>
                    <Loader active={true} />
                </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
            </div>)
        }else{
            return (
            <div>
                <Head location="" handleOpen={this.toggleModal} />
                <br />
                <div className="ui container padding">
                <Header block>
                    <Breadcrumb size="large">
                    <Breadcrumb.Section><Link to="/training">Formation</Link></Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section active><Link to="/training/certifying" className="is-active-that">Certifiante</Link></Breadcrumb.Section>
                </Breadcrumb>
                </Header>
                    <h1>
                        <i className="icon certificate large yellow"></i> Types de Formation certifiante
                    </h1>
                    <br/>
                        <div className="ui search">
                            <div className="ui left icon input">
                                <i className="icon search"></i>
                                <Popup
                                    content="Rechercher un type de formation"
                                    trigger={
                                        <input
                                            className="prompt"
                                            type="text"
                                            placeholder="Rechercher un type de formation"
                                            onChange={this.handleChange}
                                        />
                                    }
                                    position="left center"
                                />
                            </div>
                        </div>
                        <br />
                        <div className="ui grid">
                            <RowCertifiant 
                                entries={this.state.value} 
                                training={this.state.types} 

                            />
                        </div>
                </div>
                <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
            </div>
            )
        }
    }
}

export default Certifiant