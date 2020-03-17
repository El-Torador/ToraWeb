import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { getFormerById, updateFormer } from '../../Controllers/Former/CRUD_former';
import moment from 'moment';
import Head from '../Header/Header';
import { Loader, Dimmer, Segment, Button, Icon } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Link } from 'react-router-dom';
import ModalLogout from '../Sections/ModalLogout';


/**
 * EDIT FORMER COMPONENT 
 */

 class EditFormer extends Component {
     constructor(props){
         super(props)
         toast.configure()
         this.state = {
             former: {},
             isLoading:[],
             loading: false,
             modalOpen: false,
             birth_date:""
         }
         this.formerId = Number(this.props.match.params.id)
     }

     componentDidMount(){
         if(this.formerId){
             getFormerById(this.formerId)
             .then((former)=>{
                if(former){
                    this.setState({former, isLoading: false, birth_date: moment(former.birth_date).format("DD-MM-YYYY")})
                }else{
                    toast.warn('⚠️ La ressource n\'existe pas.', { position: 'bottom-left', hideProgressBar: true })
                }
             })
             .catch(err=>{
                 this.setState({ isLoading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }))
             })
         }else{
             toast.error('❌404❌ Cette ressource n\'existe pas. ', { position: 'bottom-left', hideProgressBar: true, onClose: () => this.props.history.push('/former') })
         }
     }
     /**
    * PERMET DE METTRE A JOUR LA DATE
    *@param { Event } e
    */
     handleDate = (e, { name, value }) => {
         if (this.state.hasOwnProperty(name)) {
             this.setState({ [name]: value });
         }
     }

     /**
    * PERMET D'OUVRIR LA MODAL
    */
     toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })
     /**
      * PERMET DE SOUMMETTRE LES DONNEES
      * @param { Event } e
      */
     handleSubmit = e =>{
        e.preventDefault()
        this.setState({loading: true})
        let date = this.state.birth_date.split('-')
        const birth_date = `${date[2]}-${date[1]}-${date[0]}T00:00:00+00:00`
        //const data = new FormData(document.querySelector('#form-edit'))
        //data.set('birth_date', birth_date)
        const data = {
            first_name: e.target[0].value.toUpperCase(),
            last_name: e.target[1].value,
            birth_date,
            sex: e.target[3].value,
            matricule: e.target[4].value,
            function: e.target[5].value,
            cnps: e.target[6].value,
            avatar: 'img.jpg',
            instance_id: 4
        }
        console.log(data)
        setTimeout(()=>{
            updateFormer(data, this.formerId)
            .then((message)=>{
                this.setState({ loading: false }, () => {
                    window.localStorage.setItem('flash', message)
                    this.props.history.push('/former')
                })
            })
            .catch((err)=>{
                this.setState({ loading: false }, () => toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true }))
            })
        }, 300)
     }
     render() { 
         const { former } = this.state
         if(this.state.isLoading){
             return ( <div>
                 <Head location="/former" handleOpen={this.toggleModal} />
                 <Loader active={true} />
             </div> );
         }else{
             if(former.first_name && former.last_name && former.birth_date && former.sex && former.matricule && former.function){ 
                 return (
                     <div>
                         <Head location="/former" handleOpen={this.toggleModal} />
                         <div className="ui container">
                             <br />
                             <br />
                             <h2 className="ui title">
                                 <i className="icon edit large yellow"></i>
                             Editer le formateur
                         </h2>
                             <Dimmer.Dimmable as={Segment} dimmed={this.state.loading}>
                                 <Dimmer active={this.state.loading} inverted>
                                     <Loader>Chargement</Loader>
                                 </Dimmer>
                                 <form className="ui form large" onSubmit={this.handleSubmit} entype="multipart/form-data" id="form-edit">
                                     <div className="ui raised segment">
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon user"></i>
                                                 <input
                                                     type="text" name="first_name" id="first_name"
                                                     minLength="3"
                                                     defaultValue={former.first_name}
                                                     placeholder="Noms ex:KAGMENI"
                                                     title="Noms"
                                                     autoComplete="off"
                                                     required
                                                 />
                                             </div>
                                         </div>

                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon user outline"></i>
                                                 <input
                                                     type="text"
                                                     name="last_name"
                                                     minLength="3"
                                                     defaultValue={former.last_name}
                                                     autoCapitalize="true"
                                                     id="last_name"
                                                     placeholder="Prenoms ex:Jordan"
                                                     title="Prenoms"
                                                     autoComplete="off"
                                                     required
                                                 />
                                             </div>
                                         </div>
                                         <div className="field">
                                             <DateInput
                                                 closable={true}
                                                 name="birth_date"
                                                 icon="calendar outline"
                                                 placeholder="Date de naissance ex:07-11-1998"
                                                 title="Date de naissance"
                                                 value={this.state.birth_date}
                                                 iconPosition="left"
                                                 onChange={this.handleDate}
                                                 required
                                             />
                                         </div>
                                         <div className="field">
                                             <select
                                                 name="sex"
                                                 className="ui fluid dropbox"
                                                 placeholder="Sexe"
                                                 title="Sexe"
                                             >
                                                 <option value="Masculin" selected={former.sex === 'Masculin' && true}>Masculin</option>
                                                 <option value="Féminin" selected={former.sex === 'Féminin' && true}>Féminin</option>
                                             </select>
                                         </div>
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon handshake outline"></i>
                                                 <input
                                                     type="text"
                                                     name="matricule"
                                                     id="matricule"
                                                     defaultValue={former.matricule}
                                                     placeholder="Matricule ex:IAI0001"
                                                     title="Matricule"
                                                     autoComplete="off"
                                                     required
                                                 />
                                             </div>
                                         </div>

                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon map pin"></i>
                                                 <input
                                                     type="text"
                                                     name="function"
                                                     autoCapitalize="true"
                                                     id="function"
                                                     defaultValue={former.function}
                                                     placeholder="Fonction ex:Enseignant"
                                                     title="function"
                                                     autoComplete="off"
                                                     required
                                                 />
                                             </div>
                                         </div>
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon envelope outline"></i>
                                                 <input
                                                     type="text"
                                                     name="cnps"
                                                     id="cnps"
                                                     defaultValue={former.cnps}
                                                     placeholder="N° CNPS ex:000-380-456-231"
                                                     title="N° CNPS"
                                                     autoComplete="off"
                                                     
                                                 />
                                             </div>
                                         </div>

                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon file"></i>
                                                 <input
                                                     type="file"
                                                     autoFocus
                                                     name="avatar"
                                                     id="avatar"
                                                     placeholder="Photo"
                                                     title="Photo"
                                                     autoComplete="off"
                                                 />
                                             </div>
                                         </div>
                                         <span className="left float">
                                             <Button color="yellow" inverted disabled={this.state.loading}>
                                                 <Icon name="checkmark" />
                                             Editer
                                         </Button>
                                         </span>
                                         <span className="right float">
                                             <Link to="/former">
                                                 <Button
                                                     color="red"
                                                     inverted
                                                 >
                                                     <Icon name="remove" />
                                                 Annuler
                                             </Button>
                                             </Link>
                                         </span>
                                     </div>
                                 </form>
                             </Dimmer.Dimmable>
                         </div>
                         <ModalLogout
                             modalOpen={this.state.modalOpen}
                             onClose={this.toggleModal}
                         />
                     </div>
                 )
         }else{
             return (
                 <div>
                     <Head location="/former" handleOpen={this.toggleModal
                     } />
                     <br />
                     <div className="ui container padding">
                         <br />
                         <Link to="/former" className="ui button red inverted">
                             Retour
                         </Link>
                         <br />
                         <h1 style={{textAlign: "center"}}>
                             La ressource n'existe pas !
                         </h1>
                     </div>
                 </div>
             )
         }
     }
 }
}
  
 export default EditFormer;