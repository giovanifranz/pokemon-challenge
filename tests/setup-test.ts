import 'vitest-dom/extend-expect'

import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
