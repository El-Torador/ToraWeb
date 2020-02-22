import React from 'react'
import { Link } from 'react-router-dom'
import { Loader, Header, Breadcrumb } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
/**
 * E-LEARNING CONTAINER
 */
class E_Learning extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            modalOpen: false
        }
    }

    /**
* PERMET D'OUVRIR OU FERMER LA MODAL
*/
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    render() { 
        if(this.state.isLoading){
            return (
                <div>
                    <Head location="" handleOpen={this.toggleModal}/>
                    <br />
                    <div className="ui container padding">
                    <Header block>
                        <Breadcrumb size="large">
                            <Breadcrumb.Section><Link to="/training">Formation</Link></Breadcrumb.Section>
                                <Breadcrumb.Divider icon="right chevron" />
                                <Breadcrumb.Section active><Link to="/training/e-learning" className="is-active-that">E-Learning</Link></Breadcrumb.Section>
                        </Breadcrumb>
                    </Header>
                    <h1>
                        <i className="icon leanpub large yellow">
                        </i> E-Learning
                    </h1>
                        <Loader active={true} />
                    </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
            )
        }else{
            return (
                <div>
                    <Head location="" handleOpen={this.toggleModal} />
                    <br />
                    <div className="ui container padding">
                        <Header block>
                            <Breadcrumb size="large">
                                <Breadcrumb.Section><Link to="/training">Formation</Link></Breadcrumb.Section>
                                <Breadcrumb.Divider icon="right chevron" />
                                <Breadcrumb.Section active><Link to="/training/e-learning" className="is-active-that">E-Learning</Link></Breadcrumb.Section>
                            </Breadcrumb>

                        </Header>
                        <h1>
                            <i className="icon leanpub large yellow">
                            </i> E-Learning
                        </h1>
                    </div>
                    <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                </div>
            )
        }
    }
}
 
export default E_Learning;