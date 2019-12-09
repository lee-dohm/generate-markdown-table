import * as cp from 'child_process'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as process from 'process'
import * as util from 'util'

const writeFile = util.promisify(fs.writeFile)

function execAction() {
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }

  return cp.execSync(`node ${ip}`, options).toString()
}

describe('generate-markdown-table', () => {
  let inputPath: string

  beforeEach(async () => {
    inputPath = path.join(os.tmpdir(), 'foo.json')
    await writeFile(inputPath, JSON.stringify({ data: [], options: {} }))
  })

  it('generates a default outputPath from the inputPath', () => {
    process.env['INPUT_INPUTPATH'] = inputPath

    const output = execAction()

    expect(output).toMatch(`::set-output name=outputPath,::${os.tmpdir()}/foo.md`)
  })

  it('uses the outputPath when specified', () => {
    process.env['INPUT_INPUTPATH'] = inputPath
    process.env['INPUT_OUTPUTPATH'] = path.join(os.tmpdir(), 'alice.md')

    const output = execAction()

    expect(output).toMatch(`::set-output name=outputPath,::${os.tmpdir()}/alice.md`)
  })
})
