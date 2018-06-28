import React from 'react'

const BlogCommentForm = ({ handleComment }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''

    handleComment(comment)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="comment" />
        </div>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}


export default BlogCommentForm