import React, { Component } from 'react'
import { Link } from '../../component'

class BookWithStatus extends Component {
  render() {
    const prevId = parseInt(this.props.params.id) - 1 || 1
    const nextId = parseInt(this.props.params.id) + 1

    return (
      <div className="BookWithStatus">
        <h2>BookWithStatus</h2>
        <h4>Status: {this.props.params.status}</h4>
        <h4>ID: {this.props.params.id}</h4>
        <Link to={`/book/awesome/${prevId}`}>Prev Book</Link>
        &nbsp;
        <Link to={`/book/awesome/${nextId}`}>Next Book</Link>
        <div>
          <Link to={`/`}>Home</Link>
        </div>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}
export default BookWithStatus