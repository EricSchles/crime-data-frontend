import PropTypes from 'prop-types'
import React from 'react'

import Hint from './Hint'
import stateLookup from '../util/usa'
import svgData from '../../public/data/usa-state-svg.json'

class UsaMap extends React.Component {
  state = { hover: null }

  rememberValue = id => e => {
    this.setState({
      hover: { value: id, position: { x: e.pageX, y: e.pageY } },
    })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    const { colors, changeColorOnHover, mapClick, place } = this.props
    const { hover } = this.state

    const placeId = place && stateLookup(place).id
    const svgDataWithNames = svgData.map(s => ({
      ...s,
      name: stateLookup(s.id).display,
    }))

    return (
      <div>
        <svg
          className={`cursor-pointer usa-map ${!changeColorOnHover &&
            'no-hover'}`}
          viewBox="0 0 959 593"
          preserveAspectRatio="xMidYMid"
        >
          <title>USA</title>
          <g onClick={mapClick}>
            {svgDataWithNames.map(s => {
              const defaultClass =
                s.id === placeId ? 'fill-red-bright' : 'fill-blue-light'

              return (
                <path
                  key={s.id}
                  id={s.id}
                  className={colors[s.id.toLowerCase()] || defaultClass}
                  d={s.d}
                  pointerEvents="all"
                  onMouseOver={this.rememberValue(s.name)}
                  onMouseMove={this.rememberValue(s.name)}
                  onMouseOut={this.forgetValue}
                />
              )
            })}
          </g>
        </svg>
        {hover ? <Hint {...hover} /> : null}
      </div>
    )
  }
}

UsaMap.defaultProps = {
  colors: {},
  changeColorOnHover: true,
}

UsaMap.propTypes = {
  colors: PropTypes.object.isRequired,
  changeColorOnHover: PropTypes.bool.isRequired,
  mapClick: PropTypes.func,
  place: PropTypes.string,
}

export default UsaMap
