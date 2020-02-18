import React from 'react'
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import FilterResults from 'react-filter-search'
import Fade from 'react-reveal/Fade'
import PropTypes from 'prop-types'
import ShowDetails from './ShowDetails'
/**
 * LIST INSTANCE COMPONENT (<ROWINSTANCE/>)
 */
const RowInstance = (props) =>{
    
        if(props.instance){
          return (
            <FilterResults
              value={props.entries}
              data={props.instance}
              renderResults={result => {
                return result.map(item => (
                  <Fade right key={item.id}>
                    <div className="two wide add-margin" key={item.id}>
                      <div className="ui card raised link">
                        <div className="content">
                          <div className="header">{item.name}</div>
                          <div className="meta">
                            {item.city}, {item.address}
                          </div>
                          <div className="description">
                            {item.name} situé dans la ville de {item.city} donc
                          le chef de centre est M. <b>{item.responsable}</b>.
                        </div>
                          <div className="footer">
                              &copy; IAI-CAMEROUN
                          </div>
                        </div>
                        <div className="extra content">
                          <span className="left floated like">
                            <Popup content="Editer" trigger={<Link title="Editer" to={"/instance/edit/" + item.id}>
                              <i className="icon pencil yellow large"></i>
                            </Link>} 
                              position="top center"
                            />
                          </span>
                          <span className="right floated star">
                            <ShowDetails trigger={<i className="icon eye blue large" id={"show_" + item.id} title="Détails"></i>} instance={item} />
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
          return <p className="description">Pas d'instance pour le moment !</p>
        }
    
}

RowInstance.propTypes = {
  instance: PropTypes.array.isRequired,
  entries: PropTypes.string.isRequired
}
export default RowInstance