import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Form, Button, Input } from 'semantic-ui-react'
import BlogCommentForm from './BlogCommentForm'

describe('<BlogCommentForm />', () => {

  const mockHandleComment = jest.fn()

  it('renders correcly', () => {
    const tree = renderer.create(
      <BlogCommentForm 
        handleComment={mockHandleComment}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })

/*   it('clicking on submit button calls handler', () => {
    const blogCommentFormComponent = shallow(
      <BlogCommentForm
        handleComment={mockHandleComment}
      />
    )
    const input = blogCommentFormComponent.find('Input')
    input.simulate('focus')
    Input.
    input.simulate('change', { target: { value: 'Changed' } })
    input.simulate('keydown', { 
      which: 'a',
      target: {
        blur() {        
        input.simulate('blur')
      } 
    }
  })
    //input.value = 'valid'
    console.log(input.html())
    const button = blogCommentFormComponent.find('Button')
    button.simulate('click')
    expect(mockHandleComment.mock.calls.length).toBe(1)
  }) */
})