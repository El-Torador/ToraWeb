import React, { Component, Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import avatar from '../../assets/images/avatar.png'
import girl from '../../assets/images/girl.png'
import { Modal, Header, Image, Popup } from 'semantic-ui-react'

/**
 * SHOWDETAILS COMPONENT
 */
class ShowDetails extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
   
    render() {
        const instance = this.props.instance.filter(item => item.id === this.props.learner.instance_id)
        return (
            <Fragment>
                <Modal
                    trigger={this.props.trigger}
                    closeIcon
                    id="Details"
                >
                    <Header icon='student yellow' content={this.props.learner.first_name+" "+this.props.learner.last_name} />
                    <Modal.Content image>
                        {this.props.learner.sex === "Masculin" ? <Image wrapper="true" size="large" src={avatar}  /> : <Image wrapper="true" size="large" src={girl}  />}
                        <Modal.Description>
                            <div className="margin-avatar">

                                <p>

                                    <strong>Noms: </strong> <span> {this.props.learner.first_name}</span>

                                </p>
                                <p>

                                    <strong>Prenoms: </strong> <span> {this.props.learner.last_name}</span>

                                </p>
                                <p>

                                    <strong>Date de naisance: </strong> <span> {moment(this.props.learner.birth_date).format("DD/MM/YYYY")}</span>

                                </p>
                                <p>

                                    <strong>Sexe: </strong> <span> {this.props.learner.sex}</span>

                                </p>
                                <p>

                                    <strong>Statut matrimonial: </strong> <span> {this.props.learner.marital_status}</span>

                                </p>
                                <p>

                                    <strong>CNI: </strong> <span> {this.props.learner.cni}</span>

                                </p>
                                <p>

                                    <strong>Profession: </strong> <span> {this.props.learner.jobs}</span>

                                </p>
                                <p>

                                    <strong>Adresse: </strong> <span> {this.props.learner.address}</span>

                                </p>
                                <p>

                                    <strong>Contact: </strong> <span> {this.props.learner.phone_number}</span>

                                </p>
                                <p>

                                    <strong>Email: </strong> <span> {this.props.learner.email}</span>

                                </p>
                                <p>

                                    <strong>Instance: </strong> <span> {this.props.instance.length > 0? instance[0].name + "(" + instance[0].city + ")" : this.props.learner.instance_id}</span>

                                </p>
                                <p>

                                    <strong>Inscrit le : </strong> <span> {moment(this.props.learner.created_at).format("DD/MM/YYYY")}</span>

                                </p>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Content>
                            <div className="ui message warning">
                                <span className="left floated">LISTE DES FORMATIONS</span>
                            </div>
                            <Modal.Description>
                            <Popup content="Ajouter une formation" trigger={<div className="list_training">
                                <i className="icon plus large" id="lola"></i>
                            </div>} position="right center" />
                            </Modal.Description>                       
                    </Modal.Content>
                    <Modal.Content>
                        <div className="ui message warning">
                            <span className="left floated">LISTE DES CERTIFICATIONS</span>
                        </div>
                        <Modal.Description>

                            <Popup content="Imprimer la certification" trigger={<div className="list_training">
                                <i className="icon student large" id="lola"></i>
                            </div>} position="right center" />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Fragment>
        )
    }
}

ShowDetails.propTypes = {
    trigger: PropTypes.node.isRequired,
    learner: PropTypes.object.isRequired,
    instance: PropTypes.array.isRequired
}
export default ShowDetails