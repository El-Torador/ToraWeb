import React, { Component } from "react";
//import moment from 'moment'
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  Modal,
  Icon,
  Button,
  Header,
  Dimmer,
  Segment,
  Loader,
  TextArea
} from "semantic-ui-react";
import { addDiscipline } from "../../Controllers/Discipline/CRUD_discipline";

/**
 * ADD INSTANCE COMPONENT
 */
class AddDiscipline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }


  /**
   * ENREGISTRER UNE INSTANCE
   * @param { Event } e
   */
  postDiscipline = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const discipline = {
      name: e.target[0].value.toUpperCase(),
      hours: e.target[1].value,
      description: e.target[2].value,
      skills: e.target[3].value.split('. '),
      cost: e.target[4].value,
      module_id: this.props.module_id
    };
    setTimeout(() => {
      addDiscipline(discipline)
      .then((message)=>{
          this.props.newDiscipline(discipline)
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
    }, 1000);
  };

  render() {
    return (
      <Modal
        dimmer="blurring"
        closeIcon
        onClose={this.props.exit}
        closeOnDimmerClick={false}
        open={this.props.addDiscipline}
        size="large"
      >
        <Header icon="plus yellow" content="Ajouter une discipline" />
        <Modal.Content>
          <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
            <Dimmer active={this.state.isLoading} inverted>
              <Loader>Chargement</Loader>
            </Dimmer>
            <form className="ui form" onSubmit={this.postDiscipline}>
              <div className="field">
                <div className="ui left icon input">
                  <i className="icon pencil"></i>
                  <input
                    type="text"
                    pattern="[a-zA-Z_-\s]{2,}"
                    autoFocus
                    name="name"
                    id="discipline_name"
                    placeholder="Nom ex:MAINTENANCE I"
                    title="Nom"
                    autoComplete="off"
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
                  ></TextArea>
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
                  />
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
                    required
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

AddDiscipline.propTypes = {
  exit: PropTypes.func.isRequired,
  addDiscipline: PropTypes.bool.isRequired,
  newDiscipline: PropTypes.func.isRequired,
  module_id: PropTypes.number.isRequired
};

export default AddDiscipline;
