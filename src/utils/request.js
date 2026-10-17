const projectUrl = import.meta.env.VITE_SUPABASE_URL
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export default async function request(path = '/', method = 'GET', data = null, opts = {}) {
  if (!projectUrl || !apiKey) {
    throw new Error('Add the Supabase URL and anon key in .env.local.')
  }

  const options = {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      Prefer: 'return=representation',
    },
    ...opts,
  }

  if (method !== 'GET') {
    options.method = method
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }

  const response = await fetch(`${projectUrl}${path}`, options)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if ([201, 204].includes(response.status)) {
    return null
  }

  return response.json()
}

export function registerAccount(email, password) {
  return fetch(projectUrl.replace('/rest/v1', '/auth/v1/signup'), {
    method: 'POST',
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.msg || result.message || 'Registration failed.')
    }

    return result
  })
}

export function loginAccount(email, password) {
  return fetch(projectUrl.replace('/rest/v1', '/auth/v1/token?grant_type=password'), {
    method: 'POST',
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.msg || result.error_description || result.message || 'Sign in failed.')
    }

    return result
  })
}
