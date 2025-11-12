import { USER_AGENT } from '../config'

function assertResponseOk(response: Response, url: string) {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }
}

export async function fetchWithUserAgent(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      'User-Agent': USER_AGENT,
      ...(init?.headers ?? {}),
    },
  })

  assertResponseOk(response, url)

  return response
}

export async function fetchHtml(url: string) {
  const response = await fetchWithUserAgent(url)
  return response.text()
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetchWithUserAgent(url)
  return (await response.json()) as T
}
