import * as core from '@actions/core'
import * as path from 'path'

async function run(): Promise<void> {
  try {
    const inputPath = core.getInput('inputPath')
    const outputPath =
      core.getInput('outputPath') ||
      `${inputPath.substring(0, inputPath.length - path.extname(inputPath).length)}.md`

    core.setOutput('outputPath', outputPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
