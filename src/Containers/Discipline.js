import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader, Header, Breadcrumb, Popup } from 'semantic-ui-react'
import { getDisciplineByIdModule, getDiscipline } from '../Controllers/Discipline/CRUD_discipline'
import { getModuleById } from '../Controllers/Modules/CRUD_modules'
import RowDiscipline from '../Components/Discipline/RowDiscipline'
import Head from '../Components/Header/Header'
import ModalLogout from '../Components/Sections/ModalLogout'
import './Discipline.css'
import AddDiscipline from '../Components/Discipline/AddDiscipline'
/**
 * DISCIPLINE CONTAINER
 */
class Discipline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disciplines: [],
      module: {},
      isLoading: true,
      modalOpen: false,
      value: "",
      addDiscipline: false
    };
    this.discipline_by_module_id = Number(this.props.match.params.id);
  }

  componentDidMount() {
    getDisciplineByIdModule(this.discipline_by_module_id)
      .then(disciplines => {
        getModuleById(this.discipline_by_module_id)
          .then(module => {
            this.setState({
              disciplines,
              module,
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
            });
          })
          .catch(err => {
            console.log(err, err.message);
          });
      })
      .catch(err => {
        console.log(err, err.message);
      });
  }

  /**
   * AJOUTE UNE NOUVELLE DISCIPLINE
   */
  newDiscipline = discipline => {
    getDiscipline()
      .then(disciplines => {
        const disci = disciplines.filter(item => item.name === discipline.name);
        discipline.id = disci[0].id;
        const d = [...this.state.disciplines, discipline];
        this.setState({ disciplines: d });
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
    const { value } = event.target;
    this.setState({ value });
  };
  /**
   * PERMET D'OUVRIR OU FERMER LA MODAL
   */
  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  /**
   * PERMET D'OUVRIR OU DE FERMER LA MODAL D'AJOUT DE DISCIPLINE
   */
  toggleModalAddDiscipline = () =>
    this.setState({ addDiscipline: !this.state.addDiscipline });
    
  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Head location="/formation" handleOpen={this.toggleModal} />
          <br />
          <div className="ui container padding">
            <Header block>
              <Breadcrumb size="large">
                <Breadcrumb.Section>
                  <Link to="/training">Formation</Link>
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section>
                  <Link to="/training/qualifying/module">Qualifiante</Link>
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                  <Link
                    to={
                      "/training/qualifying/module/discipline/" +
                      this.discipline_by_module_id
                    }
                    className="is-active-that"
                  >
                    {this.state.module.name || "Chargement..."}
                  </Link>
                </Breadcrumb.Section>
              </Breadcrumb>
            </Header>
            <h1>
              <i className="icon tasks large yellow"></i> Disciplines du module{" "}
              {this.state.module.name || "Chargement..."}
            </h1>
            <br />
            <div className="ui search">
              <div className="ui left icon input">
                <i className="icon search"></i>
                <Popup
                  content="Rechercher une discipline"
                  trigger={
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Rechercher une discipline..."
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
            title="Ajouter une discipline"
            onClick={this.toggleModalAddDiscipline}
          >
            <i className="icon plus"></i>
          </button>
          <ModalLogout
            modalOpen={this.state.modalOpen}
            onClose={this.toggleModal}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Head location="/formation" handleOpen={this.toggleModal} />
          <br />
          <div className="ui container padding">
            <Header block>
              <Breadcrumb size="large">
                <Breadcrumb.Section>
                  <Link to="/training">Formation</Link>
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section>
                  <Link to="/training/qualifying/module">Qualifiante</Link>
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                  <Link
                    to={"/training/qualifying/" + this.discipline_by_module_id}
                    className="is-active-that"
                  >
                    {this.state.module.name}
                  </Link>
                </Breadcrumb.Section>
              </Breadcrumb>
            </Header>
            <h1>
              <i className="icon tasks large yellow"></i> Disciplines du module{" "}
              {this.state.module.name}
            </h1>
            <br />
            <div className="ui search">
              <div className="ui left icon input">
                <i className="icon search"></i>
                <Popup
                  content="Rechercher une discipline"
                  trigger={
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Rechercher une discipline..."
                      onChange={this.handleChange}
                    />
                  }
                  position="left center"
                />
              </div>
            </div>
            <div className="ui grid">
              <RowDiscipline
                discipline={this.state.disciplines}
                entries={this.state.value}
              />
            </div>
          </div>
          <Popup
            content="Ajouter une discipline"
            trigger={
              <button
                className="circular ui icon massive button yellow is_fix"
                onClick={this.toggleModalAddDiscipline}
              >
                <i className="icon plus"></i>
              </button>
            }
            position="left center"
          />
          <ModalLogout
            modalOpen={this.state.modalOpen}
            onClose={this.toggleModal}
          />
          <AddDiscipline
            newDiscipline={this.newDiscipline}
            module_id={Number(this.props.match.params.id)}
            addDiscipline={this.state.addDiscipline}
            exit={this.toggleModalAddDiscipline}
          />
        </div>
      );
    }
  }
}

export default Discipline