import React, { Component } from 'react'
import Router from '../../component'

import { routes, routerConfig, HOCs, notFoundPath, middlewares } from '../Routes/routes'

class App extends Component {
  render() {
    const moreProps = {
      foo: 'bar', 
      count: 9000, 
      userRoles: ['basic-user']
    }
    
    return (
      <div className="App">
        <Router
          routes={routes}
          notFoundPath={notFoundPath}
          injectProps={moreProps} 
          middlewares={middlewares}
          viewHOCs={HOCs}
          config={routerConfig}
        />
      </div>
    )
  }
}
export default App