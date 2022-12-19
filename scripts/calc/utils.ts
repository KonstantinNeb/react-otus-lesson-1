import { Token, TokenValue, TokenType } from './types'

export function token([type, value, operand]: [
  TokenType,
  TokenValue,
  number?,
]): Token {
  let tok: Token = { type, value }
  if (operand) tok = { ...tok, operand }
  return tok
}
