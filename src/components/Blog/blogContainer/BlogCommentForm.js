import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react'

const BlogCommentForm = ({ handleComment }) => {

  const valid = (comment) => {
    return comment.length > 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    if (!valid(comment)) {
      event.target.valid.value = 'required field'
      return
    }

    event.target.comment.value = ''
    event.target.valid.value = ''
    handleComment(comment)
  }


  return (
    <div>
      <Form onSubmit={handleSubmit} >
        <Form.Field inline>
          <Input name="comment" />
          <label>
            <output name="valid" type="text"></output>
          </label>
        </Form.Field>

        <Button type="submit">add comment</Button>
      </Form>
    </div>
  )
}


export default BlogCommentForm