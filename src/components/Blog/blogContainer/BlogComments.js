import React from 'react'
import { List, Transition } from 'semantic-ui-react'


const Blogcomments = ({ blog }) => {
  if (blog === undefined) return null

  return (
    <div className="comments">
      <h2>Comments</h2>
      <Transition.Group as={List} duration={200} divided size="small" verticalAlign="middle">
      
        {blog.comments.map((comment) =>
          <List.Item key={comment._id}>{comment.comment}</List.Item>)}
      </Transition.Group>
    </div>
  )
}

export default Blogcomments