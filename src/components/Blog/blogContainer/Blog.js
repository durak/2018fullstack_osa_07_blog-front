import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Card, Icon } from 'semantic-ui-react'

const Blog = ({ blog, user, handleLike, handleDestroy }) => {

  if (blog === undefined) return <Redirect to="/" />

  const destroyButtonVisible = { display: blog.user && (blog.user.username !== user.username) ? 'none' : '' }

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header as="h1">
            {blog.title}
            <span className="right floated">
              <Button negative style= {destroyButtonVisible} onClick={handleDestroy}>delete</Button>
            </span>
          </Card.Header>

          <Card.Meta>
            <span>
          Author: {blog.author}
            </span>
          </Card.Meta>

          <Card.Meta>
            <span>
          Added by: {blog.user.name}
            </span>
          </Card.Meta>

          <Card.Description>
            url: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <span onClick={handleLike}>
            <Icon name="like" />
            {blog.likes} votes
          </span>

          <span className="right floated"><Icon name="comments" />
            {blog.comments.length} comments
          </span>
        </Card.Content>

      </Card>
    </div>
  )
}


export default Blog