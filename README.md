# transformer
An utility library to easily transform your data: describe your desired output, provide an input, and *voilà* 🌟!

## installation
```
npm i @waldojeffers/transformer
```

## usage

```js
import { identity, mapFrom, transform } from 'transformer'

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
  middlename: mapFrom('middlename', s => s.toUpperCase()),
  drumsticks: identity,
  role: mapFrom('occupation', s => s.toLowerCase()),
})

transformer(input) // { fullname: 'James M', drumsticks: 2, role: 'drummer' }
```

## documentation
### transform
#### description
 ```
 Function: descriptor: Object -> (Function: input: Object -> output: Object)
 ```
 Returns a function which transforms an input object based on the descriptor object you provide it. `transform` is a pure function: it will create a new output object and will not modify the input object.
 #### parameters
   - **descriptor** `Object<outputProperty: transformer>`: An object which describe how the output object will look like. Its keys define which properties will exist on the output object, and its values are *transformers* (such as `identity`, `mapFrom`) which compute the output object's values, usually by mapping from the input values. ⚠️ Any property from the input object whose key is missing in the descriptor will be stripped off in the output object.

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

### identity
#### description
```
transformer
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

### mapFrom
#### description
```
Function: (inputKey: String|Array<String>, [mapper: (Function: inputValue: any|Object<any>)]) -> transformer
```
Returns a transformer which will pick keys from the input object and transform their associated value with a provided mapper function.
#### parameters
  - **inputKey** `String | Array<String>`: the inputKey(s) whose associated value in the input object should be retrieved and provided to the mapper function
  - **mapper** `Function: any | Object<any> ->  any | Object<any>`: the function which will map over the picked keys. Its default value is the identity function (`x => x`). If a string is provided as the input key, the mapper function will receive its associated value. If an array of string is provided, the function will receive an object.

#### example
```js
import { mapFrom, transform } from '@waldojeffers/transformer'

const input = {
  balance: 400.17,
  firstname: 'James',
  lastname: 'M',
}
const descriptor = {
  balance: mapFrom('balance', amount => '$' + amount),
  fullname: mapFrom(['firstname', 'lastname'], ({firstname, lastname}) => `${firstname} ${lastname}`),
}
const transformer = transform(descriptor)
transformer(input) // { balance: '$400.17', fullname: 'James M'}
```
