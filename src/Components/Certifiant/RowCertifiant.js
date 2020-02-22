import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import FilterResults from 'react-filter-search'
import { Link } from 'react-router-dom'
import {  } from 'semantic-ui-react'
import '../../Constants/moment_fr'
/**
 * RowCertifiant COMPONENT
 */
class RowCertifiant extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        if(this.props.training.length > 0){
            return (
                <FilterResults 
                    value={this.props.entries}
                    data={this.props.training}
                    renderResults={result=>{
                        return result.map((item)=>(
                            <Fade right key={item.id}>
                                <div className="ui two wide add-margin">
                                    <Link to={'training/certifyinig/module/'+item.id} className="ui card" key={item.id}>
                                        <div className="content">
                                            <div className="header">{item.name}</div>
                                            <div className="meta">{moment(item.created_at).format("LLLL")}</div>
                                        </div>
                                    </Link>
                                </div>
                            </Fade>
                        ))
                    }}
                />
            )
        }else{
            return (
                <div>
                <br /> <br/>
                    <h2>Aucun type de formation Enregistré !</h2>
                </div>
            )
        }
    }
}

RowCertifiant.propTypes = {
    entries: PropTypes.string.isRequired,
    training: PropTypes.array.isRequired
}
 
export default RowCertifiant