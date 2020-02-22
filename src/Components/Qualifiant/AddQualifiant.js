import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Modal, Header, Dimmer, Segment, Loader, Icon, Button, TextArea } from 'semantic-ui-react'
import { addModule } from '../../Controllers/Modules/CRUD_modules'

/**
 * ADD MODULE QUALIFYING
 */

 class AddModule extends Component {
     constructor(props){
         super(props)
         this.state = {
             isLoading: false
         }
     }
     /**
      * ENREGISTRER UN MODULE QUALIFIANT
      * @param { Event } e
      */
     postModule = e =>{
        e.preventDefault()
        this.setState({isLoading: true})
        const module = {
            name: e.target[0].value.toUpperCase(),
            description: e.target[1].value
        }
        setTimeout(()=>{
            addModule(module)
            .then((message)=>{
                this.props.newModule(module)
                this.setState({isLoading: false}, ()=>{
                    this.props.exit()
                    toast.success("✔️" + message, {
                        position: "bottom-left",
                        hideProgressBar: true
                    });
                })
            })
            .catch((err)=>{
                this.setState({ isLoading: false }, () => {
                    this.props.exit();
                    err.message &&
                        toast.error("❌ " + err.message, {
                            position: "bottom-left",
                            hideProgressBar: true
                        });
                });
            })
        }, 300)
     }
     render(){
         return (
             <Modal dimmer="blurring" closeIcon onClose={this.props.exit} closeOnDimmerClick={false} open={this.props.addModule}
                 size="large"
             >
                 <Header icon="plus yellow" content="Ajouter un Module" />
                 <Dimmer.Dimmable as={Segment} dimmer={this.state.isLoading}>
                     <Dimmer active={this.state.isLoading} inverted>
                         <Loader>Chargement</Loader>
                     </Dimmer>
                     <form className="ui form" onSubmit={this.postModule}>
                         <div className="field">
                             <div className="ui left icon input">
                                 <i className="icon pencil"></i>
                                 <input
                                     type="text"
                                     pattern="[a-zA-Z_-\s]{2,}"
                                     autoFocus
                                     name="name"
                                     id="module_name"
                                     placeholder="Nom ex:SYSTEME & RESEAU"
                                     title="Nom"
                                     autoComplete="off"
                                     required
                                 />
                             </div>
                         </div>
                         <div className="field">
                             <div className="ui left icon input">
                                 <TextArea
                                     name="description"
                                     id="module_description"
                                     placeholder="Description ex: Pas d'organisation sans informattique..."
                                     title="Description"
                                     autoComplete="off"
                                     required
                                 ></TextArea>
                             </div>
                         </div>
                         <Button
                             color="yellow"
                             inverted
                             type="submit"
                             disabled={this.state.isLoading}
                         >
                             <Icon name="checkmark" /> Ajouter
              </Button>
                         <Button inverted color="red" onClick={this.props.exit}>
                             <Icon name="remove" /> Annuler
              </Button>
                     </form>
                 </Dimmer.Dimmable>
             </Modal>
         )
     }
 }
AddModule.propTypes = {
    exit: PropTypes.func.isRequired,
    addModule: PropTypes.bool.isRequired,
    newModule: PropTypes.func.isRequired
}
 export default AddModule