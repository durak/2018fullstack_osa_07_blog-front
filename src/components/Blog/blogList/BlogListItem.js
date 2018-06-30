import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Icon, Dimmer, Header } from 'semantic-ui-react'

import { blogLike } from '../../../reducers/blogReducer'
import { notify } from '../../../reducers/notificationReducer'

class BlogListItem extends React.Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  handleLike = (blog) => () => {
    const msg = `you liked ${blog.title} by ${blog.author}`
    this.props.blogLike(blog)
    this.props.notify(msg, 'message')
  }

  render() {
    const { active } = this.state
    const { blog } = this.props

    return (
      <Card>

        <Dimmer.Dimmable as={Card.Content} dimmed={active} blurring
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
        >
          <Card.Header>
            {blog.title}
          </Card.Header>

          <Card.Meta>
            <span>
              by {blog.author}
            </span>
          </Card.Meta>

          <Card.Description>
            {blog.title}
          </Card.Description>

          <Dimmer active={active} inverted>
            <Header as="h2">
              <Link to={`blogs/${blog.id}`} > View </Link>
            </Header>
          </Dimmer>

        </Dimmer.Dimmable>

        <Card.Content extra>
          <span onClick={this.handleLike(blog)}>
            <Icon name="like" />
            {blog.likes} votes
          </span>
          <span className="right floated">
            <Icon name="comments" />{blog.comments.length} comments
          </span>
        </Card.Content>

      </Card>
    )


  }
}

//export default BlogListItem

export default connect(
  null,
  { blogLike, notify }
)(BlogListItem)