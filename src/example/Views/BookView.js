import React, { Component } from 'react'
import { Link } from '../../component'

class BookView extends Component {
  render() {
    return (
      <div className="BookView">
        <h2>BookView</h2>
        <div>
          <Link to={`/`}>Home</Link>
        </div>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}
export default BookView