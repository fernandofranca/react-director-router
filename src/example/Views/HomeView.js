import React, { Component } from 'react'
import { Link } from '../../component'

class HomeView extends Component {
  render() {
    return (
      <div className="HomeView">
        <h2>This is the Home View</h2>
        <p>
          <Link to="/book/awesome/3264">Some book with status</Link>
        </p>
        <p>
          <Link to="/book/1632">Some book with id</Link>
        </p>
        <p>
          <Link to="/secret">This view requires 'super-admin' role</Link>
        </p>
        <p>
          <Link to="/not-a-route">Error</Link>
        </p>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}
export default HomeView