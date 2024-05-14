import HomePage from '#/pages/index.page'

import { customRender, screen } from '../test-utils'

test(HomePage.name, () => {
  customRender(<HomePage />)
  const titleElement = screen.getByRole('heading')
  expect(titleElement.textContent).toBe('Pokémon Challenge!')
})
