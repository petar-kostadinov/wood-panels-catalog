const baseUrl = import.meta.env.VITE_SUPABASE_URL
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export default async function request(path = '/', method = 'GET', data = null, opts = {}) {
  if (!baseUrl || !apiKey) {
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

  const response = await fetch(`${baseUrl}/rest/v1${path}`, options)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if ([201, 204].includes(response.status)) {
    return null
  }

  return response.json()
}
