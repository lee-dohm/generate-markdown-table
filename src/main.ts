import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'

import * as core from '@actions/core'

const markdownTable = require('markdown-table')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function run(): Promise<void> {
  try {
    const inputPath = core.getInput('inputPath')
    core.debug(`Input path: ${inputPath}`)

    const outputPath =
      core.getInput('outputPath') ||
      `${inputPath.substring(0, inputPath.length - path.extname(inputPath).length)}.md`
    core.debug(`Output path: ${outputPath}`)

    const input = JSON.parse(await readFile(inputPath, 'utf8'))
    core.debug(`Input: ${input}`)

    const output = markdownTable(input.data, input.options || {})
    core.debug(`Output: ${output}`)

    await writeFile(outputPath, output)

    core.setOutput('outputPath', outputPath)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
