import { tokenizer } from './tokenizer'
import { validator } from './validator'
import { evaluator } from './evaluator'

export const runner = (line: string): number => {
  const tokens = tokenizer(line)
  const tokenExpression = validator(tokens)
  const result = evaluator(tokenExpression)

  return result.value as number
}
