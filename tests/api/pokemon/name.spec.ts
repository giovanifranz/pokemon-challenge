import { HttpStatusCode } from 'axios'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'

import { baseURL } from '#/lib/api/externalApi'
import getPokemonByName, {
  type GetPokemonByNameResponse,
  POKEMON_ERROR_MESSAGE,
} from '#/pages/api/pokemon/[name].api'

import GetPokemonMock from './get-pokemon.json'

const server = setupServer(
  http.get(`${baseURL}/pokemon/charizard`, () => {
    return HttpResponse.json(GetPokemonMock)
  }),
)

describe(`Integration Test - ${getPokemonByName.name}`, () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('Should return the Pokémon by name correctly with the abilities sorted in alphabetical order', async () => {
    const { req, res } = createMocks<
      NextApiRequest,
      NextApiResponse<GetPokemonByNameResponse>
    >({
      url: '/api/pokemon',
      query: {
        name: 'charizard',
      },
    })

    await getPokemonByName(req, res)

    expect(res._getStatusCode()).toBe(HttpStatusCode.Ok)
    expect(JSON.parse(res._getData())).toStrictEqual({
      name: 'Charizard',
      image: {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        alt: 'Charizard',
      },
      abilities: ['blaze', 'fireball', 'solar-power'],
    })
  })

  it('Should return an error when the Pokémon name is not provided', async () => {
    const { req, res } = createMocks<
      NextApiRequest,
      NextApiResponse<GetPokemonByNameResponse>
    >({
      url: '/api/pokemon',
      query: {},
    })

    await getPokemonByName(req, res)

    expect(res._getStatusCode()).toBe(HttpStatusCode.BadRequest)
  })

  it('Should return an error when the Pokémon does not exist', async () => {
    server.use(
      http.get(`${baseURL}/pokemon/NO_EXISTENT`, () => {
        return HttpResponse.json({ message: POKEMON_ERROR_MESSAGE })
      }),
    )

    const { req, res } = createMocks<
      NextApiRequest,
      NextApiResponse<GetPokemonByNameResponse>
    >({
      url: '/api/pokemon',
      query: {
        name: 'NO_EXISTENT',
      },
    })

    await getPokemonByName(req, res)

    expect(res._getStatusCode()).toBe(HttpStatusCode.NotFound)
    expect(JSON.parse(res._getData())).toStrictEqual({
      message: POKEMON_ERROR_MESSAGE,
    })
  })

  it('Should return Method Not Allowed when using an unsupported HTTP method', async () => {
    const { req, res } = createMocks<
      NextApiRequest,
      NextApiResponse<GetPokemonByNameResponse>
    >({
      url: 'http://localhost:3000/api/pokemon',
      method: 'POST',
    })

    await getPokemonByName(req, res)

    expect(res._getStatusCode()).toBe(HttpStatusCode.MethodNotAllowed)
  })
})
