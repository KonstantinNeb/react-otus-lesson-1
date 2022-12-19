/* eslint-disable no-console */

import { createInterface } from 'readline'

import { runner } from './runner'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (): Promise<null> =>
  new Promise((resolve, reject) => {
    rl.question('> ', (answer: string) => {
      if (!answer.trim()) {
        return resolve()
      }

      try {
        const result = runner(answer)
        console.log(`Result: ${result}`)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  })

async function app(): Promise<null> {
  while (true) {
    try {
      await question()
    } catch (error) {
      console.log(error.message)
    }
  }
}

app()
