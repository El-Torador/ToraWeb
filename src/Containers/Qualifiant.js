import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader, Popup, Header, Breadcrumb } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Qualifiant.css'
import RowQualifiant from '../Components/Qualifiant/RowQualifiant'
import { getModules } from '../Controllers/Modules/CRUD_modules'
import AddModule from '../Components/Qualifiant/AddQualifiant'
/**
 * QUALIFIANT CONTAINER
 */
class Qualifiant extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            modules: [],
            addQualifiant: false,
            isLoading: true,
            modalOpen: false,
            value: ''
        }
    }

    componentDidMount(){
        getModules()
        .then((modules)=>{
            this.setState({
                modules,
                isLoading: false
            }, ()=>{
                    if (window.localStorage.getItem('flash')) {
                        toast.success('✔️' + window.localStorage.getItem('flash'), {
                            position: 'bottom-left', hideProgressBar: true, onClose: () => {
                                window.localStorage.clear()
                                window.localStorage.setItem('init_lauch', true)
                            }
                        })
                    }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    /**
  * AJOUTE UN NOUVEL MODULE
  */
    newModule = module => {
        getModules()
            .then(modules => {
                const mod = modules.filter(item => item.name === module.name);
                module.id = mod[0].id;
                const m = [...this.state.modules, module];
                this.setState({ modules: m });
            })
            .catch(err => {
                this.setState({ isLoading: false }, () =>
                    toast.error("❌" + err.message, {
                        position: "bottom-left",
                        hideProgressBar: true
                    })
                );
            });
    };
    /**
   * PERMET DE METTRE A JOUR LA VALEUR DE LA RECHERCHE
   * @param {Event} event
   */
    handleChange = event => {
        const { value } = event.target
        this.setState({ value })
    }
    /**
     * PERMET D'OUVRIR OU DE FERMER LA MODAL DE DECONNEXION
     */
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    /**
  * PERMET D'OUVRIR OU DE FERMER LA MODAL D'AJOUT DE DISCIPLINE
  */
    toggleModalAddModuleQualifiant = () =>
        this.setState({ addQualifiant: !this.state.addQualifiant });

    render(){
       if(this.state.isLoading){
           return (
           <div>
               <Head location="/trainingg" handleOpen={this.toggleModal} />
               <br />
               <div className="ui container padding">
                       <Header block>
                           <Breadcrumb size="large">
                               <Breadcrumb.Section><Link to="/training">Formation</Link></Breadcrumb.Section>
                               <Breadcrumb.Divider icon="right chevron" />
                               <Breadcrumb.Section active><Link to="/training/qualifying/module" className="is-active-that">Qualifiante</Link></Breadcrumb.Section>
                           </Breadcrumb>
                       </Header>
                   <h1>
                       <i className="icon clipboard check yellow large"></i> Modules des formations qualifiantes
                   </h1>
                   <br />
                       <div className="ui search">
                           <div className="ui left icon input">
                               <i className="icon search"></i>
                               <Popup
                                   content="Rechercher un module"
                                   trigger={
                                       <input
                                           className="prompt"
                                           type="text"
                                           placeholder="Rechercher un module..."
                                           onChange={this.handleChange}
                                       />
                                   }
                                   position="left center"
                               />
                           </div>
                       </div>
                   <Loader active={true} />
               </div>
                   <button
                       className="circular ui icon disabled yellow massive button is_fix"
                       title="Ajouter un module"
                       onClick={this.toggleModalAddModuleQualifiant}
                   >
                       <i className="icon plus"></i>
                   </button>
                   <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
           </div>)
       }else{
           return (
           <div>
               <Head location='/training' handleOpen={this.toggleModal} />
               <br />
               <br />
               <div className="ui container padding">
                       <Header block>
                           <Breadcrumb size="large">
                               <Breadcrumb.Section><Link to="/training">Formation</Link></Breadcrumb.Section>
                               <Breadcrumb.Divider icon="right chevron" />
                               <Breadcrumb.Section active><Link to="/training/qualifying/module" className="is-active-that">Qualifiante</Link></Breadcrumb.Section>
                           </Breadcrumb>
                       </Header>
                   <h1>
                        <i className="icon clipboard check yellow large"></i> Modules des formations qualifiantes
                   </h1>
                   <br />
                       <div className="ui search">
                           <div className="ui left icon input">
                               <i className="icon search"></i>
                               <Popup
                                   content="Rechercher un module"
                                   trigger={
                                       <input
                                           className="prompt"
                                           type="text"
                                           placeholder="Rechercher un module..."
                                           onChange={this.handleChange}
                                       />
                                   }
                                   position="left center"
                               />
                           </div>
                       </div>
                       <br />
                       <div className="ui grid">
                        <RowQualifiant entries={this.state.value} modules={this.state.modules} />
                       </div>
               </div>
                   <Popup
                       content="Ajouter un module"
                       trigger={
                           <button
                               className="circular ui icon massive button yellow is_fix"
                               onClick={this.toggleModalAddModuleQualifiant}
                           >
                               <i className="icon plus"></i>
                           </button>
                       }
                       position="left center"
                   />
               <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
               <AddModule newModule={this.newModule} addModule={this.state.addQualifiant}
               exit={this.toggleModalAddModuleQualifiant} />
           </div>)
       }
    }
}

export default Qualifiant