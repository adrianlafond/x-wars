#!/usr/bin/env node
const range = require('lodash.range')
const XWars = require('../dist/x-wars').default

const args = process.argv.slice(2)
const game = new XWars()

const COLUMN = 48
const COLUMN_SHORT = COLUMN - 4;

function init(next = () => {}) {
  process.stdin.setEncoding('utf8')
  if (args[0]) {
    // TODO: load config
    error('config files cannot loaded yet!\n')
  } else {
    next()
  }
}

function error(msg) {
  process.stdout.write(msg || 'An ERROR occurred.')
  process.exit(1)
}

function quit(msg) {
  if (msg) {
    process.stdout.write(msg)
  }
  process.exit(0)
}

function writePlace(data) {
  const name = data.place.name
  const line = range(COLUMN).map(() => '*').join('')
  const borderLen = (COLUMN - name.length - 2) / 2
  const border1 = range(borderLen).map(() => '*').join('')
  const border2 = name.length % 2 === 0 ? border1 :
    border1.substr(0, border1.length - 1)
  return `${line}
${border1} ${name} ${border2}
${line}
`
}

function writeItemsForSale(data) {
  return data.items.reduce((str, item, index) => {
    const len = item.name.length
    const price = `$${item.price}`
    const dots = range(COLUMN_SHORT - len - price.length).map(() => '.').join('')
    return str + `[${index + 1}] ${item.name}${dots}${price}\n`
  }, '')
}

function writePlayerInfo(data) {
  return `You've got $${data.player.wealth}.`
}

function writeGameOutput(data) {
  process.stdout.write(`
${writePlace(data)}
For sale:
${writeItemsForSale(data)}
${writePlayerInfo(data)}

`)
}

function getInput() {
  process.stdout.write('What you gonna do? ')
  process.stdin.on('data', submitInput)
}

function submitInput(action) {
  // Input data into Game.
  // Either getInput, error(msg), quit(msg).
  quit('Bye!\n')
}

function start() {
  const rule = `${range(COLUMN).map(() => '#').join('')}`
  const title = '  X-WARS  '
  const border = `${range((COLUMN - title.length) / 2).map(() => '#').join('')}`
  process.stdout.write(`
${rule}
${border}          ${border}
${border}${title}${border}
${border}          ${border}
${rule}
`)
  writeGameOutput(game.start())
  getInput()
}

init(start)
