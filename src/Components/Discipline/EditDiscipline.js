import React, { Component } from 'react'
import { getDisciplineById, updateDiscipline } from '../../Controllers/Discipline/CRUD_discipline'
import Head from '../Header/Header'
import { toast } from 'react-toastify'
import { Loader, Button, Icon, Dimmer, Segment, TextArea } from 'semantic-ui-react'
import ModalLogout from '../Sections/ModalLogout'
import { Link } from 'react-router-dom'


/**
 * EDIT DISCIPLINE
 */

 class EditDiscipline extends Component{
    constructor(props){
        super(props)
        toast.configure()
        this.state = {
            discipline: {},
            isLoading: true,
            loading: false,
            modalOpen: false
        }
        this.disciplineId = Number(this.props.match.params.id)
    }

    componentDidMount(){
        getDisciplineById(this.disciplineId)
        .then((discipline)=>{
            this.setState({discipline, isLoading: false})
        })
        .catch((err)=>{
            this.setState({isLoading: false}, ()=>{
                toast.error('❌'+err.message,{position: 'bottom-left', hideProgressBar:true})
            })
        })
    }
    /**
     * PERMET DE SOMMETTRE LES DONNEES
     * @param { Event } e
     */

    handleSubmit = e =>{
        e.preventDefault()
        this.setState({loading: true})
        const newDiscipline = {
            name: e.target[0].value,
            hours: e.target[1].value,
            description: e.target[2].value,
            skills: e.target[3].value.split('. '),
            cost: e.target[4].value,
            module_id: this.state.discipline.module_id
        }
        setTimeout(()=>{
            updateDiscipline(newDiscipline, this.disciplineId)
            .then((message)=>{
                this.setState({loading:false}, ()=>{
                    window.localStorage.setItem('flash', message)
                    this.props.history.push( "/training/qualifying/module/discipline/" + this.state.discipline.module_id)
                })
            })
            .catch((err)=>{
                this.setState({loading: false}, ()=>{
                    toast.error('❌'+err.message, {position: 'bottom-left', hideProgressBar: true})
                })
            })
        }, 300)
    }

     /**
    * PERMET D'OUVRIR LA MODAL
    */
     toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

     render(){
         const { discipline, isLoading, loading } = this.state
         if(isLoading){
             return <div>
                 <Head location="/discipline" handleOpen={this.toggleModal} />
                 <Loader active={true} />
                 <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
             </div>
         }else{
             if(discipline.name && discipline.hours && discipline.description && discipline.skills && discipline.cost && discipline.module_id){
                 return (
                     <div>
                         <Head location="/discipline" handleOpen={this.toggleModal} />
                         <div className="ui container padding">
                             <br /> <br />
                             <h2 className="ui title">
                                 <i className="icon edit large yellow"></i>Editer la discipline
                             </h2>
                             <Dimmer.Dimmable as={Segment} dimmed={loading}>
                                <Dimmer active={loading} inverted>
                                    <Loader>Chargement</Loader>
                                </Dimmer>
                                <form className="ui form large" onSubmit={this.handleSubmit}>
                                    <div className="ui raised segment">
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon pencil"></i>
                                                 <input
                                                     type="text"
                                                     autoFocus
                                                     name="name"
                                                     id="discipline_name"
                                                     placeholder="Nom ex:MAINTENANCE I"
                                                     title="Nom"
                                                     autoComplete="off"
                                                     defaultValue={discipline.name}
                                                     required
                                                 />
                                             </div>
                                         </div>
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon time"></i>
                                                 <input
                                                     type="number"
                                                     name="hours"
                                                     id="discipline_hours"
                                                     placeholder="Hours ex: 124"
                                                     title="Heures"
                                                     autoComplete="off"
                                                     defaultValue={discipline.hours}
                                                     required
                                                 />
                                             </div>
                                         </div>
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <TextArea
                                                     name="description"
                                                     id="discipline_description"
                                                     placeholder="Contenu ex: Architecture des ordinateurs. Système d'exploitation."
                                                     title="Contenu"
                                                     autoComplete="off"
                                                     required
                                                 >{discipline.description}</TextArea>
                                             </div>
                                         </div>
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <TextArea
                                                     name="skills"
                                                     id="discipline_skills"
                                                     placeholder="Compétences ex: Maîtrise de la maintenance préventive, curative et évolutive(matériel et logiciel)."
                                                     title="Compétences"
                                                     autoComplete="off"
                                                     required
                                                 >{discipline.skills.join('. ')}</TextArea>
                                             </div>
                                         </div>
                                         <div className="field">
                                             <div className="ui left icon input">
                                                 <i className="icon money bill alternate"></i>
                                                 <input
                                                     type="number"
                                                     name="cost"
                                                     id="discipline_cost"
                                                     placeholder="Coût ex: 200000"
                                                     title="Coût"
                                                     autoComplete="off"
                                                     defaultValue={discipline.cost}
                                                     required
                                                 />
                                             </div>
                                         </div>
                                         <span className="left float">
                                             <Button
                                                 color="yellow"
                                                 inverted
                                                 type="submit"
                                                 disabled={loading}
                                             >
                                                 <Icon name="checkmark" />Editer
                                    </Button>
                                         </span>
                                         <span className="right float">
                                             <Link to={"/training/qualifying/module/discipline/" + discipline.module_id}>
                                                 <Button
                                                     color="red"
                                                     onClick={this.handleClose}
                                                     inverted
                                                 ><Icon name="remove" />Annuler</Button>
                                             </Link>
                                         </span>
                                    </div>
                                    
                                </form>
                             </Dimmer.Dimmable>
                         </div>
                         <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal}
                         />
                     </div>
                 )
             }else{
                 return <div>
                            <Head location="/discipline" handleOpen={this.toggleModal} />
                            <br />
                            <div className="ui container padding">
                                <br />
                         <Link to={"/training/qualifying/module/discipline/" + discipline.module_id} className="ui button red inverted">
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

 export default EditDiscipline