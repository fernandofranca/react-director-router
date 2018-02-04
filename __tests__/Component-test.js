'use strict'

jest.disableAutomock()

import React from 'react'
import { findDOMNode } from 'react-dom'
import { createRenderer, Simulate, renderIntoDocument } from 'react-dom/test-utils'
// import renderer from 'react-test-renderer'
// import { shallow, mount } from 'enzyme'
// import toJson from 'enzyme-to-json'

import Router, { redirect } from '../src/component'

import HomeView from '../src/example/Views/HomeView.js'
import BookWithStatus from '../src/example/Views/BookWithStatus.js'
import NotFoundView from '../src/example/Views/NotFoundView.js'

const routes = [
  {
    path:'/',
    viewClass: HomeView,
    handler: () => {
      console.log('Home handler')
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

describe('Render', () => {
  it('should render', () => {
		const renderer = createRenderer()
		renderer.render(
			<Router routes={routes} notFoundPath={notFoundPath} />
		)
		const component = renderer.getRenderOutput()
		expect(component.type.name).toBe('HomeView')
  })
})
