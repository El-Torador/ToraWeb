import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify'
import { Loader } from 'semantic-ui-react'
import ModalLogout from '../Components/Sections/ModalLogout'
import Head from '../Components/Header/Header'
import Fade from 'react-reveal/Fade'
import { getUsers, addUser, editUser, deleteUser } from '../Controllers/users/CRUD_users'
import { getInstance } from '../Controllers/instances/CRUD_instance'

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
                1: 'IAI-Bafoussam',
                2: 'IAI-Douala'
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
                      instances.map((item) => this.columns[5].lookup[item.id] = item.name)
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
                    console.log(err)
                    this.setState({ isLoading: false }, () => toast.error('❌'+err.message, {
                      position: 'bottom-left',
                      hideProgressBar: true
                    }))
                    console.log(err)
                  })
                }else{
                  toast.info('ℹ️ Pas d\'utilisateur enregistré.', {
                    position: 'bottom-left',
                    hideProgressBar: true
                  })
                }
            })
            .catch((err)=>{
              console.log(err)
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
            return <div>
              <Head location="/users" handleOpen={this.toggleModal} />
              <Loader active={true} />
            </div>
        }else{
            return (
                <div>
                <Head location="/users" handleOpen={this.toggleModal}  />
                    <div className="ui container">
                    <br />
                    <br />
                    <Fade right>
                        <MaterialTable
                        title="Gestion des utilisateurs"
                        columns={this.columns}
                        data={this.state.data}
                        options={{
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
                         const data = [...this.state.data];
                         data.push(newData);
                         addUser(newData)
                           .then(message => {
                             this.setState({ data }, () => {
                               toast.success('✔️'+message.message, {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                    hideProgressBar: true
                                });
                               resolve();
                             });
                           })
                           .catch(err => {
                             console.log(err)
                             reject()
                             });
                       }, 600);
                     }),
                   onRowUpdate: (newData, oldData) =>
                     new Promise((resolve, reject) => {
                       setTimeout(() => {
                         const data = [...this.state.data];
                         data[oldData.tableData.id] = newData
                         console.log(newData)
                         editUser(newData, oldData.id)
                           .then(message => {
                             console.log('TOTO BIEN')
                             data.password = ''
                             this.setState({ data }, () => {
                               toast.success(message.message, {
                                position: toast.POSITION.BOTTOM_LEFT,
                                hideProgressBar:true
                            });
                                resolve();
                             });
                           })
                           .catch(err => {
                            console.log(err)
                            reject()
                             
                           });
                       }, 200);
                     }),
                   onRowDelete: oldData =>
                     new Promise(resolve => {
                       setTimeout(() => {
                         resolve();
                         const data = [...this.state.data];
                         deleteUser(data[oldData.tableData.id].id)
                           .then(users => {
                             data.splice(data.indexOf(oldData), 1);
                             this.setState({ data }, () =>{ 
                                 toast.success(users.data.message, {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                    hideProgressBar: true
                                });
                                resolve()
                                });
                           })
                           .catch(err =>{
                               alert(err)
                      
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