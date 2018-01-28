# x-wars
A generic JavaScript * wars engine. Inspired by [Drugwars](https://en.wikipedia.org/wiki/Drugwars).

## game elements
- six locations
- six items to buy/sell
- time (30 days, 1 day per move)
- space for items (100) (randomly offered)
- weapons (0 at start) (randomly offered)
- starter money ($2000)
- loan sharks
- vs cops: get arrested, run, fight
- $ award for killing cop
- random: muggin, increased drug prices, finding of drugs
- final score: current amount cash * 2, then number of millions out of 100. So $25,000,000 = 50/100.

## methods
- initialize(config)
- start
- reset
- quit
- do([n]|q|r|s)
- back
- forward
- go(n)
- set(prop, val)
- get(prop)

## properties
- data (private) / or just use [WeakMap](http://2ality.com/2016/01/private-data-classes.html)

## loans
```I = P * r * t```
Interest earned = Princial * rate * time
