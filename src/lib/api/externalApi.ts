import axios from 'axios'

export const baseURL = 'https://pokeapi.co/api/v2' as const

export const externalApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})
