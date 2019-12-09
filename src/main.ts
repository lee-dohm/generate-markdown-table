import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    core.getInput('milliseconds')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
