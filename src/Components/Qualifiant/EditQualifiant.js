import React, { Component } from 'react'
import { getModuleById, updateModule } from '../../Controllers/Modules/CRUD_modules'
import Head from '../Header/Header'
import { toast } from 'react-toastify'
import { Loader, Button, Icon, Dimmer, Segment, TextArea } from 'semantic-ui-react'
import ModalLogout from '../Sections/ModalLogout'
import { Link } from 'react-router-dom'

/**
 * EDIT MODULE QUALIFYING
 */

 class EditModule extends Component {
     constructor(props)
     {
         super(props)
         this.state = {
             module: {},
             isLoading: true,
             loading: false,
             modalOpen: false
         }
         this.id_module = Number(this.props.match.params.id)
     }
     componentDidMount(){
        getModuleById(this.id_module)
        .then((module)=>{
            this.setState({module, isLoading: false})
        })
        .catch((err)=>{
            this.setState({ isLoading: false }, () => {
                toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true })
            })
        })
     }

     handleSubmit = e =>{
         e.preventDefault();
         this.setState({ loading: true })
         const newModule = {
             name: e.target[0].value.toUpperCase(),
             description: e.target[1].value
         }
         setTimeout(()=>{
             updateModule(newModule, this.id_module)
             .then((message)=>{
                 this.setState({loading: false}, ()=>{
                     window.localStorage.setItem('flash', message)
                     this.props.history.push("/training/qualifying/module")
                 })
             })
             .catch((err)=>{
                 this.setState({ loading: false }, () => {
                     toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true })
                 })
             })
         }, 300)
         
     }
     /**
    * PERMET D'OUVRIR LA MODAL
    */
     toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

     render() { 
         const { module,isLoading, loading } = this.state
         if(isLoading){
             return <div>
                 <Head location="/module" handleOpen={this.toggleModal} />
                 <Loader active={true} />
                 <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal}/>
             </div>
         }else{
             if(module.name && module.description){
                 return (
                     <div>
                         <Head location='/module' handleOpen={this.toggleModal} />
                         <div className="ui container padding">
                             <br /> <br />
                             <h2 className="ui title">
                                <i className="icon edit  yellow large"></i> Editer le module
                             </h2>
                             <Dimmer.Dimmable as={Segment} dimmed={loading}>
                                 <Dimmer active={loading} inverted>
                                     <Loader>Chargement</Loader>
                                 </Dimmer>
                                 <form className="ui form" onSubmit={this.handleSubmit}>
                                     <div className="field">
                                         <div className="ui left icon input">
                                             <i className="icon pencil"></i>
                                             <input
                                                 type="text"
                                                 autoFocus
                                                 defaultValue={module.name}
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
                                             >{module.description}</TextArea>
                                         </div>
                                     </div>
                                     <span className="left float">
                                         <Button
                                             color="yellow"
                                             inverted
                                             type="submit"
                                             disabled={loading}
                                         >
                                             <Icon name="checkmark" /> Editer
                                    </Button>
                                     </span>
                                     <span className="right float">
                                         <Link to={"/training/qualifying/module"}>
                                             <Button inverted color="red" onClick={this.props.exit}>
                                                 <Icon name="remove" /> Annuler
                                    </Button>
                                         </Link>
                                     </span>
                                 </form>
                             </Dimmer.Dimmable>
                         </div>
                         <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                     </div>
                 )
             }else{
                 return <div>
                     <Head location="/discipline" handleOpen={this.toggleModal} />
                     <br />
                     <div className="ui container padding">
                         <br />
                         <Link to={"/training/qualifying/module"} className="ui button red inverted">
                             Retour
                            </Link>
                         <br />
                         <h1 style={{ textAlign: "center" }}>
                             La ressource n'existe pas !
                            </h1>
                     </div>
                     <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                 </div>
             }
         }
     }
 }
  
 export default EditModule