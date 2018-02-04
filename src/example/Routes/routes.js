import React, { Component } from 'react'
import { redirect } from '../../component'

import NotFoundView from '../Views/NotFoundView'
import RestrictedView from '../Views/RestrictedView'
import HomeView from '../Views/HomeView'
import BookWithStatus from '../Views/BookWithStatus'
import BookView from '../Views/BookView'

import logMiddleware from './middlewares/logMiddleware'
import roleRestrictedMiddleware from './middlewares/roleRestrictedMiddleware'

const notFoundPath = '/not-found'
const restrictedPath = '/restricted-access'

const middlewares = [
  logMiddleware,
  roleRestrictedMiddleware(restrictedPath),
]

const HOCs = [
]

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
    path:'/book/:id',
    viewClass: BookView,
    handler: (params) => {
      console.log('/book/:id >', params);
    }
  },
  {
    path:'/secret',
    viewClass: BookWithStatus,
    requiredRoles: ['super-admin']
  },
  {
    path:'/not-found',
    viewClass: NotFoundView
  },
  {
    path:'/restricted-access',
    viewClass: RestrictedView
  },
]

const routerConfig = {}

export { routes, routerConfig, HOCs, notFoundPath, middlewares }