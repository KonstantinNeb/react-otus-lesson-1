import { Token, TokenType } from './types'

export function validator(tokens: Token[]): Token[] {
  return tokens.reduce(
    (acc: Token[], token: Token, i: number, tokens: Token[]) => {
      if ([TokenType.NUMBER, TokenType.OP_UNARY].includes(token.type)) {
        if (i === 0 || tokens[i - 1].type === TokenType.OP_BINARY) {
          return [...acc, token]
        } else {
          throw new Error('Validator: not valid expression')
        }
      } else if (token.type === TokenType.OP_BINARY) {
        if (
          i > 0 &&
          i < tokens.length - 1 &&
          [TokenType.NUMBER, TokenType.OP_UNARY].includes(tokens[i - 1].type) &&
          [TokenType.NUMBER, TokenType.OP_UNARY].includes(tokens[i + 1].type)
        ) {
          return [...acc, token]
        } else {
          throw new Error('Validator: unexpected token')
        }
      } else {
        throw new Error('Validator: not valid expression')
      }
    },
    [],
  )
}
