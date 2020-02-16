import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
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
          <Menu.Item
            as={Link}
            to="/home"
            icon="home"
            title="Acceuil"
            active={props.location === "/home" ? true : false}
          />
          <Menu.Item
            as={Link}
            to="/users"
            icon="users"
            title="Gestion des utilisateurs"
            active={props.location === "/users" ? true : false}
          />
          <Menu.Item
            as={Link}
            to="/instance"
            icon="globe"
            title="Gestion des instances"
            active={props.location === "/instance" ? true : false}
          />
          <Menu.Item
            as={Link}
            to="/learner"
            icon="student"
            title="Gestion des apprenants"
            active={props.location === "/learner" ? true : false}
          />
          <Menu.Item
            as={Link}
            to="/former"
            icon="user secret"
            title="Gestion des formateurs"
            active={props.location === "/former" ? true : false}
          />
          <Menu.Item
            as={Link}
            to="/training"
            icon="wpforms"
            title="Gestion des formations"
            active={props.location === "/training" ? true : false}
          />
          <Menu.Menu position="right">
            <Menu.Item
              title="Logout"
              icon="log out"
              onClick={props.handleOpen}
              as={Button}
            />
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