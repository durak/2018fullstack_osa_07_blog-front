import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const NewBlogForm = ({
  handleSubmit, handleChange, handleCancel,
  title, author, url, valid
}) => {

  return (

    <Form onSubmit={handleSubmit}>
      <h1>Add new blog</h1>
      <Form.Group widths="equal">
        <Form.Field>
          <label>title</label>
          <Form.Input
            fluid
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            error={!valid.title}
          />
        </Form.Field>

        <Form.Field>
          <label>author</label>
          <Form.Input
            fluid
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
            error={!valid.author}
          />
        </Form.Field>

        <Form.Field>
          <label>url</label>
          <Form.Input
            fluid
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
            error={!valid.url}
          />
        </Form.Field>


      </Form.Group>
      <Button type="submit">submit</Button>
      <Button negative type="reset" onClick={handleCancel}>cancel</Button>

    </Form>
  )
}

export default NewBlogForm

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  valid: PropTypes.object.isRequired
}