#!/usr/bin/env node
const XWars = require('../dist/x-wars')

const args = process.argv.slice(2)

function init(next = () => {}) {
  process.stdin.setEncoding('utf8')
  if (args[0]) {
    // TODO: load config
    error('config files cannot loaded yet!\n')
  }
  console.log(XWars)
  next()
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
  process.stdout.write('########## X-WARS ##########\n')
  getInput()
}

init(start)
