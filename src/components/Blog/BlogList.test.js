import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { BlogList } from './BlogList'
import { BrowserRouter as Router } from 'react-router-dom'

describe('<BlogList />', () => {

  const blog1 = {
    id: '1',
    title: 'test blog 1',
    author: 'test author 1',
    url: 'http://testurl.com 1',
    likes: 99,
    user: { name: 'test user full name 1', username: 'testusername 1' },
    comments: [
      { _id: '1', comment: 'some comment content' },
      { _id: '2', comment: 'some other content' }
    ]
  }

  const blog2 = {
    id: '2',
    title: 'test blog 2',
    author: 'test author 2',
    url: 'http://testurl.com 2',
    likes: 99,
    user: { name: 'test user full name 2', username: 'testusername 2' },
    comments: [
      { _id: '1', comment: 'some comment content' },
      { _id: '2', comment: 'some other content' }
    ]
  }

  const mockHandleLike = jest.fn()
  const mockNotify = jest.fn()

  it('renders correctly', () => {
    const tree = renderer.create(
      <Router>
        <BlogList
          blogs={[blog1, blog2]}
          notify={mockNotify}
          blogLike={mockHandleLike}
        />
      </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })
})