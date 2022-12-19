import { runner } from '../runner'

describe('Runner', () => {
  describe('Valid cases', () => {
    const validCases = [
      { expr: '1', result: 1 },
      { expr: '1 + 1', result: 2 },
      { expr: '  1 + 1  ', result: 2 },
      { expr: '1 + 2 * 3', result: 7 },
      { expr: '4 / 2 + 2', result: 4 },
      { expr: '1 + 2** - 2', result: 3 },
      { expr: '3! - -1', result: 7 },
      { expr: '1 + 3 ^ 2 - +1', result: 9 },
      {
        expr: '-2 - 2 ^ 2 ^ 2 - 4! - 4** * 3 / 2 + 2** - 2 ^ 3 ^ 2',
        result: -126,
      },
    ]

    validCases.forEach(({ expr, result }) => {
      test(expr, () => {
        expect(runner(expr)).toBe(result)
      })
    })
  })

  describe('Invalid cases', () => {
    const validCases = [
      '',
      '()',
      'abc',
      '1 2 3',
      '+ 1',
      '1 +',
      '1+1',
      '2 **',
      '1 + + 1',
    ]

    validCases.forEach((expr) => {
      test(expr, () => {
        expect(() => runner(expr)).toThrow()
      })
    })
  })
})
