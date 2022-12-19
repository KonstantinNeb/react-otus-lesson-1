import { validator } from '../validator'
import { token } from '../utils'
import { TokenType, Operation } from '../types'

describe('Validator', () => {
  describe('Valid cases', () => {
    const validCases = {
      '': [],
      '1': [token([TokenType.NUMBER, 1])],
      '4**': [token([TokenType.OP_UNARY, Operation.SQUARE, 4])],
      '1 + 2 - 3': [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.PLUS]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.MINUS]),
        token([TokenType.NUMBER, 3]),
      ],
      '1 * 2 / 3': [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.MULT]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.DIV]),
        token([TokenType.NUMBER, 2]),
      ],
      '1** ^ 2 * 3!': [
        token([TokenType.OP_UNARY, Operation.SQUARE, 1]),
        token([TokenType.OP_BINARY, Operation.POW]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.MULT]),
        token([TokenType.OP_UNARY, Operation.FACTORIAL, 3]),
      ],
      '-2 - 2 ^ 2 ^ 2 - 4! - 4** * 3 / 2 + 2** - 2 ^ 3 ^ 2': [
        token([TokenType.NUMBER, -2]),
        token([TokenType.OP_BINARY, Operation.MINUS]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.POW]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.POW]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.MINUS]),
        token([TokenType.OP_UNARY, Operation.FACTORIAL, 4]),
        token([TokenType.OP_BINARY, Operation.MINUS]),
        token([TokenType.OP_UNARY, Operation.SQUARE, 4]),
        token([TokenType.OP_BINARY, Operation.MULT]),
        token([TokenType.NUMBER, 3]),
        token([TokenType.OP_BINARY, Operation.DIV]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.PLUS]),
        token([TokenType.OP_UNARY, Operation.SQUARE, 2]),
        token([TokenType.OP_BINARY, Operation.MINUS]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.POW]),
        token([TokenType.NUMBER, 3]),
        token([TokenType.OP_BINARY, Operation.POW]),
        token([TokenType.NUMBER, 2]),
      ],
    }

    Object.entries(validCases).forEach(([line, tokens]) => {
      test(line, () => {
        expect(validator(validCases[line])).toEqual(tokens)
      })
    })
  })

  // Invalid cases
  describe('Invalid cases', () => {
    const validCases = {
      '1 2': [token([TokenType.NUMBER, 1]), token([TokenType.NUMBER, 2])],
      '1 +': [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.PLUS]),
      ],
      '1 + - 3': [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.PLUS]),
        token([TokenType.OP_BINARY, Operation.MINUS]),
        token([TokenType.NUMBER, 3]),
      ],
      '* 2 / 3': [
        token([TokenType.OP_BINARY, Operation.MULT]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.DIV]),
        token([TokenType.NUMBER, 2]),
      ],
      '1** 2!': [
        token([TokenType.OP_UNARY, Operation.SQUARE, 1]),
        token([TokenType.OP_UNARY, Operation.FACTORIAL, 2]),
      ],
    }

    Object.keys(validCases).forEach((line) => {
      test(line, () => {
        expect(() => validator(validCases[line])).toThrow()
      })
    })
  })
})
