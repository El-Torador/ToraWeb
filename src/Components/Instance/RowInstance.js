import React from 'react'
import { Link } from 'react-router-dom'
import FilterResults from 'react-filter-search'
import Fade from 'react-reveal/Fade'
import PropTypes from 'prop-types'
const RowInstance = (props) =>{
    
        return (
          <FilterResults
            value={props.entries}
            data={props.instance}
            renderResults={result => {
              return result.map(item => (
                <Fade right key={item.id}>
                  <div className="two wide" key={item.id}>
                    <div className="ui card raised link">
                      <div className="content">
                        <div className="header">{item.name}</div>
                        <div className="meta">
                          {item.place}, {item.address}
                        </div>
                        <div className="description">
                          {item.name} situé dans la ville de {item.place} donc
                          le chef de centre est <b>{item.responsable}</b>.
                        </div>
                        <div className="footer">
                          Contact: {item.phone_number[0]}{" "}
                          {item.phone_number[1] && "- " + item.phone_number[1]}
                        </div>
                      </div>
                      <div className="extra content">
                        <span className="left floated like">
                          <Link title="Editer" to={"/instance/edit/" + item.id}>
                            <i className="icon edit yellow large"></i>
                          </Link>
                        </span>
                        <span className="right floated star">
                          <Link title="Voir" to={"/instance/show/" + item.id}>
                            <i className="icon eye blue large"></i>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </Fade>
              ));
            }}
          />
        );
    
}

RowInstance.propTypes = {
  instance: PropTypes.array.isRequired,
  entries: PropTypes.string.isRequired
}
export default RowInstance