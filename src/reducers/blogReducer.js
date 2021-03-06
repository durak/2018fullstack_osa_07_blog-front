import blogService from '../services/blogs'
import { userUpdate } from './userReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOG_CREATE':
    return state.concat(action.blog)
  case 'BLOG_DESTROY':
    return state.filter(b => b.id !== action.id)
  case 'BLOG_UPDATE':
    return state.map(b => b.id !== action.blog.id ? b : action.blog)
  case 'BLOGS_INIT':
    return action.blogs
  case 'BLOGS_CLEAR_ALL':
    return []

  default:
    return state
  }
}

//------------ACTION CREATORS------------

export const blogCreate = (newBlog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(newBlog)

      dispatch({ type:'BLOG_CREATE', blog: savedBlog })
      dispatch(userUpdate(savedBlog.user))

      return savedBlog
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogDestroy = (blogToDestroy) => {
  return async (dispatch) => {
    try {
      await blogService.destroy(blogToDestroy)

      dispatch({ type: 'BLOG_DESTROY', id: blogToDestroy.id })
      dispatch(userUpdate(blogToDestroy.user))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogLike = (blogToLike) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getOne(blogToLike.id)
      const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
      dispatch({
        type: 'BLOG_UPDATE',
        blog: updatedBlog
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogAddComment = (blogToComment, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(blogToComment.id, comment)
      dispatch({
        type: 'BLOG_UPDATE',
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
      dispatch({ type: 'BLOGS_INIT', blogs })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogsClearAll = () => {
  return async (dispatch) => {
    dispatch({ type: 'BLOGS_CLEAR_ALL' })
  }
}

export default blogReducer