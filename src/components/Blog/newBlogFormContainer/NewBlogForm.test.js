import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {

  const mockHandleSubmit = jest.fn()
  const mockHandleCancel = jest.fn()
  const mockHandleChange = jest.fn()


  it('renders correctly', () => {
    const tree = renderer.create(
      <NewBlogForm
        handleSubmit={mockHandleSubmit}
        handleChange={mockHandleChange}
        handleCancel={mockHandleCancel}
        title='has title'
        author='has author'
        url='has url'
        valid={{ title: true, author: true, url: true }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })

  it('calls handlers when submit or cancel is clicked or value changes in input fields', () => {
    const Wrapper = (props) => {
      return (
        <NewBlogForm
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleCancel={props.handleCancel}
          title='has title'
          author='has author'
          url='has url'
          valid={{ title: true, author: true, url: true }}
        />
      )
    }

    const component = mount(
      <Wrapper
        handleSubmit={mockHandleSubmit}
        handleChange={mockHandleChange}
        handleCancel={mockHandleCancel}
      />
    )

    const buttons = component.find('Button')
    buttons.at(0).simulate('submit')
    expect(mockHandleSubmit.mock.calls.length).toBe(1)
    buttons.at(1).simulate('click')
    expect(mockHandleCancel.mock.calls.length).toBe(1)

    const input = component.find('input')
    input.at(0).simulate('change', { target: { value: 'asd' } })
    input.at(1).simulate('change', { target: { value: 'asd' } })
    input.at(2).simulate('change', { target: { value: 'asd' } })
    expect(mockHandleChange.mock.calls.length).toBe(3)
  })
})


