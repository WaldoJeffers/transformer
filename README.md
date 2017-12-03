# transformer
A utility library to easily transform your data: describe your desired output, provide an input, and *voilà* 🌟!

[![Transformer on npmjs](https://img.shields.io/npm/v/@waldojeffers/transformer.svg?style=flat-square)](https://www.npmjs.com/package/@waldojeffers/transformer)
[![Transformer download stats on npmjs](https://img.shields.io/npm/dw/@waldojeffers/transformer.svg?style=flat-square)](https://npm-stat.com/charts.html?package=%40waldojeffers%2Ftransformer)
[![Codeship Status for WaldoJeffers/transformer](https://img.shields.io/codeship/7dc90ec0-ba7e-0135-1d22-52634e59fba4.svg?style=flat-square)](https://app.codeship.com/projects/259215)
[![codecov](https://img.shields.io/codecov/c/github/WaldoJeffers/transformer.svg?style=flat-square)](https://codecov.io/gh/WaldoJeffers/transformer)

## installation
```
npm i @waldojeffers/transformer
```

## usage

```js
import { identity, map, mapFrom, transform } from 'transformer'

const input = {
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

const transformer = transform({
  age: identity,
  fullname: mapFrom(
    ['firstname', 'lastname'],
    ({ firstname, lastname }) => `${firstname} ${lastname}`
  ),
  drumsticks: identity,
  occupation: map(s => s.toLowerCase()),
})

transformer(input) // { fullname: 'James M', drumsticks: 2, occupation: 'drummer' }
```

## documentation
### transform(descriptor)
#### description
 ```
 Function: descriptor: Object -> (Function: input: Object -> output: Object)
 ```
 Returns a function which transforms an input object based on the descriptor object you provide it. `transform` is a pure function: it will create a new output object and will not modify the input object.
 #### parameters
   - **descriptor** `Object<outputProperty: transformer>`: An object which describe how the output object will look like. Its keys define which properties will exist on the output object, and its values are *transformers* (such as [`identity`](#identity), [`map`](#map), [`mapFrom`](#mapFrom)) which compute the output object's values, usually by mapping from the input values. ⚠️ Any property from the input object whose key is missing in the descriptor will be stripped off in the output object.

#### return value
A function whose signature is `Function: input: Object -> output: Object` and which accepts an input object which it will transform into an ouput object based on the descriptor object provided earlier.

#### example
```js
import { identity, mapFrom, transform } from '@waldojeffers/transformer'

const input = {
  age: 27,
  balance: 400.17,
  name: 'James M',
}
const descriptor = {
  balance: mapFrom('balance', amount => '$' + amount),
  name: identity,
}
const transformer = transform(descriptor)
transformer(input) // { balance: '$400.17', name: 'James M'}
```

### map(mapper)
#### description
```
Function: mapper: Function -> transformer
```
Returns a transformer function which will pick the value associated to the input object's key on which this function is used, and map over it using the provided mapper function.

#### parameters
  - **mapper** `Function`: A function which will map over the associated property's value.

#### example
```js
import { identity, transform } from '@waldojeffers/transformer'

const input = {
  name: 'James M',
}
const descriptor = {
  name: map(s => s.toUpperCase()),
}
const transformer = transform(descriptor)
transformer(input) // { name: 'JAMES M'}
```

### identity
#### description
```
transformer(descriptor)
```
A transformer function which will simply return the value associated with the output key from the input object, **if it exists**.

#### example
```js
import { identity, transform } from '@waldojeffers/transformer'

const input = {
  name: 'James M',
}
const descriptor = {
  age: identity,
  name: identity,
}
const transformer = transform(descriptor)
transformer(input) // { name: 'James M'}
```

### mapFrom(inputKey, mapper)
#### description
```
Function: (inputKey: String|Array<String>, [mapper: (Function: inputValue: any|Object<any>)]) -> transformer
```
Returns a transformer which will pick keys from the input object and transform their associated value with a provided mapper function.
#### parameters
  - **inputKey** `String | Array<String>`: the inputKey(s) whose associated value in the input object should be retrieved and provided to the mapper function
  - **mapper** `Function: any | Object<any> | Array<any> ->  any`: the function which will map over the picked keys. Its default value is the identity function (`x => x`). If a string is provided as the input key, the mapper function will receive its associated value. If an array of strings is provided, the function will receive the associated values, either as single parameters if the provided function accept the same number of arguments as the inputKeys array's length, or as an object.

#### example
```js
import { mapFrom, transform } from '@waldojeffers/transformer'

const input = {
  balance: 400.17,
  firstname: 'James',
  lastname: 'M',
  drumstickCount: 2,
  drumstickPrice: 7.50
}
const descriptor = {
  balance: mapFrom('balance', amount => '$' + amount),
  fullname: mapFrom(['firstname', 'lastname'], ({firstname, lastname}) => `${firstname} ${lastname}`),
  drumsticksValue: mapFrom(['drumstickCount', 'drumstickValue'], (a, b) => a * b)
}
const transformer = transform(descriptor)
transformer(input) // { balance: '$400.17', fullname: 'James M', drumsticksValue: 15}
```
