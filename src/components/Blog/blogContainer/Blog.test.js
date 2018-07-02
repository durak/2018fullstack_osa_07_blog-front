import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import { debug } from 'util'
import { Button, Card, Icon } from 'semantic-ui-react'

describe('<Blog />', () => {

  let blogComponent
  const mockHandleDestroy = jest.fn()
  const mockHandleLike = jest.fn()

  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 99,
    user: { name: 'test user full name', username: 'testusername' },
    comments: []
  }

  const user = {
    username: 'testusername'
  }

  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        blog={blog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )
  })

  const findHostNodeWithText = (component, text, element) => {
    return component
      //.find('div')      
      //.findWhere(n => n.type() === element && n.text().includes(text))
      .findWhere(n => n.text().includes(text))
      .hostNodes()
  }

  it ('without valid blog redirect is returned', () => {
    const returnComponent = shallow(
      <Blog        
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )
    
    expect(returnComponent.text()).toContain('<Redirect />')
  })

  it('at start displays blog author, title, url and user who added the blog', () => {
    const titleNode = blogComponent.find('.blogtitle')
    const authorNode = findHostNodeWithText(blogComponent, 'Author')
    const addedByNode = findHostNodeWithText(blogComponent, 'Added by')
    const urlNode = findHostNodeWithText(blogComponent, 'url')

    expect(titleNode.text()).toContain(blog.title)
    expect(authorNode.text()).toContain(blog.author)
    expect(authorNode.is('span')).toEqual(true)
    expect(addedByNode.text()).toContain(blog.user.name)
    expect(urlNode.text()).toContain(blog.url)
    expect(urlNode.is('a')).toEqual(true)
  })

  it('blog is shown added by anonymous when blog does not contain user information', () => {
    let anonymousBlog = { ...blog }
    delete anonymousBlog.user
    const anonymousBlogComponent = shallow(
      <Blog
        blog={anonymousBlog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )

    const addedByNode = findHostNodeWithText(anonymousBlogComponent, 'Added by')
    expect(addedByNode.text()).toContain('anonymous')
  })

  it('clicking the like button calls like handler function', () => {
    const like = blogComponent.find('.blogVote')    
    like.at(0).simulate('click')
    expect(mockHandleLike.mock.calls.length).toBe(1)
  })

  it('delete button is shown when user has added the blog themselves', () => {
    const deleteNode = blogComponent.find('.blogDelete')        
    expect(deleteNode.prop('style')).toEqual({ display: '' }) 
  })

  it('clickling delete nutton calls handler function', () => {
    const deleteNode = blogComponent.find('.blogDelete')        
    deleteNode.simulate('click')
    expect(mockHandleDestroy.mock.calls.length).toBe(1)
  })

  it('delete button is shown on anonymous blogs', () => {
    let anonymousBlog = { ...blog }
    delete anonymousBlog.user
    const anonymousBlogComponent = shallow(
      <Blog
        blog={anonymousBlog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )

    const deleteNode = anonymousBlogComponent.find('.blogDelete')        
    expect(deleteNode.prop('style')).toEqual({ display: '' }) 
  })

  it('delete button is hidden when user has not added the blog', () => {
    let anotherUserBlog = { ...blog, user: { name: 'someone else', username: 'someothername' } }
    const anotherUserBlogComponent = shallow(
      <Blog
        blog={anotherUserBlog}
        user={user}
        handleDestroy={mockHandleDestroy}
        handleLike={mockHandleLike}
      />
    )

    const deleteNode = anotherUserBlogComponent.find('.blogDelete')        
    expect(deleteNode.prop('style')).toEqual({ display: 'none' }) 
  })  

})