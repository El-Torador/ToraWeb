import React, { Component } from 'react';
import { Loader, Popup } from 'semantic-ui-react'
import { getFormers } from '../Controllers/Former/CRUD_former'
import Head from '../Components/Header/Header'
import RowFormer from '../Components/Former/RowFormer'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Former.css'
import { toast } from 'react-toastify';
import AddFormer from '../Components/Former/AddFormer';
/**
 * FORMER CONTAINER
 */
class Former extends Component {
    constructor(props){
        super(props)
        this.state = {
            formers: [],
            isLoading: true,
            modalOpen: false,
            addFormer: false,
            value: ''
        }
    }

    componentDidMount(){
        getFormers()
        .then((formers)=>{
            if(formers){
                this.setState({formers, isLoading: false}, ()=>{
                    if (window.localStorage.getItem('flash')) {
                        toast.success('✔️' + window.localStorage.getItem('flash'), {
                            position: 'bottom-left', hideProgressBar: true, onClose: () => {
                                window.localStorage.clear()
                                window.localStorage.setItem('init_lauch', true)
                            }
                        })
                    }
                })
            }else{
                toast.info('ℹ️ Pas de formateur Enregistré !', {position: 'bottom-left', hideProgressBar: true})
            }
        })
        .catch((err)=>{
            this.setState({ isLoading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }));
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
     * AJOUTE UN NOUEAU FORMATEUR
     * @param {Object} former
     */
    newFormer = former =>{
        getFormers()
        .then((formers)=>{
            const form = formers.filter(item => item.first_name === former.first_name)
            former.id = form[0].id
            const f = [...this.state.formers, former]
            this.setState({formers: f})
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
    * PERMET D'OUVRIR OU DE FERMER LA MODAL D'AJOUT DE FORMATEUR
    */
    toggleModalAddFormer = () => this.setState({ addFormer: !this.state.addFormer })

    render() { 
        if(this.state.isLoading){
            return ( 
                <div>
                    <Head location="/former" handleOpen={this.toggleModal} />
                    <br />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon user secret large yellow"></i> Gestion des Formateurs
                        </h1>
                        <br /> <br />
                        <div className="ui search">
                            <div className="ui left icon input">
                                <i className="icon search"></i>
                                <Popup
                                    content="Rechercher un apprenant"
                                    trigger={
                                        <input
                                            className="prompt"
                                            type="text"
                                            placeholder="Rechercher un apprenant..."
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
                        onClick={this.toggleModalAddFormer}
                    >
                        <i className="icon plus"></i>
                    </button>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
         )
        }else{
            return ( 
                <div>
                    <Head location="/former" handleOpen={this.toggleModal} />
                    <br />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon user secret large yellow"></i> Gestion des Formateurs
                        </h1>
                        <br /> <br />
                        <div className="ui search">
                            <div className="ui left icon input">
                                <i className="icon search"></i>
                                <Popup content="Rechercher un apprenant" trigger={<input
                                    className="prompt"
                                    type="text"
                                    placeholder="Rechercher un apprenant..."
                                    onChange={this.handleChange}
                                />} position="left center" />
                            </div>
                        </div>
                        <br />
                        <div className="ui grid">
                            <RowFormer formers={this.state.formers} entries={this.state.value} />
                        </div>
                    </div>
                    <Popup content="Ajouter un formateur" trigger={<button
                        className="circular ui icon massive yellow button is_fix"
                        onClick={this.toggleModalAddFormer}
                    >
                        <i className="icon plus"></i>
                    </button>}
                        position="left center"
                    />
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal}/>
                    <AddFormer addFormer={this.state.addFormer} exit={this.toggleModalAddFormer} newFormer={this.newFormer}  />
                </div>
         )
        }
    }
}
 
export default Former;