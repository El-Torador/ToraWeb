import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify'
import { Loader, Modal, Button, Icon, Header } from 'semantic-ui-react'
import Head from '../Components/Header/Header'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { getUsers, addUser, editUser, deleteUser } from '../Controllers/users/CRUD_users'
import { getInstance } from '../Controllers/instances/CRUD_instance'
class User extends Component {
    constructor(props){
        super(props)
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

     componentDidMount(){
            getUsers().then((data)=>{
                getInstance().then((instances)=>{
                  instances.map((item)=> this.columns[5].lookup[item.id] = item.name)

                  this.setState({ data, isLoading: false })
                }).catch((err) => {
                this.setState({ isLoading: false }, () => toast.error(err, {
                position: 'bottom-left',
                hideProgressBar: true
              }))
                  console.log(err)
                })
            })
            .catch((err)=>{
              this.setState({ isLoading: false }, () => toast.error(err, {
                position: 'bottom-left',
                hideProgressBar: true
              }))
                
              
              })
            
    }

  /**
* PERMET D'OUVRIR LA MODAL
*/
  handleOpen = () => this.setState({ modalOpen: true })
  /**
   * PERMET DE FERMER LA MODAL
   */
  handleClose = () => this.setState({ modalOpen: false })
    render(){
        if(this.state.isLoading){
            return <div>
              <Head location="/users" handleOpen={this.handleOpen} />
              <Loader active={true} />
            </div>
        }else{
            return (
                <div>
                <Head location="/users" handleOpen={this.handleOpen}  />
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
                  <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
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
                        color="red"
                        onClick={this.handleClose}
                        inverted
                      >
                        <Icon name="remove" /> Non
                    </Button>
                      <Link to="/">
                        <Button color="yellow" inverted>
                          <Icon name="checkmark" /> Oui
                      </Button>
                      </Link>
                    </Modal.Actions>
                  </Modal>
                    </div>
                </div>
            )
        }
    }
}
 
export default User;