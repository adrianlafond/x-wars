import isPlainObject from 'lodash.isplainobject'
import Options from '../src/options'
import State from '../src/state'

describe('options', () => {
  test('options has info and commands', () => {
    const options = new Options(new State()).options
    expect(isPlainObject(options.info)).toBe(true)
    expect(Array.isArray(options.commands)).toBe(true)
  })
})
