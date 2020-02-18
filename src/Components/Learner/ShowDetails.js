import React, { Component, Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import avatar from '../../assets/images/avatar.png'
import girl from '../../assets/images/girl.png'
import { toast } from 'react-toastify'
import { getInstanceById } from '../../Controllers/instances/CRUD_instance'
import { Modal, Header, Image } from 'semantic-ui-react'

/**
 * SHOWDETAILS COMPONENT
 */
class ShowDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            instance: {}
        } 
    }
    componentDidMount(){
        getInstanceById(this.props.learner.instance_id)
        .then((instance)=>{
            if(instance){
                this.setState({instance})
            }
        })
        .catch((err)=>{
            toast.error('❌'+err.message, {position: 'bottom-left', hideProgressBar:true})
        })
    }
    render() {
        return (
            <Fragment>
                <Modal
                    trigger={this.props.trigger}
                    closeIcon
                >
                    <Header icon='student yellow' content={this.props.learner.first_name+" "+this.props.learner.last_name} />
                    <Modal.Content image>
                        {this.props.learner.sex === "Masculin" ? <Image wrapper="true" size="large" src={avatar} /> : <Image wrapper="true" size="large" src={girl} />}
                        <Modal.Description>
                
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

                                <strong>Instance: </strong> <span> {this.state.instance.name ? this.state.instance.name+"("+this.state.instance.city+")" : this.props.learner.instance_id}</span>

                            </p>
                            <p>

                                <strong>Inscrit le : </strong> <span> { moment(this.props.learner.created_at).format("DD/MM/YYYY")}</span>

                            </p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Fragment>
        )
    }
}

ShowDetails.propTypes = {
    trigger: PropTypes.node.isRequired,
    learner: PropTypes.object.isRequired
}
export default ShowDetails