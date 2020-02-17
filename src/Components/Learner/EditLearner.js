import React, { Component } from 'react';
import { getInstance } from '../../Controllers/instances/CRUD_instance'
import { getLearnerById, editLearner } from '../../Controllers/Learner/CRUD_learner'
import Head from '../Header/Header'
import { Loader, Button, Icon, Dimmer, Segment } from 'semantic-ui-react'
import ModalLogout from '../Sections/ModalLogout'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
    DateInput
} from "semantic-ui-calendar-react";
import { toast } from 'react-toastify';

/**
 * EDIT LEARNER COMPONENT
 */
class EditLearner extends Component {
    constructor(props) {
        super(props)
        toast.configure()
        this.state = {
            learner: {},
            instances: [],
            isLoading: true,
            loading: false,
            modalOpen: false,
            date: ""
        }
        this.learnerId = Number(this.props.match.params.id)
    }

    componentDidMount() {
        if(this.learnerId){
            getLearnerById(this.learnerId)
                .then((learner) => {
                    if (learner) {
                        getInstance()
                            .then((instances) => {
                                if (instances) {
                                    this.setState({ instances, learner, isLoading: false, date: moment(learner.birth_date).format("DD-MM-YYYY") })
                                }
                            })
                    } else {
                        toast.warn('⚠️ La ressource n\'existe pas.', { position: 'bottom-left', hideProgressBar: true })
                    }
                }).catch((err) => {
                    this.setState({ isLoading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }))
                })
        }else{
            toast.error('❌404❌ Cette ressource n\'existe pas. ', {position: 'bottom-left', hideProgressBar:true, onClose: ()=>this.props.history.push('/learner')})
        }
    }
    /**
     * PERMET DE CHANGER LA DATE
     */
    handleDate = (e, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    /**
   * PERMET D'OUVRIR LA MODAL
   */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    /**
     * PERMET DE SOUMMETTRE LES DONNEES
     * @param { Event } e
     */
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        let date = this.state.date.split('-')
        const birth_date = `${date[2]}-${date[1]}-${date[0]}T00:00:00+00:00`
        const newLearner = {
            first_name: e.target[0].value.toUpperCase(),
            last_name: e.target[1].value,
            birth_date,
            sex: e.target[3].value,
            marital_status: e.target[4].value,
            jobs: e.target[5].value,
            address: e.target[6].value,
            email: e.target[7].value,
            phone_number: e.target[8].value,
            cni: e.target[9].value,
            instance_id: Number(e.target[10].value),
            avatar: e.target[0].value.toLowerCase() + '.jpg',
            employer: "JFMLabs"
        }
        setTimeout(()=>{
            editLearner(newLearner, this.learnerId)
            .then((message) => {
                this.setState({ loading: false }, () => {
                    window.localStorage.setItem('flash', message)
                    this.props.history.push('/learner')
                })

            })
            .catch((err) => {
                this.setState({ loading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }))
            })
        }, 300)


    }

    render() {
        const { learner } = this.state
        if (this.state.isLoading) {
            return <div>
                <Head location="/learner" handleOpen={this.toggleModal} />
                <Loader active={true} />
            </div>
        } else {
            if ({...learner}) {
                return (
                    <div>
                        <Head location="/learner" handleOpen={this.toggleModal} />
                        <div className="ui container">
                            <br />
                            <br />
                            <h2 className="ui title">
                                <i className="icon edit large"></i> Editer un apprenant
                            </h2>
                            <Dimmer.Dimmable as={Segment} dimmed={this.state.loading}>
                                <Dimmer active={this.state.loading} inverted>
                                    <Loader>Chargement</Loader>
                                </Dimmer>
                                <form
                                    className="ui form large"
                                    onSubmit={this.handleSubmit}
                                >
                                    <div className="ui raised segment">
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon user"></i>
                                                <input type="text" pattern="[a-zA-Z\s]{3,}" autoFocus name="first_name" id="first_name" placeholder="Noms ex:KAGMENI" title="Noms" autoComplete="off" defaultValue={learner.first_name} required />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon user outline"></i>
                                                <input type="text" name="last_name" autoCapitalize="true" id="last_name" placeholder="Prenoms ex:Jordan" title="Prenoms" autoComplete="off" defaultValue={learner.last_name} required />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <DateInput
                                                closable={true}
                                                name="date"
                                                icon="calendar outline"
                                                placeholder="Date de naissance ex:07-11-2010"
                                                title="Date de naissance"
                                                value={this.state.date}
                                                iconPosition="left"
                                                onChange={this.handleDate}
                                                required
                                            />
                                        </div>
                                        <div className="field">
                                            <select className="ui fluid dropbox" placeholder="Sexe" title="Sexe">
                                                <option value="Masculin" selected={learner.sex === "Masculin" && true} >Masculin</option>
                                                <option value="Féminin" selected={learner.sex === "Féminin" && true}>Féminin</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            <select className="ui fluid dropbox" placeholder="Statut matrimonial" title="Statut matrimonial">
                                                <option value="Célibataire" selected={learner.marital_status === "Célibataire" && true}>Célibataire</option>
                                                <option value="Marié(e)" selected={learner.marital_status === "Marié(e)" && true}>Marié(e)</option>
                                                <option value="Veuve" selected={learner.marital_status === "Veuve" && true}>Veuve</option>
                                            </select>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon handshake outline"></i>
                                                <input type="text" name="jobs" autoCapitalize="true" id="jobs" placeholder="Profession ex:Architecte logiciel" title="Profession" autoComplete="off" defaultValue={learner.jobs} required />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon map pin"></i>
                                                <input type="text" name="address" autoCapitalize="true" id="address" placeholder="Adresse ex:Nkolanga'a" title="Adresse" autoComplete="off" defaultValue={learner.address} required />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon envelope outline"></i>
                                                <input type="text" name="email" pattern="^[a-z0-9_-]+@[a-z0-9_-]+\.[a-z]{2,6}$" autoCapitalize="true" id="email" placeholder="Email ex:joseph@gmail.com" title="Email" autoComplete="off" defaultValue={learner.email} required />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon phone"></i>
                                                <input type="tel" pattern="^6+[0-9]{8}" name="phone_number" id="instance_phone_numbers" placeholder="Téléphone ex:694532343-675664433" title="Téléphone" autoComplete="off" defaultValue={learner.phone_number} required />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon id card outline"></i>
                                                <input type="tel" pattern="[0-9]{9}" name="cni" id="cni" placeholder="N° CNI ex:000576850" title="N° CNI" autoComplete="off" defaultValue={learner.cni} />
                                            </div>
                                        </div>
                                        <div className="field">
                                            <select className="ui fluid dropbox" placeholder="Statut matrimonial" title="Statut matrimonial">
                                                {this.state.instances.map((instance) => this.state.learner.instance_id === instance.id ? 
                                                <option value={instance.id} selected key={instance.id}>{`${instance.name}(${instance.city})`}</option>
                                                :
                                                    <option value={instance.id} key={instance.id}>{`${instance.name}(${instance.city})`}</option>)}
                                            </select>
                                        </div>
                                        <div className="field">
                                            <div className="ui left icon input">
                                                <i className="icon file"></i>
                                                <input type="file" autoFocus name="avatar" id="avatar" placeholder="Photo" title="Photo" autoComplete="off" />
                                            </div>
                                        </div>
                                        <span className="left float">
                                            <Button color="yellow" inverted disabled={this.state.loading}>
                                                <Icon name="checkmark" /> Editer
                                            </Button>
                                        </span>
                                        <span className="right float">
                                            <Link to="/learner">
                                                <Button
                                                    color="red"
                                                    onClick={this.handleClose}
                                                    inverted
                                                >
                                                    <Icon name="remove" /> Annuler
                                                </Button>
                                            </Link>
                                        </span>
                                    </div>
                                </form>

                            </Dimmer.Dimmable>
                        </div>
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
                        <div className="ui container">
                            <br />
                            <Link to="/learner" className="ui button red inverted">
                                Retour
                            </Link>
                            <br />
                            <h1 style={{ textAlign: "center" }}>
                                La ressource n'existe pas !
                    </h1>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default EditLearner;