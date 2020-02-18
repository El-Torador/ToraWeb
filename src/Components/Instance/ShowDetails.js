import React, { Component, Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Modal, Header, Icon, Divider } from 'semantic-ui-react' 

/**
 * SHOWDETAILS COMPONENT
 */
class ShowDetails extends Component {
  
    render(){
        return(
            <Fragment>
                <Modal
                 trigger={this.props.trigger}
                 closeIcon
                >
                <Header icon='globe yellow' content={this.props.instance.name} />
                <Modal.Content>
                    <Modal.Description>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='home' />
                                    Ville
                                </Header>
                            </Divider>
                            <p>{this.props.instance.city}</p>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='map pin' />
                                    Adresse
                                </Header>
                            </Divider>
                            <p>{this.props.instance.address}</p>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='user secret' />
                                    Chef de centre
                                </Header>
                            </Divider>
                            <p>{this.props.instance.responsable}</p>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='phone' />
                                    Contact
                                </Header>
                            </Divider>
                            <p>{this.props.instance.phone_number && this.props.instance.phone_number.join('-')}</p>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='calendar' />
                                    Date de création
                                </Header>
                            </Divider>
                            <p>le: {moment(this.props.instance.created_at).format("DD/MM/YYYY")}</p>
                    </Modal.Description>
                </Modal.Content>
                </Modal>
            </Fragment>
        )
    }
}

ShowDetails.propTypes = {
    trigger: PropTypes.node.isRequired,
    instance: PropTypes.object.isRequired
}
export default ShowDetails