import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import {
    Modal,
    Icon,
    Button,
    Dimmer,
    Segment,
    Loader,
    Header
} from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { addFormer } from '../../Controllers/Former/CRUD_former'

/**
 * ADD FORMER COMPONENT
 */

 class AddFormer extends Component {
    constructor(props){
        super(props)
        this.state = {
            formers: [],
            isLoading: false,
            birth_date: ''
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
     * ENREFISTRER UN FORMATEUR
     * @param { Event } e
     */
    postFormer = e =>{
      e.preventDefault()
      this.setState({isLoading: true})
      let date_birth = this.state.birth_date.split('-')
      const  birth_date = `${date_birth[2]}-${date_birth[1]}-${date_birth[0]}T00:00:00+00:00`
      //const data = new FormData(document.querySelector('#form-former'))
      //data.set('birth_date', birth_date)
      //data.set('first_name', e.target[0].value.toUpperCase())
      /*for(let f of data){
        console.log(f)
      }*/
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
      setTimeout(()=>{
        addFormer(data)
          .then((message) => {
            this.props.newFormer(data)
            this.setState({isLoading: false}, ()=>{
              this.props.exit()
              toast.success('✔️'+message, {position: 'bottom-left', hideProgressBar:true})
            })
          })
          .catch((err) => {
            this.setState({isLoading: false}, ()=>{
              this.props.exit()
              err.message && toast.error('❌' + err.message, { position: 'bottom-left', hideProgressBar: true })
            })
          })
      }, 300)
    }

    render(){
        return (
          <Modal
            dimmer="blurring"
            closeIcon
            onClose={this.props.exit}
            closeOnDimmerClick={false}
            open={this.props.addFormer}
            size="large"
          >
            <Header icon="plus yellow" content="Ajouter un formateur" />
            <Modal.Content>
              <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                <Dimmer active={this.state.isLoading} inverted>
                  <Loader>Chargement</Loader>
                </Dimmer>
                <form className="ui form" onSubmit={this.postFormer} entype="multipart/form-data" id="form-former">
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="icon user"></i>
                      <input
                        type="text"
                        minLength="3"
                        autoFocus
                        name="first_name"
                        id="first_name"
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
                      <option value="Masculin">Masculin</option>
                      <option value="Féminin">Féminin</option>
                    </select>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="icon handshake outline"></i>
                      <input
                        type="text"
                        name="matricule"
                        id="matricule"
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
                        placeholder="N° CNPS ex:000-380-456-231"
                        title="N° CNPS"
                        autoComplete="off"
                        required
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
            </Modal.Content>
          </Modal>
        );
    }
 }

 AddFormer.propTypes = {
   exit: PropTypes.func.isRequired,
   addFormer: PropTypes.bool.isRequired,
   newFormer: PropTypes.func.isRequired
 }

 export default AddFormer