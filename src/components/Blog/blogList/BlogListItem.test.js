import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { BlogListItem } from './BlogListItem'
import { BrowserRouter as Router } from 'react-router-dom'



describe('<BlogListItem />', () => {
  let bloglistItemComponent
  const mockHandleLike = jest.fn()
  const mockNotify = jest.fn()

  const blog = {
    id: 'ifj430foewf',
    title: 'test blog',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 99,
    user: { name: 'test user full name', username: 'testusername' },
    comments: [
      { _id: 'fdsalkfjsldkjfsldkfjlksdjflskd', comment: 'some' },
      { _id: 'firoeitgrjeogifdogjidogijsdofg', comment: 'thing' }
    ]
  }


  beforeEach(() => {
    bloglistItemComponent = shallow(
      <BlogListItem
        blog={blog}
        notify={mockNotify}
        blogLike={mockHandleLike}
      />
    )
  })

  const findHostNodeWithText = (component, text) => {
    return component
      .findWhere(n => n.text().includes(text))
      .hostNodes()
  }

  it('renders correctly', () => {
    const tree = renderer.create(
      <Router>
        <BlogListItem
          blog={blog}
          notify={mockNotify}
          blogLike={mockHandleLike}
        />
        </Router>
      
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })

  it('displays blog author, title', () => {
    const titleNode = bloglistItemComponent.find('.blogtitle')
    const authorNode = findHostNodeWithText(bloglistItemComponent, 'by')

    expect(titleNode.text()).toContain(blog.title)
    expect(authorNode.text()).toContain(blog.author)
    expect(authorNode.is('span')).toEqual(true)
  })

  it('clicking the like button calls like handler function', () => {
    const like = bloglistItemComponent.find('.blogVote')    
    like.at(0).simulate('click')
    expect(mockHandleLike.mock.calls.length).toBe(1)
    expect(mockNotify.mock.calls.length).toBe(1)
  })

})
