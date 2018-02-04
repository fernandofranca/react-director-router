import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { initRouter, getRouter } from './RoutingEngine'
import redirect from './redirect'

const NOT_FOUND_FALLBACK = '/not-found'

function parseRouteParams(path, args) {
  const paramNames = path.split('/').filter((item) => {
    return item.indexOf(':')===0
  })

  let paramsObj = {}
  for (var i = 0; i < paramNames.length; i++) {
    let name = paramNames[i]
    paramsObj[name.substr(1)] = args[i]
  }

  return paramsObj
}

function getQueryParams() {
  if (!window.location) return null
  return queryString.parse(window.location.search)
}

class Router extends Component {
  constructor(props){
    super(props)

    this.state = {
      viewClass: null,
      route: null,
      params: {},
    }

    if (!props.routes){
      throw new Error('Provide the router property "routes".')
    }

    if (!props.notFoundPath){
      throw new Error('Provide the router property "notFoundPath".')
    }
  }

  execMiddlewares(injectProps){
    if (!this.props.middlewares) return

    const { middlewares } = this.props
    const _middlewares = middlewares.slice()

    let shouldStop = false
    
    const getArgsList = () => {
      return Object.keys(injectProps).map((propName) => {
        return injectProps[propName]
      })
    }
    const getNextMiddleware = () => _middlewares.shift()
    const execMiddlewareLoop = () => {
      let middlewareFn = getNextMiddleware()
      if (middlewareFn) {
        
        const success = middlewareFn.apply(this, getArgsList())

        if (success===false) {
          shouldStop = true
          return
        } else {
          execMiddlewareLoop()
        }
      }
    }
    execMiddlewareLoop()

    return shouldStop
  }

  componentWillMount() {
    const { props } = this
    const { injectProps, notFoundPath, middlewares } = props

    let parsedRoutes = {}
    props.routes.forEach((route) => {
      parsedRoutes[route.path] = (...args) => {
        if (!route.viewClass) {
          throw new Error(`The chosen route "${route.path}" should have a "viewClass" property.`)
        }

        const params = parseRouteParams(route.path, args)
        const queryParams = getQueryParams()

        // Executa middlewares
        const middlewareProps = {props:injectProps, params, queryParams, route}
        if (this.execMiddlewares(middlewareProps) === true) return

        // Executa o handler da rota
        route.handler && route.handler({...injectProps, params, queryParams})

        // Modifica estado -> dispara render
        this.setState({route, viewClass: route.viewClass, params, queryParams})
      }
    })

    initRouter(parsedRoutes, {
      notfound: () => {
        redirect(notFoundPath || NOT_FOUND_FALLBACK)
      },
      html5history: true,
      strict: false,
      ...props.config
    })
  }

  // Adiciona os higher order components
  wrapHOCs(viewClass){
    this.props.viewHOCs.forEach((hoc) => {
      viewClass = hoc(viewClass)
    })

    return viewClass
  }

  render() {
    const { viewClass, params, queryParams } = this.state
    const { injectProps } = this.props

    if (!viewClass) return null

    const View = this.wrapHOCs(viewClass)

    return (<View {...injectProps} params={params} queryParams={queryParams} />)
  }
}


Router.propTypes = {
  routes: PropTypes.array,
  notFoundPath: PropTypes.string,
  injectProps: PropTypes.object,
  middlewares: PropTypes.array,
  viewHOCs: PropTypes.array,
}

Router.defaultProps = {
  injectProps: {},
  middlewares: [],
  viewHOCs: [],
}

export default Router