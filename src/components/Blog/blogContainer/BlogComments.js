import React from 'react'
import { Comment, Header, Icon } from 'semantic-ui-react'


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
}

export default Blogcomments