import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { } from 'react-toastify';
//import WriteSpeed from '../Components/WriteSpeed/WriteSpeed'
import './Login.css'
import { Loader } from 'semantic-ui-react'
import Fade from 'react-reveal/Fade'
import image from '../assets/images/iai.png'

/**
 * LOGIN CONTAINER
 */
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            loading: false
        }

    }
    componentDidMount(){
      if(window.localStorage.getItem('init_lauch')){
        this.setState({isLoading: false})
      }else{
        window.localStorage.setItem('init_lauch', true)
        setTimeout(()=>{
          this.setState({isLoading: false})
        }, 5000)
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
        if(this.state.isLoading){
            return <div className="ui container">
              <Loader active={true} size="big" >
                <div className="ption">
                  Lancement de IAI-Learnship...
                </div>
              </Loader>
            </div>
        }else{
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
                            pattern="[a-zA-Z0-9]{2,}"
                            title="Username"
                            placeholder="Username"
                            className="rounded"
                            autoComplete="off"
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
                            pattern="[a-zA-Z0-9]{7,}"
                            title="Password"
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
}

export default Login;