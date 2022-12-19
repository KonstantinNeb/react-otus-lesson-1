/**
 * Tokenizer types
 */
export enum TokenType {
  NUMBER,
  OP_UNARY,
  OP_BINARY,
}

export enum Operation {
  PLUS = '+',
  MINUS = '-',
  MULT = '*',
  DIV = '/',
  POW = '^',
  SQUARE = '**',
  FACTORIAL = '!',
}

export type TokenValue = number | Operation

export type Token = {
  type: TokenType
  value: TokenValue
  operand?: number
}
