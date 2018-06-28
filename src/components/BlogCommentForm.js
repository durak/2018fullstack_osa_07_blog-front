import React from 'react'

const BlogCommentForm = ({ handleComment }) => {

  const valid = (comment) => {
    return comment.length > 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    if (!valid(comment)) {
      event.target.valid.value = 'required'
      return
    }

    event.target.comment.value = ''
    event.target.valid.value = ''
    handleComment(comment)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div>
          <input type="text" name="comment" />
          <output name="valid"></output>
        </div>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}


export default BlogCommentForm