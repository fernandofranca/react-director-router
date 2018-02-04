# react-director-router
A versatile React Router based on [Director](https://github.com/flatiron/director) 

## Features
- Auto wraps views with custom Higher Order Components.
- Inject route props into your views (route parameters, query parameters).
- Inject custom props into your views.
- Route handler functions be fired on route change and will receive route params, query params and injected props.
- Small footprint.

## Advantages
Makes your components cleaner by:

- discouraging to rely on `componentDidMount` for http operations or state management. 
- avoiding repetitive "glue code" by auto wrapping HOCs.

By using route handlers your view components can be **more functional**, **more view related** and carry **less business logic**.

Therefore  view component tests would be simpler.

## Demo ##
`yarn start-example`

## Usage ##

### Install
`yarn add react-director-router`

### App.js
```
import Router from '../../component'

import HomeView from '../Views/HomeView'
import BookWithStatus from '../Views/BookWithStatus'
import NotFoundView from '../Views/NotFoundView'

const routes = [
  {
    path:'/',
    viewClass: HomeView,
    handler: () => {
      console.log('Home handler');
    }
  },
  {
    path:'/book/:status/:id',
    viewClass: BookWithStatus,
    handler: (params) => {
      console.log('/book/:status/:id > ', params)
    },
  },
  {
    path:'/not-found',
    viewClass: NotFoundView
  },
]

const notFoundPath = '/not-found'

const customProps = {
  foo: 'bar', 
  count: 9000, 
  userRoles: ['basic-user']
}

const HOCs = [
  view => someHigherOrderComponent(view),
  view => anotherHigherOrderComponent(view),
]

const middlewares = [
  (injectedProps, params, queryParams, route) => {
    console.log(':: Log Middleware ::', route.viewClass.name);
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router
          routes={routes}
          notFoundPath={notFoundPath}
          injectProps={customProps} 
          middlewares={middlewares}
          viewHOCs={HOCs}
        />
      </div>
    )
  }
}
export default App
```

### Middlewares
Middlewares are functions that can intercept every route change and are a great opportunity to restrict a route or redirect the navigation flow.

By returning false on any middleware function, the middleware execution sequence will be interrupted, the view will not render and the route handler will not run. You can then redirect the navigation flow acording to the desired business logic.

Another common use for a middleware is logging navigation activity.

#### Example

A role restriction middleware:

```
import { redirect } from 'react-director-router'

export default function roleRestrictedMiddleware(injectedProps, params, queryParams, route) {
    if (route.requiredRoles && injectedProps.userRoles){
      console.log(':: roleRestrictedMiddleware ::');
      const isAllowed = injectedProps.userRoles === route.requiredRoles

      if (!isAllowed){
        redirect('restricted-content')
        return isAllowed
      }
    }
  }
```

## Roadmap
- Hash navigation
- Async routing