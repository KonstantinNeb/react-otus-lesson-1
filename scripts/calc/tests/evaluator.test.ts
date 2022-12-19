import {
  evaluatePlusMinus,
  evaluatePow,
  evaluateMultDiv,
  evaluateUnary,
  evaluator,
} from '../evaluator'

import { token } from '../utils'
import { TokenType, Operation } from '../types'

describe('Evaluator', () => {
  // unary
  describe('unary', () => {
    test('No unary operations in expression', () => {
      const expression = [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.PLUS]),
        token([TokenType.NUMBER, 2]),
      ]
      const result = evaluateUnary(expression)
      expect(result).toEqual(expression)
    })
  })

  test('Works correctly', () => {
    const expression = [
      token([TokenType.NUMBER, 1]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.OP_UNARY, Operation.FACTORIAL, 4]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.OP_UNARY, Operation.SQUARE, 3]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 1]),
    ]

    const expectedResult = [
      token([TokenType.NUMBER, 1]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 24]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 9]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 1]),
    ]

    const result = evaluateUnary(expression)
    expect(result).toEqual(expectedResult)
  })

  // pow
  describe('pow', () => {
    test('No pow operation in expression', () => {
      const expression = [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.PLUS]),
        token([TokenType.NUMBER, 2]),
      ]
      const result = evaluatePow(expression)
      expect(result).toEqual(expression)
    })
  })

  test('Works correctly', () => {
    const expression = [
      token([TokenType.NUMBER, 1]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 2]),
      token([TokenType.OP_BINARY, Operation.POW]),
      token([TokenType.NUMBER, 2]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 1]),
    ]

    const expectedResult = [
      token([TokenType.NUMBER, 1]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 4]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 1]),
    ]

    const result = evaluatePow(expression)
    expect(result).toEqual(expectedResult)
  })

  // mult / div
  describe('mult / div', () => {
    test('No mult/div operation in expression', () => {
      const expression = [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.PLUS]),
        token([TokenType.NUMBER, 2]),
      ]
      const result = evaluateMultDiv(expression)
      expect(result).toEqual(expression)
    })
  })

  test('Works correctly', () => {
    const expression = [
      token([TokenType.NUMBER, 1]),
      token([TokenType.OP_BINARY, Operation.MINUS]),
      token([TokenType.NUMBER, 2]),
      token([TokenType.OP_BINARY, Operation.MULT]),
      token([TokenType.NUMBER, 3]),
      token([TokenType.OP_BINARY, Operation.DIV]),
      token([TokenType.NUMBER, 6]),
    ]

    const expectedResult = [
      token([TokenType.NUMBER, 1]),
      token([TokenType.OP_BINARY, Operation.MINUS]),
      token([TokenType.NUMBER, 1]),
    ]

    const result = evaluateMultDiv(expression)
    expect(result).toEqual(expectedResult)
  })

  // plus / minus
  describe('plus / minus', () => {
    test('No plus/minus operation in expression', () => {
      const expression = [
        token([TokenType.NUMBER, 1]),
        token([TokenType.OP_BINARY, Operation.MULT]),
        token([TokenType.NUMBER, 2]),
        token([TokenType.OP_BINARY, Operation.DIV]),
        token([TokenType.NUMBER, 2]),
      ]
      const result = evaluatePlusMinus(expression)
      expect(result).toEqual(expression)
    })
  })

  test('Works correctly', () => {
    const expression = [
      token([TokenType.NUMBER, 1]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 2]),
      token([TokenType.OP_BINARY, Operation.MINUS]),
      token([TokenType.NUMBER, 3]),
      token([TokenType.OP_BINARY, Operation.PLUS]),
      token([TokenType.NUMBER, 6]),
    ]

    const expectedResult = [token([TokenType.NUMBER, 6])]

    const result = evaluatePlusMinus(expression)
    expect(result).toEqual(expectedResult)
  })

  // evalute all
  describe('Evaluate complex expression', () => {
    test('Evaluate complex expression', () => {
      const expression = [
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
      ]
      const result = evaluator(expression)
      expect(result).toEqual(token([TokenType.NUMBER, -126]))
    })
  })
})
