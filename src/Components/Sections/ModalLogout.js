import React, { Component } from 'react'
import { Modal, Button, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * MODALLOGOUT COMPONENT
 */
class ModalLogout extends Component {
    render() { 
        return ( 
            <Modal
                open={this.props.modalOpen}
                onClose={this.props.onClose}
                basic
                closeOnDimmerClick={false}
                size="small"
            >
                <Header icon="log out" content="Déconnection" />
                <Modal.Content>
                    <h3>Vouvez-vous vraiment vous déconnecter ?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        color="yellow"
                        onClick={this.props.onClose}
                        inverted
                    >
                        <Icon name="remove" /> Non
                    </Button>
                    <Link to="/">
                        <Button color="red" inverted>
                            <Icon name="checkmark" /> Oui
                      </Button>
                    </Link>
                </Modal.Actions>
            </Modal>
         );
    }
}
 
ModalLogout.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}
export default ModalLogout