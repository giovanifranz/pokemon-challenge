import { z } from 'zod'

import { capitalize } from '#/lib/capitalize'

const AbilityAbilitySchema = z.object({
  name: z.string(),
})

const SpritesSchema = z.object({
  front_default: z.string(),
})

const AbilityElementSchema = z.object({
  ability: AbilityAbilitySchema,
})

export const PokemonSchema = z
  .object({
    abilities: z.array(AbilityElementSchema),
    name: z.string().transform(capitalize),
    sprites: SpritesSchema,
  })
  .transform((data) => ({
    name: data.name,
    image: {
      src: data.sprites.front_default,
      alt: data.name,
    },
    abilities: data.abilities
      .map((ability) => ability.ability.name)
      .sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base' })),
  }))

export type PokemonInput = z.input<typeof PokemonSchema>
export type PokemonOutput = z.output<typeof PokemonSchema>
