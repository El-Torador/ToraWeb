import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import FilterResults from 'react-filter-search'
import { Link } from 'react-router-dom'
import { Popup, Accordion, Icon } from 'semantic-ui-react'
import '../../Constants/moment_fr'

const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] 

/**
 * ROWDISCIPLINE COMPONENT
 */

class RowDiscipline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: ''
        }
         this.one_letter = list[Math.floor(Math.random() * ((list.length - 1) - 1 + 1))+1]
         this.contenu = Math.floor(Math.random() * (100000000 - 1 + 1)) + 1
         this.competences = Math.floor(Math.random() * (100000000 - 1 + 1)) + 1
         this.created = Math.floor(Math.random() * (100000000 - 1 + 1)) + 1
    }
    handleClick = (e, titleProps) =>{
        const { index } = titleProps
        const newIndex  = this.state.activeIndex === index ? -1 : index
        this.setState({activeIndex: newIndex})
    }
    render() {
        const formatTitle = title =>{
            const titleArray = title.split(' ')
            let result = '', tmp
            for(let i = 0; i < titleArray.length; i++){
                tmp = titleArray[i].toString()
                result += tmp[0]
            }
            return result
        }
        const { activeIndex } = this.state
        if (this.props.discipline.length > 0) {
            return (
                <FilterResults
                    value={this.props.entries}
                    data={this.props.discipline}
                    renderResults={result => {
                        return result.map(item => (
                            <Fade right key={item.id}>
                                <div className="ui two wide add-margin">
                                    <div
                                        className="ui card"
                                        key={item.id}
                                    >
                                        <div className="content">
                                            <div className="header">
                                            <span className="ui yellow ribbon label">{numeral(item.cost).format('O,O')}F</span>
                                                {item.name.length > 17 ? <Popup content={item.name} trigger={<span>{formatTitle(item.name)}</span>} postion="top center" /> : <span>{item.name}</span>}
                                               
                                            </div>
                                            <div className="meta">
                                                {item.hours} h
                                            </div>
                                            <div className="description">
                                                <Accordion>
                                                    <Accordion.Title
                                                        active={activeIndex===(this.contenu.toString()+this.one_letter+item.id.toString())}
                                                        index={(this.contenu.toString() + this.one_letter + item.id.toString())}
                                                        onClick={this.handleClick}
                                                    >
                                                        <Icon name="dropdown" /> CONTENU:
                                                    </Accordion.Title>
                                                    <Accordion.Content active={activeIndex === (this.contenu.toString() + this.one_letter + item.id.toString())}>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                    </Accordion.Content> 
                                                    <Accordion.Title
                                                        active={activeIndex === (this.competences.toString() + this.one_letter + item.id.toString())}
                                                        index={(this.competences.toString() + this.one_letter + item.id.toString())}
                                                        onClick={this.handleClick}
                                                    >
                                                        <Icon name="dropdown" /> COMPETENCES:
                                                    </Accordion.Title>
                                                    <Accordion.Content active={activeIndex === (this.competences.toString() + this.one_letter + item.id.toString())}>
                                                        <p>
                                                            {item.skills.join('; ')}
                                                        </p>
                                                    </Accordion.Content>
                                                    <Accordion.Title
                                                        active={activeIndex === (this.created.toString() + this.one_letter + item.id.toString())}
                                                        index={(this.created.toString() + this.one_letter + item.id.toString())}
                                                        onClick={this.handleClick}
                                                    >
                                                        <Icon name="dropdown" /> DATE DE CREATION:
                                                    </Accordion.Title>
                                                    <Accordion.Content active={activeIndex === (this.created.toString() + this.one_letter + item.id.toString())}>
                                                        <p>
                                                            {moment(item.created_at).format("LLLL")}
                                                        </p>
                                                    </Accordion.Content>  
                                                </Accordion>
                                                <span className="right floated">
                                                    <Popup
                                                        content="Editer"
                                                        trigger={
                                                            <Link to={"/training/qualifying/module/discipline/edit/" + item.id}>
                                                                <i className="icon edit outline yellow large"></i>
                                                            </Link>
                                                        }
                                                        position="top center"
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Fade>
                        ));
                    }}
                />
            )
        } else {
            return (
                <div>
                    <br /> <br />
                    <h2>Aucune Discipline Enregistrée !</h2>
                </div>
            )
        }
    }
}

RowDiscipline.propTypes = {
    entries: PropTypes.string.isRequired,
    discipline: PropTypes.array.isRequired
}

export default RowDiscipline