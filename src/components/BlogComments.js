import React from 'react'

const Blogcomments = ({ blog }) => {
  if (blog === undefined) return null

  return (
    <div className="comments">
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment) =>
          <li key={comment._id}>{comment.comment}</li>)}
      </ul>
    </div>
  )
}

export default Blogcomments