import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

describe('generate-markdown-table', () => {
  it('generates a default outputPath from the inputPath', () => {
    process.env['INPUT_INPUTPATH'] = '/foo/bar/baz.json'

    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecSyncOptions = {
      env: process.env
    }

    const output = cp.execSync(`node ${ip}`, options).toString()

    expect(output).toMatch('::set-output name=outputPath,::/foo/bar/baz.md')
  })

  it('uses the outputPath when specified', () => {
    process.env['INPUT_INPUTPATH'] = '/foo/bar/baz.json'
    process.env['INPUT_OUTPUTPATH'] = `/alice/bob/clarice.md`

    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecSyncOptions = {
      env: process.env
    }

    const output = cp.execSync(`node ${ip}`, options).toString()

    expect(output).toMatch('::set-output name=outputPath,::/alice/bob/clarice.md')
  })
})
