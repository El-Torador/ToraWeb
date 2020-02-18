import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify'
import { Loader } from 'semantic-ui-react'
import ModalLogout from '../Components/Sections/ModalLogout'
import Head from '../Components/Header/Header'
import Fade from 'react-reveal/Fade'
import { getUsers, addUser, editUser, deleteUser } from '../Controllers/users/CRUD_users'
import { getInstance } from '../Controllers/instances/CRUD_instance'
import './User.css'
/**
 * USER CONTAINER
 */
class User extends Component {
    constructor(props){
        super(props)
        toast.configure()
        this.state = {
            data: [],
            isLoading: true,
            selectedRow: null, 
            modalOpen: false
        }
        this.columns = [
            {title: 'N°', field: 'id'},
            {title: 'Nom utilisateur', field: 'username'},
            {title: 'Mot de passe', field: 'password'},
            {title: 'Role', 
            field: 'roles',
            lookup:{
                ROLES_ADMIN: 'Administrateur',
                ROLES_SYSTEM: 'Chef de centre'
            }},
            {title: 'Statut', field: 'is_lock',
            lookup:{
                true: 'Bloqué',
                false: 'Non bloqué'
            }},
            {title: 'Instance', field: 'instance_id',
            lookup:{
                
            }},
            {title: 'Date de création', field: 'created_at', type: 'date'}
        ]
            
         
    }
    /**
     * METHODE LANCE LORSQUE LE COMPOSANT EST MONTE DANS LE DOM
     */
     componentDidMount(){
            getUsers().then((data)=>{
                if(data){
                  getInstance().then((instances) => {
                    if(instances){
                      instances.map((item) => this.columns[5].lookup[item.id] = item.name+"("+item.city+")")
                      this.setState({ data, isLoading: false })
                    }else{
                      toast.info('ℹ️ Aucune instance enregistré, Veuillez Ajouter une instance avant de continuer.', {
                        position: 'bottom-left',
                        hideProgressBar: true,
                        onClose: ()=>{
                          this.props.history.push('/instance')
                        }
                      })
                    }
                  }).catch((err) => {
                    this.setState({ isLoading: false }, () => toast.error('❌'+err.message, {
                      position: 'bottom-left',
                      hideProgressBar: true
                    }))
                  })
                }else{
                  getInstance().then((instances) => {
                    if (instances) {
                      instances.map((item) => this.columns[5].lookup[item.id] = item.name)
                      this.setState({ data, isLoading: false })
                      toast.info('ℹ️ Pas d\'utilisateur enregistré.', {
                        position: 'bottom-left',
                        hideProgressBar: true
                      })
                    } else {
                      toast.info('ℹ️ Pas d\'utilisateur enregistré.', {
                        position: 'bottom-left',
                        hideProgressBar: true
                      })
                      toast.info('ℹ️ Aucune instance enregistré, Veuillez Ajouter une instance avant de continuer.', {
                        position: 'bottom-left',
                        hideProgressBar: true,
                        onClose: () => {
                          this.props.history.push('/instance')
                        }
                      })
                    }
                  }).catch((err) => {
                    this.setState({ isLoading: false }, () => toast.error('❌' + err.message, {
                      position: 'bottom-left',
                      hideProgressBar: true
                    }))
                  })
                  
                }
            })
            .catch((err)=>{
              this.setState({ isLoading: false }, () => toast.error('❌'+err.message, {
                position: 'bottom-left',
                hideProgressBar: true
              }))
                
              
              })
            
    }

  /**
* PERMET D'OUVRIR OU FERMER LA MODAL
*/
  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    render(){
        if(this.state.isLoading){
            return (
            <div>
              <Head location="/users" handleOpen={this.toggleModal} />
              <div className="ui container padding">
                  <h1>
                    <i className='icon users large'></i>Gestion des Utilisateurs
                    </h1>
                  <br />
                  <Loader active={true} />
                  <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
              </div>
            </div>)
        }else{
            return (
                <div>
                <Head location="/users" handleOpen={this.toggleModal}  />
                    <div className="ui container padding">
                    <h1>
                      <i className='icon users large yellow'></i>Gestion des Utilisateurs
                    </h1>
                  <br />

                    <Fade right>
                        <MaterialTable
                        title="Utilisateurs de IAI-LEARNSHIP"
                        columns={this.columns}
                        data={this.state.data}
                        localization={{
                          body:{
                            emptyDataSourceMessage: 'Aucun utilisateur enregistré',
                            addTooltip: 'Ajouter',
                            deleteTooltip: 'Supprimer',
                            editTooltip: 'Editer',
                            editRow:{
                              deleteText: 'Voulez-vous vraiment supprimer cet utilisateur ?',
                              cancelTooltip: 'Annuler',
                              saveTooltip: 'Enregistrer'
                            }
                          },
                          grouping:{
                            placeholder: 'Clisser et déposer les en-têtes pour grouper la recherche...'
                          },
                          header:{
                            actions: 'Actions'
                          },
                          pagination:{
                            labelDisplayedRows: '{from}-{to} sur {count}',
                            firstArialLabel: 'Première Page',
                            firstTooltip: 'Première Page',
                            previousAriaLabel: 'Page Précédente',
                            previousTooltip: 'Page Précédente',
                            nextAriaLabel: 'Page Suivante',
                            nextTooltip: 'Page Suivante',
                            lastArialLabel: 'Dernière Page',
                            lastTooltip: 'Dernière Page'
                          },
                          toolbar:{
                            exportTitle: 'Exporter',
                            exportAriaLabel: 'Exporter',
                            exportName: 'Exporter en format CSV',
                            searchPlaceholder: 'Rechercher',
                            searchTooltip: 'Rechercher'
                          }
                        }}
                        options={{
                          grouping: true,
                          headerStyle: {
                            backgroundColor: '#FFC961',
                            color: '#FFF'
                          },
                        rowStyle: rowData => ({
                            backgroundColor:
                            this.state.selectedRow &&
                            this.state.selectedRow.tableData.id ===
                            rowData.tableData.id
                            ? "#EEE"
                            : "#FFF"
                   }),
                   sorting: true,
                   exportButton: true
                 }}
                 
                 editable={{
                   onRowAdd: newData =>
                     new Promise((resolve, reject) => {
                       setTimeout(() => {
                         const data = [...this.state.data]
                         addUser(newData)
                           .then(message => {
                            getUsers()
                            .then((users)=>{
                              const us = users.filter((item)=>item.username === newData.username)
                              newData.id = us[0].id
                              data.push(newData)
                              this.setState({ data }, () => {
                                toast.success('✔️' + message.message, {
                                  position: toast.POSITION.BOTTOM_LEFT,
                                  hideProgressBar: true
                                });
                                resolve();
                              });
                            })
                              .catch((err) => {
                                this.setState({ isLoading: false }, () => toast.error('❌' + err.message, {
                                  position: 'bottom-left',
                                  hideProgressBar: true
                                }))
                              })
                           })
                           .catch(err => {
                             toast.warn(err.message ? '⚠️' + err.message : '⚠️' +err, {
                               position: toast.POSITION.BOTTOM_LEFT,
                               hideProgressBar: true
                             });
                             reject()
                             });
                       }, 600);
                     }),
                   onRowUpdate: (newData, oldData) =>
                     new Promise((resolve, reject) => {
                       setTimeout(() => {
                         const data = [...this.state.data];
                         data[oldData.tableData.id] = newData
                         editUser(newData, oldData.id)
                           .then(message => {
                             this.setState({ data }, () => {
                               toast.success('✔️'+message.message, {
                                position: toast.POSITION.BOTTOM_LEFT,
                                hideProgressBar:true
                            });
                                resolve();
                             });
                           })
                           .catch(err => {
                             toast.warn(err.message ? '⚠️' + err.message : '⚠️' +err, {
                               position: toast.POSITION.BOTTOM_LEFT,
                               hideProgressBar: true
                             });
                            reject()
                             
                           });
                       }, 200);
                     }),
                   onRowDelete: oldData =>
                     new Promise((resolve,reject) => {
                       setTimeout(() => {
                         resolve();
                         const data = [...this.state.data];
                         deleteUser(data[oldData.tableData.id].id)
                           .then(message => {
                             data.splice(data.indexOf(oldData), 1);
                             this.setState({ data }, () =>{ 
                                 toast.success(message.message, {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                    hideProgressBar: true
                                });
                                resolve()
                                });
                           })
                           .catch(err =>{
                             toast.warn(err.message ? '⚠️' + err.message : '⚠️' +err, {
                               position: toast.POSITION.BOTTOM_LEFT,
                               hideProgressBar: true
                             });
                             reject();
                      
                           } );
                       }, 600);
                     })
                 }}
                    />
                  </Fade>
                 <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal} />
                    </div>
                </div>
            )
        }
    }
}
 
export default User;