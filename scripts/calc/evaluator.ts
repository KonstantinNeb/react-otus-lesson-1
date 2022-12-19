import {
  mathOperators,
  UnaryOperationType,
  BinaryOperationType,
} from './mathOperators'

import { token as getToken } from './utils'

import { Token, TokenType, Operation } from './types'

// unary operations **, !
export function evaluateUnary(expr: Token[]): Token[] {
  return expr.reduce((acc: Token[], token: Token) => {
    if (token.type === TokenType.OP_UNARY) {
      const operation = mathOperators[token.value] as UnaryOperationType
      return [
        ...acc,
        getToken([TokenType.NUMBER, operation(token.operand as number)]),
      ]
    }

    return [...acc, token]
  }, [])
}

export function evaluatePow(expr: Token[]): Token[] {
  // binary operation ^
  const result = [...expr]

  let i = 0
  while (i < result.length) {
    const token = result[i]

    if (token.type === TokenType.OP_BINARY && token.value === Operation.POW) {
      const prev = result[i - 1].value as number
      const next = result[i + 1].value as number

      const operation = mathOperators[token.value] as BinaryOperationType

      result.splice(
        i - 1,
        3,
        getToken([TokenType.NUMBER, operation(prev, next)]),
      )
    } else {
      i++
    }
  }
  return result
}

export function evaluateMultDiv(expr: Token[]): Token[] {
  // binary operations *, /
  const result = [...expr]

  let i = 0
  while (i < result.length) {
    const token = result[i]

    if (
      token.type === TokenType.OP_BINARY &&
      [Operation.MULT, Operation.DIV].includes(token.value as Operation)
    ) {
      const prev = result[i - 1].value as number
      const next = result[i + 1].value as number

      const operation = mathOperators[token.value] as BinaryOperationType

      result.splice(
        i - 1,
        3,
        getToken([TokenType.NUMBER, operation(prev, next)]),
      )
    } else {
      i++
    }
  }

  return result
}

export function evaluatePlusMinus(expr: Token[]): Token[] {
  // binary operations +, /
  const result = [...expr]

  let i = 0
  while (i < result.length) {
    const token = result[i]

    if (
      token.type === TokenType.OP_BINARY &&
      [Operation.PLUS, Operation.MINUS].includes(token.value as Operation)
    ) {
      const prev = result[i - 1].value as number
      const next = result[i + 1].value as number

      const operation = mathOperators[token.value] as BinaryOperationType

      result.splice(
        i - 1,
        3,
        getToken([TokenType.NUMBER, operation(prev, next)]),
      )
    } else {
      i++
    }
  }

  return result
}

export function evaluator(expr: Token[]): Token {
  let result = evaluateUnary(expr)
  result = evaluatePow(result)
  result = evaluateMultDiv(result)
  result = evaluatePlusMinus(result)
  return result[0]
}
