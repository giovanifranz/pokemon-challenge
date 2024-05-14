import { capitalize } from '#/lib/capitalize'

describe('Tests for the capitalize function', () => {
  it('Should capitalize the first letter of each word', () => {
    const result = capitalize('hello world')
    expect(result).toBe('Hello World')
  })

  it('Should maintain lowercase letters in the middle of words', () => {
    const result = capitalize('thIS iS AnOThEr TeSt')
    expect(result).toBe('This Is Another Test')
  })

  it('Should handle a single letter', () => {
    const result = capitalize('a')
    expect(result).toBe('A')
  })

  it('Should handle words with extra spaces', () => {
    const result = capitalize('   tEst  com  Espaços  extras   ')
    expect(result).toBe('   Test  Com  Espaços  Extras   ')
  })

  it('Should handle words with apostrophes', () => {
    const result = capitalize("o'neill")
    expect(result).toBe("O'neill")
  })
})
