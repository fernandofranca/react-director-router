import { goTo } from './RoutingEngine'

import React, { Component } from 'react'

class Link extends Component {
  handleClick(evt){
    evt.preventDefault()

    const { to } = this.props
    if (!to) return

    goTo(to)
  }

  render() {
    const { className, to } = this.props

    return (
      <a href={to} className={`Link ${className || ''}`} onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </a>
    )
  }
}
export default Link
