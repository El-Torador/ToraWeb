import React, { Component } from 'react'
import { Loader, Popup } from "semantic-ui-react";
import ModalLogout from '../Components/Sections/ModalLogout'
import { Link } from 'react-router-dom'
import Head from '../Components/Header/Header'
import formation from '../assets/images/voeux/img4.JPG'
import formCert from '../assets/images/voeux/20160610_152107.JPG'
import certi from '../assets/images/index.jpg'
import quali from '../assets/images/index5.jpg'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import e_learning from '../assets/images/images.png'
import Fade from 'react-reveal/Fade'
import './Training.css'

/**
 * TRAINING CONTAINER
 */
class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  /**
   * OPEN OR CLOSE THE MODAL LOGOUT
   */
  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Head location="/training" handleOpen={this.toggleModal} />
          <Loader active={true} />
        </div>
      );
    } else {
      return (
        <div>
          <Head location="/training" handleOpen={this.toggleModal} />
          <Fade top>
            <Carousel showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true} showArrows={false} dynamicHieght={true} interval={5000} transitionTime={1000} useKeyboardArrows={true}>
              <div>
                <img
              src={formation}
              alt="img1"
              style={{ width: "100%", height: "70vh" }}
            />
            
              <p className="legend">IAI-CAMEROUN, dans le cadre des formations continues,mets en place différentes formation.</p>
            
              </div>
              <div>
                <img
              src={formCert}
              alt="img2"
              style={{ width: "100%", height: "70vh" }}
            />
            
              <p className="legend">Celles Certifiantes</p>
            
              </div>
            </Carousel>
          </Fade>

          <div className="ui container p3">
            <br />
            <br />
            <Fade bottom>
                <div className="ui tree cards">
                <Popup content="Cliquez pour découvrir nos types de formation certifiante." trigger={<Link
                  to="/training/certifying"
                  className="yellow card lg jord"
                >
                  <span className="ui yellow ribbon label">FORMATION CERTIFIANTE</span>
                  <img
                    src={certi}
                    alt="certifiante"
                  />
                </Link>} position="left center" />
                <Popup content="Cliquez pour gérer les modules de cette formation et de personnaliser quelques uns pour un profil précis." trigger={<Link to="/training/qualifying/module" className="blue card lg jord">
                  <span className="ui blue ribbon label">FORMATION QUALIFIANTE</span>
                  <img
                    src={quali}
                    alt="qualifiante"
                  />
                </Link>} position="bottom center" />

                <Popup content="Cliquez pour découvrir les modules que offrent nos formations à distance." trigger={<Link to="/training/e-learning" className="pink card lg jord">
                  <span className="ui pink ribbon label">E-LEARNING</span>
                  <img
                    src={e_learning}
                    alt="e-learning"
                  />
                </Link>} position="right center" />
                </div>
            </Fade>
          </div>
          <ModalLogout modalOpen={this.state.modalOpen} onClose={this.toggleModal}/>
        </div>
      );
    }
  }
}
 
export default Training;