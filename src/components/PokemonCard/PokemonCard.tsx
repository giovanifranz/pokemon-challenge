import Image from 'next/image'

import type { PokemonOutput } from '#/models/pokemon.schema'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface Props extends PokemonOutput {}

export function PokemonCard({ abilities, image, name }: Props) {
  return (
    <Card className="mx-auto h-80 md:w-96">
      <CardHeader className="flex flex-col items-center gap-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription>Abilities</CardDescription>
        <ul className="list-decimal text-sm text-muted-foreground">
          {abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      </CardHeader>
      <CardContent>
        <Image
          className="mx-auto"
          src={image.src}
          alt={image.alt}
          width={120}
          height={120}
        />
      </CardContent>
    </Card>
  )
}
