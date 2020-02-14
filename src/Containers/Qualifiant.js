import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import Head from '../Components/Header/Header'

/**
 * QUALIFIANT CONTAINER
 */
class Qualifiant extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render(){
       if(this.state.isLoading){
           return <div>
                <Head localtion="/formation" handleOpen={this.handleOpen} />
                <Loader active ={true} />
           </div>
       }else{
           return <div>
               <Head location='/formation' handleOpen={this.handleOpen} />
               <br />
               <br />
               <div className="ui container">
                   <h1>
                        <i className="icon wpforms large"></i> Modules des formations qualifiantes
                   </h1>
                   
               </div>
           </div>
       }
    }
}

export default Qualifiant