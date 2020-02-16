import React, { Component } from 'react'
//import moment from 'moment'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Modal, Icon, Button, Header, Dimmer, Segment, Loader } from 'semantic-ui-react'
import { addLearner } from '../../Controllers/Learner/CRUD_learner'
import { getInstance } from '../../Controllers/instances/CRUD_instance'
import {
    DateInput
} from "semantic-ui-calendar-react";

/**
 * ADD LEARNER COMPONENT
 */
class AddLearner extends Component {
    constructor(props) {
        super(props)
        toast.configure()
        this.state = {
            instances:[],
            isLoading: false,
            birth_date: ""
        }
    }
    componentDidMount(){
        getInstance()
        .then((instances)=>{
            if(instances){
                this.setState({instances})
            }
        })
    }

    /**
     * PERMET DE METTREA JOUR LA DATE 
     * @param { Event } e
     */
    handleDate = (e, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    /**
     * ENREGISTRER UNE INSTANCE
     * @param { Event } e
     */
    postLearner = (e) => {
        e.preventDefault()
        this.setState({ isLoading: true })

        let date_birth = this.state.birth_date.split('-')
        const birth_date = `${date_birth[2]}-${date_birth[1]}-${date_birth[0]}T00:00:00+00:00`
        const learner = {
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
            avatar: e.target[0].value.toLowerCase()+'.jpg',
            employer: "JFMLabs"
        }
        setTimeout(() => {
            addLearner(learner)
            .then((message)=>{
                this.props.newLearner(learner)
                this.setState({ isLoading: false }, () => {
                    this.props.exit()
                    toast.success('✔️' + message, { position: 'bottom-left', hideProgressBar: true })
                })
            }).catch((err) => {
                        this.setState({ isLoading: false }, () => {
                            this.props.exit()
                            err.message && toast.error('❌ ' + err.message, { position: 'bottom-left', hideProgressBar: true })
                        })
                    })
            },1000)
        
    }

    render() {
        return (
            <Modal
                dimmer="blurring"
                closeIcon
                onClose={this.props.exit}
                closeOnDimmerClick={false}
                open={this.props.addLearner}
                size="large"
            >
                <Header icon="plus" content="Ajouter un apprenant" />
                <Modal.Content>
                    <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                        <Dimmer active={this.state.isLoading} inverted>
                            <Loader>Chargement</Loader>
                        </Dimmer>
                        <form className="ui form" onSubmit={this.postLearner}>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon user"></i>
                                    <input type="text" pattern="[a-zA-Z]{3,}" autoFocus name="first_name" id="first_name" placeholder="Noms ex:KAGMENI" title="Noms" autoComplete="off" required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon user outline"></i>
                                    <input type="text" name="last_name" autoCapitalize="true" id="last_name" placeholder="Prenoms ex:Jordan" title="Prenoms" autoComplete="off" required />
                                </div>
                            </div>
                            <div className="field">
                                <DateInput
                                    closable={true}
                                    name="birth_date"
                                    icon="calendar outline"
                                    placeholder="Date de naissance ex:07-11-2010"
                                    title="Date de naissance"
                                    value={this.state.birth_date}
                                    iconPosition="left"
                                    onChange={this.handleDate}
                                    required
                                />
                            </div>
                            <div className="field">
                                <select className="ui fluid dropbox" placeholder="Sexe" title="Sexe">
                                    <option value="Masculin">Masculin</option>
                                    <option value="Féminin">Féminin</option>
                                </select>
                            </div>
                            <div className="field">
                                    <select className="ui fluid dropbox" placeholder="Statut matrimonial" title="Statut matrimonial">
                                        <option value="Célibataire">Célibataire</option>
                                        <option value="Marié(e)">Marié(e)</option>
                                    <option value="En couple">En couple</option>
                                        <option value="Veuve">Veuve</option>
                                    </select>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon handshake outline"></i>
                                    <input type="text" name="jobs" autoCapitalize="true" id="jobs" placeholder="Profession ex:Architecte logiciel" title="Profession" autoComplete="off" required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon map pin"></i>
                                    <input type="text" name="address" autoCapitalize="true" id="address" placeholder="Adresse ex:Nkolanga'a" title="Adresse" autoComplete="off" required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon envelope outline"></i>
                                    <input type="text" name="email" pattern="^[a-z0-9_-]+@[a-z0-9_-]+\.[a-z]{2,6}$" autoCapitalize="true" id="email" placeholder="Email ex:joseph@gmail.com" title="Email" autoComplete="off" required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon phone"></i>
                                    <input type="tel" pattern="^6+[0-9]{8}" name="phone_number" id="instance_phone_numbers" placeholder="Téléphone ex:694532343-675664433" title="Téléphone" autoComplete="off" required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon id card outline"></i>
                                    <input type="tel" pattern="[0-9]{9}" name="cni" id="cni" placeholder="N° CNI ex:000576850" title="N° CNI" autoComplete="off" />
                                </div>
                            </div>
                            <div className="field">
                                <select className="ui fluid dropbox" placeholder="Statut matrimonial" title="Statut matrimonial">
                                    {this.state.instances.map((instance)=><option value={instance.id} key={instance.id}>{`${instance.name}(${instance.city})`}</option>)}
                                </select>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="icon file"></i>
                                    <input type="file"  autoFocus name="avatar" id="avatar" placeholder="Photo" title="Photo" autoComplete="off" />
                                </div>
                            </div>
                            <Button color="yellow" inverted type="submit" disabled={this.state.isLoading}>
                                <Icon name="checkmark" /> Ajouter
                      </Button>
                            <Button
                                inverted
                                color="red"
                                onClick={this.props.exit}
                            >
                                <Icon name="remove" /> Annuler
                      </Button>

                        </form>
                    </Dimmer.Dimmable>

                </Modal.Content>
            </Modal>
        )
    }
}

AddLearner.propTypes = {
    exit: PropTypes.func.isRequired,
    addLearner: PropTypes.bool.isRequired,
    newLearner: PropTypes.func.isRequired
}

export default AddLearner