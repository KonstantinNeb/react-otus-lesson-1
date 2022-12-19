export type BinaryOperationType = (first: number, second: number) => number
export type UnaryOperationType = (operand: number) => number

export type OperationType = UnaryOperationType | BinaryOperationType

export const mul: BinaryOperationType = (
  first: number,
  second: number,
): number => first * second

export const div: BinaryOperationType = (
  first: number,
  second: number,
): number => first / second

export const add: BinaryOperationType = (
  first: number,
  second: number,
): number => first + second

export const minus: BinaryOperationType = (
  first: number,
  second: number,
): number => first - second

export const pow: BinaryOperationType = (
  base: number,
  exponent: number,
): number => {
  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new TypeError('pow: exponent should be a positive integer')
  }

  if (exponent === 0) {
    return 1
  }

  let result = base
  for (let i = 1; i < exponent; i++) {
    result *= base
  }

  return result
}

export const square: UnaryOperationType = (x: number): number => pow(x, 2)

export const fact: UnaryOperationType = (x: number): number => {
  if (!Number.isInteger(x) || x < 0) {
    throw new TypeError('factorial: argument should be non negative integer')
  }

  if (x === 0) {
    return 1
  }

  return x * fact(x - 1)
}

export const mathOperators: { [key: string]: OperationType } = {
  '*': mul,
  '/': div,
  '^': pow,
  '**': square,
  '!': fact,
  '+': add,
  '-': minus,
}

export const mathPriorities: number[] = [1, 2]

const [FIRST, SECOND] = mathPriorities

export const mathOperatorsPriorities: { [key: string]: number } = {
  '*': FIRST,
  '/': FIRST,
  '+': SECOND,
  '-': SECOND,
}
