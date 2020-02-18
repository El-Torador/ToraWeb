import React from 'react'
import { Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import FilterResults from 'react-filter-search'
import Fade from 'react-reveal/Fade'
import PropTypes from 'prop-types'
import girl from '../../assets/images/girl.png'
import avatar from '../../assets/images/avatar.png'
import ShowDetails from './ShowDetails'
/**
 * LIST LEARNER COMPONENT (<ROWLEARNER/>)
 */
const RowLearner = (props) =>{
    
        if(props.learner){
          return (
            <FilterResults
              value={props.entries}
              data={props.learner}
              renderResults={result => {
                return result.map(item => (
                  <Fade right key={item.id}>
                    <div className="two wide add-margin" key={item.id}>
                      <div className="ui card link">
                                    <div className="image">
                          {item.sex === "Masculin" ? <img src={avatar} alt={"avatar_" + item.first_name} /> : <img src={girl} alt={"avatar_"+item.first_name}  />}
                                    </div>
                                        <div className="content">
                                            <div className="header">{item.first_name}</div>
                                            <div className="meta">
                                                <span>{item.last_name}</span>
                                            </div>
                                            <div className="description">
                                                {item.first_name} est un {item.jobs} vivant à {item.address}
                                            </div>
                                        </div>
                                        <div className="extra content">
                                            <span className="left floated">
                                            <Popup content="Editer" trigger={<Link to={"/learner/edit/" + item.id}>
                                                <i className="icon pencil yellow large"></i>
                                            </Link>} position="top center" />
                                            </span>
                                            <span className="right floated">
                                              <Popup content="Plus d'infos" trigger={<ShowDetails trigger={<i className="icon eye blue large" title="Plus d'infos" id={"show_" + item.id} ></i>} learner={item} /> } position="top center" />  
                                            </span>
                                        </div>
                      </div>
                    </div>
                    
                  </Fade>
                ));
              }}
            />
          );
        }else{
          return <div className="ui container">
          <br/><br/><br />
            <h1 style={{textAlign:'center'}}>Pas d'apprenant Enregistré ! </h1>
          </div>
        }
    
}

RowLearner.propTypes = {
  learner: PropTypes.array.isRequired,
  entries: PropTypes.string.isRequired
}
export default RowLearner