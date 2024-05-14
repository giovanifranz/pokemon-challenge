import { HttpStatusCode } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { externalApi } from '#/lib/api/externalApi'
import {
  type PokemonInput,
  type PokemonOutput,
  PokemonSchema,
} from '#/models/pokemon.schema'

const schema = z.object({
  name: z.string(),
})

export const POKEMON_ERROR_MESSAGE = 'Pokemon not found!' as const

export type GetPokemonByNameResponse = PokemonOutput | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPokemonByNameResponse>,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(HttpStatusCode.MethodNotAllowed).end()
    return
  }

  const parsedQuery = schema.safeParse(req.query)

  if (!parsedQuery.success) {
    res.status(HttpStatusCode.BadRequest).end()
    return
  }

  try {
    const { data } = await externalApi.get<PokemonInput>(
      `/pokemon/${parsedQuery.data.name.toLowerCase()}`,
    )
    res.status(HttpStatusCode.Ok).json(PokemonSchema.parse(data))
  } catch (error) {
    console.error(error)
    res.status(HttpStatusCode.NotFound).json({ message: POKEMON_ERROR_MESSAGE })
  }
}
