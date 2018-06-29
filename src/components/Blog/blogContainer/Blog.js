import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const Blog = ({ blog, user, handleLike, handleDestroy }) => {

  if (blog === undefined) return <Redirect to="/" />

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const destroyButtonVisible = { display: blog.user && (blog.user.username !== user.username) ? 'none' : '' }

  return (
    <div style={blogStyle} >

      <h1>{blog.title}</h1>
      <h2>by: {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>

      <p>
        likes: {blog.likes}
        <Button onClick={handleLike}>like</Button>
      </p>

      <div className="destroy" style={destroyButtonVisible}>
        <p><Button onClick={handleDestroy}>delete</Button></p>
      </div>

      <p className="addedBy">added by {blog.user ? blog.user.name : 'anonymous'}</p>

    </div>
  )
}


export default Blog