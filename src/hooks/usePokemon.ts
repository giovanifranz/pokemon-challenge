import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import type { PokemonOutput } from '#/models/pokemon.schema'
import { POKEMON_ERROR_MESSAGE } from '#/pages/api/pokemon/[name].api'

import { internalApi } from '../lib/api/internalApi'

const inputSchema = z.object({
  pokemonName: z.string().refine((value) => value.trim().length >= 3, {
    message: 'Should contain at least 3 characters.',
  }), // The Pokémon with the shortest name is Muk.
})

export function usePokemon() {
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: {
      pokemonName: '',
    },
    resolver: zodResolver(inputSchema),
    mode: 'onChange',
  })

  const {
    mutate,
    isPending,
    data: foundPokemon,
  } = useMutation({
    mutationFn: async (pokemonName: string) => {
      const { data } = await internalApi.get<PokemonOutput>(
        `/pokemon/${pokemonName}`,
      )
      return data
    },
    onSuccess: (data, pokemonName) => {
      queryClient.setQueryData(['pokemon', pokemonName], data)
      toast.success(`${data.name} has been found!`)
    },
    onError: (error) => {
      toast.error(POKEMON_ERROR_MESSAGE)
      console.error(error)
    },
  })

  const handlePokemonSubmit = ({ pokemonName }: { pokemonName: string }) => {
    mutate(pokemonName.trim())
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handlePokemonSubmit),
    foundPokemon,
    isPending,
  }
}
