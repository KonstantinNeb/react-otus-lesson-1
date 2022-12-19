import { Token, TokenType, Operation } from './types'

export function tokenizer(line: string): Token[] {
  const parts = line.trim().split(' ').filter(Boolean)

  if (parts.length === 0) {
    return []
  }

  const num = '[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)'

  const factorial = `${num}!`
  const square = `${num}\\*{2}`
  const pow = `\\^`
  const plus = '\\+'
  const minus = '-'
  const mult = '\\*'
  const div = '/'

  const matchers = [num, factorial, square, pow, plus, minus, mult, div]

  const stack: Token[] = parts.map((part) => {
    for (const matcher of matchers) {
      const regExp = new RegExp(`^${matcher}$`)

      if (regExp.test(part)) {
        switch (matcher) {
          case num:
            return {
              type: TokenType.NUMBER,
              value: Number(part),
            }
          case factorial:
            return {
              type: TokenType.OP_UNARY,
              value: Operation.FACTORIAL,
              operand: Number(part.slice(0, part.length - 1)),
            }
          case square:
            return {
              type: TokenType.OP_UNARY,
              value: Operation.SQUARE,
              operand: Number(part.slice(0, part.length - 2)),
            }
          case pow:
            return {
              type: TokenType.OP_BINARY,
              value: Operation.POW,
            }
          case plus:
            return {
              type: TokenType.OP_BINARY,
              value: Operation.PLUS,
            }
          case minus:
            return {
              type: TokenType.OP_BINARY,
              value: Operation.MINUS,
            }
          case mult:
            return {
              type: TokenType.OP_BINARY,
              value: Operation.MULT,
            }
          case div:
            return {
              type: TokenType.OP_BINARY,
              value: Operation.DIV,
            }
        }
      }
    }

    throw new Error('Tokenizer: not valid string')
  })

  return stack
}
