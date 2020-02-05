import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { } from 'react-toastify';
import './Login.css'
import Fade from 'react-reveal/Fade'
import image from '../assets/images/iai.png'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }

    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.setState({loading: true})
        
        console.log(e.target[0].value, e.target[1].value)
        setTimeout(()=>{
            this.setState({ loading: false });
            this.props.history.push('/users')
        }, 1000)
    }
    render() {
        return (
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <Fade left>
                <div className="ui image">
                  <img src={image} alt="logo_iai" />
                </div>
              </Fade>
              <br />
              <br />
              <Fade right>
                <form
                  className="ui large form"
                  onSubmit={e => this.handleSubmit(e)}
                >
                  <div className="ui raised segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          className="rounded"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="rounded"
                          autoComplete="off"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={
                        this.state.loading
                          ? "ui fluid large yellow submit button rounded loading disabled"
                          : "ui fluid large yellow submit button rounded inverted"
                      }
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </Fade>
              <Fade bottom>
                <div className="ui message">
                  <Link to="/">Mot de passe oublié ?</Link>
                </div>
                <div>
                  <span style={{ fontFamily: "Agency-FB", color: 'gray' }}>
                    &copy; 2020 IAI-CAMEROUN
                  </span>
                </div>
              </Fade>
            </div>
          </div>
        ); 
    }
}

export default Login;