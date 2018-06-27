import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config())
  return response.data
}

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { comment: comment })
  return response.data
}

const destroy = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config())
  return response
}

export default { getAll, create, setToken, update, destroy, addComment }