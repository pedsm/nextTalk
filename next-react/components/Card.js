import React from 'react'
const {abs, floor, round} = Math

function degToMins (deg) {
  var d = abs(floor(deg));
  var minfloat = (abs(deg-d)*60);
  var m = floor(minfloat);
  var secfloat = (minfloat-m)*60;
  var s = round(secfloat);
  // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.
  if (s === 60) {
    m++;
    s = 0;
  }
  if (m === 60) {
    d++;
    m = 0;
  }
  return `${d}°${m}'${s}"`
}

function formatLatLon(latitude, longitude) {
  const lat = latitude > 0 ? 'N' : 'S'
  const lon = latitude > 0 ? 'E' : 'W'
  return `${lat} ${degToMins(latitude)} ${lon} ${degToMins(longitude)}`
}

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: true
    } 
  }
  componentWillUnmount() {
    this.setState(() => ({mounted: false}))
  }

  render() {
    const {
      postcode,
      region,
      admin_ward,
      latitude,
      longitude
    } = this.props.postcode

    return (
      <div className="card" style={{
      }}>
        <div className="card-content">
          <p className="title">{postcode}</p>
          <p className="subtitle">{region} - {admin_ward}</p>
          <p className="subtitle has-text-weight-light has-text-dark">🗺{formatLatLon(latitude, longitude)}</p>
        </div>
      </div>

    )
  }
}