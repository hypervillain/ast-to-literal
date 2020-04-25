# ast-to-literal

Transform a Babel ObjectExpression into a JS object.

----

code example:

```javascript
const t = require('@babel/types')
const equal = require('deep-equal')

const toJs = require('ast-to-literal')

const obj = { key: 'value' }
const astObject = t.objectExpression([
  t.objectProperty(t.identifier('key'), t.stringLiteral('value'))
])

console.log(equal(obj, toJs(astObject))) // true

```

Supported value types:

- BooleanLiteral
- StringLiteral
- NumericLiteral
- ObjectExpression
- ArrayExpression
- null (stripped from object)
- undefined (stripped from object too)

It could support other value types as long as they don't need any sort of computation.
Feel free to file an issue if you use this package and need more ou of it ✌️
