import React from 'react'
import { Menu, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Header.css'
import image from '../../assets/images/iai.png'
import PropTypes from 'prop-types'

/**
 * HEADER COMPONENT
 */
const Head = (props) =>{
    return (
      <div>
        <Menu size="large">
          <Menu.Item
            title="IAI-Learnship"
            children={<img src={image} alt="logo" width="90" height="30" />}
          />
          <Popup content="Statistiques" trigger={<Menu.Item
            as={Link}
            to="/home"
            icon="chart line"
            active={props.location === "/home" ? true : false}
          />} position="bottom center" />
          <Popup content = "Gestion des utilisateurs" trigger={<Menu.Item
            as={Link}
            to="/users"
            icon="users"
            active={props.location === "/users" ? true : false}
          />} position="bottom center" />
          <Popup content="Gestion des instances" trigger={<Menu.Item
            as={Link}
            to="/instance"
            icon="globe"
            active={props.location === "/instance" ? true : false}
          />} position="bottom center" />
          <Popup content="Gestion des apprenants" trigger={<Menu.Item
            as={Link}
            to="/learner"
            icon="student"
            active={props.location === "/learner" ? true : false}
          />} position="bottom center" />
          <Popup content="Gestion des formateurs" trigger={<Menu.Item
            as={Link}
            to="/former"
            icon="user secret"
            active={props.location === "/former" ? true : false}
          />} position="bottom center" />
          <Popup content="Gestion des formations" trigger={<Menu.Item
            as={Link}
            to="/training"
            icon="wpforms"
            active={props.location === "/training" ? true : false}
          />} position="bottom center" />
          <Menu.Menu position="right">
            <Popup content="Se déconnecter" trigger={<Menu.Item
              icon="log out"
              onClick={props.handleOpen}
              as={Button}
            />} position="right center" />
          </Menu.Menu>
        </Menu>
      </div>
    );
}
 
Head.propTypes = {
  location: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired
}
export default Head;