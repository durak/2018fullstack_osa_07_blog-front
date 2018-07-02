import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, Icon, Dimmer, Header } from 'semantic-ui-react'

export class BlogListItem extends React.Component {
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
            <span className="blogtitle">{blog.title}</span>
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
          <span>
            <Icon name="like" onClick={this.handleLike(blog)} className="blogVote" />
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

export default BlogListItem

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
  blogLike: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}