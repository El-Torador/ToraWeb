import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Modal, Icon, Button, Header } from 'semantic-ui-react'
import { addInstance } from '../../Controllers/instances/CRUD_instance'
import {
    DateInput
} from "semantic-ui-calendar-react";

/**
 * ADD INSTANCE COMPONENT
 */
class AddInstance extends Component{
    constructor(props){
        super(props)
        this.state = {
            date: this.props.date
        }
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
    postInstance = (e) => {
        e.preventDefault()
        const instance = {
            name: e.target[0].value,
            city: e.target[1].value,
            address: e.target[2].value,
            responsable: e.target[3].value,
            phone_number: e.target[4].value.split('-'),
            inauguration: this.state.date
        }
        if (instance.name) {
            if (instance.city) {
                if (instance.address) {
                    if (instance.responsable) {
                        if (instance.phone_number) {
                            if (instance.inauguration) {
                                addInstance(instance)
                                    .then((message) => {
                                        const i = [...this.state.instance, instance]
                                        this.setState({ instance: i }, () => {
                                            toast.success('✔️' + message, { position: 'bottom-left', hideProgressBar: true })
                                        })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            } else {
                                toast.error('❌La date d\'inauguration est requise.', { position: 'bottom-left', hideProgressBar: true })
                            }
                        } else {
                            toast.error('❌ Le numéro de téléphone est requis ou non valide.', { position: 'bottom-left', hideProgressBar: true })
                        }
                    } else {
                        toast.error('❌ Le nom du responsable est requis.', { position: 'bottom-left', hideProgressBar: true })
                    }
                } else {
                    toast.error('❌ L\'adresse est requise.', { position: 'bottom-left', hideProgressBar: true })
                }
            } else {
                toast.error('❌ La ville est requise.', { position: 'bottom-left', hideProgressBar: true })
            }
        } else {
            toast.error('❌ Le nom de l\'instance est requis.', { position: 'bottom-left', hideProgressBar: true })
        }
    }

    render(){
        return (
            <Modal
                dimmer="blurring"
                closeIcon
                onClose={this.props.exit}
                closeOnDimmerClick={false}
                open={this.props.addInstance}
                size="large"
            >
                <Header icon="plus" content="Ajouter une instance" />
                <Modal.Content>
                    <form className="ui form" onSubmit={this.postInstance}>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="icon globe"></i>
                                <input type="text" minLength="4" autoCapitalize autoFocus name="name" id="instance_name" placeholder="Nom ex:IAI-CENTRE" title="Nom" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="icon home"></i>
                                <input type="text" name="city" minLength="4" id="instance_city" placeholder="Ville ex:Yaoundé" title="Ville" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="icon map pin"></i>
                                <input type="text" name="address" minLength="3" id="instance_address" placeholder="Adresse ex:Nkolanga'a" title="Adresse" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="icon user secret"></i>
                                <input type="text" minLength="4" name="responsable" id="instance_responsable" placeholder="Responsable ou Chef de centre ex:ARMAND CLAUDE ABANDA" title="Responsable ou Chef de centre" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="icon phone"></i>
                                <input type="tel" pattern="[0-9]{9}-" name="phone_number" id="instance_phone_numbers" placeholder="Téléphone ex:694532343-675664433" title="Téléphone" autoComplete="off" required />
                            </div>
                        </div>
                        <div className="field">
                            <DateInput
                                closable={true}
                                name="date"
                                placeholder="Date d'inauguration ex: 10-01-2010"
                                title="Date d'inauguration"
                                value={this.state.date}
                                iconPosition="left"
                                onChange={this.handleDate}
                                required
                            />
                        </div>
                        <Button color="yellow" inverted type="submit">
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
                </Modal.Content>
            </Modal>
        )
    }
}

AddInstance.propTypes = {
    date: PropTypes.string.isRequired,
    exit: PropTypes.func.isRequired,
    addInstance: PropTypes.bool.isRequired
}

export default AddInstance