import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import RowLearner from '../Components/Learner/RowLearner'
import AddLearner from '../Components/Learner/AddLearner'
import { getLearner } from '../Controllers/Learner/CRUD_learner'
import './Learner.css'
/**
 * LEARNER CONTAINER
 */
class Learner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            learner: [{
                id: 1,
                first_name: 'KAGMENI',
                last_name: 'jordan',
                birth_date: "1998-11-07T00:00:00+00:00",
                marital_status: 'Célibataire',
                sex: 'Masculin',
                jobs: 'Architecte solution hybride',
                address: 'Bastos',
                phone_number: '697040511',
                email: 'kagmeni77@gmail.com',
                instance_id: 5,
                created_at: "1998-11-07T00:00:00+00:00",
                cni: '38745345'
            }, {
                    id: 2,
                    first_name: 'NOU-NYANKAM',
                    last_name: 'marc',
                    birth_date: "1998-11-07T00:00:00+00:00",
                    marital_status: 'Célibataire',
                    sex: 'Masculin',
                    jobs: 'Architecte solution LPM',
                    address: 'Bastos',
                    phone_number: '678765544',
                    email: 'marcnouyeu@gmail.com',
                    instance_id: 6,
                    created_at: "1998-11-07T00:00:00+00:00",
                    cni: '38745345'
                }, {
                    id: 3,
                    first_name: 'TIYA',
                    last_name: 'florian',
                    birth_date: "1999-11-07T00:00:00+00:00",
                    marital_status: 'Célibataire',
                    sex: 'Masculin',
                    jobs: 'Project Manager',
                    address: 'Bastos',
                    phone_number: '698556673',
                    email: 'tiyaflorian@gmail.com',
                    instance_id: 7,
                    created_at: "1998-11-07T00:00:00+00:00",
                    cni: '38745345'
                }, {
                    id: 4,
                    first_name: 'SIEYONJI',
                    last_name: 'sylvia',
                    birth_date: "1992-11-07T00:00:00+00:00",
                    marital_status: 'Fiancé',
                    sex: 'Féminin',
                    jobs: 'Experte marketing',
                    address: 'Bonamoussadi',
                    phone_number: '679719827',
                    email: 'sylviaunnel@gmail.com',
                    instance_id: 15,
                    created_at: "1998-11-07T00:00:00+00:00",
                    cni: '38745345'
                }],
            isLoading: false,
            modalOpen: false,
            value: '',
            addLearner: false
        }
    }

    componentDidMount(){
        this.setState({isLoading: true})
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
                })
            }
        })
            .catch((err) => {
                this.setState({ isLoading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }));
            })
    }
    /**
     * AJOUTE UN NOUVEL APPRENANT
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
                    <Head location="/apprenant" handleOpen={this.toggleModal} />
                    <div className="ui container padding">
                        <h1>
                            <i className="icon user secret large"></i> Gestion des Apprenants
                        </h1>
                        <br /> <br />
                        <div className="ui search">
                            <div className="ui left icon input">
                                <i className="icon search"></i>
                                <input
                                    className="prompt"
                                    type="text"
                                    placeholder="Rechercher une instance..."
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <Loader active={true} />
                    </div>
                    <button
                        className="circular ui icon disabled massive button is_fix"
                        title="Ajouter une instance"
                        onClick={this.toggleModalAddLearner}
                    >
                        <i className="icon plus"></i>
                    </button>
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
                        <div className="ui search">
                            <div className="ui left icon input">
                                <i className="icon search"></i>
                                <input
                                    className="prompt"
                                    type="text"
                                    placeholder="Rechercher un apprenant..."
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <br /> <br/>
                        <div className="ui grid">
                            <RowLearner
                                learner={this.state.learner}
                                entries={this.state.value}
                            />
                        </div>
                    </div>
                    <button
                        className="circular ui icon massive button is_fix"
                        title="Ajouter une instance"
                        onClick={this.toggleModalAddLearner}
                    >
                        <i className="icon plus"></i>
                    </button>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                    <AddLearner addLearner={this.state.addLearner} exit={this.toggleModalAddLearner} newLearner={this.newLearner}/>
                </div>
            )
        }
    }
}
 
export default Learner;