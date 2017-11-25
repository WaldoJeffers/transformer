```js
import { transform } from 'transformer'

const input = {
  firstname: 'James',
  lastname: 'M',
  occupation: 'Drummer',
  drumsticks: 2,
}

transform({
  fullname: mapFrom(
    ['firstname', 'lastname'],
    ({ firstname, lastname }) => `${firstname} ${lastname}`
  ),
  middlename: mapFrom('middlename', s => s.toUpperCase()),
  drumsticks: identity,
  role: mapFrom('occupation', s => s.toLowerCase()),
})(input)

// returns { fullname: 'James M', drumsticks: 2, role: 'drummer' }
