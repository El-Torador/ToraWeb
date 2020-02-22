import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import FilterResults from 'react-filter-search'
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import '../../Constants/moment_fr'

const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] 
/**
 * ROWCERTIFIANT COMPONENT
 */
class RowQualifiant extends Component {
    constructor(props) {
        super(props)
        this.state = {
          activeIndex: ''
        }
      this.one_letter = list[Math.floor(Math.random() * ((list.length - 1) - 1 + 1)) + 1]

      this.description = Math.floor(Math.random() * (100000000 - 1 + 1)) + 1
    }
  
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = this.state.activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }
    render() {
      const formatTitle = title => {
        const titleArray = title.split(' ')
        console.log(titleArray)
        let result = '', tmp
        for (let i = 0; i < titleArray.length; i++) {
          tmp = titleArray[i].toString()
          result += tmp[0]
        }
        console.log(result)
        return result
      }
        if (this.props.modules.length > 0) {
            return (
                <FilterResults
                    value={this.props.entries}
                    data={this.props.modules}
                    renderResults={result => {
                        return result.map(item => (
                          <Fade right key={item.id}>
                            <div className="ui two wide add-margin">
                              <Popup content={item.description} trigger={<Link
                                to={"/training/qualifying/module/discipline/" + item.id}
                                className="ui card"
                                key={item.id}
                              >
                                <div className="content">
                                  <div className="header">
                                    {item.name.length > 18 ? <span title={item.name}>{formatTitle(item.name)}</span>:
                                    item.name}
                                    <span className="right floated">
                                      <Popup
                                        content="Editer"
                                        trigger={
                                          <Link to={"/training/qualifying/module/edit/" + item.id}>
                                            <i className="icon edit outline yellow large"></i>
                                          </Link>
                                        }
                                        position="top center"
                                      />
                                    </span>
                                  </div>
                                  <div className="meta">
                                    {moment(item.created_at).format("LLLL")}
                                  </div>
                                </div>

                              </Link>} position="top center" />
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
                    <h2>Aucun Module Enregistré !</h2>
                </div>
            )
        }
    }
}

RowQualifiant.propTypes = {
    entries: PropTypes.string.isRequired,
    modules: PropTypes.array.isRequired
}

export default RowQualifiant