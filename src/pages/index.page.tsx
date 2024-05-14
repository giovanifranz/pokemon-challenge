import { Icon } from '#/components/Icons'
import { PokemonCard, SkeletonPokemonCard } from '#/components/PokemonCard'
import { Button } from '#/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import { Input } from '#/components/ui/input'
import { usePokemon } from '#/hooks/usePokemon'

export default function Home() {
  const { form, handleSubmit, isPending, foundPokemon } = usePokemon()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-semi-bold my-6 text-3xl">Pokémon Challenge!</h1>
      <section className="container flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-96 flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="pokemonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search Pokemon by name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Charizard" {...field} />
                  </FormControl>
                  {form.formState.errors.pokemonName ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      {"Write the Pokémon's name correctly."}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="flex gap-2">
              Search Pokemon <Icon name="search" size={16} />
            </Button>
          </form>
        </Form>
        {isPending ? (
          <SkeletonPokemonCard />
        ) : (
          foundPokemon && <PokemonCard {...foundPokemon} />
        )}
      </section>
    </main>
  )
}
