import { tokenizer } from '../tokenizer'
import { token } from '../utils'
import { TokenType, Operation } from '../types'

describe('Tokenizer', () => {
  describe('Valid cases', () => {
    const validCases = {
      '': [],
      '   ': [],
      '1 +1 -1': [
        token([TokenType.NUMBER, 1]),
        token([TokenType.NUMBER, 1]),
        token([TokenType.NUMBER, -1]),
      ],
      '1.2 +1.2 -1.2': [
        token([TokenType.NUMBER, 1.2]),
        token([TokenType.NUMBER, 1.2]),
        token([TokenType.NUMBER, -1.2]),
      ],
      '.2 +.2 -.2': [
        token([TokenType.NUMBER, 0.2]),
        token([TokenType.NUMBER, 0.2]),
        token([TokenType.NUMBER, -0.2]),
      ],
      '1. +1. -1.': [
        token([TokenType.NUMBER, 1]),
        token([TokenType.NUMBER, 1]),
        token([TokenType.NUMBER, -1]),
      ],
      '+ - * / ^': [
        token([TokenType.OP_BINARY, Operation.PLUS]),
        token([TokenType.OP_BINARY, Operation.MINUS]),
        token([TokenType.OP_BINARY, Operation.MULT]),
        token([TokenType.OP_BINARY, Operation.DIV]),
        token([TokenType.OP_BINARY, Operation.POW]),
      ],
      '2** 2!': [
        token([TokenType.OP_UNARY, Operation.SQUARE, 2]),
        token([TokenType.OP_UNARY, Operation.FACTORIAL, 2]),
      ],
    }

    Object.entries(validCases).forEach(([line, result]) => {
      test(line, () => {
        const tokens = tokenizer(line)
        expect(tokens).toEqual(result)
      })
    })
  })

  // Invalid cases
  describe('Invalid cases', () => {
    const invalidCases = ['abc', '#', '--1', '1+1', '2 **', '2 !', '2^2']

    invalidCases.forEach((line) => {
      test(line, () => {
        expect(() => tokenizer(line)).toThrow()
      })
    })
  })
})
