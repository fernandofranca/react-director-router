import React, { Component } from 'react'
import { Link } from '../../component'

class RestrictedView extends Component {
  render() {
    return (
      <div className="RestrictedView">
        <h2>### Restricted Access ###</h2>
        <Link to="/">Back to home</Link>
      </div>
    )
  }
}
export default RestrictedView