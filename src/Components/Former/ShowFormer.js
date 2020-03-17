import React, { Component, Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import former from '../../assets/images/former.jpg'
import formerGirl from '../../assets/images/formerGirl.jpg'
import { Modal, Header, Image } from 'semantic-ui-react'
/**
 * SHOWDETAILS COMPONENT
 */

 class ShowDetails extends Component {
     constructor(props){
         super(props)
         this.state = {}
     }

     render() { 
         return ( 
             <Fragment>
                 <Modal trigger={this.props.trigger} closeIcon id="details_former">
                     <Header icon="user secret yellow" content={this.props.former.first_name+" "+this.props.former.last_name} />
                     <Modal.Content image>
                         {this.props.former.sex === 'Masculin' ? <Image wrapper="true" size="large" src={former} /> : <Image wrapped="true" size="large" src={formerGirl} />}
                         <Modal.Description>
                             <div className="margin-avatar">
                                 <p>
                                     <strong>Noms: </strong>
                                     <span>{this.props.former.first_name}</span>
                                 </p>
                                 <p>
                                     <strong>Prénoms: </strong>
                                     <span>{this.props.former.last_name}</span>
                                 </p>
                                 <p>
                                     <strong>Date de naissance: </strong>
                                     <span>{moment(this.props.former.birth_date).format("DD/MM/YYYY")}</span>
                                 </p>
                                 <p>
                                     <strong>Matricule: </strong>
                                     <span>{this.props.former.matricule || 'Aucun'}</span>
                                 </p>
                                 <p>
                                     <strong>N° CNPS: </strong>
                                     <span>{this.props.former.cnps || 'Aucun'}</span>
                                 </p>
                                 <p>
                                     <strong>Sexe: </strong>
                                     <span>{this.props.former.sex}</span>
                                 </p>
                                 <p>
                                     <strong>Fonction: </strong>
                                     <span>{this.props.former.function}</span>
                                 </p>
                             </div>
                         </Modal.Description>
                     </Modal.Content>
                 </Modal>
             </Fragment>
          );
     }
 }
 ShowDetails.propTypes = {
     trigger: PropTypes.node.isRequired,
     former: PropTypes.object.isRequired
 }
  
 export default ShowDetails;