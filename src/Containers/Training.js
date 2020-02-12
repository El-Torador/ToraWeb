import React, { Component } from 'react'
import { Loader } from "semantic-ui-react";
import ModalLogout from '../Components/Sections/ModalLogout'
import { Link } from 'react-router-dom'
import Head from '../Components/Header/Header'
import formation from '../assets/images/trainning.jpg'
import certi from '../assets/images/index.jpg'
import quali from '../assets/images/index5.jpg'
import Fade from 'react-reveal/Fade'
import './Training.css'

class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  /**
   * OPEN THE MODAL LOGOUT
   */
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Head location="/formation" handleOpen={this.handleOpen} />
          <Loader active={true} />
        </div>
      );
    } else {
      return (
        <div>
          <Head location="/formation" handleOpen={this.handleOpen} />
          <Fade right>
            <img
              src={formation}
              alt="train"
              style={{ width: "100%", height: "50vh" }}
            />
          </Fade>

          <div className="ui container p3">
            <br />
            <br />
            <Fade bottom>
                <div className="ui two cards">
                    <Link
                    to="/formation/certifiante"
                    className="yellow card lg jord"
                    >
                    <span className="ui yellow ribbon label">FORMATION CERTIFIANTE</span>
                    <img
                        src={certi}
                        alt="certifiante"
                        title="Formation certifiante"
                    />
                    </Link>
                    <Link to="/formation/qualifiante" className="blue card lg jor">
                  <span className="ui blue ribbon label">FORMATION QUALIFIANTE</span>
                    <img
                        src={quali}
                        alt="qualifiante"
                        title="Formation qualifiante"
                    />
                    </Link>
                </div>
            </Fade>
          </div>
          <ModalLogout modalOpen={this.state.modalOpen} onClose={this.handleClose}/>
        </div>
      );
    }
  }
}
 
export default Training;