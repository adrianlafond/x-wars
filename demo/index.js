#!/usr/bin/env node

const XWars = require('../dist/x-wars').default

// const args = process.argv.slice(2)
let game

// function error(msg) {
//   process.stdout.write(msg || 'An error occurred.')
//   process.exit(1)
// }

function quit(msg) {
  if (msg) {
    process.stdout.write(`${msg}\n`)
  }
  process.exit(0)
}

function output() {
  process.stdout.write(JSON.stringify(game.options, null, '  '))
  process.stdout.write('\n\nDo what? ')
}

function submitInput(input = '') {
  const action = input.trim()
  if (action === 'q' || action === 'quit') {
    quit('Bye!')
  } else {
    process.stdout.write(`\n>>> ${action}\n`)
    game.action.apply(game, action.split(/\s+/g))
    output()
  }
}

function init() {
  game = new XWars()// { player: { time: 2 } })
  process.stdin.setEncoding('utf-8')
  process.stdin.on('data', submitInput)
}

init()
output()
