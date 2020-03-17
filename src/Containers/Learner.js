import React, { Component } from 'react';
import { Loader, Popup } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import RowLearner from '../Components/Learner/RowLearner'
import AddLearner from '../Components/Learner/AddLearner'
import { getLearner } from '../Controllers/Learner/CRUD_learner'
import { getInstance } from '../Controllers/instances/CRUD_instance'
import './Learner.css'
/**
 * LEARNER CONTAINER
 */
class Learner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            learner: [],
            instances:[],
            isLoading: true,
            modalOpen: false,
            value: '',
            addLearner: false
        }
    }

    componentDidMount(){
        getLearner()
        .then((learner)=>{
            if(learner){
                this.setState({learner, isLoading: false}, ()=>{
                    if(window.localStorage.getItem('flash')){
                          toast.success('✔️'+window.localStorage.getItem('flash'), {position: 'bottom-left', hideProgressBar: true, onClose: ()=>{
                            window.localStorage.clear()
                            window.localStorage.setItem('init_lauch', true)
                          }})
                        }
                    getInstance()
                        .then(instances => {
                            if (instances) {
                                this.setState({ instances });
                            }
                        })
                        .catch(err => {
                            toast.error("❌" + err.message, {
                                position: "bottom-left",
                                hideProgressBar: true
                            });
                        });
                })
            }else{
                getInstance()
                    .then(instances => {
                        if (instances) {
                            this.setState({ instances });
                        }
                    })
                    .catch(err => {
                        toast.error("❌" + err.message, {
                            position: "bottom-left",
                            hideProgressBar: true
                        });
                    });
                toast.info('ℹ️ Pas d\'apprenant Enregistré !', {position: 'bottom-left', hideProgressBar: true})
            }
        })
            .catch((err) => {
                this.setState({ isLoading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }));
            })
    }
    /**
     * AJOUTE UN NOUVEL APPRENANT
     * @param {Object} learner
     */
    newLearner = learner => {
        getLearner()
            .then((learners) => {
                const learn = learners.filter((item) => item.first_name === learner.first_name)
                learner.id = learn[0].id
                const l = [...this.state.learner, learner]
                this.setState({ learner: l })
            })
            .catch((err) => {
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
     * PERMET D'OUVRIR OU DE FERMER LA MODAL DE DECONNEXION
     */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    /**
    * PERMET D'OUVRIR OU DE FERMER LA MODAL D'AJOUT D'INSTANCE
    */
    toggleModalAddLearner = () => this.setState({ addLearner: !this.state.addLearner })

    render() {
        if (this.state.isLoading) {
            return (
              <div>
                <Head location="/learner" handleOpen={this.toggleModal} />
                <br />
                <div className="ui container padding">
                  <h1>
                    <i className="icon user student large yellow"></i> Gestion des
                    Apprenants
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
                  onClick={this.toggleModalAddLearner}
                >
                  <i className="icon plus"></i>
                </button>
                <ModalLogout
                  modalOpen={this.state.modalOpen}
                  onClose={this.toggleModal}
                />
              </div>
            );
        } else {
            return (
                <div>
                    <Head location="/learner" handleOpen={this.toggleModal} />
                    <br />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon student large yellow"></i> Gestion des Apprenants
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
                            <RowLearner
                                learner={this.state.learner}
                                entries={this.state.value}
                                instances={this.state.instances}
                            />
                        </div>
                    </div>
                    <Popup content="Ajouter un apprenant" trigger={<button
                        className="circular ui icon massive yellow button is_fix"
                        onClick={this.toggleModalAddLearner}
                    >
                        <i className="icon plus"></i>
                    </button>} 
                        position="left center"
                    />
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                    <AddLearner addLearner={this.state.addLearner} exit={this.toggleModalAddLearner} newLearner={this.newLearner} instances = {this.state.instances}/>
                </div>
            )
        }
    }
}
 
export default Learner;