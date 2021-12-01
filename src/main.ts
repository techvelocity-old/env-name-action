import * as core from '@actions/core'
import * as github from '@actions/github'
import {generate} from './name'

const DEFAULT_MAX = 40

async function run(): Promise<void> {
  try {
    const max = parseInt(core.getInput('max'), 10) ?? DEFAULT_MAX
    const pattern = core.getInput('pattern')

    const payload = github.context.payload
    const prNumber = payload.pull_request?.number

    let name = payload.ref
    if (prNumber) {
      name = `pr-${prNumber}`
    }

    const envName = generate(name, pattern, max)
    core.setOutput('name', envName)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    throw error
  }
}

run()
