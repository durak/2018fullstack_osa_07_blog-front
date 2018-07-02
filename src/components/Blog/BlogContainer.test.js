import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { BlogContainer } from './BlogContainer'



describe('<BlogContainer />', () => {

  const user = {
    username: 'testusername 1'
  }

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

  const mockAddComment = jest.fn()
  const mockBlogLike = jest.fn()
  const mockNotify = jest.fn()

  it('renderss correctly', () => {
    const tree = renderer.create(
      <BlogContainer
        user={user}
        blogId='1'
        blogs={[blog1, blog2]}
        blogLike={mockBlogLike}
        blogAddComment={mockAddComment}
        notify={mockNotify}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })

})