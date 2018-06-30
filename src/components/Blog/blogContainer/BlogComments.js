import React from 'react'
import { List, Transition, Comment, Header, Icon } from 'semantic-ui-react'


const Blogcomments = ({ blog }) => {
  if (blog === undefined) return null

  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {blog.comments.map((comment) =>
        <Comment key={comment._id}>
          <Comment.Avatar as={Icon} name="caret right"></Comment.Avatar>
          <Comment.Content>
            <Comment.Text>
              {comment.comment}
            </Comment.Text>
          </Comment.Content>
        </Comment>

      )}
    </Comment.Group>
  )

/*   return (
    <div className="comments">
      <h2>Comments</h2>
      <Transition.Group as={List} duration={200} divided size="small" verticalAlign="middle">

        {blog.comments.map((comment) =>
          <List.Item key={comment._id}>{comment.comment}</List.Item>)}
      </Transition.Group>
    </div>
  ) */
}

export default Blogcomments