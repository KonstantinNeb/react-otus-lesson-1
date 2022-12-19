import { mul, div, add, minus, square, pow, fact } from '../mathOperators'

describe('mathOperators test cases', () => {
  describe('Multiplication', () => {
    it('1 * 2 = 2', () => {
      expect(mul(1, 2)).toBe(2)
    })

    it('2 * 2 = 4', () => {
      expect(mul(2, 2)).toBe(4)
    })
  })

  describe('Division', () => {
    it('2 / 2 = 1', () => {
      expect(div(2, 2)).toBe(1)
    })

    it('4 / 2 = 2', () => {
      expect(div(4, 2)).toBe(2)
    })
  })

  describe('Plus / Minus', () => {
    it('4 + 2 = 6', () => {
      expect(add(4, 2)).toBe(6)
    })

    it('4 - 2 = 2', () => {
      expect(minus(4, 2)).toBe(2)
    })
  })

  describe('Square', () => {
    it('3** = 9', () => {
      expect(square(3)).toBe(9)
    })

    it('1**  1', () => {
      expect(square(1)).toBe(1)
    })
  })

  describe('Pow', () => {
    it('3**0 = 1', () => {
      expect(pow(3, 0)).toBe(1)
    })

    it('3**3 = 27', () => {
      expect(pow(3, 3)).toBe(27)
    })

    it('3**(-1) throws an error', () => {
      expect(() => pow(3, -1)).toThrow()
    })

    it('3**(1.5) throws an error', () => {
      expect(() => pow(3, 1.5)).toThrow()
    })
  })

  describe('Factorial', () => {
    it('0! = 1', () => {
      expect(fact(0)).toBe(1)
    })

    it('1! = 1', () => {
      expect(fact(1)).toBe(1)
    })

    it('4! = 1', () => {
      expect(fact(4)).toBe(24)
    })

    it('-1! throws an error', () => {
      expect(() => fact(-1)).toThrow()
    })

    it('1.5! throws an error', () => {
      expect(() => fact(1.5)).toThrow()
    })
  })
})
