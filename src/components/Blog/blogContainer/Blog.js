import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, Icon } from 'semantic-ui-react'

const Blog = ({ blog, user, handleLike, handleDestroy }) => {

  if (blog === undefined) return <Redirect to="/" />

/*   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  } */

  const destroyButtonVisible = { display: blog.user && (blog.user.username !== user.username) ? 'none' : '' }

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header as="h1">
            {blog.title}
          </Card.Header>
          <Card.Meta>
            <span>
          by {blog.author}
            </span>
          </Card.Meta>
          <Card.Description>
        url: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
          </Card.Description>

        </Card.Content>
        <Card.Content extra>

          <span onClick={handleLike}>
            <Icon name="like" />
          </span>
          {blog.likes} votes

          <span className="right floated"><Icon name="comment" />{blog.comments.length} comments</span>

        </Card.Content>
      </Card>

    </div>
  )

/*   return (
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
  ) */
}


export default Blog