import React, { Component } from 'react'
import { Link } from '../../component'

class NotFoundView extends Component {
  render() {
    return (
      <div className="NotFoundView">
        <h2>Not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    )
  }
}
export default NotFoundView