import React, { Component } from 'react'
import { Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import FilterResults from 'react-filter-search'
import { Link } from 'react-router-dom'
import formateur from '../../assets/images/former.jpg'
import formerGirl from '../../assets/images/formerGirl.jpg'
import ShowDetails from './ShowFormer'
/**
 * ROWFORMER COMPONENT
 */
class RowFormer extends Component {
    constructor(props)
    {
        super(props)
        this.state = {

        }
    }
    render() { 
        const { formers, entries } = this.props
        if(formers.length > 0){
            return (
                <FilterResults
                    value={entries}
                    data={formers}
                    renderResults = {result => {
                        return result.map(item => (
                            <Fade right key={item.id}>
                                <div className="ui two wide add-margin">
                                    <div className="ui link card" kkey={item.id}>
                                        <div className="content">
                                            {item.sex === "Masculin" ? <img src={formateur} className="right floated mini ui image" alt={'avatar_'+item.first_name} />: <img src={formerGirl} alt={"avatar_"+item.first_name} className="right floated mini ui image" />}
                                            <div className="header">
                                                {item.first_name}
                                            </div>
                                            <div className="meta">
                                                {item.last_name}
                                            </div>
                                            <div className="description">
                                                {item.function}
                                            </div>
                                        </div>
                                        <div className="extra content">
                                            <span className="left floated like">
                                                <Popup content="Editer" trigger={<Link to={"/former/edit/"+item.id}>
                                                    <i className="icon pencil yellow large"></i>
                                                </Link>}
                                                position="top center"
                                                />
                                            </span>
                                            <span className="right floated">
                                                <ShowDetails trigger={<i className="icon eye blue large" id={"show"+item.id} title="Plus d'infos"></i>} former={item} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        ))
                    }}
                />
            )
        }
    }
}
 
RowFormer.propTypes = {
    entries: PropTypes.string.isRequired,
    formers: PropTypes.array.isRequired
} 
export default RowFormer