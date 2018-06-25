import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE':
    return state.concat(action.blog)
  case 'DESTROY':
    return state.filter(b => b.id !== action.id)
  case 'LIKE':
    return state.map(b => b.id !== action.blog.id ? b : action.blog)
  case 'TOGGLE_FULLVIEW':{
    console.log('toggle')
    return state.map(b => b.id !== action.blog.id ? b : { ...action.blog, fullView: !action.blog.fullView })
  }
  case 'INIT':
    return action.blogs

  default:
    return state
  }
}

//------------ACTION CREATORS------------

export const blogCreate = (newBlog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      dispatch({ type:'CREATE', blog: savedBlog })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogDestroy = (blogToDestroy) => {
  return async (dispatch) => {
    try {
      const response = await blogService.destroy(blogToDestroy)
      console.log('delete response:', response)
      dispatch({ type: 'DESTROY', id: blogToDestroy.id })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogLike = (blogToLike) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({ ...blogToLike, likes: blogToLike.likes + 1 })
      dispatch({
        type: 'LIKE',
        blog: updatedBlog
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogsInit = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch({ type: 'INIT', blogs })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogToggleVisibility = (blog) => {
  return {
    type: 'TOGGLE_FULLVIEW',
    blog
  }
}

export default blogReducer