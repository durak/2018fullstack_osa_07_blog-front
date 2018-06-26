import axios from 'axios'
const baseUrl = '/api/users'

/*let token = null

 const config = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
} */

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = async (userId) => {
  console.log('userService receives from userReducer user ', userId)
  const response = await axios.get(`${baseUrl}/${userId}`)
  console.log('userService receives from SERVER response ', response)
  return response.data
}

/* const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config())
  return response.data
}



const destroy = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config())
  return response
} */

export default { getAll, getOne }