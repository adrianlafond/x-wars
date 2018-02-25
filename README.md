# x-wars
A generic JavaScript * wars engine. Inspired by [Drugwars](https://en.wikipedia.org/wiki/Drugwars).

## Installation
Assuming [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com) are installed, clone this repo and run from the command line:
```
cd x-wars
npm install
```

## Scripts

### `npm test`
Runs all tests.

### `npm start`
Lints and builds the JavaScript into a distributable file in `dist`.

### `npm run test:watch`
Runs tests in watch mode in response to changes to any JavaScript file in the `src` or `test` directories.

### `npm run lint`
Lints the JavaScript code in `src` and `test` directories.

### `npm run build`
Builds the module into a single file in `dist`.

## Command-line demo
On a UNIX-like system (including Mac), run this once:
```
chmod u+x demo/index.js
```
Then to play the demo:
```
demo/index.js
```

## game elements
- time (30 days, 1 day per move)
- six locations
- six items to buy/sell
- space for items (100) (randomly offered)
- starter money/loan ($2000)
- weapons (0 at start) (randomly offered)
- loan sharks
- vs cops: get arrested, run, fight
- $ award for killing cop
- random: muggin, increased drug prices, finding of drugs
- final score: current amount cash * 2, then number of millions out of 100. So $25,000,000 = 50/100.

## typical game commands
- X reset
- X go (location; time decrements)
- X buy (item)
- X sell (item)
- pay (back loan shark)
- borrow (from loan shark)
- X finish (time out)

## game commands for special events
- buy (weapon, storage)
- surrender/flee/fight (cops, muggers)

## possible future game commands
- deposit (to bank)
- withdrawal (from bank)

## properties
- data (private) / or just use [WeakMap](http://2ality.com/2016/01/private-data-classes.html)

## loans
```I = P * r * t```
Interest earned = Princial * rate * time
