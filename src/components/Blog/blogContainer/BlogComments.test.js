import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import BlogComments from './BlogComments'

describe('<BlogComments />', () => {
  const blog = {
    comments : [
      { _id: 'fdsalkfjsldkjfsldkfjlksdjflskd', comment: 'some comment content fdlskjflskdjflksdflk' },
      { _id: 'firoeitgrjeogifdogjidogijsdofg', comment: 'some comment content gfsgjirojsgldfjglkdf' }
    ]
  }

  it('renders correctly', () => {
    const tree = renderer.create(
      <BlogComments
        blog={blog}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })

})