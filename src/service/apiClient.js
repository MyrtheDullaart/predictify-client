
const API_URL = import.meta.env.VITE_REACT_APP_API_URL

async function login(email, password) {
  return await post('login', { email, password }, false)
}

async function register(email, password, first_name, last_name) {
  const res = await post('users/register', { email, password, first_name, last_name }, false)

  if (res.data.error) {
    return res
  }

  return await login(email, password)
}

async function getUser(id) {
  return await get(`users/${id}`)
}

const getQuestions = async (resolved, search) => {
  let query = `?resolved=${resolved}`

  if (search) {
    query = `?resolved=${resolved}&&search=${search}`
  }
  
  const res = await get('questions', query)
  return res.data.questions
}

async function createForecast(data) {
  return await post('forecasts', data)
}

async function resolveQuestion(data) {
  return await patch('questions', data)
}

async function createQuestion(data) {
  return await post('questions', data)
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth)
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth)
}

async function get(endpoint, query, auth = true, ) {
  return await request('GET', endpoint, null, auth, query)
}

async function request(method, endpoint, data, auth = true, query) {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  }

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data)
  }

  if (auth) {
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }

  if (query) {
    const response = await fetch(`${API_URL}/${endpoint}${query}`, opts)

    return response.json()
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts)

  return response.json()
}

export { login, register, getUser, getQuestions, createForecast, resolveQuestion, createQuestion }